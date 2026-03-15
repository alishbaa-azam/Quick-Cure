import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: false,
    message: ''
  });

  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) return 'Email is invalid';
    if (!formData.message.trim()) return 'Message is required';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setStatus({
        submitting: false,
        submitted: false,
        error: true,
        message: validationError
      });
      return;
    }

    setStatus({ submitting: true, submitted: false, error: false, message: 'Sending...' });

    // Simulate API call - Replace with actual API endpoint
    try {
      // This is where you'd make your actual API call
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      
      // Mock successful submission
      setStatus({
        submitting: false,
        submitted: true,
        error: false,
        message: 'Thank you! Your message has been sent successfully.'
      });
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setStatus({
        submitting: false,
        submitted: false,
        error: true,
        message: 'Failed to send message. Please try again.'
      });
    }
  };

  const faqData = [
    {
      id: 1,
      question: "How does QuickCure work?",
      answer: "QuickCure connects you with healthcare professionals instantly. You can book appointments, consult online, get prescriptions, and order medicines—all from your mobile device or computer. Simply create an account, choose your specialty, and connect with a doctor within minutes."
    },
    {
      id: 2,
      question: "Is my medical data secure?",
      answer: "Absolutely! We use bank-level encryption (256-bit SSL) to protect your data. We are HIPAA compliant and follow all healthcare data protection regulations. Your medical records and conversations are private and never shared without your consent."
    },
    {
      id: 3,
      question: "What are your consultation hours?",
      answer: "Our doctors are available 24/7, including weekends and holidays. Emergency consultations are always available. For non-emergency appointments, you can schedule between 8 AM to 10 PM in your local timezone."
    },
    {
      id: 4,
      question: "How much does a consultation cost?",
      answer: "Consultation fees vary by specialty and doctor experience, ranging from $29 to $79. We accept most insurance plans and offer subscription plans for regular patients. Free follow-up within 7 days is included with every consultation."
    },
    {
      id: 5,
      question: "Can I get a refund if I'm not satisfied?",
      answer: "Yes, we offer a 100% satisfaction guarantee. If you're not happy with your consultation, you can request a full refund within 48 hours. Contact our support team with your consultation ID, and we'll process your refund immediately."
    }
  ];

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Support",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      availability: "24/7 Emergency Support"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: ["support@quickcure.com", "care@quickcure.com"],
      availability: "Reply within 24 hours"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: ["123 Healthcare Ave", "Medical District, NY 10001"],
      availability: "Mon-Fri, 9AM-6PM"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Working Hours",
      details: ["Monday - Friday: 24/7", "Saturday - Sunday: 24/7"],
      availability: "Always Open"
    }
  ];

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-bgLight/20">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-textLight max-w-2xl mx-auto">
            Have questions about QuickCure? We're here to help 24/7. Reach out to us anytime!
          </p>
        </div>
      </div>

      {/* Contact Information Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-bgLight/30"
            >
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center text-primary mb-4">
                {info.icon}
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2">{info.title}</h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-gray-600 text-sm">{detail}</p>
              ))}
              <p className="text-accent text-xs mt-2 font-medium">{info.availability}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content - Contact Form & FAQ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-bgLight/30">
            <h2 className="text-3xl font-bold text-secondary mb-6">Send us a Message</h2>
            <p className="text-gray-600 mb-8">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-secondary mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                  placeholder="John Doe"
                  disabled={status.submitting}
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                  placeholder="john@example.com"
                  disabled={status.submitting}
                />
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-secondary mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                  placeholder="+1 (555) 000-0000"
                  disabled={status.submitting}
                />
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-secondary mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                  placeholder="How can we help you?"
                  disabled={status.submitting}
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-secondary mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 resize-none"
                  placeholder="Please describe your query in detail..."
                  disabled={status.submitting}
                />
              </div>

              {/* Status Messages */}
              {status.message && (
                <div
                  className={`p-4 rounded-lg flex items-center space-x-2 ${
                    status.error
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : status.submitted
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : status.submitting
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : ''
                  }`}
                >
                  {status.error ? (
                    <AlertCircle className="w-5 h-5" />
                  ) : status.submitted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : status.submitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700" />
                  ) : null}
                  <span>{status.message}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status.submitting}
                className="w-full bg-primary text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-hover transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2 group"
              >
                <span>{status.submitting ? 'Sending...' : 'Send Message'}</span>
                {!status.submitting && <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </button>

              {/* Required Fields Note */}
              <p className="text-xs text-gray-500 text-center mt-4">
                <span className="text-red-500">*</span> Required fields
              </p>
            </form>
          </div>

          {/* FAQ Section */}
          <div className="space-y-6">
            <div className="bg-primary/5 rounded-2xl p-8 border border-bgLight/30">
              <h2 className="text-3xl font-bold text-secondary mb-2">Frequently Asked Questions</h2>
              <p className="text-gray-600 mb-8">
                Quick answers to questions you may have. Can't find what you're looking for? Just send us a message!
              </p>

              <div className="space-y-4">
                {faqData.map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-primary/30 transition-colors duration-200"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    >
                      <span className="font-semibold text-secondary">{faq.question}</span>
                      <svg
                        className={`w-5 h-5 text-primary transform transition-transform duration-200 ${
                          expandedFaq === faq.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {expandedFaq === faq.id && (
                      <div className="px-6 pb-4 text-gray-600 border-t border-gray-100 pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Additional Help Section */}
              <div className="mt-8 p-6 bg-accent/10 rounded-xl border border-accent/20">
                <h3 className="text-lg font-semibold text-secondary mb-2">Still have questions?</h3>
                <p className="text-gray-600 mb-4">
                  Can't find the answer you're looking for? Our support team is ready to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+15551234567"
                    className="flex items-center justify-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-hover transition-colors duration-200"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Us Now</span>
                  </a>
                  <a
                    href="mailto:support@quickcure.com"
                    className="flex items-center justify-center space-x-2 border-2 border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary/5 transition-colors duration-200"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email Support</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Map or Additional Info */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-bgLight/30">
              <h3 className="text-xl font-semibold text-secondary mb-4">Quick Response Guarantee</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 rounded-full p-1">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-gray-600">Average response time: &lt; 2 hours</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 rounded-full p-1">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-gray-600">98% customer satisfaction rate</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 rounded-full p-1">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-gray-600">24/7 emergency support available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;