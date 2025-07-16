import { useRef, useState } from 'react';
import { FileWithPath } from 'react-dropzone';

export function useAudioRecorder() {
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [step, setStep] = useState<number>(1);
    const [loader, setLoader] = useState<boolean>(false);
    const [percent, setPercent] = useState<number>(0.0);
    const [progressBar, showProgressBar] = useState<boolean>(false);
    const [filename, setFileName] = useState<string>("");

    const [seconds, setSeconds] = useState<number>(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const formatTime = (totalSeconds: number) => {
        const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
        const secs = String(totalSeconds % 60).padStart(2, '0');
        return `${mins}:${secs}`;
    };

    const resetTimer = () => {
        stopTimer();
        setSeconds(0);
    };

    const startTimer = () => {
        if (intervalRef.current !== null) return; // Prevent multiple intervals
        intervalRef.current = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);
    };

    const stopTimer = () => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            console.log(4411);
        }
        intervalRef.current = null;
    };

    const startRecording = async () => {

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        setRecordedChunks([]);

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                setRecordedChunks((prev) => [...prev, event.data]);
            }
        };

        mediaRecorder.onstop = () => {
            //stream.getTracks().forEach((track) => track.stop());
            const blob = new Blob(recordedChunks, { type: 'audio/webm' });
            const file = new File([blob], "live_recording.webm", { type: 'audio/webm' });
            uploadFile(file);
        };
        mediaRecorder.start();
        startTimer();
        setIsRecording(true);
    };

    const stopRecording = () => {

        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            resetTimer();
        }
    };


    const uploadFile = async (file: FileWithPath) => {
        setStep(2);
        setLoader(true);
        const formData = new FormData();
        formData.append("audio_file", file);
        showProgressBar(true);
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload`, true);

        // Type for event argument in progress event
        xhr.upload.addEventListener("progress", (e: ProgressEvent) => {
            if (e.lengthComputable) {
                const percent = Math.round((e.loaded / e.total) * 100);
                setPercent(percent);
            }
        });

        xhr.onload = function (): void {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                const uploadedFilename: string = response.filename;
                setFileName(uploadedFilename);
                setStep(2);
            } else {
                alert("Upload failed: " + xhr.responseText);
            }
        };

        xhr.onerror = function (): void {
            alert("Upload failed due to network error.");
        };
        xhr.send(formData);
    }


    return { startRecording, stopRecording, isRecording, step, loader, uploadFile, percent, progressBar, filename, formatTime, seconds };
}