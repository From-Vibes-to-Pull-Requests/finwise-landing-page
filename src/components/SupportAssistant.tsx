"use client";

import { useState, useRef, useEffect } from "react";
import { FiMessageCircle, FiX, FiSend } from "react-icons/fi";
import { getSupportAnswer } from "@/data/supportKnowledge";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface UserInfo {
  name: string;
  countryCode: string;
  phoneNumber: string;
  email: string;
}

interface CountryCode {
  code: string;
  country: string;
  flag: string;
}

const countryCodes: CountryCode[] = [
  { code: "+1", country: "US/CA", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+39", country: "Italy", flag: "🇮🇹" },
  { code: "+34", country: "Spain", flag: "🇪🇸" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+55", country: "Brazil", flag: "🇧🇷" },
  { code: "+7", country: "Russia", flag: "🇷🇺" },
  { code: "+82", country: "South Korea", flag: "🇰🇷" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+27", country: "South Africa", flag: "🇿🇦" },
  { code: "+52", country: "Mexico", flag: "🇲🇽" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱" },
  { code: "+46", country: "Sweden", flag: "🇸🇪" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭" },
];

const SupportAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    countryCode: "+1",
    phoneNumber: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<UserInfo>>({});
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isFormSubmitted && nameInputRef.current) {
      nameInputRef.current.focus();
    } else if (isOpen && isFormSubmitted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isFormSubmitted]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^[0-9]{7,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Partial<UserInfo> = {};

    if (!userInfo.name.trim()) {
      errors.name = "Name is required";
    }

    if (!userInfo.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    } else if (!validatePhoneNumber(userInfo.phoneNumber)) {
      errors.phoneNumber = "Please enter a valid phone number";
    }

    if (!userInfo.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(userInfo.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsFormSubmitted(true);
    setMessages([
      {
        text: `Hi ${userInfo.name}! I'm here to help answer questions about Finwise. You can ask me about pricing, features, security, or anything else. What would you like to know?`,
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset form when closing
    setTimeout(() => {
      setIsFormSubmitted(false);
      setUserInfo({
        name: "",
        countryCode: "+1",
        phoneNumber: "",
        email: "",
      });
      setFormErrors({});
      setMessages([]);
      setInputValue("");
    }, 300);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      text: inputValue.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate thinking time
    setTimeout(() => {
      const response = getSupportAnswer(inputValue.trim());
      const botMessage: Message = {
        text: response.answer,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-secondary text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
        aria-label="Open support chat"
      >
        {isOpen ? (
          <FiX className="w-6 h-6" />
        ) : (
          <FiMessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col h-[500px] max-h-[calc(100vh-8rem)]">
          {/* Header */}
          <div className="bg-secondary text-white p-4 rounded-t-lg flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Support Assistant</h3>
              <p className="text-sm text-white/90">We&apos;re here to help!</p>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:text-white/80 transition-colors"
              aria-label="Close chat"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {!isFormSubmitted ? (
            /* User Info Form */
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="mb-4">
                <p className="text-gray-700 text-sm mb-2">
                  Please provide your details to continue:
                </p>
              </div>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={nameInputRef}
                    type="text"
                    id="name"
                    value={userInfo.name}
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, name: e.target.value });
                      if (formErrors.name) {
                        setFormErrors({ ...formErrors, name: undefined });
                      }
                    }}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
                      formErrors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your name"
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                  )}
                </div>

                {/* Phone Number Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="w-32">
                      <select
                        value={userInfo.countryCode}
                        onChange={(e) => setUserInfo({ ...userInfo, countryCode: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                      >
                        {countryCodes.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.flag} {country.code}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-1">
                      <input
                        type="tel"
                        value={userInfo.phoneNumber}
                        onChange={(e) => {
                          setUserInfo({ ...userInfo, phoneNumber: e.target.value });
                          if (formErrors.phoneNumber) {
                            setFormErrors({ ...formErrors, phoneNumber: undefined });
                          }
                        }}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
                          formErrors.phoneNumber ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter phone number"
                      />
                      {formErrors.phoneNumber && (
                        <p className="text-red-500 text-xs mt-1">{formErrors.phoneNumber}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={userInfo.email}
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, email: e.target.value });
                      if (formErrors.email) {
                        setFormErrors({ ...formErrors, email: undefined });
                      }
                    }}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary ${
                      formErrors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your email"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary/90 transition-colors font-medium"
                >
                  Start Chat
                </button>
              </form>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.isUser
                          ? "bg-secondary text-white"
                          : "bg-white text-gray-800 border border-gray-200"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-800 border border-gray-200 rounded-lg px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 p-4 bg-white rounded-b-lg">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your question..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Send message"
                  >
                    <FiSend className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default SupportAssistant;

