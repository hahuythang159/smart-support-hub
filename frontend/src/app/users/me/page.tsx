'use client'

import useMyProfile from "@/hooks/useMyProfile"
import { formatDate } from "@/utils/formatDate";

const ProfilePage = () => {
    const { myProfile, error, loading } = useMyProfile()

    return (
        <div>
            {error && (<h3>{error}</h3>)}
            {loading
                ? <p>Loading profile data.....</p>
                : (
                    <ul>
                        <h2>{myProfile?.email}</h2>
                        <small>
                            Created: {myProfile?.createdAt ? formatDate(myProfile?.createdAt) : 'N/A'}
                        </small>
                        <small>
                            Updated: {myProfile?.updatedAt ? formatDate(myProfile.updatedAt) : 'N/A'}
                        </small>
                    </ul>
                )
            }
        </div>
    );
}


export default ProfilePage