'use client'
import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from 'react-dropzone'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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

import { Folder, Mic, MicOff, CheckCircle, FileText, User, Music4, UserPlus } from "lucide-react";

import { audioRecorder } from './audioRecorder';

export default function Session() {

    const { startRecording, stopRecording, isRecording, step, loader, uploadFile } = audioRecorder();

    // Define the onDrop callback for when files are dropped
    const onDrop = (acceptedFiles: any) => {
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

        < div >
            <div className="flex flex-1 flex-col gap-3 p-4 pt-0">
                <div className="flex w-full flex-col">
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
                                                        <p>Drop the file here ...</p> :
                                                        <p>Drag 'n' drop file here, or click to select file</p>
                                                }</div>
                                            </div>
                                        </div>
                                    </section>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="liveRecording">
                            <Card>
                                <CardContent className="grid gap-6">
                                    <section className="container">
                                        {!isRecording ? <Button className="" onClick={startRecording}><Mic size={24} /> Start Live Recording</Button> : ''}
                                        {isRecording ? <Button className="" onClick={stopRecording}><MicOff size={24} /> Stop Recording</Button> : ''}
                                    </section>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center space-x-2 fu">
                        <CheckCircle color="green" size={24} />
                        <span className="text-lg font-extrabold">File Uploaded: <Badge className="fbrd p-1 px-3 border-1 text-black text-sm" variant="outline"><Music4 size={24} />dioeonsdsdkjflsfdabc.mp3</Badge></span>
                    </div>
                    <div>
                        <Button type="submit">
                            <FileText color="white" size={24} />Generate Transcription
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-5">
                    <div className="mt-1">
                        <div className="mb-3">
                            <h3 className="text-xl font-semibold mb-1">Transcript</h3>
                            <Textarea className="w-full h-24 p-3 border border-gray-300 rounded-md" placeholder="Transcript" />
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
                <div className="space-y-4">
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
            </div>
        </div >
    );
};