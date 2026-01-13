import React, { useState, useEffect } from 'react';

const LabVerificationSteps = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState('');
  const [timer, setTimer] = useState(60);
  const [codeSent, setCodeSent] = useState(false);

  useEffect(() => {
    if (codeSent && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [codeSent, timer]);

  const steps = [
    { 
      id: 1, 
      title: 'Mobile Verification', 
      description: 'Verify your Pakistani mobile number',
      icon: '📱',
      color: 'blue'
    },
    { 
      id: 2, 
      title: 'Email Verification', 
      description: 'Verify your email address',
      icon: '📧',
      color: 'green'
    },
    { 
      id: 3, 
      title: 'Admin Review', 
      description: 'Documents under review',
      icon: '👨‍💼',
      color: 'purple'
    },
    { 
      id: 4, 
      title: 'Approval', 
      description: 'Get your login credentials',
      icon: '✅',
      color: 'green'
    }
  ];

  const handleSendCode = () => {
    setCodeSent(true);
    setTimer(60);
    // In real app: Send verification code via SMS
  };

  const handleVerifyCode = () => {
    if (verificationCode === '123456') { // Mock verification
      setCurrentStep(2);
      setVerificationCode('');
      setCodeSent(false);
    }
  };

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <span className="text-2xl">🔒</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification in Progress</h2>
        <p className="text-gray-600">
          Complete these steps to activate your lab account
        </p>
      </div>

      {/* Steps Progress */}
      <div className="mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start mb-8">
            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-4
              ${currentStep > step.id ? 'bg-green-100 text-green-600' : 
                currentStep === step.id ? `bg-${step.color}-100 text-${step.color}-600` : 
                'bg-gray-100 text-gray-400'}`}
            >
              {currentStep > step.id ? '✓' : step.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className={`font-semibold ${currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'}`}>
                  {step.title}
                </h3>
                {currentStep === step.id && (
                  <span className={`px-3 py-1 text-xs rounded-full bg-${step.color}-100 text-${step.color}-700`}>
                    In Progress
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">{step.description}</p>
              
              {/* Step Content */}
              {currentStep === step.id && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  {step.id === 1 && (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        Enter the 6-digit code sent to your mobile number
                      </p>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          maxLength="6"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg tracking-widest"
                          placeholder="123456"
                        />
                        <button
                          onClick={handleVerifyCode}
                          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          disabled={verificationCode.length !== 6}
                        >
                          Verify
                        </button>
                      </div>
                      <div className="text-center">
                        {codeSent ? (
                          <p className="text-sm text-gray-500">
                            Resend code in {timer}s
                          </p>
                        ) : (
                          <button
                            onClick={handleSendCode}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            Send verification code
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {step.id === 2 && (
                    <div className="text-center py-4">
                      <p className="text-gray-600 mb-4">
                        Verification email sent to your registered email address.
                        Please check your inbox and click the verification link.
                      </p>
                      <button
                        onClick={() => setCurrentStep(3)}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        I've verified my email
                      </button>
                    </div>
                  )}

                  {step.id === 3 && (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">
                        Our admin team is reviewing your documents. This usually takes 24-48 hours.
                      </p>
                      <div className="mt-4 text-sm text-gray-500">
                        <p>✅ Documents received</p>
                        <p>⏳ Background check in progress</p>
                        <p>⏳ Physical verification scheduled</p>
                      </div>
                    </div>
                  )}

                  {step.id === 4 && (
                    <div className="text-center py-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🎉</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Registration Approved!</h3>
                      <p className="text-gray-600 mb-6">
                        Congratulations! Your lab has been approved. Login credentials have been sent to your email.
                      </p>
                      <div className="space-y-3 max-w-sm mx-auto">
                        <a
                          href="/lab/login"
                          className="block w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
                        >
                          Go to Lab Login
                        </a>
                        <a
                          href="/lab/guide"
                          className="block w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium"
                        >
                          View Getting Started Guide
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Support Info */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-start">
          <span className="text-blue-600 mr-3">📞</span>
          <div>
            <p className="text-sm font-medium text-blue-800">Need help with verification?</p>
            <p className="text-sm text-blue-700 mt-1">
              Call our support team at <strong>+92 300 1234567</strong> or email{' '}
              <a href="mailto:verification@healthpak.com" className="underline">
                verification@healthpak.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabVerificationSteps;