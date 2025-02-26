import React, { useState } from 'react';
import { 
  Calendar,
  Mail,
  Briefcase,
  X,
  Edit,
  Save,
  Camera,
  Phone,
  MapPin,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../lib/auth/auth';

interface UserProfileDetailsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileDetails: React.FC<UserProfileDetailsProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'David Thompson',
    email: 'david.thompson@example.com',
    role: 'Investment Manager',
    joinDate: '2023-09-15',
    dateOfBirth: '1990-05-15',
    phone: '+1 (555) 123-4567',
    address: '123 Investment Ave, New York, NY 10001',
  });

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Implement save functionality with Supabase
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      onClose();
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
      <div className="glass-panel w-full max-w-xl p-6 m-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#72A0D6]/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          {/* Profile Header */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-white/10">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=160&h=160&q=80&fit=crop"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 rounded-full bg-[#72A0D6] text-white hover:bg-[#72A0D6]/80 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={profileData.fullName}
                onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                disabled={!isEditing}
                className="text-2xl font-medium bg-transparent border-none focus:outline-none w-full"
              />
              <div className="flex items-center space-x-2 text-[#B0B3BA] mt-1">
                <Calendar className="w-4 h-4" />
                <span>Member since {new Date(profileData.joinDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-[#72A0D6]" />
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                disabled={!isEditing}
                className="flex-1 bg-transparent border-none focus:outline-none"
                placeholder="Email"
              />
            </div>
            <div className="flex items-center space-x-3">
              <Briefcase className="w-5 h-5 text-[#72A0D6]" />
              <input
                type="text"
                value={profileData.role}
                onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                disabled={!isEditing}
                className="flex-1 bg-transparent border-none focus:outline-none"
                placeholder="Role"
              />
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-[#72A0D6]" />
              <input
                type="date"
                value={profileData.dateOfBirth}
                onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                disabled={!isEditing}
                className="flex-1 bg-transparent border-none focus:outline-none"
              />
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-[#72A0D6]" />
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                disabled={!isEditing}
                className="flex-1 bg-transparent border-none focus:outline-none"
                placeholder="Phone number"
              />
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-[#72A0D6]" />
              <input
                type="text"
                value={profileData.address}
                onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                disabled={!isEditing}
                className="flex-1 bg-transparent border-none focus:outline-none"
                placeholder="Address"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-white/10">
            {!isEditing && (
              <button
                onClick={handleSignOut}
                className="glass-panel px-6 py-2 flex items-center space-x-2 text-[#FF3B3B] hover:bg-[#FF3B3B]/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            )}
            <div className="flex space-x-4">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="glass-panel px-6 py-2 flex items-center space-x-2 bg-[#72A0D6] hover:bg-[#72A0D6]/80 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="glass-panel px-6 py-2 flex items-center space-x-2 hover:bg-[#72A0D6]/20 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};