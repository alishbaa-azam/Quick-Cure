// import React from 'react';
// import aboutImage from '../images/about.jpg'; 

// const AboutPage = () => {
//   return (
//     <div className="min-h-screen bg-white">
//       {/* Full Screen Hero Section with Image */}
//       <div className="relative w-full h-screen">
//         <img 
//           src={aboutImage} 
//           alt="Healthcare professionals" 
//           className="absolute inset-0 w-full h-full object-cover"
//         />
//         {/* Overlay to ensure text readability */}
//         <div className="absolute inset-0 bg-black/30"></div>
        
//         {/* Intro Text - Left Aligned like reference image */}
//         <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-8 lg:px-12">
//           <div className="max-w-xl text-left">
            // {/* <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            //   Intro
            // </h1> */}
//             <p className="text-xl md:text-2xl font-bold drop-shadow-md leading-relaxed text-justify" style={{ color: '#174047' }}>
//               QuickCure is a digital healthcare platform that makes it easy for users to access essential medical services in one place. It connects patients with doctors, pharmacies, and laboratory services through a single, simple, and convenient system. The platform is designed to save time, reduce effort, and provide quick access to reliable healthcare whenever needed.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Mission and Vision Cards */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//         <div className="grid md:grid-cols-2 gap-10">
//           {/* Mission Card */}
//           <div className="bg-white rounded-2xl shadow-xl p-8 border-t-8" style={{ borderTopColor: 'var(--primary-color)' }}>
//             <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--secondary-color)' }}>Our Mission</h2>
//             <p className="text-gray-700 text-lg leading-relaxed">
//               Our mission is to make healthcare accessible for everyone. We aim to help users easily connect with doctors, pharmacies, and medical services without long waiting times or travel difficulties.
//             </p>
//           </div>

//           {/* Vision Card */}
//           <div className="bg-white rounded-2xl shadow-xl p-8 border-t-8" style={{ borderTopColor: 'var(--accent-color)' }}>
//             <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--secondary-color)' }}>Our Vision</h2>
//             <p className="text-gray-700 text-lg leading-relaxed">
//               Our vision is to make healthcare simple, reliable, and available to everyone through digital technology. We want to create a future where people can easily manage their health without stress, using a system that is fast, helpful, and easy to use.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Key Features Section */}
//       <div className="bg-gray-50 py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-4xl font-bold text-center mb-4" style={{ color: 'var(--secondary-color)' }}>Key Features</h2>
//           <div className="w-24 h-1 mx-auto mb-12 rounded-full" style={{ backgroundColor: 'var(--primary-color)' }}></div>
          
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {/* Feature Card 1 */}
//             <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 text-center">
//               <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-light)' }}>
//                 <svg className="w-8 h-8" style={{ color: 'var(--secondary-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary-color)' }}>Secure Authentication</h3>
//               <p className="text-gray-600">Two-factor and encrypted login protection</p>
//             </div>

//             {/* Feature Card 2 */}
//             <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 text-center">
//               <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-light)' }}>
//                 <svg className="w-8 h-8" style={{ color: 'var(--secondary-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary-color)' }}>Doctor Appointments</h3>
//               <p className="text-gray-600">Book online consultations instantly</p>
//             </div>

//             {/* Feature Card 3 */}
//             <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 text-center">
//               <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-light)' }}>
//                 <svg className="w-8 h-8" style={{ color: 'var(--secondary-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary-color)' }}>Pharmacy Integration</h3>
//               <p className="text-gray-600">Order medicines online with delivery tracking</p>
//             </div>

//             {/* Feature Card 4 */}
//             <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 text-center">
//               <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-light)' }}>
//                 <svg className="w-8 h-8" style={{ color: 'var(--secondary-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary-color)' }}>Lab Test Booking</h3>
//               <p className="text-gray-600">Schedule diagnostic tests at preferred labs</p>
//             </div>

//             {/* Feature Card 5 */}
//             <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 text-center">
//               <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-light)' }}>
//                 <svg className="w-8 h-8" style={{ color: 'var(--secondary-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary-color)' }}>Secure Payments</h3>
//               <p className="text-gray-600">Fast gateway with multiple options</p>
//             </div>

//             {/* Feature Card 6 */}
//             <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 text-center">
//               <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-light)' }}>
//                 <svg className="w-8 h-8" style={{ color: 'var(--secondary-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary-color)' }}>24/7 Accessibility</h3>
//               <p className="text-gray-600">Healthcare services anytime, anywhere</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Why Choose QuickCure Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//         <h2 className="text-4xl font-bold text-center mb-4" style={{ color: 'var(--secondary-color)' }}>Why Choose QuickCure</h2>
//         <div className="w-24 h-1 mx-auto mb-12 rounded-full" style={{ backgroundColor: 'var(--primary-color)' }}></div>
        
//         <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
//           <p className="text-gray-700 text-lg leading-relaxed mb-8">
//             QuickCure is a simple and complete healthcare solution that brings all medical services into one place. Instead of using different apps or making multiple calls, users can easily book doctor appointments, order medicines, and schedule lab tests through one platform. It is designed to save time, reduce effort, and make healthcare stress-free for everyone.
//           </p>
          
//           <div className="grid md:grid-cols-3 gap-8 mt-8">
//             <div className="text-center">
//               <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-light)' }}>
//                 <svg className="w-8 h-8" style={{ color: 'var(--secondary-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary-color)' }}>Easy to Use</h3>
//               <p className="text-gray-600">QuickCure has a simple and user-friendly design, so anyone can use it easily—even if they are using it for the first time.</p>
//             </div>
            
//             <div className="text-center">
//               <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-light)' }}>
//                 <svg className="w-8 h-8" style={{ color: 'var(--secondary-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary-color)' }}>Time-Saving</h3>
//               <p className="text-gray-600">It helps users save time by providing quick access to doctors, medicines, and lab services without long waiting times or unnecessary hospital visits.</p>
//             </div>
            
//             <div className="text-center">
//               <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-light)' }}>
//                 <svg className="w-8 h-8" style={{ color: 'var(--secondary-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary-color)' }}>All-in-One Solution</h3>
//               <p className="text-gray-600">QuickCure offers everything in one place, including doctor consultations, pharmacy services, and lab tests, so users don't need to switch between different apps or services.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Your Health, Our Commitment Section */}
//       <div className="py-20" style={{ backgroundColor: 'var(--white)' }}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-4xl font-bold mb-6" style={{ color: 'var(--secondary-color)' }}>Your Health, Our Commitment</h2>
//           <div className="w-24 h-1 mx-auto mb-8 rounded-full" style={{ backgroundColor: 'var(--primary-color)' }}></div>
          
//           <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
//             <p className="text-gray-700 text-lg leading-relaxed mb-6">
//               At QuickCure, we care about your health and well-being. It is not just an app but a trusted partner that makes healthcare easy, fast, and secure. Our goal is to provide simple and reliable medical services for everyone.
//             </p>
//             <p className="text-gray-700 text-lg leading-relaxed">
//               Thousands of users are already benefiting from QuickCure by making their healthcare journey easier and more comfortable. With QuickCure, quality healthcare is always within your reach.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutPage;




import React from 'react';
import aboutPic from '../images/aboutpic.png'; 

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* New Section: Intro Text on Left, Image on Right */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left side: Intro Text */}
          <div className="flex-1">
             <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4 drop-shadow-lg">
              About QuickCure
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed text-justify text-gray-700">
              QuickCure is a digital healthcare platform that makes it easy for users to access essential medical services in one place. It connects patients with doctors, pharmacies, and laboratory services through a single, simple, and convenient system. The platform is designed to save time, reduce effort, and provide quick access to reliable healthcare whenever needed.
            </p>
          </div>

          {/* Right side: aboutpic.png Image */}
          <div className="flex-1 flex justify-center md:justify-end">
            <img
              src={aboutPic}
              alt="QuickCure platform illustration"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Mission and Vision Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Mission Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-8" style={{ borderTopColor: 'var(--primary-color)' }}>
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--secondary-color)' }}>Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our mission is to make healthcare accessible for everyone. We aim to help users easily connect with doctors, pharmacies, and medical services without long waiting times or travel difficulties.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-8" style={{ borderTopColor: 'var(--accent-color)' }}>
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--secondary-color)' }}>Our Vision</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our vision is to make healthcare simple, reliable, and available to everyone through digital technology. We want to create a future where people can easily manage their health without stress, using a system that is fast, helpful, and easy to use.
            </p>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4" style={{ color: 'var(--secondary-color)' }}>Key Features</h2>
          <div className="w-24 h-1 mx-auto mb-12 rounded-full" style={{ backgroundColor: 'var(--primary-color)' }}></div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-light)' }}>
                <svg className="w-8 h-8" style={{ color: 'var(--secondary-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary-color)' }}>Secure Authentication</h3>
              <p className="text-gray-600">Two-factor and encrypted login protection</p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-light)' }}>
                <svg className="w-8 h-8" style={{ color: 'var(--secondary-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary-color)' }}>Doctor Appointments</h3>
              <p className="text-gray-600">Book online consultations instantly</p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-light)' }}>
                <svg className="w-8 h-8" style={{ color: 'var(--secondary-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary-color)' }}>Pharmacy Integration</h3>
              <p className="text-gray-600">Order medicines online with delivery tracking</p>
            </div>

            {/* Feature Card 4 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-light)' }}>
                <svg className="w-8 h-8" style={{ color: 'var(--secondary-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary-color)' }}>Lab Test Booking</h3>
              <p className="text-gray-600">Schedule diagnostic tests at preferred labs</p>
            </div>

            {/* Feature Card 5 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-light)' }}>
                <svg className="w-8 h-8" style={{ color: 'var(--secondary-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary-color)' }}>Secure Payments</h3>
              <p className="text-gray-600">Fast gateway with multiple options</p>
            </div>

            {/* Feature Card 6 */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-light)' }}>
                <svg className="w-8 h-8" style={{ color: 'var(--secondary-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary-color)' }}>24/7 Accessibility</h3>
              <p className="text-gray-600">Healthcare services anytime, anywhere</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose QuickCure Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-4" style={{ color: 'var(--secondary-color)' }}>Why Choose QuickCure</h2>
        <div className="w-24 h-1 mx-auto mb-12 rounded-full" style={{ backgroundColor: 'var(--primary-color)' }}></div>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            QuickCure is a simple and complete healthcare solution that brings all medical services into one place. Instead of using different apps or making multiple calls, users can easily book doctor appointments, order medicines, and schedule lab tests through one platform. It is designed to save time, reduce effort, and make healthcare stress-free for everyone.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-light)' }}>
                <svg className="w-8 h-8" style={{ color: 'var(--secondary-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary-color)' }}>Easy to Use</h3>
              <p className="text-gray-600">QuickCure has a simple and user-friendly design, so anyone can use it easily—even if they are using it for the first time.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-light)' }}>
                <svg className="w-8 h-8" style={{ color: 'var(--secondary-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary-color)' }}>Time-Saving</h3>
              <p className="text-gray-600">It helps users save time by providing quick access to doctors, medicines, and lab services without long waiting times or unnecessary hospital visits.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-light)' }}>
                <svg className="w-8 h-8" style={{ color: 'var(--secondary-color)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary-color)' }}>All-in-One Solution</h3>
              <p className="text-gray-600">QuickCure offers everything in one place, including doctor consultations, pharmacy services, and lab tests, so users don't need to switch between different apps or services.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Your Health, Our Commitment Section */}
      <div className="py-20" style={{ backgroundColor: 'var(--white)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6" style={{ color: 'var(--secondary-color)' }}>Your Health, Our Commitment</h2>
          <div className="w-24 h-1 mx-auto mb-8 rounded-full" style={{ backgroundColor: 'var(--primary-color)' }}></div>
          
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              At QuickCure, we care about your health and well-being. It is not just an app but a trusted partner that makes healthcare easy, fast, and secure. Our goal is to provide simple and reliable medical services for everyone.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Thousands of users are already benefiting from QuickCure by making their healthcare journey easier and more comfortable. With QuickCure, quality healthcare is always within your reach.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;