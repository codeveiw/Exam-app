import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CloudUpload, FileImage } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  diplomaSchema,
  type DiplomaFormValues,
} from "../form/schema/diplomaSchema";

interface DiplomaFormProps {
  defaultValues?: DiplomaFormValues;
  onSubmit: (values: DiplomaFormValues) => void;
  formId?: string;
}

export default function DiplomaForm({
  defaultValues,
  onSubmit,
  formId,
}: DiplomaFormProps) {
  const form = useForm<DiplomaFormValues>({
    resolver: zodResolver(diplomaSchema),

    defaultValues: {
      title: defaultValues?.title ?? "",
      description: defaultValues?.description ?? "",
      image: defaultValues?.image ?? "",
    },
  });

  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5"
    >
   
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Image
        </label>

        <div className="flex items-start gap-4">
          <div className="flex-1">
        
            <input type="hidden" {...form.register("image")} />

            <label className="relative flex w-full cursor-pointer items-center rounded-sm border border-gray-200 bg-white px-6 py-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <FileImage className="h-8 w-8 text-gray-200" strokeWidth={1} />
              </div>

              <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2">
                <CloudUpload className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
                <span className="text-sm text-gray-500 font-medium">
                  Drop an image here or <span className="text-blue-500">select from your computer</span>
                </span>
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    form.setValue("image", file as any, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }
                }}
              />
            </label>
          </div>
          {form.watch("image") && (
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-sm border border-gray-200 bg-gray-50/50 p-1 shadow-sm">
              <img
                src={typeof form.watch("image") === "string" ? form.watch("image") : URL.createObjectURL(form.watch("image") as any)}
                alt="Preview"
                className="h-full w-full rounded-sm object-cover"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </div>
          )}
        </div>

        {form.formState.errors.image && (
          <p className="text-sm text-red-500">
            {form.formState.errors.image.message as string}
          </p>
        )}
      </div>

   
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Title
        </label>

        <Input
          type="text"
          placeholder="Diploma title"
          {...form.register("title")}
        />

        {form.formState.errors.title && (
          <p className="text-sm text-red-500">
            {form.formState.errors.title.message}
          </p>
        )}
      </div>


      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Description
        </label>

        <Textarea
          placeholder="Diploma description"
          className="min-h-[140px] resize-none"
          {...form.register("description")}
        />

        {form.formState.errors.description && (
          <p className="text-sm text-red-500">
            {form.formState.errors.description.message}
          </p>
        )}
      </div>

    
    </form>
  );
}