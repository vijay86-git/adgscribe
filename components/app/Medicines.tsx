"use client";
import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


import { CirclePlus, CircleMinus } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { Medicine } from "@/components/app/Types"

interface MedicationsTableProps {
  medications: Medicine[];
  setMedications: Dispatch<SetStateAction<Medicine[]>>;
}

const add = (setMedications: Dispatch<SetStateAction<Medicine[]>>) => {
      const emptyRow: Medicine = { name: "", timing: "", dosage: "",duration: "",frequency: "" };
      setMedications((prev) => [...prev, { ...emptyRow }]);
}

const removeRow = (index: number, setMedications: Dispatch<SetStateAction<Medicine[]>>) => {
      setMedications((prev) => prev.filter((_, i) => i !== index));
};

export default function Medicines({ medications, setMedications }: MedicationsTableProps) {

    /*const medications = [
        { name: "amlodipine", dosage: "10mg", frequency: "once daily" },
        { name: "aspirin", dosage: "81mg", frequency: "once daily" },
        { name: "statin", dosage: "", frequency: "" },
        { name: "gastroprotective medicine", dosage: "", frequency: "" },
      ];
      */


    return (
                <div className="overflow-x-auto border border-gray-200 rounded-md my-5">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-extrabold text-[#0a848e]">Name</TableHead>
                        <TableHead className="font-extrabold text-[#0a848e]">Timing</TableHead>
                        <TableHead className="font-extrabold text-[#0a848e]">Dosage</TableHead>
                        <TableHead className="font-extrabold text-[#0a848e]">Duration</TableHead>
                        <TableHead className="font-extrabold text-[#0a848e]">Frequency</TableHead>
                        <TableHead className="font-extrabold text-[#0a848e]">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {medications.map((med, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Input defaultValue={med.name} onChange={(e) => {
                                                                              const updated = [...medications];
                                                                              updated[index].name = e.target.value;
                                                                              setMedications(updated);
                                                                            }} />
                          </TableCell>
                          <TableCell>
                            <Select value={med.timing} onValueChange={(value) => {
                                                                                   const updated = [...medications];
                                                                                   updated[index].timing = value;
                                                                                   setMedications(updated);
                                                                                }}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="before meals">before meals</SelectItem>
                                <SelectItem value="after meals">after meals</SelectItem>
                                <SelectItem value="with meals">with meals</SelectItem>
                                <SelectItem value="during meal">during meal</SelectItem>
                                <SelectItem value="at bedtime">at bedtime</SelectItem>
                                <SelectItem value="in the morning">in the morning</SelectItem>
                                <SelectItem value="in the evening">in the evening</SelectItem>
                                <SelectItem value="at night">at night</SelectItem>
                                <SelectItem value="on empty stomach">on empty stomach</SelectItem>
                                <SelectItem value="with water">with water</SelectItem>
                                <SelectItem value="with milk">with milk</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Input defaultValue={med.dosage} onChange={(e) => {
                                                                                            const updated = [...medications];
                                                                                            updated[index].dosage = e.target.value;
                                                                                            setMedications(updated);
                                                                                  }} />
                          </TableCell>
                          <TableCell>
                            <Input defaultValue={med.duration} placeholder="Duration" onChange={(e) => {
                                                                                            const updated = [...medications];
                                                                                            updated[index].duration = e.target.value;
                                                                                            setMedications(updated);
                                                                                        }} />
                          </TableCell>
                          <TableCell>
                            <Select value={med.frequency} onValueChange={(value) => {
                                                                                        const updated = [...medications];
                                                                                        updated[index].frequency = value;
                                                                                        setMedications(updated);
                                                                                    }}>
                              <SelectTrigger>
                                <SelectValue placeholder={med.frequency || "Select"} />
                              </SelectTrigger>
                              <SelectContent>
                                    <SelectItem value="once daily" selected="">once daily</SelectItem>
                                    <SelectItem value="twice daily">twice daily</SelectItem>
                                    <SelectItem value="thrice daily">thrice daily</SelectItem>
                                    <SelectItem value="four times daily">four times daily</SelectItem>
                                    <SelectItem value="every other day">every other day</SelectItem>
                                    <SelectItem value="once weekly">once weekly</SelectItem>
                                    <SelectItem value="twice weekly">twice weekly</SelectItem>
                                    <SelectItem value="once monthly">once monthly</SelectItem>
                                    <SelectItem value="every 4 hours">every 4 hours</SelectItem>
                                    <SelectItem value="every 6 hours">every 6 hours</SelectItem>
                                    <SelectItem value="every 8 hours">every 8 hours</SelectItem>
                                    <SelectItem value="every 12 hours">every 12 hours</SelectItem>
                                    <SelectItem value="as needed">as needed</SelectItem>
                                    <SelectItem value="immediately (start)">immediately (start)</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            {index === 0 ? (
                              <Button variant="ghost" size="icon" onClick={() => add(setMedications)}>
                                <CirclePlus className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button variant="ghost" size="icon" onClick={() => removeRow(index, setMedications)}>
                                <CircleMinus className="h-4 w-4" />
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
        )
}