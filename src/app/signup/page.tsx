"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from 'react-hot-toast';




export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
            
        } catch (error:any) {
            console.log("Signup failed", error.message);
            
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray">
            <div className="flex flex-col">
            <h1 className="text-center">{loading? "Processig": "Signup"}</h1>
            <label htmlFor="username" className="mt-2">Username</label>
            <input
                className="px-3 py-2  border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="username"
            />

            <label htmlFor="email" className="mt-2">Email</label>
            <input
                className="px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="name@example.com"
            />

            <label htmlFor="password" className="mt-2">Password</label>
            <input
                className="px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-b-md mt-4 focus:outline-none focus:shadow-outline" onClick={onSignup} >{buttonDisabled? "No SignUp" : "SignUp"}</button>
            <Link href="./login" className="text-indigo-500 hover:text-indigo-700 mt-1"><span className="text-gray-500 text-sm font-medium ml-4">Existing users:</span> sign in </Link>
            </div>
        </div> 
    )
}

