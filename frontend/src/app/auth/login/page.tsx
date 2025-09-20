"use client"

import AuthLayout from "@/app/auth/layout";
import { useLogin } from "@/hooks/useLogin";
import { LoginForm } from "@/types";
import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' })
  const [stayLoggedIn, setStayLoggedIn] = useState<boolean>(false)

  const { error, loading, handleLogin } = useLogin()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  };

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStayLoggedIn(e.target.checked)
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleLogin(form, stayLoggedIn)
  };

  return (
    <AuthLayout
      title="Login"
      footerText="Don't have an account?"
      footerLinkText="Register"
      footerHref="/auth/register"
    >
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red", marginBottom: 16 }}>{error}</p>}
        <input name="email" type="email" required placeholder="Your email" onChange={handleChange} />
        <input name="password" type="password" required placeholder="Your password" onChange={handleChange} />
        <label>
          <input type="checkbox" checked={stayLoggedIn} onChange={handleCheckBoxChange} />
          <span style={{ marginRight: 8 }}>Remember me</span>
        </label>
        <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
      </form>
    </AuthLayout>
  );
}
