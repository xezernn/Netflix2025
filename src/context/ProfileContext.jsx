import React, { createContext, useEffect, useState } from 'react'
import user from '../assets/imgs/user.png'
import user1 from '../assets/imgs/user1.png'
export const PROFILES = createContext(null)

function ProfileContext({ children }) {
    const [profiles, setProfiles] = useState([
        {
            id: 1,
            name: 'Xezer',
            avatar: user
        },
    ])
    const [editingProfileId, setEditingProfileId] = useState(null)
    const [addProfile, setAddProfile] = useState(false)
    const [newProfile, setNewProfile] = useState({ name: '', avatar: user1 })
    const [edit, setEdit] = useState(false)
    const [originalProfile, setOriginalProfile] = useState(null)

    const handleProfileChange = (e) => {
        const { name, value } = e.target
        setProfiles((prev) =>
            prev.map((profile) =>
                profile.id === editingProfileId ? { ...profile, [name]: value } : profile
            )
        )
    }

    const handleSaveChanges = () => {
        setEdit(false)
        setEditingProfileId(null)
        setOriginalProfile(null)
    }

    const handleCancel = () => {
        if (originalProfile) {
            setProfiles((prev) =>
                prev.map((profile) =>
                    profile.id === editingProfileId ? originalProfile : profile
                )
            )
        }
        setEdit(false)
        setEditingProfileId(null)
        setOriginalProfile(null)
    }

    const handleAddNewProfile = () => {
        if (newProfile.name.trim()) {
            setProfiles([
                ...profiles,
                {
                    id: Date.now(),
                    name: newProfile.name,
                    avatar: newProfile.avatar || user1
                },
            ])
            setNewProfile({ name: '', avatar: user1 })
            setAddProfile(false)
        }
    }

    const handleDeleteProfile = (profileId) => {
        setProfiles(profiles.filter(profile => profile.id !== profileId))
        setEdit(false)
        setEditingProfileId(null)
    }

    const [selectedProfile, setSelectedProfile] = useState(profiles[0]?.avatar || null)
    const [selectedProfileName, setSelectedProfileName] = useState(profiles[0]?.name || null)
    const [loading, setLoading] = useState(false)
    const [timeRemaining, setTimeRemaining] = useState(5);

    const handleProfileImageClick = (profileId) => {
        const selectedProf = profiles.find(profile => profile.id === profileId)
        setSelectedProfile(selectedProf?.avatar)
        setSelectedProfileName(selectedProf?.name)
        
        setOriginalProfile({ ...selectedProf })
        setEdit(true)
        setEditingProfileId(profileId)

        setLoading(true);
        setTimeRemaining(2);
    }

    useEffect(() => {
        let timer;
        if (loading && timeRemaining > 0) {
            timer = setInterval(() => {
                setTimeRemaining(prev => prev - 1);
            }, 1000);
        } else if (timeRemaining === 0) {
            setLoading(false);
        }
        return () => clearInterval(timer);
    }, [loading, timeRemaining]);
    return (
        <PROFILES.Provider
            value={{
                profiles,
                addProfile,
                setProfiles,
                setAddProfile,
                newProfile,
                setNewProfile,
                loading,
                timeRemaining,
                editingProfileId,
                edit,
                handleProfileChange,
                handleSaveChanges,
                handleAddNewProfile,
                selectedProfile,
                setSelectedProfile,
                selectedProfileName,
                handleDeleteProfile,
                handleProfileImageClick,
                handleCancel,
            }}>
            {children}
        </PROFILES.Provider>
    )
}

export default ProfileContext