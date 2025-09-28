'use client'

import { useProtectedRoute } from "@/hooks/useProtectedRoute";

export default function SettingsPage() {
    const { hasAccess } = useProtectedRoute(['admin', 'staff'])

    if (!hasAccess) {
        return null
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            <p>Here you can configure your preferences.</p>
        </div>
    );
}
