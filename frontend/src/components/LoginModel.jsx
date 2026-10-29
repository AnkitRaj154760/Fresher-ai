import React, { useState } from 'react'
import { FiX, FiAlertCircle, FiExternalLink } from "react-icons/fi";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import api from '../utils/axios';

function LoginModel({ onClose ,setUser}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGoogleAuth = async () => {
        try {
            setError("");
            setLoading(true);
            const result = await signInWithPopup(auth , provider);
            const token = await result.user.getIdToken();

            const response = await api.post("/api/auth/login" , {token});
          
            setUser(response?.data?.user);
            onClose();
        } catch (err) {
            console.error("Firebase Auth Error:", err);
            if (err.code === "auth/popup-blocked" || err.code === "auth/cancelled-popup-request") {
                setError("Pop-up blocked by your browser. Redirecting directly to Google Sign-In...");
                try {
                    await signInWithRedirect(auth, provider);
                    return;
                } catch (redirectErr) {
                    setError("Pop-up was blocked. Click the button below to sign in using redirect instead.");
                    setLoading(false);
                }
            } else if (err.code === "auth/unauthorized-domain") {
                setError("Domain not authorized in Firebase Console. Please add 'fresher-ai-nine.vercel.app' to Firebase Console > Authentication > Settings > Authorized Domains.");
                setLoading(false);
            } else if (err.code === "auth/popup-closed-by-user") {
                setError("Sign-in window was closed before completing.");
                setLoading(false);
            } else {
                setError(err.message || "Failed to sign in. Please try again.");
                setLoading(false);
            }
        }
    }

    const handleRedirectAuth = async () => {
        try {
            setError("");
            setLoading(true);
            await signInWithRedirect(auth, provider);
        } catch (err) {
            console.error("Firebase Redirect Error:", err);
            setError(err.message || "Failed to initiate redirect sign-in.");
            setLoading(false);
        }
    }

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md px-4'>
            <div className='relative w-full max-w-sm
        bg-[#0A0A0A]/80 backdrop-blur-2xl
        border border-white/10
        rounded-2xl
        overflow-hidden
        shadow-[0_8px_32px_rgba(0,0,0,0.25)]'>

                <div className='absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none' />

                <div className='relative p-7'>
                    <button
                        onClick={onClose}
                        className='absolute top-4 right-4
              text-white/30 hover:text-white
              transition-colors'><FiX size={16} /></button>

                    <h2 className='text-lg font-bold text-center mb-2 text-white'>
                        Sign In to {" "}
                        <span className='font-extrabold text-lg tracking-tight text-white'>FresherAI</span>
                    </h2>
                    <p className='text-white/45 text-center text-xs'>
                        Continue your AI interview journey
                    </p>

                    {error && (
                        <div className='mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex flex-col gap-2 leading-relaxed'>
                            <div className='flex items-start gap-2'>
                                <FiAlertCircle className='shrink-0 mt-0.5 text-red-400' size={14} />
                                <span>{error}</span>
                            </div>
                            <button
                                type="button"
                                onClick={handleRedirectAuth}
                                className='mt-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors'
                            >
                                <FiExternalLink size={12} />
                                Sign in via Redirect instead
                            </button>
                        </div>
                    )}

                    <div className='mt-6 space-y-2.5'>
                        <motion.button
                            disabled={loading}
                            onClick={handleGoogleAuth}
                            whileHover={{ scale: loading ? 1 : 1.04 }}
                            whileTap={{ scale: loading ? 1 : 0.97 }}
                            className={`w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-white/15 bg-white/10 backdrop-blur-md hover:border-white/25 hover:bg-white/[0.14] shadow-inner transition-all ${
                                loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
                            }`}
                        >
                            <FcGoogle size={18}/>
                            <span className='text-white font-medium text-sm'>
                                {loading ? "Signing In..." : "Continue with Google"}
                            </span>
                        </motion.button>
                    </div>
                </div>

                <div className='relative border-t border-white/10 bg-black/30 p-4 text-center'>
                <p className='text-white/30 text-xs'>
                Secure authentication powered by Firebase
                </p>
                </div>




            </div>

        </div>
    )
}

export default LoginModel
