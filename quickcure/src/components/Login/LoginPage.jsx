
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
//   // RESET FORM FUNCTION
//   // ---------------------------
//   const resetForm = () => {
//     setUsername("");
//     setEmail("");
//     setPassword("");
//   };

  
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

//       //  RESET FORM FIELDS AFTER SUCCESSFUL LOGIN/REGISTRATION
//       resetForm();

//       // Reset to sign in form after registration
//       if (!isSignIn) {
//         setIsSignIn(true);
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

//       // RESET FORM FIELDS AFTER SUCCESSFUL GOOGLE LOGIN
//       resetForm();

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
//     resetForm(); // ✅ Use resetForm function here too
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


// import React, { useState } from "react";
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

//   const resetForm = () => {
//     setUsername("");
//     setEmail("");
//     setPassword("");
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!email || !password) return alert("Fill all fields");
//   if (!isSignIn && !username) return alert("Enter username");

//   setLoading(true);

//   const url = isSignIn
//     ? "http://localhost:5000/api/users/login"
//     : "http://localhost:5000/api/users/signup";

//   const payload = isSignIn
//     ? { email, password }
//     : { username, email, password };

//   try {
//     const res = await fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || "Something went wrong");

//     // ✅ LOGIN FLOW
//     if (isSignIn) {
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));
//       onLogin?.(data.user);
//       navigate("/");
//     } 
//     // ✅ SIGNUP FLOW
//     else {
//       alert("Account created successfully. Please login.");
//       setIsSignIn(true);   // go to login screen
//       resetForm();
//     }

//   } catch (err) {
//     alert(err.message);
//   } finally {
//     setLoading(false);
//   }
// };

//   const handleGoogleSignIn = async () => {
//     try {
//       setLoading(true);
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       localStorage.setItem("token", user.uid);
//       localStorage.setItem("user", JSON.stringify(user));

//       onLogin?.(user);
//       resetForm();
//       navigate("/");
//     } catch {
//       alert("Google Sign-In Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
//       style={{ backgroundImage: `url(${backgroundImage})` }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-r from-[#5c878f]/90 to-transparent"></div>

//       {/* Card */}
//       <div className="relative z-10 w-full max-w-md bg-white/95 rounded-2xl shadow-2xl px-8 py-10">
//         <button
//           onClick={() => navigate(-1)}
//           className="absolute top-3 right-4 text-xl text-gray-400 hover:text-[#2c6774]"
//         >
//           ✖
//         </button>

//         <h1 className="text-2xl font-semibold text-center text-[#2c6774]">
//           {isSignIn ? "Welcome to QuickCure" : "Create an Account"}
//         </h1>

//         <p className="text-sm text-center text-[#174047] mt-1 mb-6">
//           {isSignIn ? "Please enter your details" : "Please fill in your details"}
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {!isSignIn && (
//             <div>
//               <label className="text-sm text-[#174047]">Username</label>
//               <input
//                 className="w-full mt-1 px-3 py-2 border rounded-md outline-none focus:border-[#2c6774]"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </div>
//           )}

//           <div>
//             <label className="text-sm text-[#174047]">Email</label>
//             <input
//               type="email"
//               className="w-full mt-1 px-3 py-2 border rounded-md outline-none focus:border-[#2c6774]"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="text-sm text-[#174047]">Password</label>
//             <input
//               type="password"
//               className="w-full mt-1 px-3 py-2 border rounded-md outline-none focus:border-[#2c6774]"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           {isSignIn && (
//             <div className="flex justify-between items-center text-sm">
//               <label className="flex items-center gap-2">
//                 <input type="checkbox" />
//                 Remember me
//               </label>
//               <a className="text-[#2c6774] hover:underline cursor-pointer">
//                 Forgot password?
//               </a>
//             </div>
//           )}

//           <button
//             disabled={loading}
//             className="w-full py-2 rounded-md bg-[#2c6774] text-white hover:bg-[#1e4e56] transition"
//           >
//             {loading ? "Please wait..." : isSignIn ? "Sign In" : "Sign Up"}
//           </button>
//         </form>

//         {isSignIn && (
//           <>
//             <div className="flex items-center gap-3 my-6">
//               <span className="flex-1 h-px bg-gray-300"></span>
//               <p className="text-sm text-gray-500">or</p>
//               <span className="flex-1 h-px bg-gray-300"></span>
//             </div>

//             <button
//               onClick={handleGoogleSignIn}
//               className="w-full flex items-center justify-center gap-3 py-2 border rounded-md hover:bg-gray-100 transition"
//             >
//               <img src={googleLogo} className="w-5 h-5" />
//               Sign in with Google
//             </button>
//           </>
//         )}

//         <p className="text-center text-sm mt-4">
//           {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
//           <span
//             className="text-[#2c6774] font-semibold cursor-pointer hover:underline"
//             onClick={() => {
//               setIsSignIn(!isSignIn);
//               resetForm();
//             }}
//           >
//             {isSignIn ? "Sign Up" : "Sign In"}
//           </span>
//         </p>

//         {!isSignIn && (
//           <p className="text-xs text-center text-gray-500 mt-3">
//             By signing up, you agree to our{" "}
//             <span className="text-[#2c6774]">Terms</span> &{" "}
//             <span className="text-[#2c6774]">Privacy Policy</span>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
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

//   const resetForm = () => {
//     setUsername("");
//     setEmail("");
//     setPassword("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) return alert("Fill all fields");
//     if (!isSignIn && !username) return alert("Enter username");

//     setLoading(true);

//     const signupUrl = "http://localhost:5000/api/users/signup";
//     const loginUrl = "http://localhost:5000/api/users/login";

//     try {
//       // ---------------- LOGIN ----------------
//       if (isSignIn) {
//         const res = await fetch(loginUrl, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, password }),
//         });

//         const data = await res.json();
//         if (!res.ok) throw new Error(data.message);

//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));
//         onLogin?.(data.user);
//         navigate("/");
//       }

//       // ---------------- SIGNUP + AUTO LOGIN ----------------
//       else {
//         // 1️⃣ SIGNUP
//         const signupRes = await fetch(signupUrl, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             name: username, // 🔴 backend expects `name`
//             email,
//             password,
//           }),
//         });

//         const signupData = await signupRes.json();
//         if (!signupRes.ok) throw new Error(signupData.message);

//         // 2️⃣ AUTO LOGIN
//         const loginRes = await fetch(loginUrl, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, password }),
//         });

//         const loginData = await loginRes.json();
//         if (!loginRes.ok) throw new Error(loginData.message);

//         localStorage.setItem("token", loginData.token);
//         localStorage.setItem("user", JSON.stringify(loginData.user));
//         onLogin?.(loginData.user);
//         navigate("/");
//       }
//     } catch (err) {
//       alert(err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//       resetForm();
//     }
//   };

//   // ---------------- GOOGLE LOGIN ----------------
//   const handleGoogleSignIn = async () => {
//     try {
//       setLoading(true);
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       localStorage.setItem("token", user.uid);
//       localStorage.setItem("user", JSON.stringify(user));
//       onLogin?.(user);
//       navigate("/");
//     } catch {
//       alert("Google Sign-In Failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
//       style={{ backgroundImage: `url(${backgroundImage})` }}
//     >
//       <div className="absolute inset-0 bg-gradient-to-r from-[#5c878f]/90 to-transparent"></div>

//       <div className="relative z-10 w-full max-w-md bg-white/95 rounded-2xl shadow-2xl px-8 py-10">
//         <h1 className="text-2xl font-semibold text-center text-[#2c6774]">
//           {isSignIn ? "Welcome to QuickCure" : "Create an Account"}
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-4 mt-6">
//           {!isSignIn && (
//             <input
//               placeholder="Username"
//               className="w-full px-3 py-2 border rounded-md"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           )}

//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full px-3 py-2 border rounded-md"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full px-3 py-2 border rounded-md"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-2 rounded-md text-white transition ${
//               loading
//                 ? "bg-gray-400"
//                 : "bg-[#2c6774] hover:bg-[#1e4e56]"
//             }`}
//           >
//             {loading ? "Please wait..." : isSignIn ? "Sign In" : "Sign Up"}
//           </button>
//         </form>

//         {isSignIn && (
//           <button
//             onClick={handleGoogleSignIn}
//             className="w-full mt-4 flex items-center justify-center gap-3 py-2 border rounded-md"
//           >
//             <img src={googleLogo} className="w-5 h-5" />
//             Sign in with Google
//           </button>
//         )}

//         <p className="text-center text-sm mt-4">
//           {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
//           <span
//             className="text-[#2c6774] font-semibold cursor-pointer"
//             onClick={() => {
//               setIsSignIn(!isSignIn);
//               resetForm();
//             }}
//           >
//             {isSignIn ? "Sign Up" : "Sign In"}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }













import React, { useState } from "react";
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

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  // ✅ ADDED: Function to handle redirect after login
  const handleRedirectAfterLogin = () => {
    // Get query parameters from URL
    const queryParams = new URLSearchParams(window.location.search);
    const redirectUrl = queryParams.get('redirect');
    const doctorId = queryParams.get('doctorId');

    // If doctorId is present, go directly to booking page
    if (doctorId) {
      navigate(`/book-appointment/${doctorId}`);
    } 
    // If redirect URL exists, go back to that page
    else if (redirectUrl) {
      navigate(decodeURIComponent(redirectUrl));
    } 
    // Default: go to home page
    else {
      navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) return alert("Fill all fields");
    if (!isSignIn && !username) return alert("Enter username");

    setLoading(true);

    const signupUrl = "http://localhost:5000/api/users/signup";
    const loginUrl = "http://localhost:5000/api/users/login";

    try {
      // ---------------- LOGIN ----------------
      if (isSignIn) {
        const res = await fetch(loginUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        onLogin?.(data.user);
        
        // ✅ UPDATED: Use redirect function
        handleRedirectAfterLogin();
      }

      // ---------------- SIGNUP + AUTO LOGIN ----------------
      else {
        // 1️⃣ SIGNUP
        const signupRes = await fetch(signupUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: username, // 🔴 backend expects `name`
            email,
            password,
          }),
        });

        const signupData = await signupRes.json();
        if (!signupRes.ok) throw new Error(signupData.message);

        // 2️⃣ AUTO LOGIN
        const loginRes = await fetch(loginUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const loginData = await loginRes.json();
        if (!loginRes.ok) throw new Error(loginData.message);

        localStorage.setItem("token", loginData.token);
        localStorage.setItem("user", JSON.stringify(loginData.user));
        onLogin?.(loginData.user);
        
        // ✅ UPDATED: Use redirect function
        handleRedirectAfterLogin();
      }
    } catch (err) {
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
      resetForm();
    }
  };

  // ---------------- GOOGLE LOGIN ----------------
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      localStorage.setItem("token", user.uid);
      localStorage.setItem("user", JSON.stringify(user));
      onLogin?.(user);
      
      // ✅ UPDATED: Use redirect function
      handleRedirectAfterLogin();
    } catch {
      alert("Google Sign-In Failed");
    } finally {
      setLoading(false);
    }
  };

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

        {/* ✅ ADDED: Show redirect info if coming from booking */}
        {/* {window.location.search.includes('doctorId') && (
          // <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          //   <p className="text-sm text-blue-800 text-center">
          //     Login to book your appointment
          //   </p>
          // </div>
        )} */}

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          {!isSignIn && (
            <input
              placeholder="Username"
              className="w-full px-3 py-2 border rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white transition ${
              loading
                ? "bg-gray-400"
                : "bg-[#2c6774] hover:bg-[#1e4e56]"
            }`}
          >
            {loading ? "Please wait..." : isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>

        {isSignIn && (
          <button
            onClick={handleGoogleSignIn}
            className="w-full mt-4 flex items-center justify-center gap-3 py-2 border rounded-md"
          >
            <img src={googleLogo} className="w-5 h-5" />
            Sign in with Google
          </button>
        )}

        <p className="text-center text-sm mt-4">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-[#2c6774] font-semibold cursor-pointer"
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



// import React, { useState } from "react";
// import googleLogo from "../../images/google.png";
// import backgroundImage from "../../images/background.png";

// // Firebase
// import { auth, provider } from "../../firebase";
// import { signInWithPopup } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

// // ✅ API Configuration
// const API_BASE_URL = "http://localhost:5000/api/users";

// export default function LoginPage({ onLogin }) {
//   const [isSignIn, setIsSignIn] = useState(true);
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const resetForm = () => {
//     setUsername("");
//     setEmail("");
//     setPassword("");
//     setConfirmPassword("");
//     setErrors({});
//     setTouched({});
//   };

//   // ✅ Real-time validation on blur
//   const handleBlur = (field) => {
//     setTouched({ ...touched, [field]: true });
//   };

//   // ✅ Form validation before submission
//   const validateForm = () => {
//     const newErrors = {};
    
//     // Basic frontend validation
//     if (!email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = "Please enter a valid email address";
//     }
    
//     if (!password) {
//       newErrors.password = "Password is required";
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }
    
//     // Signup-specific validations
//     if (!isSignIn) {
//       if (!username.trim()) {
//         newErrors.username = "Username is required";
//       } else if (username.length < 3) {
//         newErrors.username = "Username must be at least 3 characters";
//       }
      
//       if (!confirmPassword) {
//         newErrors.confirmPassword = "Please confirm your password";
//       } else if (password !== confirmPassword) {
//         newErrors.confirmPassword = "Passwords do not match";
//       }
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // ✅ Redirect logic
//   const handleRedirectAfterLogin = () => {
//     const queryParams = new URLSearchParams(window.location.search);
//     const redirectUrl = queryParams.get("redirect");
//     const doctorId = queryParams.get("doctorId");

//     if (doctorId) {
//       navigate(`/book-appointment/${doctorId}`);
//     } else if (redirectUrl) {
//       navigate(decodeURIComponent(redirectUrl));
//     } else {
//       navigate("/");
//     }
//   };

//   // ✅ API: User Login
//   const apiLogin = async (email, password) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           password,
//           remember: true // You can make this configurable
//         }),
//       });

//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.msg || "Login failed");
//       }

//       return data;
//     } catch (error) {
//       throw error;
//     }
//   };

//   // ✅ API: User Signup
//   const apiSignup = async (name, email, password) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/signup`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//           role: "user" // Default role
//         }),
//       });

//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.msg || "Signup failed");
//       }

//       return data;
//     } catch (error) {
//       throw error;
//     }
//   };

//   // ✅ API: Google Login
//   const apiGoogleLogin = async (googleUser) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/google`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: googleUser.email,
//           name: googleUser.displayName || googleUser.email.split('@')[0],
//           googleId: googleUser.uid,
//           role: "user"
//         }),
//       });

//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.msg || "Google login failed");
//       }

//       return data;
//     } catch (error) {
//       throw error;
//     }
//   };

//   // ✅ Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Mark all fields as touched for error display
//     const allFields = ["email", "password"];
//     if (!isSignIn) {
//       allFields.push("username", "confirmPassword");
//     }
//     const touchedFields = {};
//     allFields.forEach(field => touchedFields[field] = true);
//     setTouched(touchedFields);

//     if (!validateForm()) return;

//     setLoading(true);
//     setErrors({ ...errors, api: "" });

//     try {
//       if (isSignIn) {
//         // Login
//         const data = await apiLogin(email, password);
        
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));
//         onLogin?.(data.user);
//         handleRedirectAfterLogin();
//       } else {
//         // Signup
//         const signupData = await apiSignup(username, email, password);
        
//         // Auto login after successful signup
//         const loginData = await apiLogin(email, password);
        
//         localStorage.setItem("token", loginData.token);
//         localStorage.setItem("user", JSON.stringify(loginData.user));
//         onLogin?.(loginData.user);
//         handleRedirectAfterLogin();
//       }
//     } catch (err) {
//       setErrors({ api: err.message || "Something went wrong. Please try again." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Google Login
//   const handleGoogleSignIn = async () => {
//     try {
//       setLoading(true);
//       setErrors({ ...errors, api: "" });
      
//       const result = await signInWithPopup(auth, provider);
//       const googleUser = result.user;

//       // Send Google user data to your backend
//       const data = await apiGoogleLogin(googleUser);
      
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));
//       onLogin?.(data.user);
//       handleRedirectAfterLogin();
//     } catch (error) {
//       console.error("Google Sign-In Error:", error);
//       setErrors({ api: error.message || "Google Sign-In Failed" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
//       style={{ backgroundImage: `url(${backgroundImage})` }}
//     >
//       <div className="absolute inset-0 bg-gradient-to-r from-[#5c878f]/90 to-transparent"></div>

//       <div className="relative z-10 w-full max-w-md bg-white/95 rounded-2xl shadow-2xl px-8 py-10">
//         <h1 className="text-2xl font-semibold text-center text-[#2c6774]">
//           {isSignIn ? "Welcome to QuickCure" : "Create an Account"}
//         </h1>

//         {/* API Error Display */}
//         {errors.api && (
//           <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
//             <p className="text-red-600 text-sm text-center font-medium">
//               {errors.api}
//             </p>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4 mt-6">
//           {/* Username Field (Signup only) */}
//           {!isSignIn && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Full Name *
//               </label>
//               <input
//                 placeholder="Enter your full name"
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c6774]/50 ${
//                   errors.username && touched.username
//                     ? "border-red-500"
//                     : "border-gray-300"
//                 }`}
//                 value={username}
//                 onChange={(e) => {
//                   setUsername(e.target.value);
//                   if (errors.username) {
//                     setErrors({ ...errors, username: "" });
//                   }
//                 }}
//                 onBlur={() => handleBlur("username")}
//                 disabled={loading}
//               />
//               {errors.username && touched.username && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.username}
//                 </p>
//               )}
//             </div>
//           )}

//           {/* Email Field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email *
//             </label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c6774]/50 ${
//                 errors.email && touched.email
//                   ? "border-red-500"
//                   : "border-gray-300"
//               }`}
//               value={email}
//               onChange={(e) => {
//                 setEmail(e.target.value);
//                 if (errors.email) {
//                   setErrors({ ...errors, email: "" });
//                 }
//               }}
//               onBlur={() => handleBlur("email")}
//               disabled={loading}
//             />
//             {errors.email && touched.email && (
//               <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//             )}
//           </div>

//           {/* Password Field */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password *
//             </label>
//             <input
//               type="password"
//               placeholder="Enter password"
//               className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c6774]/50 ${
//                 errors.password && touched.password
//                   ? "border-red-500"
//                   : "border-gray-300"
//               }`}
//               value={password}
//               onChange={(e) => {
//                 setPassword(e.target.value);
//                 if (errors.password) {
//                   setErrors({ ...errors, password: "" });
//                 }
//                 // Clear confirm password error if both passwords match
//                 if (confirmPassword && e.target.value === confirmPassword) {
//                   setErrors({ ...errors, confirmPassword: "" });
//                 }
//               }}
//               onBlur={() => handleBlur("password")}
//               disabled={loading}
//             />
//             {errors.password && touched.password && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.password}
//               </p>
//             )}
//           </div>

//           {/* Confirm Password Field (Signup only) */}
//           {!isSignIn && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Confirm Password *
//               </label>
//               <input
//                 type="password"
//                 placeholder="Confirm your password"
//                 className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c6774]/50 ${
//                   errors.confirmPassword && touched.confirmPassword
//                     ? "border-red-500"
//                     : "border-gray-300"
//                 }`}
//                 value={confirmPassword}
//                 onChange={(e) => {
//                   setConfirmPassword(e.target.value);
//                   if (errors.confirmPassword) {
//                     setErrors({ ...errors, confirmPassword: "" });
//                   }
//                 }}
//                 onBlur={() => handleBlur("confirmPassword")}
//                 disabled={loading}
//               />
//               {errors.confirmPassword && touched.confirmPassword && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.confirmPassword}
//                 </p>
//               )}
//             </div>
//           )}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 rounded-md text-white font-medium transition duration-300 ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-[#2c6774] hover:bg-[#1e4e56] transform hover:-translate-y-0.5"
//             }`}
//           >
//             {loading ? (
//               <span className="flex items-center justify-center">
//                 <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                 </svg>
//                 {isSignIn ? "Signing In..." : "Creating Account..."}
//               </span>
//             ) : (
//               isSignIn ? "Sign In" : "Sign Up"
//             )}
//           </button>
//         </form>

//         {/* Google Sign In (Login only) */}
//         {isSignIn && (
//           <div className="mt-4">
//             <div className="relative flex items-center justify-center">
//               <div className="flex-grow border-t border-gray-300"></div>
//               <span className="mx-4 text-sm text-gray-500">or</span>
//               <div className="flex-grow border-t border-gray-300"></div>
//             </div>
//             <button
//               onClick={handleGoogleSignIn}
//               disabled={loading}
//               className="w-full mt-4 flex items-center justify-center gap-3 py-3 border rounded-md hover:bg-gray-50 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <img src={googleLogo} className="w-5 h-5" alt="Google logo" />
//               Sign in with Google
//             </button>
//           </div>
//         )}

//         {/* Toggle between Login/Signup */}
//         <p className="text-center text-sm mt-6 text-gray-600">
//           {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
//           <span
//             className="text-[#2c6774] font-semibold cursor-pointer hover:underline"
//             onClick={() => {
//               if (!loading) {
//                 setIsSignIn(!isSignIn);
//                 resetForm();
//               }
//             }}
//           >
//             {isSignIn ? "Sign Up" : "Sign In"}
//           </span>
//         </p>

//         {/* Additional Links */}
//         {isSignIn && (
//           <div className="mt-4 text-center">
//             <a
//               href="/forgot-password"
//               className="text-sm text-[#2c6774] hover:underline"
//             >
//               Forgot Password?
//             </a>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }








