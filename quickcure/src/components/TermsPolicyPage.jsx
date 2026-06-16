import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { 
  Shield, FileText, Lock, CreditCard, Users, Database, 
  AlertTriangle, CheckCircle, Clock, Phone, Mail, Globe, 
  BookOpen, Heart, UserCheck, ClipboardList, Trash2, 
  RefreshCw, Gift, ChevronDown, ChevronUp, Scale, 
  Server, Eye, MessageSquare, Calendar, Pill, Stethoscope,
  Activity, Bell, Download, LogOut, Smartphone, Wifi
} from 'lucide-react';

const TermsPolicyPage = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const sections = [
    {
      title: "Terms of Service",
      icon: <Scale className="w-6 h-6" />,
      content: {
        intro: "By accessing or using QuickCure, you agree to be bound by these Terms of Service. Please read them carefully before using our platform.",
        points: [
          "QuickCure is a web-based healthcare platform connecting patients with doctors, pharmacies, and diagnostic laboratories.",
          "You must be at least 18 years old to use our services or have parental/guardian consent.",
          "All medical consultations are conducted by licensed healthcare professionals.",
          "You agree to provide accurate, current, and complete information during registration.",
          "You are responsible for maintaining the confidentiality of your account credentials.",
          "QuickCure reserves the right to modify or discontinue services at any time.",
          "Misuse of the platform, including harassment of healthcare providers, may result in account termination.",
          "Prescriptions are valid only when issued by licensed doctors through our platform."
        ]
      }
    },
    {
      title: "Privacy Policy",
      icon: <Lock className="w-6 h-6" />,
      content: {
        intro: "Your privacy is our top priority. This policy explains how we collect, use, and protect your personal and medical information.",
        points: [
          "We collect personal information including name, email, phone number, and medical history.",
          "All medical records, prescriptions, and test results are stored in encrypted MongoDB databases.",
          "Your data is never sold to third parties. It is only shared with healthcare providers involved in your care.",
          "We use SSL/TLS encryption for all data transmission between your device and our servers.",
          "You have the right to access, modify, or delete your personal information at any time.",
          "Session data and activity logs are kept for security and audit purposes.",
          "We comply with healthcare data protection standards and regulations.",
          "You can request complete deletion of your account and associated data."
        ]
      }
    },
    {
      title: "Consultation Policy",
      icon: <Stethoscope className="w-6 h-6" />,
      content: {
        intro: "Guidelines for online medical consultations through QuickCure platform.",
        points: [
          "Consultations are conducted via Google Meet links sent to your registered email.",
          "A valid Google account is required to join video consultations.",
          "Please join the consultation 5 minutes before the scheduled time.",
          "If you are late by more than 10 minutes, the consultation may be rescheduled.",
          "Doctors will provide e-prescriptions only after thorough consultation.",
          "Emergency cases should immediately visit the nearest hospital - QuickCure is not for emergencies.",
          "Consultation recordings are not stored to maintain patient privacy.",
          "You can cancel or reschedule up to 2 hours before appointment time."
        ]
      }
    },
    {
      title: "Payment & Refund Policy",
      icon: <CreditCard className="w-6 h-6" />,
      content: {
        intro: "QuickCure uses Stripe as our secure payment gateway. Please read our payment and refund terms carefully.",
        points: [
          "All payments are processed securely through Stripe payment gateway.",
          "We accept Visa, Mastercard, American Express, and major digital wallets.",
          "Payments are due at the time of booking appointments or ordering medicines.",
          "Full refund if appointment is cancelled 2+ hours before scheduled time.",
          "50% refund if appointment is cancelled less than 2 hours before scheduled time.",
          "No refund for no-shows or missed consultations.",
          "Pharmacy orders can be refunded before dispatch confirmation.",
          "Refunds are processed within 5-7 business days to original payment method.",
          "Stripe handles all payment disputes and chargebacks according to their policies."
        ]
      }
    },
    {
      title: "Doctor & Healthcare Provider Policy",
      icon: <Users className="w-6 h-6" />,
      content: {
        intro: "Terms and guidelines for healthcare professionals registered on QuickCure.",
        points: [
          "All doctors must provide valid medical license and credentials for verification.",
          "Doctors are responsible for maintaining their availability schedule accurately.",
          "Professional conduct must be maintained during all patient interactions.",
          "E-prescriptions must follow standard medical guidelines and regulations.",
          "Doctors must respond to consultation requests within 24 hours.",
          "Patient medical records must be handled with complete confidentiality.",
          "Any misconduct may result in immediate removal from the platform.",
          "Doctors can manage their schedule, fees, and consultation preferences through dashboard."
        ]
      }
    },
    {
      title: "Pharmacy & Medicine Delivery Policy",
      icon: <Pill className="w-6 h-6" />,
      content: {
        intro: "Terms regarding medicine ordering and delivery through QuickCure's pharmacy partners.",
        points: [
          "Prescriptions are required for all prescription medicines.",
          "Prescriptions are digitally validated before order processing.",
          "Delivery times vary by location (typically 2-5 business days).",
          "Prescription medicines cannot be returned once delivered.",
          "Over-the-counter medicines can be returned within 7 days unopened.",
          "Patients must provide accurate delivery address and contact information.",
          "Medicines are delivered in tamper-proof packaging.",
          "Age verification may be required for certain medications upon delivery."
        ]
      }
    },
    {
      title: "Lab Test Policy",
      icon: <Activity className="w-6 h-6" />,
      content: {
        intro: "Guidelines for booking and receiving lab test services.",
        points: [
          "Lab tests can be booked directly through QuickCure platform.",
          "Sample collection is arranged from your home address.",
          "Test results are delivered digitally within the system.",
          "Both patients and doctors can access test results through dashboards.",
          "Follow doctor's instructions for any test preparation requirements.",
          "Reports are stored securely for future reference.",
          "Additional charges may apply for home collection services.",
          "Results are typically available within 24-72 hours depending on test type."
        ]
      }
    },
    {
      title: "Data Security & Storage Policy",
      icon: <Database className="w-6 h-6" />,
      content: {
        intro: "How QuickCure protects and manages your healthcare data.",
        points: [
          "All data is stored in secure MongoDB databases with encryption at rest.",
          "Role-based access control ensures only authorized personnel access sensitive data.",
          "Regular security audits and penetration testing are conducted.",
          "Data backups are performed daily to prevent loss.",
          "All API communications use encrypted HTTPS protocols.",
          "Medical records are retained for 7 years as per healthcare regulations.",
          "You can export your complete medical history at any time.",
          "Data breach notification will be sent within 72 hours if detected."
        ]
      }
    },
    {
      title: "Account & User Responsibility",
      icon: <UserCheck className="w-6 h-6" />,
      content: {
        intro: "Your responsibilities as a QuickCure user.",
        points: [
          "Provide accurate and truthful information during registration.",
          "Keep your login credentials secure and confidential.",
          "Immediately report any unauthorized account access.",
          "Do not share your account with others.",
          "You are responsible for all activities under your account.",
          "QuickCure is not liable for any loss from unauthorized access due to your negligence.",
          "Users must respect healthcare providers and staff.",
          "False information or misuse may result in permanent account ban."
        ]
      }
    },
    {
      title: "Cookie Policy",
      icon: <Globe className="w-6 h-6" />,
      content: {
        intro: "How QuickCure uses cookies to improve your experience.",
        points: [
          "Essential cookies are required for platform functionality.",
          "Session cookies help maintain your login state.",
          "Analytics cookies help us improve platform performance.",
          "Preference cookies save your settings and preferences.",
          "You can disable non-essential cookies in browser settings.",
          "Disabling cookies may affect some platform features.",
          "We do not use cookies for advertising or tracking purposes.",
          "Third-party services (Stripe, Google Meet) have their own cookie policies."
        ]
      }
    }
  ];

  // Define navigation items with their corresponding section titles
  const navItems = [
    { name: "Terms of Service", icon: <Scale />, sectionTitle: "Terms of Service" },
    { name: "Privacy Policy", icon: <Lock />, sectionTitle: "Privacy Policy" },
    { name: "Payments", icon: <CreditCard />, sectionTitle: "Payment & Refund Policy" },
    { name: "Consultation", icon: <Stethoscope />, sectionTitle: "Consultation Policy" },
    { name: "Security", icon: <Shield />, sectionTitle: "Data Security & Storage Policy" }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--primary-color)' }}>
            Terms & Policies
          </h1>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: 'var(--secondary-color)' }}>
            Your trust matters to us. Read our comprehensive terms, policies, and guidelines 
            to understand how we protect your rights and privacy on QuickCure.
          </p>
          <div className="mt-4 flex items-center justify-center space-x-2 text-sm">
            <Clock className="w-4 h-4" style={{ color: 'var(--accent-color)' }} />
            <span style={{ color: 'var(--secondary-color)' }}>Last Updated: January 15, 2026</span>
          </div>
        </div>

        {/* Quick Navigation Cards - White background */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                const sectionIndex = sections.findIndex(s => s.title === item.sectionTitle);
                if (sectionIndex !== -1) {
                  document.getElementById(`section-${sectionIndex}`)?.scrollIntoView({ behavior: 'smooth' });
                  toggleSection(sectionIndex);
                }
              }}
              className="bg-white p-4 rounded-xl text-center transition-all transform hover:scale-105 hover:shadow-lg border border-gray-100"
            >
              <div className="flex justify-center mb-2" style={{ color: 'var(--primary-color)' }}>
                {item.icon}
              </div>
              <span className="text-sm font-semibold" style={{ color: 'var(--secondary-color)' }}>
                {item.name}
              </span>
            </button>
          ))}
        </div>

        {/* Main Content - Accordion Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div
              key={index}
              id={`section-${index}`}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                style={{ 
                  backgroundColor: openSection === index ? 'var(--primary-color)' : 'white',
                  color: openSection === index ? 'white' : 'var(--secondary-color)'
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className={openSection === index ? 'text-white' : ''} style={{ color: openSection === index ? 'white' : 'var(--primary-color)' }}>
                    {section.icon}
                  </div>
                  <span className="font-bold text-lg">{section.title}</span>
                </div>
                <div>
                  {openSection === index ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" style={{ color: 'var(--primary-color)' }} />
                  )}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openSection === index ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 py-6 bg-gray-50">
                  <p className="text-gray-700 leading-relaxed mb-4 italic">
                    {section.content.intro}
                  </p>
                  <ul className="space-y-3">
                    {section.content.points.map((point, pointIdx) => (
                      <li key={pointIdx} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--primary-color)' }} />
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Important Notice Banner - White background */}
        <div className="mt-12 bg-white rounded-xl p-6 border border-gray-200 shadow-md">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--secondary-color)' }}>
                Important Notice
              </h3>
              <p className="text-gray-700 mb-3">
                QuickCure is NOT an emergency service. In case of medical emergencies, please call your local emergency number 
                or visit the nearest hospital immediately.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-semibold text-gray-700">Emergency: 1122</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" style={{ color: 'var(--primary-color)' }} />
                  <span className="text-sm text-gray-700">support@quickcure.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" style={{ color: 'var(--primary-color)' }} />
                  <span className="text-sm text-gray-700">Support: 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact for Questions */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-3 px-6 py-4 bg-white rounded-xl shadow-md border border-gray-100">
            <HelpCircle className="w-6 h-6" style={{ color: 'var(--primary-color)' }} />
            <span style={{ color: 'var(--secondary-color)' }}>
              Have questions about our policies? 
              <span className="font-semibold ml-1" style={{ color: 'var(--primary-color)' }}>
                Contact our legal team
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPolicyPage;