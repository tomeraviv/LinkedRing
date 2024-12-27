'use client';

import {useState} from 'react';
import ProfileImage from './ProfileImage';
import ImageUploader from './ImageUploader';

export default function ProfileEditor()
{
    const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80");

    return (
        <div className="flex flex-col items-center p-4 gap-6">
            <h1 className="text-3xl text-green-700 font-bold text-gray-900">LinkedIn Profile Photo Maker</h1>
            <h3 className="text-green-700">
                <h3 className="bg-gradient-to-r from-green-800 via-green-700 to-teal-600 inline-block text-transparent bg-clip-text">
                    Got a profile pic? Add a ring to it. Boom, now you’re interesting. ✨
                </h3>
            </h3>
            <ImageUploader onImageSelect={setImageUrl}/>
            <ProfileImage imageUrl={imageUrl}/>
        </div>
    );
}