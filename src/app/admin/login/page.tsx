'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [loginError, setLoginError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // If already authenticated, go directly to /admin
  useEffect(() => {
    try {
      const sessionAuth = sessionStorage.getItem('sri_admin_auth');
      const localAuth = localStorage.getItem('sri_admin_auth');
      if (sessionAuth === 'true' || localAuth === 'true') {
        router.replace('/admin');
      }
    } catch {
      // Fallback
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmitting(true);

    const cleanEmail = loginEmail.trim().toLowerCase();
    const cleanPass = loginPassword.trim();

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password: cleanPass }),
      });

      const data = await res.json();
      if (data.success) {
        if (rememberMe) {
          localStorage.setItem('sri_admin_auth', 'true');
        } else {
          sessionStorage.setItem('sri_admin_auth', 'true');
        }
        router.push('/admin');
        return;
      } else {
        setLoginError(data.error || 'Invalid administrator email or password.');
      }
    } catch {
      setLoginError('Unable to reach authentication server. Please check your network.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="admin-login-wrapper" id="admin-login-view">
      <div className="admin-login-card">
        
        <div className="admin-login-header">
          <div className="admin-login-icon-wrap">
            <Lock size={26} />
          </div>
          <h1 className="admin-login-title">Admin Management Portal</h1>
          <p className="admin-login-subtitle">
            Secure back-office authentication for Sri Mahalakshmi Super Gas Agency
          </p>
        </div>

        {loginError && (
          <div className="admin-login-error" role="alert">
            <AlertCircle size={16} />
            <span>{loginError}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="admin-form-group">
            <label htmlFor="admin-email">Administrator Email</label>
            <div className="admin-input-with-icon">
              <Mail size={16} className="admin-input-icon" />
              <input
                id="admin-email"
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Enter administrator email"
                className="admin-login-input"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="admin-password">Password</label>
            <div className="admin-input-with-icon">
              <Lock size={16} className="admin-input-icon" />
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter administrator password"
                className="admin-login-input"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-btn"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.84rem', cursor: 'pointer', color: '#475569' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: '#dc2626' }}
              />
              <span>Remember me on this device</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="admin-login-btn"
            id="admin-login-submit-btn"
          >
            <Lock size={16} />
            <span>{isSubmitting ? 'Authenticating...' : 'Login to Admin Portal'}</span>
          </button>
        </form>

        <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
          <Link href="/" style={{ fontSize: '0.84rem', color: '#64748b', textDecoration: 'none' }}>
            ← Return to Sri Mahalakshmi Super Gas Agency Home
          </Link>
        </div>

      </div>
    </main>
  );
}
