"use client";

import Link from "next/link";
import React from "react";
import "../../styles/auth.css";
import { AuthLayoutProps } from "@/types";

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, children, footerText, footerLinkText, footerHref }) => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">{title}</h1>
        <div className="auth-form">{children}</div>
        {footerText && footerHref && (
          <p className="auth-footer">
            {footerText}{" "}
            <Link href={footerHref} className="auth-footer-link">
              {footerLinkText}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
