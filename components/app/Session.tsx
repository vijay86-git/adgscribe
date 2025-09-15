'use client'
import React, { useState, useRef, useEffect } from "react";
import { useDropzone, FileWithPath } from 'react-dropzone'
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Patient from "@/components/app/Patient";
import BookedAction from "@/components/app/BookedAction";
import Medicines from "@/components/app/Medicines";
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import {
    Card,
    CardContent
} from "@/components/ui/card"

import { Textarea } from "@/components/ui/textarea"

import { Input } from "@/components/ui/input";

import SearchAddPatientModal from "@/components/patient/SearchAddPatientModal"

import { Download, CircleCheck, Star, Pencil, Share2, Search, Smartphone, IdCard, Folder, Loader2, Info, Mic, MicOff, CheckCircle, FileText, User, User2, Music4, UserPlus, Timer, AudioLines, Check, Plus, Printer, Save } from "lucide-react";

import { useAudioRecorder } from './useAudioRecorder';

import { generateTranscript, generateNotes } from '@/app/actions';

import { Toaster } from "@/components/ui/sonner"

import { SearchPatient } from '@/components/patient/Types'
import PatientInfo from "@/components/app/PatientInfo";
import Stepper from "@/components/app/Stepper";
import AudioInfo from "@/components/app/AudioInfo";

import { Medicine } from "@/components/app/Types"


interface TranscriptionEvent {
    type: "language" | "transcription" | "speakerCluster" | "finalTranscript";
    data?: any;
    segmentId?: string;
    speaker?: string;
    text?: string;
    transText?: string;
    replacement?: Array<{ speaker: string; text: string; transText?: string }>;
}

type JsonMessage =
    | { type: "language"; data: string }
    | {
        type: "transcription";
        segmentId: string;
        speaker: string;
        text: string;
        transText?: string;
    }
    | {
        type: "speakerCluster";
        segmentId: string;
        replacement: {
            speaker: string;
            text: string;
            transText?: string;
        }[];
    }
    | {
        type: "finalTranscript";
        data: { transcript: { speaker: string; text: string }[] };
    };

interface Segment {
    id: string;
    speaker: string;
    text: string;
    transText?: string;
}



export default function Session() {

    const [user, setUser] = useState<SearchPatient>({
        label: '',
        personal_health_number: '',
        uuid: '',
        phone: ''
    });

    const [isPatient, fetchPatient] = useState<boolean>(false);

    const [open, setOpen] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");

    const { startRecording, stopRecording, isRecording, step, uploadFile, percent, progressBar, file, formatTime, seconds, audio, stepper, setStepper, loader } = useAudioRecorder();
    const [transcribe, setTranscribe] = useState<string>("");
    const [uuid, setUuid] = useState<string>("");
    const [notes, setNotes] = useState<string>("");
    const [patientSummary, setPatiensSummary] = useState<string>("");
    const [transcribeEnabled, isTranscribeEnabled] = useState<boolean>(false);
    const [transcription, transcriptionLoading] = useState<boolean>(false);
    const [generatingNotes, isGeneratingNotes] = useState<boolean>(false);
    const [lang, setLang] = useState<string>("en"); // set default langauge //
    const [temp, setTemp] = useState<string>(""); // set default langauge //

    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [language, setLanguage] = useState<string | null>(null);
    const [defaultLanguage, setDefaultLanguage] = useState<string>("en");
    const [tabview, setTabView] = useState<boolean>(false);

    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [transcript, setTranscript] = useState<{ id: number; text: string }[]>(
        []
    );


    const [detectedLanguage, setDetectedLanguage] = useState<string>("");
    const [segments, setSegments] = useState<Segment[]>([]);
    const [segments2, setSegments2] = useState<Segment[]>([]);
    const [finalTranscript, setFinalTranscript] = useState<boolean>(false);

    const [clinicalNotes, setClinicalNotes] = useState<boolean>(false);
    const [medications, setMedications] = useState<Medicine[]>([]);


    const [finalTranscriptData, setFinalTranscriptData] = useState<string>("");
    const [notesGenerated, setNotesGenerated] = useState<boolean>(false);
    const [internalNotes, setInternalNotes] = useState<string>("");

    const [booked, setBooked] = useState<boolean>(false);


    const counterRef = useRef(0);

    // Define the onDrop callback for when files are dropped
    const onDrop = (acceptedFiles: FileWithPath[]) => {
        const file = acceptedFiles[0];
        if (file) {
            uploadFile(file);
        }
    };

    // Initialize dropzone using the useDropzone hook
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false, // Prevent multiple files from being uploaded
        //accept: 'audio/*', // Specify accepted file types, e.g., images
        accept: {
            'audio/*': ['.mp3', '.wav', '.ogg'], // ✅ Correct
        }
    });


    const handleLine = (line: string) => {


        console.log(line, "---line")

        try {
            const json: JsonMessage = JSON.parse(line);
            console.log(json, "jsonnnn");
            console.log(json.type, 'type')

            if (json.type === "language") {
                if (json.data != 'en') {
                    setTabView(true);
                    setDetectedLanguage(json.data);
                }

            }

            if (json.type === "transcription") {
                let newSegment = {
                    id: json.segmentId,
                    speaker: json.speaker,
                    text: json.text,
                    transText: "transText" in json ? json.transText : undefined,
                    speakerCluster: 0,
                };

                if ('transText' in json) {
                    setSegments((prev) => [...prev, newSegment]);
                } else {
                    setSegments2((prev) => [...prev, newSegment]);
                }
            }

            if (json.type === "speakerCluster") {

                const updateSegment = (
                    setter: React.Dispatch<React.SetStateAction<Segment[]>>,
                    segmentId: string,
                    replacement: { speaker: string; text: string; transText?: string }[],
                    speaker: string
                ) => {
                        const newText = replacement.map((r) => `<p><span class="${r.speaker}">${r.speaker}</span> ${r.text}</p><br />`).join(" ");
                        //console.log(newText, 'newText');
                        const newTransText = replacement
                            .map((r) => `<p><span class="${r.speaker}">${r.speaker}</span> ${r.transText ?? r.text}</p><br />`)
                            .join(" ");
                        //console.log(newTransText, 'newTransText');
                        setter((prev) => 
                            prev.map((seg) =>
                               {
                                    if (seg.id === segmentId) {
                                        //console.log(seg);
                                        return { ...seg, speaker, text: newText, transText: newTransText, speakerCluster: 1 };
                                    } 
                                        return seg;
                               }
                            ) //.filter((seg) => seg !== undefined)
                        );
                };

                //console.log(setSegments);
                //console.log(setSegments2);

                updateSegment(setSegments, json.segmentId, json.replacement, json.speaker);
                updateSegment(setSegments2, json.segmentId, json.replacement, json.speaker);

                // setSegments((prev) =>
                //   prev.map((seg) =>
                //     seg.id === json.segmentId
                //       ? {
                //           ...seg,
                //           text: json.replacement
                //             .map((r) => `${r.speaker}: ${r.text}`)
                //             .join(" "),
                //           transText: json.replacement
                //             .map((r) => r.transText ?? r.text)
                //             .join(" "),
                //         }
                //       : seg
                //   )
                // );
            }

            // if (json.type === "finalTranscript") {
            //   if (Array.isArray(json.data.transcript)) {
            //     let combined = "";
            //     json.data.transcript.forEach((seg, i) => {
            //       setTimeout(() => {
            //         combined += `${seg.speaker}: ${seg.text} `;
            //         setFinalTranscript(combined);
            //       }, i * 500);
            //     });
            //   }
            // }

            if (json.type === "finalTranscript" && json.data && Array.isArray(json.data.transcript)) {
                setFinalTranscript(true);
                const transcript = json.data.transcript;

                // Step 1: Trim segments so length = transcript length

                if (tabview === true)
                setSegments((prev) => prev.slice(0, transcript.length));
                  else
                setSegments2((prev) => prev.slice(0, transcript.length));

                //setClinicalNotes(true);

                const allTexts = transcript.map(seg => seg.text);
                const fullTranscript = allTexts.join(" "); // or "\n"

                console.log(fullTranscript, 'ftc');
                setFinalTranscriptData(fullTranscript);

                // Step 2: Replace/update each line with delay
                transcript.forEach((seg, i) => {
                    const updateFn = tabview ? setSegments : setSegments2;
                    setTimeout(() => {
                        updateFn((prev) => {
                            const updated = [...prev];
                            updated[i] = {
                                id: `${i + 1}`, // keep index-based id for final transcript
                                speaker: `<p><span class='${seg.speaker}'>${seg.speaker}</span>`,
                                text: seg.text,
                                transText: seg.text, // or keep undefined if not needed
                            };
                            return updated;
                        });
                    }, i * 100); // delay for animation
                });

                return;
            }

        } catch (e) {
            console.warn("Invalid JSON line skipped:", e);
        }
    };

    // Example: simulate messages arriving
    useEffect(() => {
        const sampleLines = [`{
    "type": "language",
    "data": "pa"
}`,`{
    "type": "transcription",
    "speaker": "Identifying",
    "segmentId": "5daece96-bab3-4232-9503-fab68b2e2fb79",
    "text": "hayaubsa 11",
    "start": "00:51",
    "end": "00:55",
    "start_sec": 51.34,
    "end_sec": 55.92
}`,
`{
    "type": "speakerCluster",
    "segmentId": "5daece96-bab3-4232-9503-fab68b2e2fb79",
    "replacement": [
        {
            "type": "transcription",
            "speaker": "SPEAKER-01",
            "segmentId": "48771fa9-8618-4601-87a3-84f75ff0116u",
            "text": "hayaubsa 112",
            "start": "00:29",
            "end": "00:31"
        }
    ]
}`,
`{
    "type": "transcription",
    "speaker": "Identifying",
    "segmentId": "5daece96-bab3-4232-9503-fab68b2e2fb7",
    "text": "text 11",
    "start": "00:51",
    "end": "00:55",
    "start_sec": 51.34,
    "end_sec": 55.92,
    "transText": "transText 11"
}`,`{
    "type": "speakerCluster",
    "segmentId": "5daece96-bab3-4232-9503-fab68b2e2fb7",
    "replacement": [
        {
            "type": "transcription",
            "speaker": "SPEAKER-01",
            "segmentId": "48771fa9-8618-4601-87a3-84f75ff0116c",
            "text": "segment 1",
            "start": "00:29",
            "end": "00:31"
        },
        {
            "type": "transcription",
            "speaker": "SPEAKER-01",
            "segmentId": "549404fa-c79c-4590-82e4-9adf6423f40a",
            "text": "segment 2",
            "start": "00:30",
            "end": "00:32"
        },
        {
            "type": "transcription",
            "speaker": "SPEAKER-01",
            "segmentId": "a11d5c78-4611-4173-9f98-924840e31b49",
            "text": "segment 3",
            "start": "00:31",
            "end": "00:32"
        },
        {
            "type": "transcription",
            "speaker": "SPEAKER-01",
            "segmentId": "dfd0f60d-2bb2-421d-952c-b91e277a884c",
            "text": "segment 4",
            "start": "00:32",
            "end": "00:34"
        }
    ]
}`,`{
    "type": "transcription",
    "speaker": "Identifying",
    "segmentId": "23b7e62d-6d31-40c9-a439-3b4f3f1788c7",
    "text": "text 12",
    "start": "00:56",
    "end": "00:58",
    "start_sec": 56.96,
    "end_sec": 58.44,
    "transText": "transText 12"
}`,`{
    "type": "speakerCluster",
    "segmentId": "23b7e62d-6d31-40c9-a439-3b4f3f1788c7",
    "replacement": [
        {
            "type": "transcription",
            "speaker": "SPEAKER-01",
            "segmentId": "8b5c6121-2b31-4e17-b0b1-b40dc3667113",
            "text": "loreim",
            "start": "00:36",
            "end": "00:37"
        },
        {
            "type": "transcription",
            "speaker": "SPEAKER-02",
            "segmentId": "d041a23b-4ac4-48a4-9c76-7b7c5f3af967",
            "text": "lorep umpsu dolorہ",
            "start": "00:37",
            "end": "00:38"
        }
    ]
}`,,`{
    "type": "transcription",
    "speaker": "Identifying",
    "segmentId": "12b7e62d-6d31-40c9-a439-3b4f3f1788c7",
    "text": "text 32",
    "start": "00:56",
    "end": "00:58",
    "start_sec": 56.96,
    "end_sec": 58.44,
    "transText": "transText 32"
}`,`{
    "type": "speakerCluster",
    "segmentId": "12b7e62d-6d31-40c9-a439-3b4f3f1788c7",
    "replacement": [
        {
            "type": "transcription",
            "speaker": "SPEAKER-01",
            "segmentId": "1b5c6121-2b31-4e17-b0b1-b40dc3667113",
            "text": "loreim 32",
            "start": "00:36",
            "end": "00:37"
        },
        {
            "type": "transcription",
            "speaker": "SPEAKER-02",
            "segmentId": "2041a23b-4ac4-48a4-9c76-7b7c5f3af967",
            "text": "lorep umpsu dolor 55",
            "start": "00:37",
            "end": "00:38"
        }
    ]
}`,`{
"type": "finalTranscript",
    "data": {
        "transcript": [
            {
                "speaker": "Patient",
                "text": "123ھاا"
            },
            {
                "speaker": "Doctor",
                "text": "جی جی "
            }
        ],
        "speakers": {
            "Doctor": "Usually asks diagnostic questions or gives medical instructions",
            "Patient": "Usually describes symptoms or answers",
            "Family Member": "Third-party participant when contextually clear"
        }
    },
    "isFinal": true
}`
];

const medications = [
        { name: "amlodipine", timing: "", dosage: "10mg", duration: "", frequency: "once daily" },
        { name: "aspirin", timing: "", dosage: "81mg", duration: "", frequency: "once daily" },
        { name: "statin", timing: "", dosage: "", duration: "", frequency: "" },
        { name: "gastroprotective medicine", timing: "", dosage: "", duration: "", frequency: "" },
      ];

      setMedications(medications);
        sampleLines.forEach((line, i) =>
            setTimeout(() => handleLine(line), i * 1000)
        );
    }, []);

    // const handleLinessss = (line: string) => {
    //     try {
    //         const json: TranscriptionEvent = JSON.parse(line);

    //         if (json.type === "language") {
    //             setLanguage(json.data);
    //         } else if (json.type === "transcription" && json.text) {
    //             counterRef.current += 1;
    //             setTranscript((prev) => [
    //                 ...prev,
    //                 { id: counterRef.current, text: `${json.speaker}: ${json.text}` },
    //             ]);
    //         } else if (json.type === "finalTranscript" && json.data?.transcript) {
    //             let k = 0;
    //             json.data.transcript.forEach((seg: any, i: number) => {
    //                 k += 1;
    //                 setTimeout(() => {
    //                     setTranscript((prev) => [
    //                         ...prev,
    //                         { id: k, text: `${seg.speaker}: ${seg.text}` },
    //                     ]);
    //                 }, i * 500);
    //             });
    //         }
    //     } catch (e) {
    //         console.warn("Invalid JSON line skipped:", line);
    //     }
    // };

    const saveSession = async() => {

        console.log(medications);

        if (user.uuid === '') {
            setOpen(true);
        } else {
            const obj = {patient_uuid: user.uuid, transcript: finalTranscriptData, notes, summary: patientSummary, internal_notes: internalNotes};
            console.log(obj, 'obj')
            //saveSessionContinue(obj);
            setBooked(true)
        }
    }

    const generateTranscription = async (filename: string) => {

        console.log('click');

        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        transcriptionLoading(true);
        // const resp = await generateTranscript(filename);

        setLoading(true);
        setTranscript([]);
        setProgress(0);

        try {
            const response = await fetch(`https://v3.mediscribe.companydemo.ca/transcribe`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `filename=4b0ceb3c73e9412d82d728b68a7465e2.mp3&uuid=1234&language_code=en`,
            });

            if (!response.body) throw new Error("No response body");

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");

            let buffer = "";

            const readChunk = async (): Promise<void> => {
                const { done, value } = await reader.read();
                if (done) {
                    setProgress(100);
                    setLoading(false);
                    return;
                }

                buffer += decoder.decode(value, { stream: true });

                const lines = buffer.split("\n");
                buffer = lines.pop() || ""; // keep incomplete line

                console.log('innnn')

                for (const line of lines) {

                    console.log(line, '[][][][]')
                    handleLine(line);
                }

                setProgress((prev) => Math.min(95, prev + 5));
                await readChunk();
            };

            await readChunk();
        } catch (err) {
            console.error("Streaming failed:", err);
            setLoading(false);
        }
    };

    const changeTemplate = () => {
        console.log("change emp[")
        setClinicalNotes(false)
        setNotesGenerated(false)
        setNotes("")
        setPatiensSummary("");
        setTemp("");
        setBooked(false);
        setStepper(2);
    }


    //transcriptionLoading(false);
    // if (resp.response == "OK") {
    //     setStepper(2);
    //     const { response, uuid } = resp.data;
    //     setTranscribe(response);
    //     setUuid(uuid);
    //     isTranscribeEnabled(true);
    // }
    //}

    const genNotesAndPatientSummary = async () => {

        setNotes('Loading....');
        setPatiensSummary('Loading...');

        setClinicalNotes(true);
        isGeneratingNotes(true);
        const notesResp = { status: "success", notes: "Something went wrong! Try again....111" }; //await generateNotes(uuid);
        const summaryResp = { status: "success", summary: "Something went wrong! Try again....222" }; //await generatePatientSummary(uuid);
        isGeneratingNotes(false);
        if (notesResp.status == "success") {
            setNotes(notesResp.notes);
            setNotesGenerated(true);
        }
        if (summaryResp.status == "success") {
            setPatiensSummary(summaryResp.summary);
        }
        setStepper(3);
    }

    const handleChange1 = () => {

    }

    // 👇 Watch loader state
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (stepper == 1) {
            timerRef.current = setTimeout(() => {
                if (buttonRef.current) {
                    buttonRef.current.click(); // auto click
                }
            }, 5000);
        }
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [stepper]);


    const TransTextRender = ({finalTranscript, seg, text}: {finalTranscript: boolean, seg: Segment, text: boolean}) => {
    if (!finalTranscript) {
        if (seg.speakerCluster === 0) {
            return (
                <div className="flex flex-wrap items-start align-items-center gap-2">
                    <User className="w-6 h-6 shrink-0" />
                    <Image
                        className="pt-1"
                        src="/images/audio_waves.gif"
                        width={60}
                        height={20}
                        alt="audio waves"
                    />
                    <div
                        dangerouslySetInnerHTML={{
                            __html: seg?.speaker ?? '',
                        }}
                    />
                    <div
                        dangerouslySetInnerHTML={{
                            __html: text == false ? (seg?.transText ?? '') : (seg?.text ?? '') ,
                        }}
                    />
                </div>
            );
        } else {
            return (
                <div 
                    dangerouslySetInnerHTML={{
                        __html: text == false ? (seg?.transText ?? '') : (seg?.text ?? ''),
                    }}
                />
            );
        }
    } else {
        return (
            <>
                <div
                    dangerouslySetInnerHTML={{
                        __html: seg?.speaker ?? '',
                    }}
                />
                <div
                    dangerouslySetInnerHTML={{
                        __html: text == false ? (seg?.transText ?? '') : (seg?.text ?? ''),
                    }}
                />
            </>
        );
    }
};

    return (

        <div className="flex">
            <div className="flex flex-1 flex-col gap-3 pt-0">
                <Toaster />
                <div className="flex items-center justify-center w-full bg-red-100 border border-red-200 text-red-800 rounded-full px-4 py-2">
                    <span className="text-md flex"><User2 /><label className="pl-2">Let's map a patient</label></span>
                    <SearchAddPatientModal open={open} isPatient={isPatient} fetchPatient={fetchPatient} setOpen={setOpen} user={user} setUser={setUser} />
                </div>
                {isPatient ? <PatientInfo user={user} setOpen={setOpen} /> : null}
                <Stepper stepper={stepper} />
                {/* <audio id="audioTag" style={{ width: "100%", display: "block" }} src="">
                    Your browser does not support the audio tag.
                </audio> */}

                <div className="flex w-full">
                    <div className="w-full p-4">
                     
                            <>
                                <h1 className="scroll-m-20 text-left text-2xl mb-4 font-extrabold tracking-tight text-balance">Select Audio Input Mode</h1>
                                <div className="recArea">
                                    <Tabs defaultValue="recordedAudio">
                                        <TabsList>
                                            <TabsTrigger value="recordedAudio"><Folder size={24} /> Use Pre-recorded Audio</TabsTrigger>
                                            <TabsTrigger value="liveRecording"><Mic size={24} /> Use Live Recording</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="recordedAudio">
                                            <Card>
                                                <CardContent className="grid">
                                                    <section className="container">
                                                        <div className="grid w-full items-center gap-1.5">
                                                            <div
                                                                {...getRootProps()}
                                                            >
                                                                <input {...getInputProps()} />
                                                                <div className="font-extrabold text-center">{
                                                                    isDragActive ?
                                                                        <p>{"Drop the file here ..."}</p> :
                                                                        <p>{"Drag 'n' drop file here, or click to select file"}</p>
                                                                }</div>
                                                            </div>
                                                            
                                                        </div>

                                                    </section>
                                                    

                                                </CardContent>
                                                {
                                                  progressBar ? (
                                                    <div className="flex w-full justify-end gap-5 p-2">
                                                        <>
                                                            <Progress value={percent} />
                                                            <span className="text-sm">{percent}%</span>
                                                        </>
                                                    </div>
                                                  ) : ""
                                                }
                                            </Card>
                                        </TabsContent>
                                        <TabsContent value="liveRecording">
                                            <Card>
                                                <CardContent className="grid gap-6">
                                                    <div className="flex justify-center">
                                                        <section className="container">
                                                            {!isRecording ? <Button className="mt-2" onClick={startRecording}><Mic size={24} /> Start Live Recording</Button> : ''}
                                                            {isRecording ? (<><AudioLines className="audio-lines-animate w-16 h-8" /><Button className="mt-2" onClick={stopRecording}><MicOff size={24} /> Stop Recording</Button></>) : ''}
                                                        </section>
                                                        <div className="flex items-center gap-1.5 justify-center">
                                                            <Timer className="w-5 h-5" /><p className="text-sm font-normal tracking-normal font-geist-sans leading-6 flex justify-self-end w-10 text-center text-primary">{formatTime(seconds)}</p>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </TabsContent>

                                        <div className="">
                                            <TooltipProvider>
                                                <Tooltip delayDuration={100}>
                                                    <TooltipTrigger asChild>
                                                        <div className="flex float-right gap-2 text-sm text-muted-foreground hover:text-primary cursor-pointer">
                                                            <Info className="w-4 h-4" />
                                                            Helpful Tips
                                                        </div>
                                                    </TooltipTrigger>

                                                    <TooltipContent side="top" className="max-w-md p-4 bg-white border border-gray-300 shadow-lg rounded-md">

                                                        <div className="text-sm font-bold text-gray-700 mb-2">
                                                            Helpful Tips for Live Recording
                                                        </div>
                                                        <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                                                            <li><strong>Find a quiet spot</strong> — reduce background sounds for better voice clarity.</li>
                                                            <li><strong>Use a headset or dedicated mic if available</strong> — helps improve transcription accuracy.</li>
                                                            <li><strong>Have the patient’s case notes handy</strong> — keeps narration structured and complete.</li>
                                                            <li><strong>Speak clearly and at a comfortable pace</strong> — no need to rush.</li>
                                                            <li><strong>Silence phone alerts or page notifications</strong> during recording.</li>
                                                            <li><strong>Pause briefly between sections</strong> (like symptoms, diagnosis, prescription).</li>
                                                        </ul>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    </Tabs>
                                </div>
                            </>

                        {step == 2 && audio ?
                            <>
                                <div className="flex mt-2 border border-dashed border-gray-300 rounded-lg p-4 items-center justify-between space-x-4 w-full bg-white shadow-sm">
                                    <AudioInfo file={file} />
                                </div>
                                <div className="flex mt-5 border border-dashed border-gray-300 rounded-lg p-4 items-center justify-between space-x-4 w-full bg-white shadow-sm">
                                    <div className="flex flex-3  bg-[stone-100] border-dashed border-2 border-neutral-400 rounded-sm p-2 items-center space-x-2">
                                        <div className="text-neural-300 flex items-center">
                                            <Image src={`/images/countdown.gif`} width={40} height={40} alt={'/'} />
                                        </div>
                                        <div className="flex flex-col justify-center items-center text-center">
                                            <p>Transcription will be generated automatically after 5 seconds, or click <b>Generate Transcription</b></p>
                                        </div>
                                    </div>

                                    <div className="rounded-sm items-center space-x-2 flex-1">
                                        <Select value={lang} onValueChange={(value) => setLang(value)}>
                                            <SelectTrigger className="w-full min-h-[3rem] py-4 text-gray-900">
                                                <SelectValue className="text-gray-900" placeholder="Select Language" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem className="text-gray-900" value="en">English</SelectItem>
                                                <SelectItem className="text-gray-900" value="fr">French</SelectItem>
                                                <SelectItem className="text-gray-900" value="pa">Punjabi</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex flex-1 rounded-sm p-2 space-x-2">
                                        <Button className="ml-auto w-full h-10 tracking-wide text-md font-semibold" disabled={transcription} onClick={() => generateTranscription('')} ref={buttonRef}>Generate Transcription</Button>
                                    </div>
                                </div>
                            </>
                            : null}

                        {loader || transcription ?
                            (<div className="flex mt-5 border border-dashed border-gray-300 rounded-lg p-4 items-center justify-center w-full bg-white shadow-sm">
                                <div className="flex flex-col items-center justify-centerrounded-sm text-center space-y-3 w-full">
                                    <Loader2 className="h-10 w-10 animate-spin text-[#0a848e]" />
                                    <p className="text-md text-gray-700 font-semibold">
                                        Just a moment... {loader ? 'Uploading' : 'Transcribing'} is in progress
                                    </p>
                                </div>
                            </div>)
                            : null}


                        { medications.length > 0 ? <Medicines medications={medications} setMedications={setMedications} />: null }

                        <div className={`recArea mt-5 ${segments2.length || segments.length ? "" : "hissdden"}`}>

                            { finalTranscriptData ? 
                            <>
                                <div className={`flex w-full justify-end gap-5 mb-4 ${temp ? '' : 'hidden'}`}>
                                    
                                </div>
                                <div className="flex w-full justify-end items-center gap-5 mb-4">
                                    <div className={`${temp ? '' : 'hidden'} h-[25px] bg-[#cbebf2] px-[9px] py-[2px] rounded-[5px] text-[12px] text-[#095d71] border border-[#85abb4]`}>Selected Template: {temp}
                                    </div>

                                    {( ! notesGenerated) ? (
                                    <>
                                        <div className="">
                                            <Select value={temp} onValueChange={(value) => setTemp(value)}>
                                                <SelectTrigger className="w-full mt-1 py-2 text-gray-900">
                                                    <SelectValue className="text-gray-900" placeholder="Select Template" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1" className="text-gray-900"> Template 1</SelectItem>
                                                    <SelectItem value="2" className="text-gray-900">Template 2</SelectItem>
                                                    <SelectItem value="3" className="text-gray-900">Template 3</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="mt-1">
                                            <Button disabled={generatingNotes} onClick={() => genNotesAndPatientSummary()} className="ml-auto w-full h-10 tracking-wide text-md font-semibold"><FileText /> Verify and Generate Notes</Button>
                                        </div>
                                    </>): null }

                                </div>
                            </>

                            : null}

                            <div className="flex w-full gap-5">
                                <div className="w-full">

                                    {/* {tabview ? */}
                                    {tabview ?
                                        (<Tabs defaultValue="detectedLanguage" className="w-full">
                                            <TabsList>
                                                <TabsTrigger value="detectedLanguage">{detectedLanguage}</TabsTrigger>
                                                <TabsTrigger value="defaultLanguage">{defaultLanguage}</TabsTrigger>
                                            </TabsList>
                                            <TabsContent value="detectedLanguage">
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead className="w-[100px] font-semibold text-md tracking-wider">Original Transcription</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>

                                                        {segments && segments.map((seg) => (
                                                            <TableRow key={seg?.id}>
                                                                <TableCell className="font-medium">
                                                                    <div className="flex flex-wrap items-start align-items-center gap-2">
                                                                        <TransTextRender finalTranscript={finalTranscript} seg={seg} text={false} />
                                                                    </div>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}

                                                    </TableBody>
                                                </Table>
                                            </TabsContent>
                                            <TabsContent value="defaultLanguage">
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead className="w-[100px] font-semibold text-md tracking-wider">Original Transcription</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {segments2 && segments2.map((seg) => (
                                                            <TableRow key={seg?.id}>
                                                                <TableCell className="font-medium">
                                                                    <div className="flex flex-wrap items-start align-items-center gap-2">
                                                                        <TransTextRender finalTranscript={finalTranscript} seg={seg} text={true} />
                                                                    </div>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TabsContent>
                                        </Tabs>)
                                        :
                                        (segments2 && segments2.length > 0 && ( 
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-[100px] font-semibold text-md tracking-wider">Original Transcription</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {segments2 && segments2.map((seg) => (
                                                    <TableRow key={seg?.id ?? ''}>
                                                        <TableCell className="font-medium">
                                                            <div className="flex flex-wrap items-start align-items-center gap-2">
                                                                <TransTextRender finalTranscript={finalTranscript} seg={seg} text={true} />
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>))
                                    }

                                </div>


                                { clinicalNotes ? 
                                <div className="w-full">
                                    <div className="flex w-full mb-3 bg-gray-100 rounded-xl p-2">
                                        <Tabs defaultValue="cnotes" className="w-full">
                                            <TabsList>
                                                <TabsTrigger value="cnotes"><FileText />Clinical Notes</TabsTrigger>
                                                <TabsTrigger value="summary"><User /> Patient Visit Summary</TabsTrigger>
                                            </TabsList>
                                            <TabsContent value="cnotes">
                                                {/*<p className="p-2">{notes}</p>*/}
                                                <Textarea defaultValue={notes} className="p-2" onChange={(e) => setNotes(e.target.value)} />
                                            </TabsContent>
                                            <TabsContent value="summary">
                                                {/*<p className="p-2">{patientSummary}</p>*/}
                                                <Textarea defaultValue={patientSummary} className="p-2" onChange={(e) => setPatiensSummary(e.target.value)} />
                                            </TabsContent>
                                        </Tabs>

                                        {/* <div className="w-[30%] p-4 font-semibold text-sm">Clinical Notes</div>
                                            <div className="w-[60%] p-2 text-center">
                                                <div className="bg-white shadow rounded-xl p-1 w-full max-w-4xl mx-auto">
                                                    <div className="flex items-center justify-around p-2">
                                                        <span className="text-xs font-bold text-gray-500">#Template</span>
                                                        <h2 className="text-xs font-bold text-gray-800">
                                                            Acute Illness Visit Template
                                                        </h2>
                                                    </div>
                                                </div>
                                            </div> */}

                                    </div>

                                    <div className="flex w-full">
                                        <Textarea placeholder="Internal Notes" />
                                    </div>

                                    <div className="flex w-full mt-2">
                                        <Button onClick={saveSession}> <Save />Save and Continue</Button>
                                    </div>

                                </div>
                                : null }

                            </div>

                        </div>

                        { booked ? <BookedAction booked={setBooked} changeTemplate={changeTemplate} /> : null }

                    </div>
                </div>


                {
                    (step == 2 && !transcribeEnabled) ?
                        <></>
                        // <div className="space-y-4 p-4">
                        //     <h1 className="text-left text-2xl font-extrabold tracking-tight text-balance">Transcribe</h1>
                        //     <div className="flex space-x-2">
                        //         <div className="w-[80%] flex">
                        //             <CheckCircle color="green" size={24} />
                        //             <span className="px-2 text-lg font-extrabold">File Uploaded: <Badge className="fbrd p-1 px-3 border-1 text-black text-sm" variant="outline"><Music4 size={24} />{file.name ?? 'N/A'}</Badge></span>
                        //         </div>
                        //         <div className="w-[20%] text-right"><Select>
                        //             <Select value={"en"}>
                        //                 <SelectTrigger className="w-[180px]">
                        //                     <SelectValue placeholder="Select Language" />
                        //                 </SelectTrigger>
                        //                 <SelectContent>
                        //                     <SelectItem value="ar">Arabic</SelectItem>
                        //                     <SelectItem value="yue">Cantonese</SelectItem>
                        //                     <SelectItem value="prs">Dari</SelectItem>
                        //                     <SelectItem value="en">English</SelectItem>
                        //                     <SelectItem value="fa">Farsi (Persian)</SelectItem>
                        //                     <SelectItem value="fr">French</SelectItem>
                        //                     <SelectItem value="de">German</SelectItem>
                        //                     <SelectItem value="he">Hebrew</SelectItem>
                        //                     <SelectItem value="hi">Hindi</SelectItem>
                        //                     <SelectItem value="it">Italian</SelectItem>
                        //                     <SelectItem value="ko">Korean</SelectItem>
                        //                     <SelectItem value="zh">Mandarin</SelectItem>
                        //                     <SelectItem value="pt">Portuguese</SelectItem>
                        //                     <SelectItem value="pa">Punjabi</SelectItem>
                        //                     <SelectItem value="ru">Russian</SelectItem>
                        //                     <SelectItem value="so">Somali</SelectItem>
                        //                     <SelectItem value="es">Spanish</SelectItem>
                        //                     <SelectItem value="tl">Tagalog</SelectItem>
                        //                     <SelectItem value="ta">Tamil</SelectItem>
                        //                     <SelectItem value="ur">Urdu</SelectItem>
                        //                 </SelectContent>
                        //             </Select>
                        //         </Select></div>
                        //     </div>
                        //     <div>
                        //         <Button onClick={() => generateTranscription(file.name ?? '')} >
                        //             <FileText color="white" size={24} />{transcription ? "Generating..." : "Generate Transcription..."}
                        //         </Button>
                        //     </div>
                        // </div>
                        : ''
                }

                {
                    transcribeEnabled ?
                        <>
                            {/* <div className="grid grid-cols-2 gap-4 mt-5 ml-5">
                                <div className="mt-1">
                                    <div className="mb-3">
                                        <h3 className="text-xl font-semibold mb-1">Transcript</h3>
                                        <Textarea className="w-full h-48 p-3 border border-gray-300 rounded-md" placeholder="Transcript" defaultValue={transcribe} />
                                    </div>
                                    <div className="mb-3">
                                        <h3 className="text-xl font-semibold mb-1">Internal Notes</h3>
                                        <Textarea className="w-full h-24 p-3 border border-gray-300 rounded-md" placeholder="Internal Notes" />
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold mb-2 flex justify-between items-center">
                                            <span>Clinical Notes</span>
                                            <Button className="ml-4" disabled={generatingNotes} onClick={() => genNotes()}>
                                                <FileText color="white" size={24} /> {generatingNotes ? "Generating Notes" : "Verify and Generate Notes"}
                                            </Button>
                                        </h3>
                                        <Textarea className="w-full h-24 p-3 border border-gray-300 rounded-md" placeholder="Clinical Notes" />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4 ml-5">
                                <Dialog>
                                    <form>
                                        <DialogTrigger asChild>
                                            <Button><User color="white" size={24} /> Search / Add New Patient</Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-4xl w-full md:max-w-4xl lg:max-w-4xl">
                                            <DialogHeader>
                                                <DialogTitle>Search / Add New Patient</DialogTitle>
                                            </DialogHeader>
                                            <div className="grid gap-4">
                                                <Patient />
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit"><UserPlus size={24} /> Add Patient</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </form>
                                </Dialog>
                            </div> */}
                        </>
                        : ''
                }
            </div >
        </div >
    );
};