import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Mail, User, MessageSquare, Phone, BookOpen, ChevronDown, ChevronUp, HelpCircle, Clock, CreditCard, Shield, Video, Pill, FileText, Calendar, Star } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const faqs = [
    {
      question: "What is QuickCure and how does it work?",
      answer: "QuickCure is an integrated web-based healthcare platform that connects patients with doctors, pharmacies, and diagnostic labs all in one place. You can register securely, book online consultations with specialist doctors, receive electronic prescriptions, order prescribed medicines online, and book lab tests - all from the comfort of your home.",
      icon: <HelpCircle className="w-5 h-5" />
    },
    {
      question: "How do I book an appointment with a doctor?",
      answer: "Simply register on QuickCure, browse through our list of licensed doctors by specialty, check their real-time availability, and book an appointment at your preferred time. You'll receive instant confirmation, a Google Meet link for your consultation, and reminders for your appointment.",
      icon: <Clock className="w-5 h-5" />
    },
    {
      question: "How does the online consultation work?",
      answer: "After booking an appointment, you will receive a Google Meet link via email and SMS. At your scheduled time, simply click the link to join the video consultation with your doctor. No additional software or account is needed - just a browser and stable internet connection.",
      icon: <Video className="w-5 h-5" />
    },
    {
      question: "Is my personal and medical information secure?",
      answer: "Yes! We prioritize your privacy and security. Your medical records, prescriptions, and personal information are stored in encrypted databases with role-based access control. All data transmission uses SSL/TLS encryption, and we comply with healthcare data protection standards to ensure complete confidentiality.",
      icon: <Shield className="w-5 h-5" />
    },
    {
      question: "What payment methods are accepted on QuickCure?",
      answer: "QuickCure uses Stripe as our secure payment gateway. We accept all major credit/debit cards (Visa, Mastercard, American Express), bank transfers, and popular digital wallets. Stripe ensures bank-grade security for all transactions with PCI compliance.",
      icon: <CreditCard className="w-5 h-5" />
    },
    {
      question: "Is Stripe payment secure?",
      answer: "Absolutely! Stripe is a globally trusted payment processor used by millions of businesses. It provides end-to-end encryption, fraud detection, and never stores your full card details on our servers. Your payment information is completely safe and secure.",
      icon: <Shield className="w-5 h-5" />
    },
    {
      question: "Can I order prescribed medicines online?",
      answer: "Absolutely! Once a doctor prescribes medication, you can order it directly through our integrated pharmacy partner. The prescription is validated digitally and medicines are delivered to your doorstep. Payment is processed securely via Stripe. No need to visit a physical pharmacy!",
      icon: <Pill className="w-5 h-5" />
    },
    {
      question: "Do I need a Google account for video consultation?",
      answer: "Yes, you need a Google account to join Google Meet consultations. When you book an appointment, you'll receive a Google Meet link via email. Simply click the link and sign in to your Google account to join the video call. If you don't have a Google account, you can create one for free at accounts.google.com.",
      icon: <Video className="w-5 h-5" />
    },
    {
      question: "What equipment do I need for video consultation?",
      answer: "You just need a smartphone, tablet, or computer with a stable internet connection (minimum 2 Mbps), a working camera, microphone, and speakers/headset. Google Chrome, Firefox, or Safari browser is recommended for the best experience.",
      icon: <Star className="w-5 h-5" />
    },
    {
      question: "How are my medical records stored and accessed?",
      answer: "Your medical records, including prescriptions and test results, are securely stored in our MongoDB database. You can access them anytime from your dashboard. Doctors can also access previous records with your consent for better continuity of care. All data is encrypted at rest and in transit.",
      icon: <FileText className="w-5 h-5" />
    },
    {
      question: "What if I need a lab test?",
      answer: "QuickCure integrates with diagnostic laboratories. You can book lab tests directly through the platform, pay securely via Stripe, get your samples collected from home, and receive test results digitally within the system - easily accessible to both you and your doctor.",
      icon: <FileText className="w-5 h-5" />
    },
    {
      question: "Can I cancel or reschedule my appointment?",
      answer: "Yes, you can cancel or reschedule your appointment up to 2 hours before the scheduled time through your dashboard. Refunds for cancelled appointments are processed automatically through Stripe according to our refund policy.",
      icon: <Calendar className="w-5 h-5" />
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address (e.g., name@example.com)';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{11}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 11 digits';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length <= 11) {
        setFormData(prev => ({
          ...prev,
          [name]: digitsOnly
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleEmailBlur = () => {
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrors(prev => ({
        ...prev,
        email: 'Please enter a valid email address (e.g., name@example.com)'
      }));
    } else if (formData.email && errors.email) {
      setErrors(prev => ({
        ...prev,
        email: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch('http://localhost:5000/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitStatus({ type: 'success', message: data.message });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Something went wrong' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#f5f5f5' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--primary-color)' }}>
            Contact Us
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--secondary-color)' }}>
            We'd love to hear from you! Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Info Section */}
            <div className="p-8 lg:p-12" style={{ backgroundColor: 'var(--primary-color)' }}>
              <div className="h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
                  <p className="text-white/90 mb-8">
                    Have questions about QuickCure? We're here to help you with any inquiries about our healthcare services.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">Email Us</h3>
                        <p className="text-white/80">support@quickcure.com</p>
                        <p className="text-white/80">hello@quickcure.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">Call Us</h3>
                        <p className="text-white/80">+92 300 1234567</p>
                        <p className="text-white/80">+92 321 7654321</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">Quick Response</h3>
                        <p className="text-white/80">Average response time: 2-4 hours</p>
                        <p className="text-white/80">We value your time</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-white/20">
                  <p className="text-white/70 text-sm">
                    🌟 Join thousands of satisfied patients using QuickCure
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="p-8 lg:p-12">
              {submitStatus && (
                <div className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-50 border border-green-200 text-green-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                  {submitStatus.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <span className="text-sm">{submitStatus.message}</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--secondary-color)' }}>
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--accent-color)' }} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.name 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 focus:ring-2 focus:ring-opacity-50'
                      }`}
                      style={{ 
                        borderColor: errors.name ? '#ef4444' : 'var(--accent-color)'
                      }}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--secondary-color)' }}>
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--accent-color)' }} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleEmailBlur}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none transition-all ${
                        errors.email 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 focus:ring-2 focus:ring-opacity-50'
                      }`}
                      style={{ 
                        borderColor: errors.email ? '#ef4444' : 'var(--accent-color)'
                      }}
                      placeholder="Enter your email address"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--secondary-color)' }}>
                    Phone Number * 
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--accent-color)' }} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none transition-all ${
                        errors.phone 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 focus:ring-2 focus:ring-opacity-50'
                      }`}
                      style={{ 
                        borderColor: errors.phone ? '#ef4444' : 'var(--accent-color)'
                      }}
                      placeholder="Enter phone number "
                      maxLength="11"
                      inputMode="numeric"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                  {formData.phone && formData.phone.length > 0 && formData.phone.length < 11 && (
                    <p className="mt-1 text-sm text-orange-600">Need {11 - formData.phone.length} more digit(s)</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--secondary-color)' }}>
                    Subject *
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--accent-color)' }} />
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none transition-all ${
                        errors.subject 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 focus:ring-2 focus:ring-opacity-50'
                      }`}
                      style={{ 
                        borderColor: errors.subject ? '#ef4444' : 'var(--accent-color)'
                      }}
                      placeholder="Enter subject"
                    />
                  </div>
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--secondary-color)' }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all resize-none ${
                      errors.message 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-2 focus:ring-opacity-50'
                    }`}
                    style={{ 
                      borderColor: errors.message ? '#ef4444' : 'var(--accent-color)'
                    }}
                    placeholder="Please describe your query or feedback in detail..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-lg font-semibold text-white transition-all transform hover:scale-105 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  style={{ 
                    backgroundColor: 'var(--primary-color)'
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--primary-color)' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--secondary-color)' }}>
              Find quick answers to common questions about our health services
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  style={{ 
                    backgroundColor: openFaqIndex === index ? 'var(--primary-color)' : 'white',
                    color: openFaqIndex === index ? 'white' : 'var(--secondary-color)'
                  }}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div className={`transition-colors ${openFaqIndex === index ? 'text-white' : ''}`} style={{ color: openFaqIndex === index ? 'white' : 'var(--primary-color)' }}>
                      {faq.icon}
                    </div>
                    <span className="font-semibold text-lg">{faq.question}</span>
                  </div>
                  <div className="ml-4">
                    {openFaqIndex === index ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" style={{ color: 'var(--primary-color)' }} />
                    )}
                  </div>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 py-4 bg-gray-50 border-t" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Extra Help Section */}
          <div className="mt-10 text-center">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white rounded-full shadow-md">
              <HelpCircle className="w-5 h-5" style={{ color: 'var(--primary-color)' }} />
              <span style={{ color: 'var(--secondary-color)' }}>
                Still have questions? 
                <span className="font-semibold ml-1" style={{ color: 'var(--primary-color)' }}>
                  Contact our support team
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;