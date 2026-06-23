import { useState } from "react";
import imgLogo from "../imports/Signup-1/cc2e61b111cffc63dc0e0ab4b569556ebceef676.png";
import type { Account } from "./App";


interface SignupProps {
  onRegister: (account: Account) => void;
  onBack: () => void;
}


function EyeIcon({ visible }: { visible: boolean }) {
  return visible ? (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="shrink-0">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ) : (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="shrink-0">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}


export default function Signup({ onRegister, onBack }: SignupProps) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");


  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);


  function formatPhone(raw: string): string {
    // Keep only digits, max 11
    const digits = raw.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 4) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
    return `${digits.slice(0, 4)}-${digits.slice(4, 7)}-${digits.slice(7)}`;
  }


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const formatted = name === "phone" ? formatPhone(value) : value;
    setForm((f) => ({ ...f, [name]: formatted }));
    setError("");
  }


  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.firstName.trim() || !form.lastName.trim()) {
      setError("Please enter your first and last name.");
      return;
    }
    if (!form.email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!form.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }
    if (form.phone.replace(/\D/g, "").length !== 11) {
      setError("Phone number must be 11 digits (e.g. 0912-345-6789).");
      return;
    }
    if (!form.password) {
      setError("Please enter a password.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }


    if (!acceptedTerms) {
      setError("Please accept the Terms and Conditions.");
      return;
    }


    onRegister({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      password: form.password,
    });
  }


  const inputClass =
    "w-full rounded-[10px] border border-black bg-white px-3 py-2 outline-none focus:border-[#78AAD7] transition-colors";
  const labelClass = "block font-medium text-black mb-0.5";
  const inputStyle = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "clamp(12px, 1.4vw, 15px)",
    color: "#5d5b5b",
  };


  return (
    <div
      className="h-screen w-full bg-white overflow-y-auto"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="min-h-full flex flex-col items-center justify-center py-4 px-4">
      {/* Logo */}
      <div className="mb-3 w-[180px] sm:w-[220px] overflow-hidden shrink-0" style={{ height: "clamp(90px, 13vw, 160px)" }}>
        <img src={imgLogo} alt="MyTown logo" className="w-full h-auto object-contain" />
      </div>


      {/* Signup card */}
      <div className="relative z-10 w-full max-w-[500px] rounded-[32px] border border-[#5d5b5b] bg-[#fffbfb] px-6 sm:px-9 py-4">
        <h1
          className="text-center font-semibold mb-0.5"
          style={{ color: "#78AAD7", fontSize: "clamp(22px, 4vw, 34px)", lineHeight: 1.2 }}
        >
          Sign up
        </h1>
        <p className="text-center mb-3" style={{ color: "#5d5b5b", fontSize: "clamp(12px, 1.5vw, 15px)", fontWeight: 500 }}>
          Create an account
        </p>


        <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass} style={inputStyle}>First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="e.g.  John"
                value={form.firstName}
                onChange={handleChange}
                className={inputClass}
                style={inputStyle}
              />
            </div>
            <div>
              <label className={labelClass} style={inputStyle}>Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                value={form.lastName}
                onChange={handleChange}
                className={inputClass}
                style={inputStyle}
              />
            </div>
          </div>


          <div>
            <label className={labelClass} style={inputStyle}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
              style={inputStyle}
            />
          </div>


          <div>
            <label className={labelClass} style={inputStyle}>Phone Number</label>
            <input
              type="text"
              inputMode="numeric"
              name="phone"
              placeholder="0912-345-6789"
              value={form.phone}
              onChange={handleChange}
              className={inputClass}
              style={inputStyle}
              maxLength={13}
            />
          </div>


          <div>
            <label className={labelClass} style={inputStyle}>Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className={inputClass + " pr-10"}
                style={inputStyle}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#78AAD7] transition-colors"
                aria-label="Toggle password visibility"
              >
                <EyeIcon visible={showPassword} />
              </button>
            </div>
          </div>


          <div>
            <label className={labelClass} style={inputStyle}>Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirm"
                placeholder="••••••••"
                value={form.confirm}
                onChange={handleChange}
                className={inputClass + " pr-10"}
                style={inputStyle}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#78AAD7] transition-colors"
                aria-label="Toggle confirm password visibility"
              >
                <EyeIcon visible={showConfirm} />
              </button>
            </div>
          </div>


          <div className="flex items-start gap-2 mt-2">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-1"
            />


            <label
              className="text-sm text-[#5d5b5b]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              I have read and agree to the{" "}
              <button
                type="button"
                onClick={() => setShowTerms(true)}
                className="text-[#78AAD7] underline font-medium"
              >
                Terms and Conditions
              </button>
            </label>
          </div>


          {error && (
            <p className="text-red-500 text-sm text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {error}
            </p>
          )}


          <button
            type="submit"
            disabled={!acceptedTerms}
            className={`w-full rounded-[20px] py-2.5 text-white mt-1 transition-colors ${
              acceptedTerms
                ? "bg-[#78AAD7] hover:bg-[#6299c6]"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            style={{
              fontSize: "clamp(13px, 1.6vw, 17px)",
              fontWeight: 500,
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            SIGN UP
          </button>
        </form>


        <div className="mt-4 border-t border-[#5d5b5b]" />
        <p className="text-center mt-3" style={{ color: "#5d5b5b", fontSize: "clamp(11px, 1.2vw, 13px)", fontWeight: 500 }}>
          Already have an account?{" "}
          <button
            onClick={onBack}
            className="font-bold hover:text-[#78AAD7] transition-colors bg-transparent border-none p-0 cursor-pointer"
            style={{ fontFamily: "'Poppins', sans-serif", fontSize: "inherit", color: "inherit" }}
          >
            Login here.
          </button>
        </p>
      </div>


      {showTerms && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
        <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6">


        <h2 className="text-2xl font-bold text-[#78AAD7] mb-4">
            MyTown Portal – Terms and Conditions
          </h2>


          <p className="mb-4">
            Welcome to the MyTown Portal ("Website"). This platform was created to provide
            residents with local services, including account registration, profile
            management, and online ticket booking or purchasing for community events and
            activities.
          </p>


          <p className="mb-4">
            By accessing or using this Website, you acknowledge that you have read,
            understood, and agreed to be bound by the following terms and conditions.
            If you do not agree with any part of these terms, please discontinue using
            our services immediately.
          </p>


          <h3 className="font-bold mt-4 mb-2">
            1. Account Registration and Security
          </h3>


          <p><strong>Accuracy of Information:</strong> When creating an account, you agree to provide true, accurate, complete, and up-to-date information (First Name, Last Name, Email, and Phone Number).</p>


          <p className="mt-2"><strong>Password Confidentiality:</strong> You are solely responsible for maintaining the confidentiality of your account password. Any activity that occurs under your account will be considered your responsibility.</p>


          <p className="mt-2"><strong>Account Ownership:</strong> Each account is personal and non-transferable. You agree not to share your login credentials or allow others to use your account.</p>


          <h3 className="font-bold mt-4 mb-2">
            2. Service Usage and Ticket Purchases
          </h3>


          <p><strong>Lawful Use:</strong> You agree to use the Website strictly for lawful purposes and refrain from any fraudulent activities, unauthorized system access, or abuse.</p>


          <p className="mt-2"><strong>Ticket Policy:</strong> All tickets purchased or reserved through the MyTown dashboard are securely linked to the registered user's profile. Tickets must be used in accordance with the specified date, time, and location.</p>


          <p className="mt-2"><strong>Refunds and Cancellations:</strong> Unless explicitly stated otherwise by the MyTown administration, all successful ticket purchases are final and cannot be refunded, exchanged, or redeemed for cash.</p>


          <h3 className="font-bold mt-4 mb-2">
            3. Data Protection and Privacy
          </h3>


          <p><strong>Data Storage:</strong> Your personal details and ticket purchase history are securely stored within our official system database.</p>


          <p className="mt-2"><strong>Security Safeguards:</strong> Passwords are encrypted using modern industry standards before being stored to help protect your privacy.</p>


          <p className="mt-2"><strong>Information Usage:</strong> Your data will only be utilized to run the core website system, verify your identity during login, and process your ticket orders. We will never sell or share your personal details with third-party marketers.</p>


          <h3 className="font-bold mt-4 mb-2">
            4. Limitation of Liability
          </h3>


          <p>
            The MyTown Portal is provided on an "as is" and "as available" basis. We do
            not guarantee that the Website will always be completely free of errors,
            bugs, or temporary downtimes caused by necessary server maintenance or
            technical glitches.
          </p>


          <p className="mt-2">
            The administration shall not be held liable for any direct or indirect
            damages resulting from a user's misuse of the platform or data entry errors.
          </p>


          <h3 className="font-bold mt-4 mb-2">
            5. Amendments to These Terms
          </h3>


          <p>
            MyTown reserves the right to modify, update, or replace any part of these
            Terms and Conditions at any time. Your continued use of the Website following
            any changes constitutes full acceptance of the updated terms.
          </p>


          <h3 className="font-bold mt-4 mb-2">
            Consent Declaration
          </h3>


          <p>
            By clicking <strong>"Register"</strong>, <strong>"Sign Up"</strong>, or by
            continuing to use the MyTown Portal, you certify that you have read,
            understood, and fully agree to all the terms outlined in this document.
          </p>


          <button
            onClick={() => setShowTerms(false)}
            className="mt-6 bg-[#78AAD7] text-white px-5 py-2 rounded-lg hover:bg-[#6299c6]"
            >
            Close
          </button>


        </div>
      </div>
    )}
      </div>
    </div>
  );
}



