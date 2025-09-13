"use client"

import AuthLayout from "@/app/auth/layout";
import { login } from "@/services/auth.service";
import { loginSuccess } from "@/store/authSlice";
import { useAppDispatch } from "@/store/store";
import { LoginForm } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' })
  const [stayLoggedIn, setStayLoggedIn] = useState<boolean>(false)
  const [error, setError] = useState<string | null>('')
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStayLoggedIn(e.target.checked)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const data = await login(form)

      const token = data.token

      if (stayLoggedIn) {
        localStorage.setItem('token', token)
      } else {
        sessionStorage.setItem('token', token)
      }

      dispatch(loginSuccess(token))
      router.push("/")
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.')
    }
  }

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
        <button type="submit">Login</button>
      </form>
    </AuthLayout>
  );
}
