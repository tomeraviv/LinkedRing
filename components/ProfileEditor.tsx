'use client';

import { useState } from 'react';
import ProfileImage from './ProfileImage';
import ImageUploader from './ImageUploader';

export default function ProfileEditor() {
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80");

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold text-gray-900">Profile Photo Editor</h1>
      <ProfileImage imageUrl={imageUrl} />
      <ImageUploader onImageSelect={setImageUrl} />
      <p className="text-gray-600 text-center max-w-md">
        Click and drag to adjust the photo position within the circle
      </p>
    </div>
  );
}