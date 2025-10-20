import { User } from "@/types"
import { formatDate } from "@/utils/formatDate"
import React from "react"

const ProfileInfo = ({ profile }: { profile: User | null }) => {
    if (!profile) return null;

    return (
        <ul>
            <h2>{profile.email}</h2>
            <small>Created: {formatDate(profile.createdAt)}</small><br />
            <small>Updated: {formatDate(profile.updatedAt)}</small>
        </ul>
    )
}

export default React.memo(ProfileInfo)

