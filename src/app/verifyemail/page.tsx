"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";


export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', {token})
            setVerified(true);
        } catch (error:any) {
            setError(true);
            console.log(error.reponse.data);
            
        }

    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);


    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return(
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">

            <h1 className="text-4xl font-bold mb-4">Verify Email</h1>
            <h2 className="text-lg mb-8">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div className="text-green-600">
                    <h2 className="text-xl mb-4">Email Verified</h2>
                    <Link href="/login">
                        <a className="text-indigo-500 hover:text-indigo-700">Login</a>
                    </Link>
                </div>
            )}
            {error && (
                <div className="text-red-600">
                    <h2 className="text-xl mb-4">Error</h2>
                    <p className="mb-4">There was an error verifying your email.</p>
                    <p>Please check your email or contact support.</p>
                </div>
            )}
        </div>
    )

}