
// import React, { useState } from "react";
// import "./LoginPage.css";
// import googleLogo from "../../images/google.png";
// import backgroundImage from "../../images/background.png";
// import { auth, provider } from "../../firebase";
// import { signInWithPopup } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

// export default function LoginPage() {
//   const [isSignIn, setIsSignIn] = useState(true);
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isSignIn) {
//       alert("Sign In submitted!");
//     } else {
//       alert("Sign Up submitted!");
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       console.log("Google User:", user);

//       alert(`Welcome, ${user.displayName}!`);
//       navigate("/doctors"); // Redirect after login
//     } catch (error) {
//       console.error("Google Sign-In Error:", error);
//       alert("Google Sign-In Failed. Check console for details.");
//     }
//   };

//   // ✅ handle close/back
//   const handleClose = () => {
//     navigate(-1); // goes back to the previous page
//     // or you can use navigate("/") to go to home page
//   };

//   return (
//     <div className="auth-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
//       <div className="overlay"></div>

//       <div className="auth-box">
//         {/* ✅ Cross Button */}
//         <button className="close-btn" onClick={handleClose}>
//           ✖
//         </button>

//         <h1 className="title">{isSignIn ? "Welcome to QuickCure" : "Create an Account"}</h1>
//         <p className="subtitle">{isSignIn ? "Please enter your details" : "Please fill in your details"}</p>

//         <form onSubmit={handleSubmit}>
//           <label>Email</label>
//           <input type="email" placeholder="Enter your email" required />

//           <label>Password</label>
//           <input type="password" placeholder="Enter your password" required />

//           {/* {!isSignIn && (
//             <>
//               <label>Date of Birth</label>
//               <input type="date" required />
//             </>
//           )} */}

//           {isSignIn && (
//             <div className="remember-row">
//               <label>
//                 <input type="checkbox" /> Remember me
//               </label>
//               <a href="#">Forgot password?</a>
//             </div>
//           )}

//           <button type="submit" className="primary-btn">
//             {isSignIn ? "Sign In" : "Sign Up"}
//           </button>
//         </form>

//         {isSignIn && (
//           <>
//             <div className="divider">
//               <span></span>
//               <p>or</p>
//               <span></span>
//             </div>
//             <button type="button" className="google-btn" onClick={handleGoogleSignIn}>
//               <img src={googleLogo} alt="Google Logo" />
//               Sign in with Google
//             </button>
//           </>
//         )}

//         <p className="toggle-text">
//           {isSignIn ? "Don’t have an account? " : "Already have an account? "}
//           <span onClick={() => setIsSignIn(!isSignIn)}>
//             {isSignIn ? "Sign Up" : "Sign In"}
//           </span>
//         </p>

//         {!isSignIn && (
//           <p className="terms-text">
//             By signing up, I agree to QuickCure <a href="#">Terms of Use</a> & <a href="#">Privacy Policy</a>.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import "./LoginPage.css";
// import googleLogo from "../../images/google.png";
// import backgroundImage from "../../images/background.png";
// import { auth, provider } from "../../firebase";
// import { signInWithPopup } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

// export default function LoginPage() {
//   const [isSignIn, setIsSignIn] = useState(true);
//   const [username, setUsername] = useState(""); 
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const url = isSignIn
//       ? "http://localhost:5000/api/users/login"
//       : "http://localhost:5000/api/users/register";

//     // ✅ Send username only for registration
//     const payload = isSignIn ? { email, password } : { username, email, password };

//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Something went wrong");
//       }

//       console.log("API Response:", data);

//       if (isSignIn) {
//         alert("Login successful!");
//         navigate("/");
//       } else {
//         alert("Registration successful!");
//         setIsSignIn(true);
//         setUsername("");
//         setEmail("");
//         setPassword("");
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert(error.message || "Failed to connect to server");
//     }
//   };

//   // ✅ Google Login
//   const handleGoogleSignIn = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       console.log("Google User:", user);

//       alert(`Welcome, ${user.displayName}!`);
//       navigate("/");
//     } catch (error) {
//       console.error("Google Sign-In Error:", error);
//       alert("Google Sign-In Failed. Check console for details.");
//     }
//   };

//   // Close / Back button
//   const handleClose = () => {
//     navigate(-1);
//   };

//   return (
//     <div
//       className="auth-container"
//       style={{ backgroundImage: `url(${backgroundImage})` }}
//     >
//       <div className="overlay"></div>

//       <div className="auth-box">
//         {/*  Close Button */}
//         <button className="close-btn" onClick={handleClose}>
//           ✖
//         </button>

//         <h1 className="title">
//           {isSignIn ? "Welcome to QuickCure" : "Create an Account"}
//         </h1>
//         <p className="subtitle">
//           {isSignIn
//             ? "Please enter your details"
//             : "Please fill in your details"}
//         </p>

//         <form onSubmit={handleSubmit}>
//           {/* Show username only when signing up */}
//           {!isSignIn && (
//             <>
//               <label>Username</label>
//               <input
//                 type="text"
//                 placeholder="Enter your username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </>
//           )}

//           <label>Email</label>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <label>Password</label>
//           <input
//             type="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           {isSignIn && (
//             <div className="remember-row">
//               <label>
//                 <input type="checkbox" /> Remember me
//               </label>
//               <a href="#">Forgot password?</a>
//             </div>
//           )}

//           <button type="submit" className="primary-btn">
//             {isSignIn ? "Sign In" : "Sign Up"}
//           </button>
//         </form>

//         {isSignIn && (
//           <>
//             <div className="divider">
//               <span></span>
//               <p>or</p>
//               <span></span>
//             </div>
//             <button
//               type="button"
//               className="google-btn"
//               onClick={handleGoogleSignIn}
//             >
//               <img src={googleLogo} alt="Google Logo" />
//               Sign in with Google
//             </button>
//           </>
//         )}

//         <p className="toggle-text">
//           {isSignIn
//             ? "Don’t have an account? "
//             : "Already have an account? "}
//           <span onClick={() => setIsSignIn(!isSignIn)}>
//             {isSignIn ? "Sign Up" : "Sign In"}
//           </span>
//         </p>

//         {!isSignIn && (
//           <p className="terms-text">
//             By signing up, I agree to QuickCure{" "}
//             <a href="#">Terms of Use</a> &{" "}
//             <a href="#">Privacy Policy</a>.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import "./LoginPage.css";
// import googleLogo from "../../images/google.png";
// import backgroundImage from "../../images/background.png";

// // Firebase
// import { auth, provider } from "../../firebase";
// import { signInWithPopup } from "firebase/auth";

// import { useNavigate } from "react-router-dom";

// export default function LoginPage() {
//   const [isSignIn, setIsSignIn] = useState(true);
//   const [username, setUsername] = useState(""); 
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // ---------------------------
//   // HANDLE LOGIN & SIGNUP
//   // ---------------------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true);

//     const url = isSignIn
//       ? "http://localhost:5000/api/users/login"
//       : "http://localhost:5000/api/users/register";

//     const payload = isSignIn
//       ? { email, password }
//       : { username, email, password };

//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (!response.ok) throw new Error(data.message || "Something went wrong");

//       // Save token to localStorage
//       if (data.token) {
//         localStorage.setItem("token", data.token);
//       }

//       alert(isSignIn ? "Login successful!" : "Registration successful!");

//       // Reset form values
//       if (!isSignIn) {
//         setIsSignIn(true);
//         setUsername("");
//         setEmail("");
//         setPassword("");
//       }

//       navigate("/");
//     } catch (error) {
//       console.error("Error:", error);
//       alert(error.message);
//     }

//     setLoading(false);
//   };

//   // ---------------------------
//   // GOOGLE AUTH
//   // ---------------------------
//   const handleGoogleSignIn = async () => {
//     try {
//       setLoading(true);
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       // Save Google token or UID as login token
//       localStorage.setItem("token", user.uid);

//       alert(`Welcome, ${user.displayName}!`);
//       navigate("/");
//     } catch (error) {
//       alert("Google Sign-In Failed");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => navigate(-1);

//   // ---------------------------
//   // CLEAR FORM WHEN TOGGLE
//   // ---------------------------
//   const toggleForm = () => {
//     setIsSignIn(!isSignIn);
//     setUsername("");
//     setEmail("");
//     setPassword("");
//   };

//   return (
//     <div
//       className="auth-container"
//       style={{ backgroundImage: `url(${backgroundImage})` }}
//     >
//       <div className="overlay"></div>

//       <div className="auth-box">
//         <button className="close-btn" onClick={handleClose}>✖</button>

//         <h1 className="title">
//           {isSignIn ? "Welcome to QuickCure" : "Create an Account"}
//         </h1>

//         <p className="subtitle">
//           {isSignIn ? "Please enter your details" : "Please fill in your details"}
//         </p>

//         <form onSubmit={handleSubmit}>
//           {!isSignIn && (
//             <>
//               <label>Username</label>
//               <input
//                 type="text"
//                 placeholder="Enter your username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </>
//           )}

//           <label>Email</label>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <label>Password</label>
//           <input
//             type="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           {isSignIn && (
//             <div className="remember-row">
//               <label>
//                 <input type="checkbox" /> Remember me
//               </label>
//               <a href="#">Forgot password?</a>
//             </div>
//           )}

//           <button type="submit" className="primary-btn" disabled={loading}>
//             {loading ? "Please wait..." : isSignIn ? "Sign In" : "Sign Up"}
//           </button>
//         </form>

//         {isSignIn && (
//           <>
//             <div className="divider">
//               <span></span>
//               <p>or</p>
//               <span></span>
//             </div>

//             <button
//               type="button"
//               className="google-btn"
//               onClick={handleGoogleSignIn}
//               disabled={loading}
//             >
//               <img src={googleLogo} alt="Google Logo" />
//               Sign in with Google
//             </button>
//           </>
//         )}

//         <p className="toggle-text">
//           {isSignIn ? "Don’t have an account? " : "Already have an account? "}
//           <span onClick={toggleForm}>
//             {isSignIn ? "Sign Up" : "Sign In"}
//           </span>
//         </p>

//         {!isSignIn && (
//           <p className="terms-text">
//             By signing up, I agree to QuickCure{" "}
//             <a href="#">Terms of Use</a> &{" "}
//             <a href="#">Privacy Policy</a>.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import "./LoginPage.css";
// import googleLogo from "../../images/google.png";
// import backgroundImage from "../../images/background.png";

// // Firebase
// import { auth, provider } from "../../firebase";
// import { signInWithPopup } from "firebase/auth";

// import { useNavigate } from "react-router-dom";

// export default function LoginPage({ onLogin }) {
//   const [isSignIn, setIsSignIn] = useState(true);
//   const [username, setUsername] = useState(""); 
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // ---------------------------
//   // HANDLE LOGIN & SIGNUP
//   // ---------------------------
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!email || !password) {
//       alert("Please fill in all required fields");
//       return;
//     }

//     if (!isSignIn && !username) {
//       alert("Please enter a username");
//       return;
//     }

//     setLoading(true);

//     const url = isSignIn
//       ? "http://localhost:5000/api/users/login"
//       : "http://localhost:5000/api/users/register";

//     const payload = isSignIn
//       ? { email, password }
//       : { username, email, password };

//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Something went wrong");
//       }

//       // Save token to localStorage and user info
//       if (data.token) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user || { email, username }));
//       }

//       alert(isSignIn ? "Login successful!" : "Registration successful!");

//       // Call the onLogin callback to update parent component
//       if (onLogin) {
//         onLogin(data.user || { email, username });
//       }

//       // Reset form values
//       setUsername("");
//       setEmail("");
//       setPassword("");

//       navigate("/");
//     } catch (error) {
//       console.error("Error:", error);
//       alert(error.message);
//     }

//     setLoading(false);
//   };

//   // ---------------------------
//   // GOOGLE AUTH
//   // ---------------------------
//   const handleGoogleSignIn = async () => {
//     try {
//       setLoading(true);
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       // Save Google user info
//       const userInfo = {
//         uid: user.uid,
//         email: user.email,
//         displayName: user.displayName,
//         photoURL: user.photoURL
//       };

//       localStorage.setItem("token", user.uid);
//       localStorage.setItem("user", JSON.stringify(userInfo));

//       // Call the onLogin callback
//       if (onLogin) {
//         onLogin(userInfo);
//       }

//       alert(`Welcome, ${user.displayName}!`);
//       navigate("/");
//     } catch (error) {
//       alert("Google Sign-In Failed");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => navigate(-1);

//   // ---------------------------
//   // CLEAR FORM WHEN TOGGLE
//   // ---------------------------
//   const toggleForm = () => {
//     setIsSignIn(!isSignIn);
//     setUsername("");
//     setEmail("");
//     setPassword("");
//   };

//   return (
//     <div
//       className="auth-container"
//       style={{ backgroundImage: `url(${backgroundImage})` }}
//     >
//       <div className="overlay"></div>

//       <div className="auth-box">
//         <button className="close-btn" onClick={handleClose}>✖</button>

//         <h1 className="title">
//           {isSignIn ? "Welcome to QuickCure" : "Create an Account"}
//         </h1>

//         <p className="subtitle">
//           {isSignIn ? "Please enter your details" : "Please fill in your details"}
//         </p>

//         <form onSubmit={handleSubmit}>
//           {!isSignIn && (
//             <>
//               <label>Username</label>
//               <input
//                 type="text"
//                 placeholder="Enter your username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </>
//           )}

//           <label>Email</label>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <label>Password</label>
//           <input
//             type="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             minLength="6"
//           />

//           {isSignIn && (
//             <div className="remember-row">
//               <label>
//                 <input type="checkbox" /> Remember me
//               </label>
//               <a href="#">Forgot password?</a>
//             </div>
//           )}

//           <button type="submit" className="primary-btn" disabled={loading}>
//             {loading ? "Please wait..." : isSignIn ? "Sign In" : "Sign Up"}
//           </button>
//         </form>

//         {isSignIn && (
//           <>
//             <div className="divider">
//               <span></span>
//               <p>or</p>
//               <span></span>
//             </div>

//             <button
//               type="button"
//               className="google-btn"
//               onClick={handleGoogleSignIn}
//               disabled={loading}
//             >
//               <img src={googleLogo} alt="Google Logo" />
//               Sign in with Google
//             </button>
//           </>
//         )}

//         <p className="toggle-text">
//           {isSignIn ? "Don't have an account? " : "Already have an account? "}
//           <span onClick={toggleForm}>
//             {isSignIn ? "Sign Up" : "Sign In"}
//           </span>
//         </p>

//         {!isSignIn && (
//           <p className="terms-text">
//             By signing up, I agree to QuickCure{" "}
//             <a href="#">Terms of Use</a> &{" "}
//             <a href="#">Privacy Policy</a>.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import "./LoginPage.css";
import googleLogo from "../../images/google.png";
import backgroundImage from "../../images/background.png";

// Firebase
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";

import { useNavigate } from "react-router-dom";

export default function LoginPage({ onLogin }) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ---------------------------
  // RESET FORM FUNCTION
  // ---------------------------
  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  
  // ---------------------------
  // HANDLE LOGIN & SIGNUP
  // ---------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      alert("Please fill in all required fields");
      return;
    }

    if (!isSignIn && !username) {
      alert("Please enter a username");
      return;
    }

    setLoading(true);

    const url = isSignIn
      ? "http://localhost:5000/api/users/login"
      : "http://localhost:5000/api/users/register";

    const payload = isSignIn
      ? { email, password }
      : { username, email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Save token to localStorage and user info
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user || { email, username }));
      }

      alert(isSignIn ? "Login successful!" : "Registration successful!");

      // Call the onLogin callback to update parent component
      if (onLogin) {
        onLogin(data.user || { email, username });
      }

      // ✅ RESET FORM FIELDS AFTER SUCCESSFUL LOGIN/REGISTRATION
      resetForm();

      // Reset to sign in form after registration
      if (!isSignIn) {
        setIsSignIn(true);
      }

      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }

    setLoading(false);
  };

  // ---------------------------
  // GOOGLE AUTH
  // ---------------------------
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save Google user info
      const userInfo = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      };

      localStorage.setItem("token", user.uid);
      localStorage.setItem("user", JSON.stringify(userInfo));

      // Call the onLogin callback
      if (onLogin) {
        onLogin(userInfo);
      }

      // ✅ RESET FORM FIELDS AFTER SUCCESSFUL GOOGLE LOGIN
      resetForm();

      alert(`Welcome, ${user.displayName}!`);
      navigate("/");
    } catch (error) {
      alert("Google Sign-In Failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => navigate(-1);

  // ---------------------------
  // CLEAR FORM WHEN TOGGLE
  // ---------------------------
  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    resetForm(); // ✅ Use resetForm function here too
  };

  return (
    <div
      className="auth-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="overlay"></div>

      <div className="auth-box">
        <button className="close-btn" onClick={handleClose}>✖</button>

        <h1 className="title">
          {isSignIn ? "Welcome to QuickCure" : "Create an Account"}
        </h1>

        <p className="subtitle">
          {isSignIn ? "Please enter your details" : "Please fill in your details"}
        </p>

        <form onSubmit={handleSubmit}>
          {!isSignIn && (
            <>
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </>
          )}

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />

          {isSignIn && (
            <div className="remember-row">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>
          )}

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? "Please wait..." : isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>

        {isSignIn && (
          <>
            <div className="divider">
              <span></span>
              <p>or</p>
              <span></span>
            </div>

            <button
              type="button"
              className="google-btn"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <img src={googleLogo} alt="Google Logo" />
              Sign in with Google
            </button>
          </>
        )}

        <p className="toggle-text">
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          <span onClick={toggleForm}>
            {isSignIn ? "Sign Up" : "Sign In"}
          </span>
        </p>

        {!isSignIn && (
          <p className="terms-text">
            By signing up, I agree to QuickCure{" "}
            <a href="#">Terms of Use</a> &{" "}
            <a href="#">Privacy Policy</a>.
          </p>
        )}
      </div>
    </div>
  );
}