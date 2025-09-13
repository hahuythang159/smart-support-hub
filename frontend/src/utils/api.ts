import { API_BASE } from "./baseURL";

export async function apiRequest(path: string, options: RequestInit) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  let errorBody: any = null;

  if (!res.ok) {
    try {
      errorBody = await res.json();
    } catch (parseErr) {
      // Failed to parse JSON from backend
      throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    }

    // Prioritize error from `errors` array, then `message`, fallback to HTTP status
    const errorMessage =
      errorBody?.errors?.map((err: any) => err.msg).join(", ") ||
      errorBody?.message ||
      `HTTP ${res.status} - ${res.statusText}`;

    throw new Error(errorMessage);
  }

  // Try to parse and return JSON response
  try {
    return await res.json();
  } catch (jsonErr) {
    throw new Error("Failed to parse response data.");
  }
}
