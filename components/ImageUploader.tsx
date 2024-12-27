'use client';

import {UploadCloud, Link as LinkIcon} from 'lucide-react';
import {useState} from 'react';

interface ImageUploaderProps
{
    onImageSelect: (imageUrl: string) => void;
}

export default function ImageUploader({onImageSelect}: ImageUploaderProps)
{
    const [urlInput, setUrlInput] = useState('');

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        const file = e.target.files?.[0];
        if (file)
        {
            const imageUrl = URL.createObjectURL(file);
            onImageSelect(imageUrl);
        }
    };

    const handleUrlSubmit = (e: React.FormEvent) =>
    {
        e.preventDefault();
        if (urlInput.trim())
        {
            onImageSelect(urlInput);
        }
    };

    return (
        <div className="w-full flex flex-col max-w-md space-y-4 items-center">
            {/* File Upload */}
            <div className="flex flex-row items-center">
                <label
                    htmlFor="file-upload"
                    className="flex active:bg-green-700 items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                    <UploadCloud className="w-5 h-5 text-gray-500"/>
                    <span className="text-sm text-gray-700">Upload Photo</span>
                </label>
                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                />
            </div>

            <p className="text-gray-500 text-center max-w-md">
                — Or —
            </p>

            {/* URL Input */}
            <form onSubmit={handleUrlSubmit} className="flex gap-2">
                <div className="relative flex-1">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
                    <input
                        type="url"
                        placeholder="Paste image URL"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm hover:bg-emerald-600 transition-colors"
                >
                    Add
                </button>
            </form>
            <p className="text-gray-500 text-sm "><strong>NOTE</strong> • Please use a square aspect image.</p>
        </div>
    );
}