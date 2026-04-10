import React, { useState } from 'react';
// --- START: Your image import ---
import myImage from '../images/download.jpg';
// --- END: Your image import ---

// --- Icons (as simple functional components for reusability) ---
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const GlobeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.707 4.293a1 1 0 010 1.414L4.414 9H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h.586l-3.293-3.293a1 1 0 010-1.414z" /></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;


// --- Reusable Section Component for consistency ---
const ProfileSection = ({ title, icon, children }) => (
  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
      {icon}
      <span className="ml-3">{title}</span>
    </h3>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

// --- Reusable Input Field for Edit Mode ---
const InputField = ({ label, name, value, onChange, type = 'text' }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
    />
  </div>
);


function Profile() {
  const [user, setUser] = useState({
    name: 'Raghavnedra Singh',
    email: 'raghavendrashoivam474@example.com',
    // --- CORRECTED LINE ---
    // Removed the curly braces around myImage
    profilePicture: myImage, 
    // --- END CORRECTION ---
    bio: 'Travel enthusiast and adventure seeker. Exploring the world one city at a time and always looking for the next great story.',
    travelPreferences: {
      favoriteDestinations: ['Paris', 'Kyoto', 'New York', 'Rome'],
      preferredActivities: ['Hiking', 'Museums', 'Local Cuisine', 'Photography'],
      travelStyle: 'Adventure & Culture',
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleEdit = () => {
    setEditedUser(user);
    setIsEditing(true);
  };

  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };
  
  // Note: This function is not currently used by any input field in the provided code,
  // but it's here if you decide to add editable travel preferences.
  const handlePreferencesChange = (e) => {
      const { name, value } = e.target;
      const keys = name.split('.'); 
      setEditedUser(prev => ({
          ...prev,
          [keys[0]]: {
              ...prev[keys[0]],
              [keys[1]]: value.includes(',') ? value.split(',').map(s => s.trim()) : value
          }
      }));
  }

  return (
    <div className="bg-gray-100 min-h-screen w-[99vw] ">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          
          {/* --- Profile Header --- */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white flex flex-col items-center md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8">
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
            />
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold">{user.name}</h1>
              <p className="text-blue-100 mt-1">{user.email}</p>
            </div>
            <div className="md:ml-auto">
              {!isEditing && (
                 <button onClick={handleEdit} className="bg-white text-indigo-600 font-semibold px-6 py-2 rounded-full hover:bg-indigo-100 transition duration-300 ease-in-out shadow">
                   Edit Profile
                 </button>
              )}
            </div>
          </div>
          
          {/* --- Profile Body (The rest of the component remains the same) --- */}
          <div className="p-8 space-y-8">
            {isEditing ? (
              // --- EDIT MODE ---
              <div className="space-y-6">
                <ProfileSection title="Edit Your Details" icon={<SettingsIcon />}>
                  <InputField label="Full Name" name="name" value={editedUser.name} onChange={handleChange} />
                  <InputField label="Email Address" name="email" value={editedUser.email} onChange={handleChange} type="email" />
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">About Me</label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={editedUser.bio}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                    />
                  </div>
                </ProfileSection>
                
                <div className="flex justify-end space-x-4">
                   <button onClick={handleCancel} className="bg-gray-200 text-gray-800 font-semibold px-6 py-2 rounded-md hover:bg-gray-300 transition">Cancel</button>
                   <button onClick={handleSave} className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-indigo-700 transition">Save Changes</button>
                </div>
              </div>

            ) : (
              // --- VIEW MODE ---
              <div className="space-y-8">
                <ProfileSection title="About Me" icon={<UserIcon />}>
                  <p className="text-gray-600 leading-relaxed">{user.bio}</p>
                </ProfileSection>

                <ProfileSection title="Travel Preferences" icon={<GlobeIcon />}>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Favorite Destinations</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.travelPreferences.favoriteDestinations.map(dest => (
                        <span key={dest} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">{dest}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Preferred Activities</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.travelPreferences.preferredActivities.map(act => (
                        <span key={act} className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">{act}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Travel Style</h4>
                    <p className="text-gray-600">{user.travelPreferences.travelStyle}</p>
                  </div>
                </ProfileSection>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;