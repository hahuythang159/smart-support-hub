'use client'

import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import ProfileInfo from "@/components/profile/ProfileInfo";
import useMyProfile from "@/hooks/useMyProfile"

const ProfilePage = () => {
    const { myProfile, error, loading } = useMyProfile()

    return (
        <div>
            {error && (<h3>{error}</h3>)}
            {!loading && <ProfileInfo profile={myProfile} />}

            <ChangePasswordForm />
        </div>
    );
}


export default ProfilePage