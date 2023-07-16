"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  // 
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = (event: any) => {
    // Prevent the default form submit behavior
    // event.preventDefault();
    // Get the form data
    const { username, bio } = event.target.elements;

    // Submit the form data to the server

  };
  // 

  const handleLogout = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success('Logout successful')
      router.push('/login')
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message)
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me')
    console.log(res.data);
    setData(res.data.data._id)
}

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1> Profile</h1>
        <h2 className=" hover:bg-gray-300 text-black py-2 text-center border-r-8 ">{data === 'nothing' ? ' ' : <Link href={`/profile/${data}`}> {data} </Link>}</h2>

        {/*  */}

        <div className="flex items-center justify-center p-6">
          <img
            className="w-32 h-32 rounded-full mr-4"
            src="https://avatars.githubusercontent.com/u/101464442?v=4"
            alt="profile-photo"
          />
          <div>
            <h2 className="text-2xl font-bold">{username}</h2>
            <p className="text-gray-600">{bio}</p>
          </div>
        </div>

        {/*  handel submit code left */}
        <form onSubmit={handleSubmit} className="mt-8">
          <div>
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="border w-full py-2 px-3  border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="bio">
              Bio
            </label>
            <textarea
              className=" border w-full py-2 px-3  border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              id="bio"
              placeholder="Enter your bio"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
            ></textarea>
          </div>

          <div className="mt-1">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 w-full rounded-b-md focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save
            </button>
          </div>

          {/*  */}

          <div className="mt-5">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2  w-full rounded-b-md focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>

            <button
              className="bg-green-500 mt-3 hover:bg-green-600 text-white font-bold py-2 w-full rounded-b-md focus:outline-none focus:shadow-outline"
              type="button"
              onClick={getUserDetails}
            >

              Get user details
            </button>
          </div>
        </form>
        {/*  */}
      </div>
    </div>
  );
}

