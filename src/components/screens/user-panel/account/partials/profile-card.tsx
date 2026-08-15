import React from 'react'
import { Camera } from "lucide-react";

function ProfileCard() {
    return (
        <>
            <div className="bg-white p-6 rounded-md border shadow-lg text-center transition-all hover:drop-shadow-custom">
                <img
                    src="/Images/avatar_2.svg"
                    alt="Profile"
                    className="size-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h2 className="text-lg font-VazirBold text-neutral-07">سینا یوسفی</h2>
                <button className="mt-4 mx-auto font-VazirMedium text-sm flex items-center justify-center gap-2 border border-main text-neutral-04 cursor-pointer transition-all hover:text-white hover:bg-main hover:border-main px-6 py-2 rounded-md">
                    <Camera size={18} />
                    تغییر تصویر پروفایل
                </button>
            </div>
        </>
    )
}

export default ProfileCard


