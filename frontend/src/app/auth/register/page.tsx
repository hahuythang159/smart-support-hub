"use client"

import AuthLayout from "@/app/auth/layout";
import { useRegister } from "@/hooks/useRegister";
import { RegisterForm } from "@/types";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState<RegisterForm>({ email: '', password: '' })
  const { error, loading, handleRegister } = useRegister()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleRegister(form)
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
        <button type="submit" style={{ width: "100%", padding: 8 }} disabled={loading}>{loading ? "Registering..." : "Register"}</button>
      </form>
    </AuthLayout>
  );
}