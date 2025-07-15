'use client'
import React from "react";
import { useDropzone, FileWithPath } from 'react-dropzone'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

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

export default function Session() {

    const { startRecording, stopRecording, isRecording, step, uploadFile, percent, progressBar, filename, formatTime, seconds } = useAudioRecorder();

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

                {step == 2 ?
                    <div className="space-y-4 p-4">
                        <h1 className="text-left text-2xl font-extrabold tracking-tight text-balance">Transcribe</h1>
                        <div className="flex space-x-2">
                            <div className="w-[65%] flex">
                                <CheckCircle color="green" size={24} />
                                <span className="px-2 text-lg font-extrabold">File Uploaded: <Badge className="fbrd p-1 px-3 border-1 text-black text-sm" variant="outline"><Music4 size={24} />{filename}</Badge></span>
                            </div>
                            <div className="w-[35%] text-right"><Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">English</SelectItem>
                                    <SelectItem value="dark">French</SelectItem>
                                    <SelectItem value="system">German</SelectItem>
                                </SelectContent>
                            </Select></div>
                        </div>
                        <div>
                            <Button type="submit">
                                <FileText color="white" size={24} />Generate Transcription
                            </Button>
                        </div>
                    </div>
                    : ''}

                {step == 2 ?
                    <>
                        <div className="grid grid-cols-2 gap-4 mt-5 ml-5">
                            <div className="mt-1">
                                <div className="mb-3">
                                    <h3 className="text-xl font-semibold mb-1">Transcript</h3>
                                    <Textarea className="w-full h-48 p-3 border border-gray-300 rounded-md" placeholder="Transcript" />
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
                                        <Button className="ml-4">
                                            <FileText color="white" size={24} /> Verify and Generate Notes
                                        </Button>
                                    </h3>
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
                                            <form className="space-y-4">
                                                <div>
                                                    <Input
                                                        placeholder="Search Patient by Name, Contact Number..."
                                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>
                                                <div className="flex items-center justify-center m-5 space-x-4 w-[95%]">
                                                    <div className="flex-grow border-t border-dashed border-gray-400"></div>
                                                    <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white text-sm font-semibold">
                                                        OR
                                                    </div>
                                                    <div className="flex-grow border-t border-dashed border-gray-400"></div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Input
                                                        className="flex-1 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                        placeholder="Patient Name"
                                                    />
                                                    <Input
                                                        className="flex-1 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                        placeholder="Personal Health Number"
                                                    />
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        className="w-20 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                        placeholder="Age"
                                                    />
                                                    <Input
                                                        className="flex-1 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                        placeholder="Contact Number"
                                                    />
                                                    <Select>
                                                        <SelectTrigger className="w-[100px]">
                                                            <SelectValue placeholder="Gender" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="light">Male</SelectItem>
                                                            <SelectItem value="dark">Female</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </form>
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