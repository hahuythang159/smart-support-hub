"use client";

import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
    const router = useRouter();

    return (
        <div className="p-10 text-center text-red-500">
            <h1 className="text-3xl font-bold">403 - Access Denied</h1>
            <p>You do not have permission to access this page.</p>

            <button
                onClick={() => router.back()}
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Go Back
            </button>
        </div>
    );
}
