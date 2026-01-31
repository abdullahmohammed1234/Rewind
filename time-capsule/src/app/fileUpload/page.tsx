'use client';

import { useState } from 'react';
import { NostalgiaBackground } from '@/components/features/nostalgia-background';
import { AnimatedSection } from '@/components/features/animated-section';
import { storage, db } from '@/lib/firebaseConfig'; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

export default function FileUploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select a relic.");
    
    setUploading(true);
    const storageRef = ref(storage, `relics/${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => { console.error(error); setUploading(false); },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        
        // Save to Firestore
        await addDoc(collection(db, "capsules"), {
          imageUrl: downloadURL,
          message: message,
          createdAt: new Date()
        });

        setIsSuccess(true);
        setUploading(false);
      }
    );
  };

  return (
    <NostalgiaBackground showFloatingYears>
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#fdfaf3]">
        <AnimatedSection className="w-full max-w-2xl">
          {/* Gradient Border Wrapper */}
          <div className="p-[2px] rounded-[40px] bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 shadow-2xl">
            <div className="bg-[#fffcf7] rounded-[38px] p-12 text-center shadow-inner">
              
              <h1 className="text-5xl font-bold text-[#2d2d2d] mb-2 tracking-tight underline decoration-orange-300 underline-offset-8">
                Preserve a Relic
              </h1>
              
              <div className="text-4xl my-6">📼</div>

              <div className="space-y-6 text-left max-w-md mx-auto">
                <div className="flex items-baseline gap-4">
                  <label className="text-gray-600 font-medium min-w-[100px]">File input:</label>
                  <input 
                    type="file" 
                    onChange={(e) => setFile(e.target.files[0])}
                    className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-gray-600 font-medium">Message:</label>
                  <input 
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe this moment..."
                    className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:ring-2 focus:ring-orange-200 outline-none transition"
                  />
                </div>
              </div>

              <button 
                onClick={handleUpload}
                disabled={uploading}
                className="mt-10 px-10 py-3 bg-[#4ca1a3] text-white rounded-full font-bold text-lg hover:bg-[#3d8b8d] transition-all transform hover:scale-105 disabled:bg-gray-300 shadow-lg"
              >
                {uploading ? `TRANSMITTING ${Math.round(progress)}%` : "SEND TO THE FUTURE"}
              </button>

              {/* Progress Bar */}
              {uploading && (
                <div className="w-full bg-gray-200 h-2 mt-8 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-orange-400 to-pink-500 h-full transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}

              {isSuccess && (
                <div className="mt-8 flex items-center justify-center gap-3 animate-bounce">
                  <div className="w-12 h-12 rounded-lg border-2 border-orange-400 overflow-hidden">
                    <img src="/api/placeholder/48/48" alt="Relic" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[#4ca1a3] font-bold text-xl">Relic preserved successfully!</p>
                </div>
              )}

            </div>
          </div>
        </AnimatedSection>
      </div>
    </NostalgiaBackground>
  );
}