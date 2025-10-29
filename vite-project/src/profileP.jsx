import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProfilePage() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const headers = token
          ? { Authorization: `Bearer ${token}` }
          : {};

        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/profile/${username}`, {
          headers,
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);

          // Check if logged-in user is viewing their own profile
          if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            if (decodedToken.username === data.username) {
              setIsOwner(true);
            }
          }
        } else {
          console.error('Profile not found');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>Profile not found.</p>;

  return (
    <div className="profile-container">
      <h2>{profile.username}'s Profile</h2>

      {profile.profileImage && (
        <img src={profile.profileImage} alt="Profile" width="150" />
      )}

      <p><strong>Bio:</strong> {profile.bio || 'No bio yet.'}</p>
      <p><strong>Skills:</strong> {profile.skills?.join(', ') || 'No skills listed.'}</p>

      {profile.github && (
        <p>
          <strong>GitHub:</strong>{' '}
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            {profile.github}
          </a>
        </p>
      )}

      {profile.resumeLink && (
        <p>
          <strong>Resume:</strong>{' '}
          <a href={profile.resumeLink} target="_blank" rel="noopener noreferrer">
            View Resume
          </a>
        </p>
      )}

      {isOwner && (
        <button onClick={() => alert('Edit profile feature coming soon!')}>
          Edit Profile
        </button>
      )}
    </div>
  );
}
