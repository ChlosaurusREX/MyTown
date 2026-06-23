import { useState } from "react";
import imgLogo from "../imports/Login/cc2e61b111cffc63dc0e0ab4b569556ebceef676.png";
import { adminLogin, type AdminAccount } from "./adminApi";

interface AdminLoginProps {
  onLogin: (admin: AdminAccount) => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await adminLogin(email.trim(), password);
      if (!res.success || !res.admin) {
        setError(res.message || "Invalid email or password.");
        return;
      }
      onLogin(res.admin);
    } catch {
      setError("Could not reach the server. Make sure XAMPP (Apache + MySQL) is running.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="h-screen w-full bg-white overflow-y-auto" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="min-h-full flex flex-col items-center justify-center py-6 px-4">
        <div className="mb-3 w-[180px] sm:w-[220px] overflow-hidden shrink-0" style={{ height: "clamp(90px, 13vw, 160px)" }}>
          <img src={imgLogo} alt="MyTown logo" className="w-full h-auto object-contain" />
        </div>

        <div className="relative z-10 w-full max-w-[420px] rounded-[28px] border border-[#5d5b5b] bg-[#fffbfb] px-5 sm:px-8 py-4">
          <h1 className="text-center font-semibold mb-0.5" style={{ color: "#78AAD7", fontSize: 28, lineHeight: 1.2 }}>
            ADMIN PANEL
          </h1>
          <p className="text-center mb-3" style={{ color: "#5d5b5b", fontSize: 14, fontWeight: 500 }}>
            Sign in to manage MyTown records
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
            <input
              type="email"
              placeholder="Admin email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              className="w-full rounded-[14px] border border-black bg-transparent px-3 py-2 outline-none focus:border-[#78AAD7] transition-colors"
              style={{ color: "#5d5b5b", fontSize: 14, fontWeight: 500, fontFamily: "'Poppins', sans-serif" }}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                className="w-full rounded-[14px] border border-black bg-transparent px-3 py-2 pr-10 outline-none focus:border-[#78AAD7] transition-colors"
                style={{ color: "#5d5b5b", fontSize: 14, fontWeight: 500, fontFamily: "'Poppins', sans-serif" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#78AAD7] transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>
            {error && <p className="text-red-500 text-xs text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-[14px] bg-[#78AAD7] py-2 text-white hover:bg-[#6299c6] active:bg-[#5888b5] transition-colors disabled:opacity-60"
              style={{ fontSize: 14, fontWeight: 500, fontFamily: "'Poppins', sans-serif" }}
            >
              {submitting ? "LOGGING IN..." : "LOGIN"}
            </button>
          </form>

          <div className="my-3 border-t border-[#5d5b5b]" />
          <p className="text-center" style={{ color: "#5d5b5b", fontSize: 11, fontWeight: 500 }}>
            Admin and Super Admin accounts only. Contact your system
            administrator if you need access.
          </p>
        </div>
      </div>
    </div>
  );
}
