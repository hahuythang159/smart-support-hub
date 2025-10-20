'use client'

import { useState } from "react"
import useChangePassword from "@/hooks/useChangePassword"
import { ChangePasswordRequest } from "@/types"
import React from "react"

const ChangePasswordForm = () => {
    const [form, setForm] = useState<ChangePasswordRequest>({ currentPassword: '', newPassword: '' })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const { success, error, loading, changePassword } = useChangePassword()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await changePassword(form)
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
            <h3>Change Password</h3>
            <div>
                <label>Old Password:</label>
                <input
                    type="password"
                    name="currentPassword"
                    value={form.currentPassword}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>New Password:</label>
                <input
                    type="password"
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? "Changing..." : "Change Password"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
        </form>
    )
}

export default React.memo(ChangePasswordForm)
