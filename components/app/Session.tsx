'use client'
import React, { useState } from "react";
import { useDropzone, FileWithPath } from 'react-dropzone'
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Patient from "@/components/app/Patient";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Folder, Mic, MicOff, CheckCircle, FileText, User, Music4, UserPlus, Check, Timer, AudioLines } from "lucide-react";

import { useAudioRecorder } from './useAudioRecorder';

import { generateTranscript, generateNotes } from '@/app/actions';

export default function Session() {

    const { startRecording, stopRecording, isRecording, step, uploadFile, percent, progressBar, filename, formatTime, seconds } = useAudioRecorder();

    const [transcribe, setTranscribe] = useState<string>("");
    const [uuid, setUuid] = useState<string>("");
    const [notes, setNotes] = useState<string>("");
    const [transcribeEnabled, isTranscribeEnabled] = useState<boolean>(false);
    const [transcription, transcriptionLoading] = useState<boolean>(false);
    const [generatingNotes, isGeneratingNotes] = useState<boolean>(false);

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

    const generateTranscription = async (filename: string) => {

        transcriptionLoading(true);
        const resp = await generateTranscript(filename);
        transcriptionLoading(false);
        if (resp.response == "OK") {
            const { response, uuid } = resp.data;
            setTranscribe(response);
            setUuid(uuid);
            isTranscribeEnabled(true);
        }
    }

    const genNotes = async () => {
        isGeneratingNotes(true);
        const resp = await generateNotes(uuid);
        isGeneratingNotes(false);
        if (resp.status == "success") {
            setNotes(notes);
        }
    }

    return (

        <div className="flex">
            <div className="flex flex-1 flex-col gap-3 p-4 pt-0">
                {step == 1 ?
                    <div className="flex w-full">
                        <div className="w-[70%] p-4">
                            <h1 className="scroll-m-20 text-left text-2xl mb-4 font-extrabold tracking-tight text-balance">Select Audio Input Mode</h1>
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
                                                    {progressBar ? (<div className="w-full flex items-center justify-center gap-3"><Progress value={percent} className="w-[100%] [&>div]:bg-green-600" /> <span className="text-sm">{percent}%</span></div>) : ''}
                                                </div>
                                            </section>
                                        </CardContent>
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
                            </Tabs>
                        </div>

                        <div className="w-[30%] p-4">
                            <div className="pointBoxArea">
                                <h6>Helpful Tips for Live Recording</h6>
                                <ul>
                                    <li><strong><Check className="w-4 h-4" /> Find a quiet spot</strong> — reduce background sounds for better voice clarity.</li>
                                    <li><strong>Use a headset or dedicated mic if available</strong> — it helps improve transcription accuracy.</li>
                                    <li><strong>Have the patient’s case notes handy</strong> — this keeps your narration structured and complete.</li>
                                    <li><strong>Speak clearly and at a comfortable pace</strong> — no need to rush.</li>
                                    <li><strong>Silence phone alerts or page notifications</strong> during recording.</li>
                                    <li><strong>Pause briefly between sections</strong> (like symptoms, diagnosis, prescription) to improve clarity.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    : ''}

                {(step == 2 && !transcribeEnabled) ?
                    <div className="space-y-4 p-4">
                        <h1 className="text-left text-2xl font-extrabold tracking-tight text-balance">Transcribe</h1>
                        <div className="flex space-x-2">
                            <div className="w-[80%] flex">
                                <CheckCircle color="green" size={24} />
                                <span className="px-2 text-lg font-extrabold">File Uploaded: <Badge className="fbrd p-1 px-3 border-1 text-black text-sm" variant="outline"><Music4 size={24} />{filename}</Badge></span>
                            </div>
                            <div className="w-[20%] text-right"><Select>
                                <Select value={"en"}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select Language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ar">Arabic</SelectItem>
                                        <SelectItem value="yue">Cantonese</SelectItem>
                                        <SelectItem value="prs">Dari</SelectItem>
                                        <SelectItem value="en">English</SelectItem>
                                        <SelectItem value="fa">Farsi (Persian)</SelectItem>
                                        <SelectItem value="fr">French</SelectItem>
                                        <SelectItem value="de">German</SelectItem>
                                        <SelectItem value="he">Hebrew</SelectItem>
                                        <SelectItem value="hi">Hindi</SelectItem>
                                        <SelectItem value="it">Italian</SelectItem>
                                        <SelectItem value="ko">Korean</SelectItem>
                                        <SelectItem value="zh">Mandarin</SelectItem>
                                        <SelectItem value="pt">Portuguese</SelectItem>
                                        <SelectItem value="pa">Punjabi</SelectItem>
                                        <SelectItem value="ru">Russian</SelectItem>
                                        <SelectItem value="so">Somali</SelectItem>
                                        <SelectItem value="es">Spanish</SelectItem>
                                        <SelectItem value="tl">Tagalog</SelectItem>
                                        <SelectItem value="ta">Tamil</SelectItem>
                                        <SelectItem value="ur">Urdu</SelectItem>
                                    </SelectContent>
                                </Select>
                            </Select></div>
                        </div>
                        <div>
                            <Button onClick={() => generateTranscription(filename)} disabled={transcription}>
                                <FileText color="white" size={24} />{transcription ? "Generating..." : "Generate Transcription"}
                            </Button>
                        </div>
                    </div>
                    : ''}

                {transcribeEnabled ?
                    <>
                        <div className="grid grid-cols-2 gap-4 mt-5 ml-5">
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
                        </div>
                    </>
                    : ''}
            </div>
        </div >
    );
};