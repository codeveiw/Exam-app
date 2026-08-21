import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    examSchema,
    type ExamFormValues,
} from "../forms/schema/examSchema";

interface ExamFormProps {
    formId: string;
    defaultValues?: ExamFormValues;
    onSubmit: (values: ExamFormValues) => void;
    diplomas: { id: string; title: string }[];
}

export default function ExamForm({
    formId,
    defaultValues,
    onSubmit,
    diplomas,
}: ExamFormProps) {
    const form = useForm<ExamFormValues>({
        resolver: zodResolver(examSchema) as any,
        defaultValues: {
            title: defaultValues?.title ?? "",
            description: defaultValues?.description ?? "",
            image: defaultValues?.image ?? undefined,
            duration: defaultValues?.duration ?? 20,
            diplomaId: defaultValues?.diplomaId ?? "",
        },
    });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const imageValue = form.watch("image");

    
    useEffect(() => {
        if (defaultValues) {
            form.reset({
                title: defaultValues.title ?? "",
                description: defaultValues.description ?? "",
                image: defaultValues.image ?? undefined,
                duration: defaultValues.duration ?? 20,
                diplomaId: defaultValues.diplomaId ?? "",
            });
        }
    }, [defaultValues]); 

   
    useEffect(() => {
        if (imageValue instanceof File) {
            const url = URL.createObjectURL(imageValue);
            setImagePreview(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setImagePreview(null);
        }
    }, [imageValue]);

    const displayImage =
        imagePreview ??
        (typeof imageValue === "string" && imageValue ? imageValue : null);

    const fileName =
        imageValue instanceof File
            ? imageValue.name
            : typeof imageValue === "string" && imageValue
                ? imageValue.split("/").pop() ?? "image"
                : null;

    const fileSize =
        imageValue instanceof File
            ? `${(imageValue.size / (1024 * 1024)).toFixed(2)} MB`
            : null;

    return (
        <form
            id={formId}
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-5 p-6"
        >
           
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Title</label>
                <Input
                    {...form.register("title")}
                    className="h-[46px] rounded-none border border-gray-200 outline-none focus-visible:ring-0"
                    placeholder="Enter exam title"
                />
                {form.formState.errors.title && (
                    <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
                )}
            </div>

      
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Diploma</label>
                <Select
                    value={form.watch("diplomaId")}
                    onValueChange={(val) => form.setValue("diplomaId", val, { shouldValidate: true })}
                >
                    <SelectTrigger className="h-[46px] rounded-none border border-gray-200 focus:ring-0">
                        <SelectValue placeholder="Select diploma" />
                    </SelectTrigger>
                    <SelectContent>
                        {diplomas.map((d) => (
                            <SelectItem key={d.id} value={d.id}>
                                {d.title}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {form.formState.errors.diplomaId && (
                    <p className="text-sm text-red-500">{form.formState.errors.diplomaId.message}</p>
                )}
            </div>

           
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Image</label>
                <div className="flex min-h-[100px] items-center gap-3 border border-gray-200 p-3">
                   
                    {displayImage ? (
                        <img
                            src={displayImage}
                            alt="Exam"
                            className="h-[70px] w-[90px] flex-shrink-0 rounded object-cover"
                        />
                    ) : (
                        <div className="flex h-[70px] w-[90px] flex-shrink-0 items-center justify-center rounded bg-gray-100 text-xs text-gray-400">
                            No image
                        </div>
                    )}

                    <div className="flex flex-1 flex-col gap-1 overflow-hidden">
                        {fileName && (
                            <p className="truncate text-xs font-medium text-gray-700">
                                {fileName}
                                {fileSize && <span className="ml-2 text-gray-400">{fileSize}</span>}
                            </p>
                        )}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/gif,image/webp"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    form.setValue("image", file as any, { shouldValidate: true });
                                }
                            }}
                        />
                        <button
                            type="button"
                            className="text-left text-xs text-blue-500 hover:underline"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {fileName ? "Change image" : "Choose image…"}
                        </button>
                        <p className="text-xs text-gray-400">JPEG, PNG, GIF or WEBP — max 5 MB</p>
                    </div>

            
                    <div className="flex flex-shrink-0 items-center gap-2">
                        {typeof imageValue === "string" && imageValue && (
                            <a
                                href={imageValue}
                                target="_blank"
                                rel="noreferrer"
                                className="text-gray-400 hover:text-blue-600"
                                title="Download"
                            >
                                <Download className="h-4 w-4" />
                            </a>
                        )}
                        {imageValue && (
                            <button
                                type="button"
                                className="text-red-400 hover:text-red-600"
                                title="Remove image"
                                onClick={() => {
                                    form.setValue("image", undefined as any, { shouldValidate: true });
                                    setImagePreview(null);
                                    if (fileInputRef.current) fileInputRef.current.value = "";
                                }}
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>
                {form.formState.errors.image && (
                    <p className="text-sm text-red-500">{form.formState.errors.image.message as string}</p>
                )}
            </div>

       
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <Textarea
                    {...form.register("description")}
                    className="min-h-[100px] resize-none rounded-none border border-gray-200 outline-none focus-visible:ring-0"
                    placeholder="Enter exam description"
                />
                {form.formState.errors.description && (
                    <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
                )}
            </div>

        
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Duration (min)</label>
                <Input
                    type="number"
                    min={1}
                    {...form.register("duration", { valueAsNumber: true })}
                    className="h-[46px] rounded-none border border-gray-200 outline-none focus-visible:ring-0"
                    placeholder="20"
                />
                {form.formState.errors.duration && (
                    <p className="text-sm text-red-500">{form.formState.errors.duration.message}</p>
                )}
            </div>

            <div />
        </form>
    );
}
