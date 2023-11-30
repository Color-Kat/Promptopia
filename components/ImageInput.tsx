'use client';

import React, {memo, FC, Dispatch, SetStateAction, useEffect} from 'react';
import {twJoin} from "tailwind-merge";
import {IPost, IPostForm} from "@/types/IPost";

interface ImageInputProps {
    data: IPostForm;
    setData: Dispatch<SetStateAction<IPostForm>>;
}

export const ImageInput: FC<ImageInputProps> = memo(({data, setData}) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    // drag state
    const [isDragActive, setIsDragActive] = React.useState(false);

    const handleClick = () => {
        inputRef.current?.click();
    };

    // Handle start drag events
    const handleDrag = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragActive(true);
        } else if (e.type === "dragleave") {
            setIsDragActive(false);
        }
    };

    // Triggers when file is dropped
    const handleDrop = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            // At least one file has been dropped
            setData(prev => ({
                ...prev,
                image: e.dataTransfer.files[0] // dataTransfer - for drag and drop
            }));
        }
    };

    // Triggers when file is selected with click
    const handleChange = (e: any) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            // At least one file has been selected
            setData(prev => ({
                ...prev,
                image: e.target.files[0]
            }));
        }
    };

    const [uploadedImage, setUploadedImage] = React.useState<string>();
    useEffect(() => {
        if(!data.image) return;
        if(typeof data.image == 'string')
            setUploadedImage(data.image);
        else
            setUploadedImage(URL.createObjectURL(data.image));
    }, [data.image]);

    return (
        <div
            className="flex items-center justify-center w-full"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            // onClick={handleClick}
        >
            <label
                htmlFor="dropzone-file"
                className={twJoin(
                    "relative flex flex-col items-center justify-center w-full h-64 cursor-pointer ",
                    "border-2 border-gray-300 border-dashed rounded-lg overflow-hidden",
                    "bg-gray-50 hover:bg-gray-100",
                    isDragActive && "bg-gray-100"
                )}
            >
                {uploadedImage && <img
                        className="absolute inset-0 w-full h-full object-cover"
                        src={uploadedImage}
                        alt=""
                    />
                }

                <div className={twJoin(
                    "flex flex-col items-center justify-center pt-5 pb-6 z-10 px-5 rounded-md",
                    uploadedImage ? "backdrop-blur-sm bg-white/30 text-white border border-gray-400 shadow-white/10 shadow-inner" : "text-gray-500"
                )}>
                    <svg className="w-8 h-8 mb-4" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm"><span
                        className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs">SVG, PNG, JPG or GIF</p>

                    <p className="text-base mt-5">{data.image?.name}</p>
                </div>
                <input
                    id="dropzone-file"
                    type="file"
                    accept="image/*"
                    className="hidden pointer-events-none"
                    ref={inputRef}
                    multiple={false}
                    onChange={handleChange}
                />
            </label>
        </div>

    );
});