"use client";
import React, { useState, useCallback } from "react";
import { UploadCloud, X, Loader2, Image as ImageIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";

const ImageUpload = ({ value, onChange, label }) => {
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      // --- YOUR CLOUDINARY CONFIG ---
      formData.append("upload_preset", "Blue Academy"); // Must match your Settings exactly
      const cloudName = "dexsr3yj6"; // From your screenshot

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();
        if (data.secure_url) {
          onChange(data.secure_url);
        } else {
          console.error("Upload Error:", data);
          alert("Upload failed. Check console.");
        }
      } catch (err) {
        console.error("Upload failed", err);
        alert("Image upload failed");
      } finally {
        setLoading(false);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-xs font-bold uppercase text-slate-500">
          {label}
        </label>
      )}

      {value ? (
        <div className="relative w-full h-32 overflow-hidden border rounded-xl border-slate-200 group bg-slate-50">
          <img
            src={value}
            alt="Uploaded"
            className="object-cover w-full h-full"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
            }}
            className="absolute p-1 text-white transition-opacity bg-red-500 rounded-full opacity-0 top-2 right-2 group-hover:opacity-100"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl h-32 flex flex-col items-center justify-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-slate-300 hover:border-blue-400 bg-slate-50"
          }`}
        >
          <input {...getInputProps()} />
          {loading ? (
            <Loader2 className="text-blue-500 animate-spin" />
          ) : (
            <>
              <UploadCloud
                className={`mb-2 ${
                  isDragActive ? "text-blue-500" : "text-slate-400"
                }`}
                size={24}
              />
              <p className="text-xs font-medium text-slate-500">
                {isDragActive ? "Drop image here..." : "Drag & Drop Image"}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
