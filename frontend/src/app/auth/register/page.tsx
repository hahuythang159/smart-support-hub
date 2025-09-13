"use client"

import AuthLayout from "@/app/auth/layout";
import { register } from "@/services/auth.service";
import { RegisterForm } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState<RegisterForm>({ email: '', password: '' })
  const router = useRouter()
  const [error, setError] = useState<string | null>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register(form)

      router.push('/login')
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.')
    }
  }

  return (
    <AuthLayout
      title="Register"
      footerText="Don't have an account?"
      footerLinkText="Login"
      footerHref="/auth/login"
    >
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red", marginBottom: 16 }}>{error}</p>}
        <input name="email" type="email" required placeholder="Your email" onChange={handleChange} />
        <input name="password" type="password" required placeholder="Your password" onChange={handleChange} />
        <button type="submit" style={{ width: "100%", padding: 8 }}>Register</button>
      </form>
    </AuthLayout>
  );
}