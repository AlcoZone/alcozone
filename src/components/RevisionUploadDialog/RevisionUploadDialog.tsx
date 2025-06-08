"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadCloud, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { validateCSV } from "@/utils/validateCSV";

export function RevisionUploadDialog({
                                         open,
                                         onOpenChange,
                                         onSubmit
                                     }: {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    onSubmit: (data: { revisionName: string; file: File }) => void;
}) {
    const [revisionName, setRevisionName] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [validating, setValidating] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const handleFileChange = async (f: File) => {
        setFile(f);
        setValidating(true);

        const text = await f.text();
        const result = validateCSV(text);

        if (result.valid) {
            toast.success("Archivo CSV válido");
            setIsValid(true);
        } else {
            result.errors.forEach((err) => toast.error(err));
            setIsValid(false);
        }

        setValidating(false);
    };

    const handleSubmit = async () => {
        if (!file || !isValid) return;
        setValidating(true);

        try {
            onSubmit({revisionName, file});
            toast.success(`Archivo "${file.name}" subido correctamente!`);
            onOpenChange(false);
        } catch (err) {
            toast.error("Error al subir el archivo");
        } finally {
            setValidating(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Crear Nueva Revisión</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div>
                        <Label htmlFor="revision-name">Nombre de Revisión</Label>
                        <Input
                            id="revision-name"
                            value={revisionName}
                            onChange={(e) => setRevisionName(e.target.value)}
                            placeholder="Ej. Choques Marzo 2025"
                        />
                    </div>

                    <div>
                        <Label>Carga tu archivo en formato CSV</Label>
                        <label
                            htmlFor="file-upload"
                            className={`mt-2 flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 p-6 rounded cursor-pointer hover:bg-gray-100 ${
                                validating ? "opacity-50 pointer-events-none" : ""
                            }`}
                        >
                            {validating ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
                                    <span className="text-gray-600">Validando archivo...</span>
                                </>
                            ) : (
                                <>
                                    <UploadCloud className="w-6 h-6 text-gray-600" />
                                    <span className="text-gray-600">
                    {file ? file.name : "Carga tu archivo en formato CSV"}
                  </span>
                                </>
                            )}
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            accept=".csv"
                            className="hidden"
                            disabled={validating}
                            onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) handleFileChange(f);
                            }}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        onClick={handleSubmit}
                        disabled={!revisionName || !file || !isValid || validating}
                    >
                        Crear Revisión
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
