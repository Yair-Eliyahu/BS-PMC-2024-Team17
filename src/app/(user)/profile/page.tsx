import React from 'react';
import ProfilePage from './profile';
import { auth } from '@/auth';
import { getUser } from '@/auth/server';


const Page = async () => {

  const session = await auth();
  const regsession = await getUser();


  if (!session && !regsession) {
    return (
      <div className="flex items-center justify-center text-white min-h-screen">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl text-center">
          <h1 className="text-3xl font-bold">You are not logged in</h1>
          <p className="text-md text-gray-400 mt-4">Please log in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center text-white min-h-screen">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl items-center mr-20 ml-20">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome to Your Profile</h1>
          <h2 className="text-xl font-semibold mt-2">{!regsession ? session?.user?.name : regsession?.email}</h2>
          <p className="text-md text-gray-400">{session?.user?.email}</p>
        </div>
        <ProfilePage />
      </div>
    </div>
  );
};

export default Page;
