import React, { useState, useEffect } from "react";
import googleLogo from "../../images/google.png";
import backgroundImage from "../../images/background.png";

// Icons - using react-icons instead of lucide-react to match your BookingPage
import { 
  FaEnvelope, 
  FaLock, 
  FaUser, 
  // FaExclamationTriangle,
  FaCheckCircle,
  FaEye,
  FaEyeSlash 
} from "react-icons/fa";

// Firebase
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";

import { useNavigate } from "react-router-dom";

export default function LoginPage({ onLogin }) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Error States
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState("");
  const [touchedFields, setTouchedFields] = useState({});
  
  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  
  // OTP States
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [timer, setTimer] = useState(30);
  const [resetStep, setResetStep] = useState('email'); // email, otp, password

  const navigate = useNavigate();

  // List of allowed email domains (same as BookingPage)
  const allowedDomains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "live.com",
    "icloud.com",
    "aol.com",
    "protonmail.com",
    "zoho.com",
  ];

  // Load saved email if remember me was checked
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedRememberMe = localStorage.getItem("rememberMe") === 'true';
    if (savedEmail && savedRememberMe) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  // OTP Timer
  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  // Email validation function (same as BookingPage)
  const validateEmail = (email) => {
    if (!email) return "Email is required";
    
    // Basic email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address (e.g., name@domain.com)";
    }
    
    // Check if domain is in allowed list
    const domain = email.split("@")[1].toLowerCase();
    if (!allowedDomains.includes(domain)) {
      return "Please enter a valid domain name";
    }
    
    return "";
  };

  // Helper function to check if email domain is allowed
  const isEmailDomainAllowed = (email) => {
    if (!email || !email.includes("@")) return false;
    const domain = email.split("@")[1].toLowerCase();
    return allowedDomains.includes(domain);
  };

  // Password strength validation for signup
  const validatePasswordStrength = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const strengthChecks = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar];
    const passedChecks = strengthChecks.filter(Boolean).length;
    
    if (passedChecks < 2) return "Password must include at least 2 of: uppercase, lowercase, numbers, special characters";
    if (passedChecks < 3) return "Password could be stronger (add more variety)";
    
    return "";
  };

  // Validate username
  const validateUsername = (username) => {
    if (!isSignIn && !username) return "Username is required";
    if (!isSignIn && username.length < 3) return "Username must be at least 3 characters";
    return "";
  };

  // Validate OTP
  const validateOtp = (otp) => {
    if (otpSent && !otpVerified && !otp) return "OTP is required";
    if (otp && !/^\d{6}$/.test(otp)) return "OTP must be 6 digits";
    return "";
  };

  // Validate all fields
  const validateField = (fieldName, value) => {
    switch(fieldName) {
      case 'email':
        return validateEmail(value);
      case 'password':
        if (!isSignIn) {
          return validatePasswordStrength(value);
        }
        return !value ? "Password is required" : "";
      case 'username':
        return validateUsername(value);
      case 'otp':
        return validateOtp(value);
      default:
        return "";
    }
  };

  // Handle field blur
  const handleBlur = (field) => {
    setTouchedFields(prev => ({ ...prev, [field]: true }));
    
    let value = '';
    if (field === 'username') value = username;
    else if (field === 'email') value = email;
    else if (field === 'password') value = password;
    else if (field === 'otp') value = otp;
    
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  // Handle email change with immediate validation (like BookingPage)
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setBackendError(""); // Clear backend error when user types
    
    if (touchedFields.email) {
      const emailError = validateEmail(newEmail);
      setErrors(prev => ({ ...prev, email: emailError }));
    }
  };

  // Handle password change with immediate validation for signup
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
    if (touchedFields.password && !isSignIn) {
      const passwordError = validatePasswordStrength(newPassword);
      setErrors(prev => ({ ...prev, password: passwordError }));
    } else if (touchedFields.password && isSignIn) {
      setErrors(prev => ({ ...prev, password: !newPassword ? "Password is required" : "" }));
    }
  };

  // Handle OTP input with Enter key
  const handleOtpKeyPress = (e) => {
    if (e.key === 'Enter' && otp && !loading) {
      handleVerifyOtp();
    }
  };

  // Check if form is valid
  const isFormValid = () => {
    const emailError = validateEmail(email);
    const passwordError = isSignIn ? 
      (!password ? "Password is required" : "") : 
      validatePasswordStrength(password);
    const usernameError = validateUsername(username);
    const otpError = validateOtp(otp);
    
    return !emailError && 
           !passwordError && 
           !usernameError && 
           (!otpSent || otpVerified || !otpError);
  };

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setOtp("");
    setOtpSent(false);
    setOtpVerified(false);
    setTimer(90);
    setErrors({});
    setBackendError("");
    setTouchedFields({});
  };

  // const handleRedirectAfterLogin = () => {
  //   const queryParams = new URLSearchParams(window.location.search);
  //   const redirectUrl = queryParams.get('redirect');
  //   const doctorId = queryParams.get('doctorId');

  //   if (doctorId) {
  //     navigate(`/book-appointment/${doctorId}`);
  //   } else if (redirectUrl) {
  //     navigate(decodeURIComponent(redirectUrl));
  //   } else {
  //     // Redirect based on role
  //     const user = JSON.parse(localStorage.getItem('user'));
  //     if (user?.role === 'admin') {
  //       navigate('/');
  //     } else if (user?.role === 'doctor') {
  //       navigate('/doctor/dashboard');
  //     } else if (user?.role === 'lab') {
  //       navigate('/lab/dashboard');
  //     } else if (user?.role === 'pharmacy') {
  //       navigate('/pharmacy/dashboard');
  //     } else {
  //       navigate('/');
  //     }
  //   }
  // };

// const handleRedirectAfterLogin = () => {
//   try {
//     const queryParams = new URLSearchParams(window.location.search);
//     const redirectUrl = queryParams.get('redirect');
//     const doctorId = queryParams.get('doctorId');
//     const labId = queryParams.get('labId');
//     const pharmacyId = queryParams.get('pharmacyId');

//     // Priority 1: Direct appointment booking
//     if (doctorId) {
//       return navigate(`/book-appointment/${doctorId}`);
//     }

//     // Priority 2: Specific lab dashboard
//     if (labId) {
//       return navigate(`/lab/dashboard/${labId}`);
//     }

//     // Priority 3: Custom redirect URL
//     if (redirectUrl) {
//       return navigate(decodeURIComponent(redirectUrl));
//     }

//     // Priority 4: Role-based redirect
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (!user) {
//       return navigate('/login');
//     }

//     const dashboardRoutes = {
//       admin: '/admin/dashboard',
//       doctor: `/doctor/dashboard/${user.doctorId || ''}`,
//       lab: `/lab/dashboard/${user.labId || ''}`,
//       pharmacy: `/pharmacy/dashboard/${user.pharmacyId || ''}`,
//       patient: '/patient/dashboard'
//     };

//     const route = dashboardRoutes[user.role] || '/';
//     navigate(route);

//   } catch (error) {
//     console.error('Redirect error:', error);
//     navigate('/');
//   }
// };

  // Handle Remember Me
  const handleRedirectAfterLogin = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const redirectUrl = queryParams.get("redirect");
  const doctorId = queryParams.get("doctorId");

  const user = JSON.parse(localStorage.getItem("user"));

  if (doctorId) {
    navigate(`/book-appointment/${doctorId}`);
  } 
  else if (redirectUrl) {
    navigate(decodeURIComponent(redirectUrl));
  } 
  else {

    if (user?.role === "admin") {
      navigate("/admin/dashboard");
    } 
    else if (user?.role === "doctor") {
      navigate(`/doctor/dashboard/${user?.id}`);
    } 
    else if (user?.role === "lab") {
      navigate(`/lab/dashboard/${user?.id}`);
    } 
    else if (user?.role === "pharmacy") {
      navigate(`/pharmacy/dashboard/${user?.id}`);
    } 
    else {
      navigate("/");
    }

  }
};
  
  const handleRememberMe = (email, remember) => {
    if (remember) {
      localStorage.setItem("rememberedEmail", email);
      localStorage.setItem("rememberMe", 'true');
    } else {
      localStorage.removeItem("rememberedEmail");
      localStorage.setItem("rememberMe", 'false');
    }
  };

  // Send OTP for Signup
  const handleSendOtp = async () => {
    const emailError = validateEmail(email);
    if (emailError) {
      setErrors(prev => ({ ...prev, email: emailError }));
      setTouchedFields(prev => ({ ...prev, email: true }));
      return;
    }
    
    setLoading(true);
    setBackendError("");
    
    try {
      const response = await fetch("http://localhost:5000/api/users/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: 'signup' }),
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.msg?.includes("already exists") || data.msg?.includes("already registered")) {
          setBackendError("Email already exists. Please sign in instead.");
          setTimeout(() => setIsSignIn(true), 3000);
        } else {
          throw new Error(data.msg);
        }
        return;
      }

      setOtpSent(true);
      setTimer(90);
    } catch (err) {
      setBackendError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    const otpError = validateOtp(otp);
    if (otpError) {
      setErrors(prev => ({ ...prev, otp: otpError }));
      return;
    }

    setLoading(true);
    setBackendError("");
    
    try {
      const response = await fetch("http://localhost:5000/api/users/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.msg);

      setOtpVerified(true);
      setErrors(prev => ({ ...prev, otp: "" }));
    } catch (err) {
      setBackendError(err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password - Send OTP
  const handleForgotPasswordSendOtp = async () => {
    const emailError = validateEmail(email);
    if (emailError) {
      setErrors(prev => ({ ...prev, email: emailError }));
      return;
    }

    setLoading(true);
    setBackendError("");
    
    try {
      const response = await fetch("http://localhost:5000/api/users/forgot-password-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.msg?.includes("not found") || data.msg?.includes("does not exist")) {
          setBackendError("Email does not exist. Please sign up instead.");
          setTimeout(() => {
            setIsSignIn(false);
            setIsForgotPassword(false);
          }, 3000);
        } else {
          throw new Error(data.msg);
        }
        return;
      }

      setResetStep('otp');
      setOtpSent(true);
      setTimer(90);
    } catch (err) {
      setBackendError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password - Verify OTP
  const handleForgotPasswordVerifyOtp = async () => {
    const otpError = validateOtp(otp);
    if (otpError) {
      setErrors(prev => ({ ...prev, otp: otpError }));
      return;
    }

    setLoading(true);
    setBackendError("");
    
    try {
      const response = await fetch("http://localhost:5000/api/users/verify-reset-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.msg);

      setResetStep('password');
      setErrors(prev => ({ ...prev, otp: "" }));
    } catch (err) {
      setBackendError(err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password - Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    const passwordError = validatePasswordStrength(password);
    if (passwordError) {
      setErrors(prev => ({ ...prev, password: passwordError }));
      return;
    }

    setLoading(true);
    setBackendError("");
    
    try {
      const response = await fetch("http://localhost:5000/api/users/reset-password-with-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, otp }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.msg);

      setIsForgotPassword(false);
      setResetStep('email');
      resetForm();
    } catch (err) {
      setBackendError(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const emailError = validateEmail(email);
    const passwordError = isSignIn ? 
      (!password ? "Password is required" : "") : 
      validatePasswordStrength(password);
    const usernameError = validateUsername(username);
    const otpError = !isSignIn && otpSent && !otpVerified ? validateOtp(otp) : "";

    const newErrors = {
      email: emailError,
      password: passwordError,
      username: usernameError,
      ...(otpError && { otp: otpError })
    };

    setErrors(newErrors);
    setTouchedFields({
      email: true,
      password: true,
      username: !isSignIn,
      ...(otpSent && !otpVerified && { otp: true })
    });

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    setLoading(true);
    setBackendError("");

    const signupUrl = "http://localhost:5000/api/users/signup";
    const loginUrl = "http://localhost:5000/api/users/login";

    try {
      // Login
      if (isSignIn) {
        const res = await fetch(loginUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, remember: rememberMe }),
        });

        const data = await res.json();
        if (!res.ok) {
          if (data.msg?.includes("not found") || data.msg?.includes("does not exist")) {
            setBackendError("Email does not exist. Please sign up instead.");
            setTimeout(() => setIsSignIn(false), 3000);
          } else {
            throw new Error(data.msg);
          }
          return;
        }

        // Handle Remember Me
        handleRememberMe(email, rememberMe);

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        onLogin?.(data.user);
        
        handleRedirectAfterLogin();
      }

      // Signup
      else {
        const signupRes = await fetch(signupUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: username,
            email,
            password,
            otp,
            role: "user"
          }),
        });

        const signupData = await signupRes.json();
        if (!signupRes.ok) {
          if (signupData.msg?.includes("already exists") || signupData.msg?.includes("already registered")) {
            setBackendError("Email already exists. Please sign in instead.");
            setTimeout(() => setIsSignIn(true), 3000);
          } else {
            throw new Error(signupData.msg);
          }
          return;
        }

        // Auto Login after signup
        const loginRes = await fetch(loginUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, remember: rememberMe }),
        });

        const loginData = await loginRes.json();
        if (!loginRes.ok) throw new Error(loginData.msg);

        handleRememberMe(email, rememberMe);

        localStorage.setItem("token", loginData.token);
        localStorage.setItem("user", JSON.stringify(loginData.user));
        onLogin?.(loginData.user);
        
        handleRedirectAfterLogin();
      }
    } catch (err) {
      setBackendError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setBackendError("");
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Send to backend
      const res = await fetch("http://localhost:5000/api/users/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          name: user.displayName,
          googleId: user.uid,
          role: "user"
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onLogin?.(data.user);
      
      handleRedirectAfterLogin();
    } catch (err) {
      setBackendError(err.message || "Google Sign-In Failed");
    } finally {
      setLoading(false);
    }
  };

  // Error Message Component
  const ErrorMessage = ({ error }) => {
    if (!error) return null;
    return (
      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
        {/* <FaExclamationTriangle className="text-xs" /> */}
        {error}
      </p>
    );
  };

  // Forgot Password Flow
  if (isForgotPassword) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#5c878f]/90 to-transparent"></div>

        <div className="relative z-10 w-full max-w-md bg-white/95 rounded-2xl shadow-2xl px-8 py-10">
          <h2 className="text-2xl font-semibold text-center text-[#2c6774] mb-6">
            Reset Password
          </h2>

          {/* Backend Error Message - Top of all fields */}
          {backendError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm flex items-center gap-2">
                {/* <FaExclamationTriangle className="text-sm" /> */}
                {backendError}
              </p>
            </div>
          )}

          {resetStep === 'email' && (
            <div className="space-y-4">
              <div>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c6774] ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={() => handleBlur('email')}
                  />
                </div>
                {/* Show domain validation status like BookingPage */}
                {email && email.includes("@") && (
                  <div className="mt-1">
                    {isEmailDomainAllowed(email) ? (
                      <p className="text-sm text-green-600 flex items-center gap-1">
                        {/* <FaCheckCircle className="text-xs" /> */}
                        {/* Valid domain: {email.split('@')[1]} */}
                      </p>
                    ) : (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        {/* <FaExclamationTriangle className="text-xs" /> */}
                        Please enter a valid domain name (gmail.com, etc.)
                      </p>
                    )}
                  </div>
                )}
                <ErrorMessage error={errors.email} />
              </div>
              
              <button
                onClick={handleForgotPasswordSendOtp}
                disabled={loading || !!errors.email}
                className="w-full py-2 rounded-md text-white bg-[#2c6774] hover:bg-[#1e4e56] disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </div>
          )}

          {resetStep === 'otp' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">OTP sent to {email}</p>
              <div>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c6774] ${
                    errors.otp ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    if (touchedFields.otp) {
                      setErrors(prev => ({ ...prev, otp: validateOtp(e.target.value) }));
                    }
                  }}
                  onBlur={() => handleBlur('otp')}
                  onKeyPress={handleOtpKeyPress}
                  maxLength={6}
                />
                <ErrorMessage error={errors.otp} />
              </div>
              
              <button
                onClick={handleForgotPasswordVerifyOtp}
                disabled={loading || !!errors.otp}
                className="w-full py-2 rounded-md text-white bg-[#2c6774] hover:bg-[#1e4e56] disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              {timer > 0 ? (
                <p className="text-sm text-gray-600 text-center">Resend OTP in {timer}s</p>
              ) : (
                <button
                  onClick={handleForgotPasswordSendOtp}
                  className="text-sm text-[#2c6774] hover:underline w-full"
                >
                  Resend OTP
                </button>
              )}
            </div>
          )}

          {resetStep === 'password' && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    className={`w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c6774] ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={() => handleBlur('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <ErrorMessage error={errors.password} />
              </div>
              
              <button
                type="submit"
                disabled={loading || !!errors.password}
                className="w-full py-2 rounded-md text-white bg-[#2c6774] hover:bg-[#1e4e56] disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}

          <button
            onClick={() => {
              setIsForgotPassword(false);
              setResetStep('email');
              resetForm();
            }}
            className="w-full text-center text-sm text-gray-600 hover:underline mt-4"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#5c878f]/90 to-transparent"></div>

      <div className="relative z-10 w-full max-w-md bg-white/95 rounded-2xl shadow-2xl px-8 py-10">
        <h1 className="text-2xl font-semibold text-center text-[#2c6774]">
          {isSignIn ? "Welcome to QuickCure" : "Create an Account"}
        </h1>

        {/* Backend Error Message - Top of all fields */}
        {backendError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm flex items-center gap-2">
              {/* <FaExclamationTriangle className="text-sm" /> */}
              {backendError}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          {!isSignIn && (
            <div>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  placeholder="Username"
                  className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c6774] ${
                    errors.username ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (touchedFields.username) {
                      setErrors(prev => ({ ...prev, username: validateUsername(e.target.value) }));
                    }
                  }}
                  onBlur={() => handleBlur('username')}
                />
              </div>
              <ErrorMessage error={errors.username} />
            </div>
          )}

          <div>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c6774] ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                value={email}
                onChange={handleEmailChange}
                onBlur={() => handleBlur('email')}
              />
            </div>
            
            {/* Show domain validation status like BookingPage */}
            {email && email.includes("@") && (
              <div className="mt-1">
                {isEmailDomainAllowed(email) ? (
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    {/* <FaCheckCircle className="text-xs" />
                    Valid domain: {email.split('@')[1]} */}
                  </p>
                ) : (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    {/* <FaExclamationTriangle className="text-xs" />
                    Please enter a valid domain name (gmail.com, etc.) */}
                  </p>
                )}
              </div>
            )}
            
            <ErrorMessage error={errors.email} />
          </div>

          {/* OTP Section for Signup */}
          {!isSignIn && email && !otpVerified && (
            <div className="space-y-2">
              {!otpSent ? (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={loading || !!errors.email}
                  className="w-full py-2 bg-gray-100 text-[#2c6774] border border-[#2c6774] rounded-md hover:bg-gray-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              ) : (
                <div className="space-y-2">
                  <div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c6774] ${
                          errors.otp ? 'border-red-500' : 'border-gray-300'
                        }`}
                        value={otp}
                        onChange={(e) => {
                          setOtp(e.target.value);
                          if (touchedFields.otp) {
                            setErrors(prev => ({ ...prev, otp: validateOtp(e.target.value) }));
                          }
                        }}
                        onBlur={() => handleBlur('otp')}
                        onKeyPress={handleOtpKeyPress}
                        maxLength={6}
                      />
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={loading || timer === 0 || !!errors.otp}
                        className="px-4 py-2 bg-[#2c6774] text-white rounded-md hover:bg-[#1e4e56] disabled:bg-gray-400"
                      >
                        Verify
                      </button>
                    </div>
                    <ErrorMessage error={errors.otp} />
                  </div>
                  {timer > 0 ? (
                    <p className="text-sm text-gray-600">Resend OTP in {timer}s</p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="text-sm text-[#2c6774] hover:underline"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          <div>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c6774] ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => handleBlur('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <ErrorMessage error={errors.password} />
          </div>

          {isSignIn && (
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              
              <button
                type="button"
                onClick={() => setIsForgotPassword(true)}
                className="text-sm text-[#2c6774] hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !isFormValid()}
            className={`w-full py-2 rounded-md text-white transition ${
              loading || !isFormValid()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#2c6774] hover:bg-[#1e4e56]"
            }`}
          >
            {loading ? "Please wait..." : isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>

        {isSignIn && (
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full mt-4 flex items-center justify-center gap-3 py-2 border rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <img src={googleLogo} className="w-5 h-5" alt="Google" />
            Sign in with Google
          </button>
        )}

        <p className="text-center text-sm mt-4">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-[#2c6774] font-semibold cursor-pointer hover:underline"
            onClick={() => {
              setIsSignIn(!isSignIn);
              resetForm();
            }}
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </div>
    </div>
  );
}
