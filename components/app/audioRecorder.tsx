import { useRef, useState } from 'react';

export function audioRecorder() {
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [step, setStep] = useState<number>(1);
    const [loader, setLoader] = useState<boolean>(false);
    const [percent, setPercent] = useState<number>(0.0);
    const [progressBar, showProgressBar] = useState<boolean>(false);

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
        setIsRecording(true);
        console.log(111);
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const uploadFile = async (file: any) => {

        setStep(2);
        setLoader(true);

        console.log(12222);

        const formData = new FormData();
        formData.append("audio_file", file);

        console.log(file);
        console.log(formData);

        showProgressBar(true);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", `http://127.0.0.1:8001/api/v1/upload`, true);

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
                //$("#uploaded-name").text(uploadedFilename);
                //switchStep(2);
            } else {
                alert("Upload failed: " + xhr.responseText);
            }
        };

        xhr.onerror = function (): void {
            alert("Upload failed due to network error.");
        };

        // Show progress bar container before upload
        // $("#upload-progress-container").show();
        // $("#upload-progress-bar").css("width", "0%").text("0%");

        xhr.send(formData);

    }
    // const res = await fetch('/api/scribe', {
    //                       method: 'POST',
    //                       body: formData,
    //                   });
    //const data = await res.json();

    return { startRecording, stopRecording, isRecording, step, loader, uploadFile, percent, progressBar };
}