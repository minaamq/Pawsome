"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function UserInfo() {
    const { data: session } = useSession();

    return (
        <div className="absolute mt-0 bg-yellow-100 border rounded-lg shadow-lg p-2 w-64 max-h-60 overflow-y-auto z-20">
            <div>
                Name: <span className="font-bold">{session?.user?.name}</span>
            </div>
            <div>
                Email: <span className="font-bold">{session?.user?.email}</span>
            </div>
            <button
                onClick={() => {
                   signOut()
                    alert("You have signed out!");
                }}
                className="bg-red-500 hover:bg-red-700 text-white p-2 w-full rounded-md mt-4"
            >
                Sign Out
            </button>
        </div>
    );
}