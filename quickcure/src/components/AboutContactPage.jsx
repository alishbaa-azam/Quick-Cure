// import React from 'react';
// import { Phone, Mail, MapPin, Clock, Heart, Shield, Users, Globe } from 'lucide-react';

// const AboutContactPage = () => {
//   const teamMembers = [
//     {
//       name: 'Alishba Azam',
//       role: 'Lead Developer',
//       studentId: '093064',
//       contribution: 'System Architecture & Backend'
//     },
//     {
//       name: 'Rocda Shoaib',
//       role: 'Frontend Developer',
//       studentId: '093070',
//       contribution: 'UI/UX Design & Frontend'
//     },
//     {
//       name: 'Fareeha Ajmal',
//       role: 'Full Stack Developer',
//       studentId: '093074',
//       contribution: 'Database & Integration'
//     }
//   ];

//   const features = [
//     {
//       icon: <Heart className="w-8 h-8" />,
//       title: 'Patient-Centered Care',
//       description: 'Connecting patients with healthcare providers seamlessly'
//     },
//     {
//       icon: <Shield className="w-8 h-8" />,
//       title: 'Secure & Private',
//       description: 'Your medical data is protected with enterprise-grade security'
//     },
//     {
//       icon: <Users className="w-8 h-8" />,
//       title: 'Integrated Ecosystem',
//       description: 'Doctors, pharmacies, and labs on a single platform'
//     },
//     {
//       icon: <Globe className="w-8 h-8" />,
//       title: 'Accessible Healthcare',
//       description: 'Teleconsultations and online services from anywhere'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#9fbfc5] to-[#c0d3dc]">
//       {/* Header */}
//       <header className="bg-[#174047] text-white py-6">
//         <div className="container mx-auto px-4">
//           <h1 className="text-4xl font-bold text-center mb-2">QuickCure Healthcare</h1>
//           <p className="text-center text-[#c0d3dc] text-lg">Revolutionizing Digital Healthcare</p>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-8">
        
//         {/* About Section */}
//         <section className="mb-16">
//           <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
//             <h2 className="text-3xl font-bold text-[#174047] mb-6 border-b-2 border-[#2c6774] pb-2">
//               About QuickCure
//             </h2>
//             <div className="grid md:grid-cols-2 gap-8">
//               <div>
//                 <p className="text-gray-700 mb-4 text-lg">
//                   QuickCure is a comprehensive web-based healthcare platform developed as a Final Year Project 
//                   by students of Govt. Graduate College for Women Islampura, University of the Punjab, Lahore.
//                 </p>
//                 <p className="text-gray-700 mb-4">
//                   Our mission is to create an integrated healthcare ecosystem that connects patients, doctors, 
//                   pharmacies, and diagnostic laboratories on a single, secure platform.
//                 </p>
//                 <div className="mt-6 p-4 bg-[#5c878f]/10 rounded-lg">
//                   <h3 className="text-xl font-semibold text-[#174047] mb-2">Project Vision</h3>
//                   <p className="text-gray-700">
//                     To make quality healthcare accessible, efficient, and affordable through technology, 
//                     bridging the gap between patients and healthcare providers.
//                   </p>
//                 </div>
//               </div>
              
//               <div className="bg-gradient-to-br from-[#2c6774] to-[#174047] text-white rounded-xl p-6">
//                 <h3 className="text-2xl font-bold mb-4">Key Features</h3>
//                 <ul className="space-y-3">
//                   <li className="flex items-center">
//                     <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
//                     Online Doctor Appointments & Teleconsultations
//                   </li>
//                   <li className="flex items-center">
//                     <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
//                     Electronic Prescriptions & Medicine Orders
//                   </li>
//                   <li className="flex items-center">
//                     <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
//                     Diagnostic Lab Test Booking & Reports
//                   </li>
//                   <li className="flex items-center">
//                     <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
//                     Secure Online Payment Gateway
//                   </li>
//                   <li className="flex items-center">
//                     <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
//                     Role-based Dashboards for All Users
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* Features Grid */}
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             {features.map((feature, index) => (
//               <div 
//                 key={index} 
//                 className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
//               >
//                 <div className="text-[#2c6774] mb-4">{feature.icon}</div>
//                 <h3 className="text-xl font-bold text-[#174047] mb-2">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Team Section */}
//         <section className="mb-16">
//           <h2 className="text-3xl font-bold text-[#174047] mb-8 text-center">Our Development Team</h2>
//           <div className="grid md:grid-cols-3 gap-6">
//             {teamMembers.map((member, index) => (
//               <div 
//                 key={index} 
//                 className="bg-white rounded-xl shadow-lg p-6 hover:transform hover:-translate-y-2 transition-all duration-300"
//               >
//                 <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#2c6774] to-[#5c878f] flex items-center justify-center text-white text-2xl font-bold">
//                   {member.name.charAt(0)}
//                 </div>
//                 <h3 className="text-xl font-bold text-[#174047] text-center mb-1">{member.name}</h3>
//                 <p className="text-[#5c878f] text-center mb-2">{member.role}</p>
//                 <div className="text-center mb-3">
//                   <span className="inline-block bg-[#c0d3dc] text-[#174047] px-3 py-1 rounded-full text-sm">
//                     ID: {member.studentId}
//                   </span>
//                 </div>
//                 <p className="text-gray-600 text-center">{member.contribution}</p>
//               </div>
//             ))}
//           </div>
          
//           {/* Supervisor */}
//           <div className="mt-8 bg-gradient-to-r from-[#2c6774] to-[#5c878f] rounded-xl p-6 text-white max-w-md mx-auto">
//             <div className="flex items-center justify-center mb-4">
//               <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
//                 <Users className="w-10 h-10" />
//               </div>
//             </div>
//             <h3 className="text-xl font-bold text-center mb-2">Project Supervisor</h3>
//             <p className="text-center text-lg">Miss. Fatima Noor</p>
//             <p className="text-center text-[#c0d3dc]">Govt. Graduate College for Women Islampura</p>
//           </div>
//         </section>

//         {/* Contact Section */}
//         <section className="mb-16">
//           <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//             <div className="md:flex">
//               {/* Contact Info */}
//               <div className="md:w-2/5 bg-gradient-to-b from-[#2c6774] to-[#174047] text-white p-8">
//                 <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                
//                 <div className="space-y-6">
//                   <div className="flex items-start">
//                     <MapPin className="w-6 h-6 mr-4 mt-1 flex-shrink-0" />
//                     <div>
//                       <h4 className="font-bold mb-1">Address</h4>
//                       <p>Govt. Graduate College for Women Islampura<br />
//                          University of the Punjab,<br />
//                          Lahore, Pakistan</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-start">
//                     <Mail className="w-6 h-6 mr-4 mt-1 flex-shrink-0" />
//                     <div>
//                       <h4 className="font-bold mb-1">Email</h4>
//                       <p>contact@quickcure.pk<br />
//                          support@quickcure.pk</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-start">
//                     <Phone className="w-6 h-6 mr-4 mt-1 flex-shrink-0" />
//                     <div>
//                       <h4 className="font-bold mb-1">Phone</h4>
//                       <p>+92 42 123 4567<br />
//                          Support: +92 300 1234567</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-start">
//                     <Clock className="w-6 h-6 mr-4 mt-1 flex-shrink-0" />
//                     <div>
//                       <h4 className="font-bold mb-1">Support Hours</h4>
//                       <p>Monday - Friday: 9:00 AM - 6:00 PM<br />
//                          Saturday: 10:00 AM - 2:00 PM</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Contact Form */}
//               <div className="md:w-3/5 p-8">
//                 <h2 className="text-2xl font-bold text-[#174047] mb-6">Send us a Message</h2>
//                 <form className="space-y-4">
//                   <div className="grid md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-gray-700 mb-2" htmlFor="name">Full Name</label>
//                       <input
//                         type="text"
//                         id="name"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774]"
//                         placeholder="Your name"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 mb-2" htmlFor="email">Email Address</label>
//                       <input
//                         type="email"
//                         id="email"
//                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774]"
//                         placeholder="you@example.com"
//                       />
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label className="block text-gray-700 mb-2" htmlFor="subject">Subject</label>
//                     <input
//                       type="text"
//                       id="subject"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774]"
//                       placeholder="How can we help?"
//                     />
//                   </div>
                  
//                   <div>
//                     <label className="block text-gray-700 mb-2" htmlFor="message">Message</label>
//                     <textarea
//                       id="message"
//                       rows="4"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c6774]"
//                       placeholder="Your message here..."
//                     ></textarea>
//                   </div>
                  
//                   <button
//                     type="submit"
//                     className="w-full bg-gradient-to-r from-[#2c6774] to-[#1e4e56] text-white py-3 rounded-lg font-bold hover:from-[#1e4e56] hover:to-[#174047] transition-all duration-300"
//                   >
//                     Send Message
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Institution Info */}
//         <section className="text-center">
//           <div className="bg-white rounded-xl shadow-lg p-6 inline-block">
//             <h3 className="text-2xl font-bold text-[#174047] mb-2">BSCSF (2022-26)</h3>
//             <p className="text-gray-700">Govt. Graduate College for Women Islampura, Lahore</p>
//             <p className="text-[#5c878f] mt-2">University of the Punjab</p>
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="bg-[#174047] text-white py-6 mt-8">
//         <div className="container mx-auto px-4 text-center">
//           <p className="mb-2">© 2025 QuickCure Healthcare. All rights reserved.</p>
//           <p className="text-[#c0d3dc] text-sm">Final Year Project - Computer Science Department</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default AboutContactPage;



















import React from 'react';
import { Phone, Mail, MapPin, Users, Heart, Shield, Stethoscope, Calendar, Pill, Clock, Award, Globe } from 'lucide-react';

const AboutContactPage = () => {
  const stats = [
    { number: '50+', label: 'Doctors', icon: <Stethoscope className="w-8 h-8" /> },
    { number: '1000+', label: 'Patients Served', icon: <Heart className="w-8 h-8" /> },
    { number: '24/7', label: 'Support', icon: <Clock className="w-8 h-8" /> },
    { number: '99%', label: 'Satisfaction', icon: <Award className="w-8 h-8" /> },
  ];

  const services = [
    {
      icon: <Stethoscope className="w-10 h-10" />,
      title: 'Teleconsultation',
      description: 'Video consultations with certified doctors from the comfort of your home'
    },
    {
      icon: <Pill className="w-10 h-10" />,
      title: 'E-Prescriptions',
      description: 'Digital prescriptions sent directly to your chosen pharmacy'
    },
    {
      icon: <Calendar className="w-10 h-10" />,
      title: 'Lab Test Booking',
      description: 'Schedule diagnostic tests with home sample collection'
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: 'Secure Records',
      description: 'Encrypted storage of all your medical history and reports'
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#174047] via-[#2c6774] to-[#1e4e56] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-5xl font-bold mb-6">About QuickCure</h1>
            <p className="text-xl text-[#c0d3dc] mb-8">
              Revolutionizing healthcare through technology, connecting patients with quality medical services
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#contact" 
                className="px-8 py-3 bg-white text-[#174047] font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300"
              >
                Contact Us
              </a>
              <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-[#f8fafc]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-[#2c6774] mb-4 flex justify-center">{stat.icon}</div>
                <div className="text-4xl font-bold text-[#174047] mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#174047] mb-4">Our Story</h2>
              <div className="w-24 h-1 bg-[#5c878f] mx-auto mb-8"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-gray-700 text-lg mb-6">
                  QuickCure was born out of a Final Year Project at Govt. Graduate College for Women Islampura, 
                  University of the Punjab, Lahore. Our team recognized the need for a unified healthcare platform 
                  that bridges the gap between patients and medical service providers.
                </p>
                <p className="text-gray-700 text-lg mb-6">
                  Today, we are proud to offer a comprehensive healthcare ecosystem that connects patients with 
                  doctors, pharmacies, and diagnostic laboratories through a single, secure platform.
                </p>
                <div className="flex items-center space-x-4 mt-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2c6774] to-[#5c878f] rounded-full flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#174047]">Digital Healthcare</h4>
                    <p className="text-gray-600">Making quality healthcare accessible to everyone</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#2c6774] to-[#174047] rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Our Journey</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4"></div>
                    <span>2023: Project inception and research</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4"></div>
                    <span>2024: Development and testing phase</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4"></div>
                    <span>2025: Platform launch and expansion</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 mr-4"></div>
                    <span>2026: Future enhancements and features</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="py-20 bg-gradient-to-r from-[#f8fafc] to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#2c6774] to-[#5c878f] rounded-lg flex items-center justify-center mr-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#174047]">Our Mission</h3>
              </div>
              <p className="text-gray-700 text-lg">
                To provide compassionate, high-quality healthcare services that are accessible to everyone. 
                We strive to bridge the gap between patients and healthcare providers through innovative 
                technology while maintaining the highest standards of medical ethics and patient care.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#2c6774] to-[#5c878f] rounded-lg flex items-center justify-center mr-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#174047]">Our Vision</h3>
              </div>
              <p className="text-gray-700 text-lg">
                To become Pakistan's leading digital healthcare platform, transforming how healthcare is 
                accessed and delivered. We envision a future where quality medical care is just a click away 
                for every individual, regardless of their location or circumstances.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#174047] mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive healthcare solutions designed to meet all your medical needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                  <div className="text-[#2c6774] mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#174047] mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-20 bg-[#174047] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-[#c0d3dc]">We're here to help with all your healthcare needs</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <Phone className="w-10 h-10 mb-6 text-[#5c878f]" />
                <h3 className="text-xl font-bold mb-4">Call Us</h3>
                <p className="text-[#c0d3dc] mb-2">+92 42 123 4567</p>
                <p className="text-[#c0d3dc]">Support: +92 300 1234567</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <Mail className="w-10 h-10 mb-6 text-[#5c878f]" />
                <h3 className="text-xl font-bold mb-4">Email Us</h3>
                <p className="text-[#c0d3dc] mb-2">contact@quickcure.pk</p>
                <p className="text-[#c0d3dc]">support@quickcure.pk</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <MapPin className="w-10 h-10 mb-6 text-[#5c878f]" />
                <h3 className="text-xl font-bold mb-4">Visit Us</h3>
                <p className="text-[#c0d3dc]">
                  Govt. Graduate College for Women Islampura<br />
                  University of the Punjab<br />
                  Lahore, Pakistan
                </p>
              </div>
            </div>
            
            <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Send Us a Message</h3>
              <form className="max-w-2xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5c878f] placeholder-[#c0d3dc]"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5c878f] placeholder-[#c0d3dc]"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5c878f] mb-6 placeholder-[#c0d3dc]"
                />
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5c878f] mb-6 placeholder-[#c0d3dc]"
                ></textarea>
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#2c6774] to-[#5c878f] text-white font-semibold rounded-lg hover:from-[#5c878f] hover:to-[#2c6774] transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#174047] mb-4">Our Team</h2>
            <p className="text-gray-600">The dedicated students behind QuickCure</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#2c6774] to-[#5c878f] flex items-center justify-center text-white text-4xl font-bold">
                A
              </div>
              <h3 className="text-xl font-bold text-[#174047] mb-2">Alishba Azam</h3>
              <p className="text-[#5c878f] mb-1">093064</p>
              <p className="text-gray-600">Lead Developer</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#2c6774] to-[#5c878f] flex items-center justify-center text-white text-4xl font-bold">
                R
              </div>
              <h3 className="text-xl font-bold text-[#174047] mb-2">Roeda Shoaib</h3>
              <p className="text-[#5c878f] mb-1">093070</p>
              <p className="text-gray-600">Full Stack Developer</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#2c6774] to-[#5c878f] flex items-center justify-center text-white text-4xl font-bold">
                F
              </div>
              <h3 className="text-xl font-bold text-[#174047] mb-2">Fareeha Ajmal</h3>
              <p className="text-[#5c878f] mb-1">093074</p>
              <p className="text-gray-600">Frontend Developer</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-block bg-gradient-to-r from-[#2c6774] to-[#174047] text-white px-8 py-4 rounded-xl">
              <h4 className="text-xl font-bold mb-2">Project Supervisor</h4>
              <p className="text-[#c0d3dc]">Miss. Fatima Noor</p>
              <p className="text-sm text-[#5c878f]">Govt. Graduate College for Women Islampura</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContactPage;