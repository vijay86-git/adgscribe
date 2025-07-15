import { useRef, useState } from 'react';

export function audioRecorder() {
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [step, setStep] = useState<number>(1);
    const [loader, setLoader] = useState<boolean>(false);

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

        const resp = await fetch('http://127.0.0.1:8001/api/v1/upload', {
            method: 'POST',
            body: formData,
        });

        // const res = await fetch('/api/scribe', {
        //                       method: 'POST',
        //                       body: formData,
        //                   });
        //const data = await res.json();
    }

    return { startRecording, stopRecording, isRecording, step, loader, uploadFile };
}