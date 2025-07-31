'use client'
import React, { useState } from "react";
import { useDropzone, FileWithPath } from 'react-dropzone'
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Patient from "@/components/app/Patient";
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
    TableCaption,
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

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Search, Smartphone, IdCard, Folder, Loader2, Info, Mic, MicOff, CheckCircle, FileText, User, Music4, UserPlus, Timer, AudioLines, Check } from "lucide-react";

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
            <div className="flex flex-1 flex-col gap-3 pt-0">

                <div className="flex items-center justify-center w-full bg-red-100 border border-red-200 text-red-800 rounded-full px-4 py-2">
                    <span className="text-md flex"><User /><label className="pl-2">Please map the patient with this session to continue !</label></span>
                    <button className="ml-4 flex items-center tracking-wide gap-2 bg-gray-800 text-white text-md font-bold px-4 py-2 rounded-full shadow">
                        <Search /> Search or Add Patient
                    </button>
                </div>

                <div className="flex mt-3 border border-dashed border-gray-300 rounded-lg p-4 items-center justify-between space-x-4 w-full bg-white shadow-sm">

                    <div className="flex bg-stone-100 border-dashed border-2 border-neutral-400 rounded-sm p-2 items-center space-x-2 flex-1 pl-2">
                        <div className="text-neural-300 flex items-center">
                            <User />
                        </div>
                        <div className="flex flex-col justify-center">
                            <p className="text-sm text-gray-500">Patient Name</p>
                            <p className="text-lg font-semibold">Alex</p>
                        </div>
                    </div>

                    <div className="flex bg-stone-100 border-dashed border-2 border-neutral-400 rounded-sm p-2 items-center space-x-2 flex-1">
                        <div className="text-neural-300 flex items-center pl-2">
                            <IdCard />                        </div>
                        <div className="flex flex-col justify-center">
                            <p className="text-sm text-gray-500">Personal Health Number</p>
                            <p className="text-lg font-semibold">JSHYBDGAG365463</p>
                        </div>
                    </div>

                    <div className="flex bg-stone-100 border-dashed border-2 border-neutral-400 rounded-sm p-2 items-center space-x-2 flex-1">
                        <div className="text-neural-300 flex items-center pl-2">
                            <Smartphone />
                        </div>
                        <div className="flex flex-col justify-center">
                            <p className="text-sm text-gray-500">Contact Number</p>
                            <p className="text-lg font-semibold">9090898937</p>
                        </div>
                    </div>


                </div>

                <div className="my-5 flex items-center justify-center w-full max-w-3xl mx-auto">

                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-stone-600 text-white flex items-center justify-center font-semibold z-10"><Check /></div>
                        <div className="text-sm mt-2 font-bold">Upload/ Record</div>
                    </div>

                    <div className="flex-1 h-0.5 bg-stone-600"></div>

                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-semibold z-10">02</div>
                        <div className="text-sm mt-2">Transcription</div>
                    </div>

                    <div className="flex-1 h-0.5 bg-gray-300"></div>

                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-semibold z-10">03</div>
                        <div className="text-sm mt-2">Generate Notes</div>
                    </div>
                </div>


                <audio id="audioTag" style={{ width: "100%", display: "block" }} src="blob:https://adgscribe.companydemo.ca/a8642160-189d-4ae4-9a08-e0f249d68053">
                    Your browser does not support the audio tag.
                </audio>

                {step == 1 ?
                    <div className="flex w-full">
                        <div className="w-full p-4">
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

                            <div className="flex mt-5 border border-dashed border-gray-300 rounded-lg p-4 items-center justify-between space-x-4 w-full bg-white shadow-sm">

                                <div className="flex  bg-stone-100 border-dashed border-2 border-neutral-400 rounded-sm p-2 items-center space-x-2 flex-2 pl-2">
                                    <div className="text-neural-300 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-audio2-icon lucide-file-audio-2"><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v2" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><circle cx="3" cy="17" r="1" /><path d="M2 17v-3a4 4 0 0 1 8 0v3" /><circle cx="9" cy="17" r="1" /></svg>

                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <p className="text-sm text-gray-500">File Name</p>
                                        <p className="text-lg font-semibold">25ee31f616c44dfd87339f6f8bb80d7c.mp3</p>
                                    </div>
                                </div>

                                <div className="flex bg-stone-100 border-dashed border-2 border-neutral-400 rounded-sm p-2 items-center space-x-2 flex-1">
                                    <div className="text-neural-300 flex items-center pl-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-icon lucide-file"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <p className="text-sm text-gray-500">File size</p>
                                        <p className="text-lg font-semibold">0.002274 MB</p>
                                    </div>
                                </div>

                                <div className="flex bg-stone-100 border-dashed border-2 border-neutral-400  rounded-sm p-2 items-center space-x-2 flex-1">
                                    <div className="text-neural-300 flex items-center pl-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock9-icon lucide-clock-9"><path d="M12 6v6H8" /><circle cx="12" cy="12" r="10" /></svg>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <p className="text-sm text-gray-500">Duration</p>
                                        <p className="text-lg font-semibold">03:40</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex mt-5 border border-dashed border-gray-300 rounded-lg p-4 items-center justify-between space-x-4 w-full bg-white shadow-sm">

                                <div className="flex flex-3  bg-stone-100 border-dashed border-2 border-neutral-400 rounded-sm p-2 items-center space-x-2">
                                    <div className="text-neural-300 flex items-center">
                                        <Image src={`/images/countdown.gif`} width={40} height={40} alt={'/'} />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <p>Transcription will be generated automatically after 5 seconds, or click <b>Generate Transcription</b></p>
                                    </div>
                                </div>

                                <div className="rounded-sm items-center space-x-2 flex-1">
                                    <Select>
                                        <SelectTrigger className="w-full min-h-[3rem] py-4 text-gray-700">
                                            <SelectValue placeholder="Select Language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="en">English</SelectItem>
                                            <SelectItem value="fr">French</SelectItem>
                                            <SelectItem value="pa">Punjabi</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex flex-1 rounded-sm p-2 space-x-2">
                                    <Button className="ml-auto w-full h-10 tracking-wide text-md font-semibold">Generate Transcription</Button>
                                </div>
                            </div>

                            <div className="flex mt-5 border border-dashed border-gray-300 rounded-lg p-4 items-center justify-center w-full bg-white shadow-sm">
                                <div className="flex flex-col items-center justify-centerrounded-sm text-center space-y-3 w-full">
                                    <Loader2 className="h-8 w-8 animate-spin text-stone-600 " />
                                    <p className="text-md text-gray-700 font-semibold">
                                        Just a moment... Transcribing is in progress
                                    </p>
                                </div>
                            </div>

                            <div className="recArea mt-5 flex">
                                <div className="flex1">
                                    <Tabs defaultValue="account" className="w-full">
                                        <TabsList>
                                            <TabsTrigger value="account">Pa</TabsTrigger>
                                            <TabsTrigger value="password">En</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="account">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead className="w-[100px] font-semibold text-md tracking-wider">Original Transcription</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    <TableRow key={1}>
                                                        <TableCell className="font-medium">
                                                            <div className="flex flex-wrap items-start align-items-center gap-2">
                                                                <User className="w-6 h-6 shrink-0" />
                                                                <Image className="pt-1" src={`/images/audio_waves.gif`} width={60} height={20} alt={'/'} />
                                                                <span className="">Identifying...</span>
                                                                <span className="pl-1 break-words block">Shਤ੍ਸ੍ਯ ਕੋਮੁ Shਤ੍ਸ੍ਯ ਕੋਮੁ Shਤ੍ਸ੍ਯ ਕੋਮੁ Shਤ੍ਸ੍ਯ</span>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>

                                                    <TableRow key={2}>
                                                        <TableCell className="font-medium">
                                                            <div className="flex flex-wrap items-start align-items-center gap-2">
                                                                <User className="w-6 h-6 shrink-0" />
                                                                <Image className="pt-1" src={`/images/audio_waves.gif`} width={60} height={20} alt={'/'} />
                                                                <span className="">Identifying...</span>
                                                                <span className="pl-1 break-words block">Shਤ੍ਸ੍ਯ ਕੋਮੁ Shਤ੍ਸ੍ਯ ਕੋਮੁ Shਤ੍ਸ੍ਯ ਕੋਮੁ Shਤ੍ਸ੍ਯ</span>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>

                                                    <TableRow key={4}>
                                                        <TableCell className="font-medium">
                                                            <div className="flex flex-wrap items-start align-items-center gap-2">
                                                                <User className="w-6 h-6 shrink-0" />
                                                                <Image className="pt-1" src={`/images/audio_waves.gif`} width={60} height={20} alt={'/'} />
                                                                <span className="">Identifying...</span>
                                                                <span className="pl-1 break-words block">Shਤ੍ਸ੍ਯ ਕੋਮੁ Shਤ੍ਸ੍ਯ ਕੋਮੁ Shਤ੍ਸ੍ਯ ਕੋਮੁ Shਤ੍ਸ੍ਯ</span>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>

                                                    <TableRow key={5}>
                                                        <TableCell className="font-medium">
                                                            <div className="flex flex-wrap items-start align-items-center gap-2">
                                                                <User className="w-6 h-6 shrink-0" />
                                                                <Image className="pt-1" src={`/images/audio_waves.gif`} width={60} height={20} alt={'/'} />
                                                                <span className="">Identifying...</span>
                                                                <span className="pl-1 break-words block">Shਤ੍ਸ੍ਯ ਕੋਮੁ Shਤ੍ਸ੍ਯ ਕੋਮੁ Shਤ੍ਸ੍ਯ ਕੋਮੁ Shਤ੍ਸ੍ਯ</span>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>

                                                    <TableRow key={6}>
                                                        <TableCell className="font-medium">
                                                            <div className="flex flex-wrap items-start align-items-center gap-2">
                                                                <Badge variant="destructive" className="font-semibold">SPEAKER-01</Badge>
                                                                <span className="pl-1 break-words block">Shਤ੍ਸ੍ਯ ਕੋਮੁ Shਤ੍ਸ੍ਯ ਕੋਮੁ Shਤ੍ਸ੍ਯ ਕੋਮੁ Shਤ੍ਸ੍ਯ Shਤ੍ਸ੍ਯ ਕੋਮੁ Shਤ੍ਸ੍ਯ ਕੋਮੁ Shਤ੍ਸ੍ਯ ਕੋਮੁ Shਤ੍ਸ੍ਯ Shਤ੍ਸ੍ਯ ਕੋਮੁ Shਤ੍ਸ੍ਯ ਕੋਮੁ Shਤ੍ਸ੍ਯ ਕੋਮੁ Shਤ੍ਸ੍ਯ</span>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>


                                                    <TableRow key={7}>
                                                        <TableCell className="font-medium">
                                                            <div className="flex flex-wrap items-start align-items-center gap-2">
                                                                <Badge variant="destructive" className="font-semibold">SPEAKER-01</Badge>
                                                                <span className="pl-1 break-words block">Shਤ੍ਸ੍ਯ ਕੋਮੁ Shਤ੍ਸ੍ਯ ਕੋਮੁ Shਤ੍ਸ੍ਯ ਕੋਮੁ Shਤ੍ਸ੍ਯ</span>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>



                                                </TableBody>
                                            </Table>
                                        </TabsContent>
                                        <TabsContent value="password">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead className="w-[100px] font-semibold text-md tracking-wider">Original Transcription</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    <TableRow key={1}>
                                                        <TableCell className="font-medium">
                                                            <div className="flex flex-wrap items-start align-items-center gap-2">
                                                                <User className="w-6 h-6 shrink-0" />
                                                                <Image className="pt-1" src={`/images/audio_waves.gif`} width={60} height={60} alt={'/'} />
                                                                <span className="">Identifying...</span>
                                                                <span className="pl-1 break-words block">Lorem ipusm dolor</span>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>



                                                </TableBody>
                                            </Table>
                                        </TabsContent>
                                    </Tabs>
                                </div>
                                <div>
                                    <p>Generate Notes</p>
                                </div>

                            </div>


                        </div>
                    </div>
                    : ''
                }

                {
                    (step == 2 && !transcribeEnabled) ?
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
                        : ''
                }

                {
                    transcribeEnabled ?
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
                        : ''
                }
            </div >
        </div >
    );
};