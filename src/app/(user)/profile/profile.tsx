"use client";

import { useState, useEffect } from 'react';
import Avatar from '@/components/ui/Avatar';
import AvatarGallery from '@/components/ui/AvatarGallery';
import { Pencil, Save } from 'lucide-react';
import { CountryDropdown } from 'react-country-region-selector';

const ProfilePage = () => {
  // State management
  const [bio, setBio] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [countryName, setCountryName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');

  // Load state from local storage on component mount
  useEffect(() => {
    const storedData = {
      bio: localStorage.getItem('bio'),
      phoneNumber: localStorage.getItem('phoneNumber'),
      address: localStorage.getItem('address'),
      dateOfBirth: localStorage.getItem('dateOfBirth'),
      gender: localStorage.getItem('gender'),
      country: localStorage.getItem('country'),
      countryName: localStorage.getItem('countryName'),
      avatarUrl: localStorage.getItem('avatarUrl'),
    };

    if (storedData.bio) setBio(storedData.bio);
    if (storedData.phoneNumber) setPhoneNumber(storedData.phoneNumber);
    if (storedData.address) setAddress(storedData.address);
    if (storedData.dateOfBirth) setDateOfBirth(storedData.dateOfBirth);
    if (storedData.gender) setGender(storedData.gender);
    if (storedData.country) setCountry(storedData.country);
    if (storedData.countryName) setCountryName(storedData.countryName);
    if (storedData.avatarUrl) setAvatarUrl(storedData.avatarUrl);
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

  // Toggle editing mode
  const handleEditToggle = () => setIsEditing(!isEditing);

  // Handle country selection
  const selectCountry = (val: string, fullCountryName: string) => {
    setCountry(val);
    setCountryName(fullCountryName);
  };

  return (
    <div className="space-y-6 text-center">
      {/* Avatar Section */}
      <div className="flex flex-col items-center space-y-4">
        <Avatar src={avatarUrl} alt="Profile Avatar" size={100} />
        {isEditing && <AvatarGallery onSelect={setAvatarUrl} />}
      </div>

      {/* Profile Information Sections */}
      <div className="space-y-4">
        {/* Bio */}
        <ProfileSection title="Bio" isEditing={isEditing}>
          {isEditing ? (
            <textarea
              className="profile-input"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          ) : (
            <p className="profile-text">{bio}</p>
          )}
        </ProfileSection>

        {/* Phone Number */}
        <ProfileSection title="Phone Number" isEditing={isEditing}>
          {isEditing ? (
            <input
              className="profile-input"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          ) : (
            <p className="profile-text">{phoneNumber}</p>
          )}
        </ProfileSection>

        {/* Address */}
        <ProfileSection title="Address" isEditing={isEditing}>
          {isEditing ? (
            <input
              className="profile-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          ) : (
            <p className="profile-text">{address}</p>
          )}
        </ProfileSection>

        {/* Date of Birth */}
        <ProfileSection title="Date of Birth" isEditing={isEditing}>
          {isEditing ? (
            <input
              type="date"
              className="profile-input"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          ) : (
            <p className="profile-text">{dateOfBirth}</p>
          )}
        </ProfileSection>

        {/* Gender */}
        <ProfileSection title="Gender" isEditing={isEditing}>
          {isEditing ? (
            <select
              className="profile-input"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          ) : (
            <p className="profile-text capitalize">{gender}</p>
          )}
        </ProfileSection>

        {/* Country */}
        <ProfileSection title="Country" isEditing={isEditing}>
          {isEditing ? (
            <CountryDropdown
              value={country}
              onChange={(val, e) => selectCountry(val, e.target.options[e.target.selectedIndex].text)}
              className="profile-input"
              showDefaultOption={false}
              blacklist={['AQ']}
              defaultOptionLabel="Select a country"
              valueType="short"
            />
          ) : (
            <p className="profile-text">{countryName}</p>
          )}
        </ProfileSection>
      </div>

      {/* Edit/Save Button */}
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

// Reusable ProfileSection component for better code structure
const ProfileSection = ({
  title,
  isEditing,
  children,
}: {
  title: string;
  isEditing: boolean;
  children: React.ReactNode;
}) => (
  <div className="bg-gray-700 p-4 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold text-white">{title}</h2>
    {children}
  </div>
);

// Common class names to reduce repetition
const profileInputClassNames = "bg-gray-800 text-white p-2 rounded w-full mt-2";
const profileTextClassNames = "text-gray-300 mt-2";

export default ProfilePage;
