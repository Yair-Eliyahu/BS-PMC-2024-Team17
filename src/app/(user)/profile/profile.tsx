"use client";

import { useState, useEffect } from 'react';
import Avatar from '@/components/ui/Avatar';
import AvatarGallery from '@/components/ui/AvatarGallery';
import { Pencil, Save } from 'lucide-react';
import { CountryDropdown } from 'react-country-region-selector';

const ProfilePage = () => {
  const [bio, setBio] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [countryName, setCountryName] = useState(''); // Store full country name
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(''); // Default avatar

  // Load state from local storage
  useEffect(() => {
    const storedBio = localStorage.getItem('bio');
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    const storedAddress = localStorage.getItem('address');
    const storedDateOfBirth = localStorage.getItem('dateOfBirth');
    const storedGender = localStorage.getItem('gender');
    const storedCountry = localStorage.getItem('country');
    const storedCountryName = localStorage.getItem('countryName');
    const storedAvatarUrl = localStorage.getItem('avatarUrl');

    if (storedBio) setBio(storedBio);
    if (storedPhoneNumber) setPhoneNumber(storedPhoneNumber);
    if (storedAddress) setAddress(storedAddress);
    if (storedDateOfBirth) setDateOfBirth(storedDateOfBirth);
    if (storedGender) setGender(storedGender);
    if (storedCountry) setCountry(storedCountry);
    if (storedCountryName) setCountryName(storedCountryName);
    if (storedAvatarUrl) setAvatarUrl(storedAvatarUrl);
  }, []);

  // Save state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('bio', bio);
    localStorage.setItem('phoneNumber', phoneNumber);
    localStorage.setItem('address', address);
    localStorage.setItem('dateOfBirth', dateOfBirth);
    localStorage.setItem('gender', gender);
    localStorage.setItem('country', country);
    localStorage.setItem('countryName', countryName);
    localStorage.setItem('avatarUrl', avatarUrl);
  }, [bio, phoneNumber, address, dateOfBirth, gender, country, countryName, avatarUrl]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const selectCountry = (val: string, fullCountryName: string) => {
    setCountry(val);
    setCountryName(fullCountryName);
  };

  return (
    <div className="space-y-6 text-center">
      <div className="flex flex-col items-center space-y-4">
        <Avatar src={avatarUrl} alt="Profile Avatar" size={100} />
        {isEditing && <AvatarGallery onSelect={setAvatarUrl} />}
      </div>
      <div className="space-y-4">
        <div className="bg-gray-700 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-white">Bio</h2>
          {isEditing ? (
            <textarea
              className="bg-gray-800 text-white p-2 rounded w-full mt-2"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          ) : (
            <p className="text-gray-300 mt-2">{bio}</p>
          )}
        </div>
        <div className="bg-gray-700 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-white">Phone Number</h2>
          {isEditing ? (
            <input
              className="bg-gray-800 text-white p-2 rounded w-full mt-2"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          ) : (
            <p className="text-gray-300 mt-2">{phoneNumber}</p>
          )}
        </div>
        <div className="bg-gray-700 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-white">Address</h2>
          {isEditing ? (
            <input
              className="bg-gray-800 text-white p-2 rounded w-full mt-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          ) : (
            <p className="text-gray-300 mt-2">{address}</p>
          )}
        </div>
        <div className="bg-gray-700 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-white">Date of Birth</h2>
          {isEditing ? (
            <input
              type="date"
              className="bg-gray-800 text-white p-2 rounded w-full mt-2"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          ) : (
            <p className="text-gray-300 mt-2">{dateOfBirth}</p>
          )}
        </div>
        <div className="bg-gray-700 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-white">Gender</h2>
          {isEditing ? (
            <select
              className="bg-gray-800 text-white p-2 rounded w-full mt-2"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          ) : (
            <p className="text-gray-300 mt-2">{gender}</p>
          )}
        </div>
        <div className="bg-gray-700 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-white">Country</h2>
          {isEditing ? (
            <CountryDropdown
              value={country}
              onChange={(val, e) => selectCountry(val, e.target.options[e.target.selectedIndex].text)}
              className="bg-gray-800 text-white p-2 rounded w-full mt-2"
              showDefaultOption={false}
              blacklist={['AQ']}
              defaultOptionLabel="Select a country"
              valueType="short"
            />
          ) : (
            <p className="text-gray-300 mt-2">{countryName}</p>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleEditToggle}
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          {isEditing ? <Save className="w-5 h-5" /> : <Pencil className="w-5 h-5" />}
          <span>{isEditing ? 'Save' : 'Edit'}</span>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
