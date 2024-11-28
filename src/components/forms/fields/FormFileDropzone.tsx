import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { Control, useController } from "react-hook-form";

interface FormFileDropzoneProps {
  name: string;
  control: Control<any>;
  label: string;
  multiple?: boolean;
}

const FormFileDropzone: React.FC<FormFileDropzoneProps> = ({
  name,
  control,
  label,
  multiple = false,
}) => {
  const {
    field: { value = [], onChange },
    fieldState: { error },
  } = useController({ name, control });

  const onDrop = (acceptedFiles: File[]) => {
    if (multiple) {
      onChange([...(value as File[]), ...acceptedFiles]);
    } else {
      onChange(acceptedFiles[0]);
    }
  };

  const removeFile = (index: number) => {
    if (multiple) {
      const newFiles = [...(value as File[])];
      newFiles.splice(index, 1);
      onChange(newFiles);
    } else {
      onChange(undefined);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    accept: { "image/*": [] },
  });

  const isValidFile = (file: any): file is File => file instanceof File;

  return (
    <div className="space-y-2">
      <Label className="block text-sm font-medium text-muted-foreground">
        {label}
      </Label>
      <div
        {...getRootProps()}
        className={`border-dashed border-2 px-4 h-9 flex w-full items-center rounded-md ${
          isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-300"
        }`}
      >
        <Input {...getInputProps()} />
        <p className="text-sm text-gray-500">
          {isDragActive
            ? "Drop the files here..."
            : "Drag & drop files here, or click to select"}
        </p>
      </div>

      {/* Display selected files */}

      <div className="mt-4 flex flex-wrap gap-4">
        {multiple
          ? (value as File[]).map((file, index) =>
              isValidFile(file) ? (
                <div
                  key={index}
                  className="relative group w-20 h-20 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center"
                >
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : null
            )
          : isValidFile(value) && (
              <div className="relative group w-20 h-20 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                <Image
                  src={URL.createObjectURL(value as File)}
                  alt={(value as File).name}
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeFile(0)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
      </div>

      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default FormFileDropzone;
