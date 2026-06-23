import { useState } from "react";
import imgLogo from "../imports/Weh/cc2e61b111cffc63dc0e0ab4b569556ebceef676.png";
import svgPaths from "../imports/Weh/svg-q0976dziuc";

interface ForgotPasswordProps {
  onCheckEmail: (email: string) => Promise<boolean>;
  onResetPassword: (email: string, newPassword: string) => void;
  onBack: () => void;
}

function EyeClosedIcon() {
  return (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="shrink-0">
      <path
        d={svgPaths.p12187b00}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

const cardClass =
  "w-full max-w-[420px] rounded-[28px] border border-[#5d5b5b] bg-[#fffbfb] px-5 sm:px-8 py-4";

const inputClass =
  "w-full rounded-[10px] border border-black bg-white px-3 py-2 outline-none focus:border-[#78AAD7] transition-colors";

const inputStyle = { fontFamily: "'Poppins', sans-serif", fontSize: 14, color: "#5d5b5b" };
const btnStyle  = { fontSize: 14, fontWeight: 500, fontFamily: "'Poppins', sans-serif" };

function Logo() {
  return (
    <div className="mb-3 w-[180px] sm:w-[220px] overflow-hidden shrink-0" style={{ height: "clamp(90px, 13vw, 160px)" }}>
      <img src={imgLogo} alt="MyTown logo" className="w-full h-auto object-contain" />
    </div>
  );
}

function Wrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full bg-white overflow-y-auto" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="min-h-full flex flex-col items-center justify-center py-6 px-4">
        {children}
      </div>
    </div>
  );
}

// Step 1 — enter email
function StepForgot({ onCheckEmail, onNext, onBack }: { onCheckEmail: (email: string) => Promise<boolean>; onNext: (email: string) => void; onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) { setError("Please enter your email."); return; }
    setChecking(true);
    setError("");
    try {
      const exists = await onCheckEmail(email.trim());
      if (!exists) { setError("No account found with that email."); return; }
      onNext(email.trim());
    } catch {
      setError("Could not reach the server. Make sure XAMPP (Apache + MySQL) is running.");
    } finally {
      setChecking(false);
    }
  }

  return (
    <Wrap>
      <Logo />
      <div className={cardClass}>
        <h1 className="text-center font-semibold mb-1" style={{ color: "#78AAD7", fontSize: 24, lineHeight: 1.2 }}>
          Reset Password
        </h1>
        <p className="text-center mb-4" style={{ color: "#5d5b5b", fontSize: 13, fontWeight: 500 }}>
          Enter your email and we&apos;ll send you a reset code.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="block font-medium text-black mb-1" style={inputStyle}>Email</label>
            <input
              type="email" placeholder="example@gmail.com" value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              className={inputClass} style={inputStyle}
            />
          </div>
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          <button type="submit" disabled={checking} className="w-full rounded-[10px] bg-[#78aad7] py-2 text-white hover:bg-[#6299c6] transition-colors mt-1 disabled:opacity-60" style={btnStyle}>
            {checking ? "Checking..." : "Send Reset Code"}
          </button>
          <button type="button" onClick={onBack} className="text-xs text-[#5d5b5b] text-center hover:text-[#78AAD7]">
            Back to Login
          </button>
        </form>
      </div>
    </Wrap>
  );
}

// Step 2 — enter code (simulated: any 6-digit code works)
function StepCode({ onNext }: { onNext: () => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim().length < 4) { setError("Please enter the reset code."); return; }
    onNext();
  }

  return (
    <Wrap>
      <Logo />
      <div className={cardClass}>
        <h1 className="text-center font-semibold mb-1" style={{ color: "#78AAD7", fontSize: 24, lineHeight: 1.2 }}>
          Reset Code
        </h1>
        <p className="text-center mb-4" style={{ color: "#5d5b5b", fontSize: 13, fontWeight: 500 }}>
          Enter the reset code sent to your email.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="block font-medium text-black mb-1" style={inputStyle}>Reset Code</label>
            <input
              type="text" placeholder="000000" value={code} maxLength={6}
              onChange={(e) => { setCode(e.target.value); setError(""); }}
              className={inputClass + " text-center tracking-widest"} style={inputStyle}
            />
          </div>
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          <button type="submit" className="w-full rounded-[10px] bg-[#78aad7] py-2 text-white hover:bg-[#6299c6] transition-colors mt-1" style={btnStyle}>
            Verify Code
          </button>
          <button type="button" className="text-xs text-[#5d5b5b] text-center hover:text-[#78AAD7]">
            Didn&apos;t receive it? Resend Code.
          </button>
        </form>
      </div>
    </Wrap>
  );
}

// Step 3 — set new password
function StepReset({ onDone }: { onDone: (newPassword: string) => void }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    onDone(password);
  }

  return (
    <Wrap>
      <Logo />
      <div className={cardClass}>
        <h1 className="text-center font-semibold mb-1" style={{ color: "#78AAD7", fontSize: 24, lineHeight: 1.2 }}>
          Reset Password
        </h1>
        <p className="text-center mb-4" style={{ color: "#5d5b5b", fontSize: 13, fontWeight: 500 }}>
          Enter a new strong password.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="block font-medium text-black mb-1" style={inputStyle}>New Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"} placeholder="••••••••" value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                className={inputClass + " pr-10"} style={inputStyle}
              />
              <button type="button" onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#78AAD7]">
                <EyeClosedIcon />
              </button>
            </div>
          </div>
          <div>
            <label className="block font-medium text-black mb-1" style={inputStyle}>Confirm Password</label>
            <div className="relative">
              <input
                type={showCf ? "text" : "password"} placeholder="••••••••" value={confirm}
                onChange={(e) => { setConfirm(e.target.value); setError(""); }}
                className={inputClass + " pr-10"} style={inputStyle}
              />
              <button type="button" onClick={() => setShowCf((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#78AAD7]">
                <EyeClosedIcon />
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          <button type="submit" className="w-full rounded-[10px] bg-[#78aad7] py-2 text-white hover:bg-[#6299c6] transition-colors mt-1" style={btnStyle}>
            Reset Password
          </button>
        </form>
      </div>
    </Wrap>
  );
}

export default function ForgotPassword({ onCheckEmail, onResetPassword, onBack }: ForgotPasswordProps) {
  const [step, setStep] = useState<"forgot" | "code" | "reset">("forgot");
  const [resetEmail, setResetEmail] = useState("");

  if (step === "code") return <StepCode onNext={() => setStep("reset")} />;
  if (step === "reset") return (
    <StepReset onDone={(newPassword) => onResetPassword(resetEmail, newPassword)} />
  );
  return (
    <StepForgot
      onCheckEmail={onCheckEmail}
      onNext={(email) => { setResetEmail(email); setStep("code"); }}
      onBack={onBack}
    />
  );
}
