/* eslint-disable no-unused-vars */
// src/pages/Contact.jsx
"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Facebook,
  Send,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import Lottie from "lottie-react";
// Optional: add a Lottie animation JSON (you can download a free one from lottiefiles.com)
// import contactLottie from "../assets/contact-lottie.json"; // replace with your own

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (mock – replace with your actual endpoint)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate API call – replace with your formspree / backend URL
    try {
      // Example using Formspree
      const response = await fetch("https://formspree.io/f/yourformid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/5 blur-3xl" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have a project in mind? Let’s talk.
          </p>
        </div>
      </section>

      {/* Main Contact Section – Two Columns */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column: Contact Form */}
            <div className="animate-on-scroll">
              <div className="bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Send Me a Message</h2>

                {/* Success / Error Message */}
                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg flex items-center gap-3 text-green-400">
                    <CheckCircle size={20} />
                    <span>Message sent successfully! I'll get back to you soon.</span>
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
                    Something went wrong. Please try again or email me directly.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Message</label>
                    <textarea
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition text-white resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group overflow-hidden"
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <span className="relative z-10 flex items-center gap-2">
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <Send size={18} className="group-hover:translate-x-1 transition" />
                    </span>
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: Contact Info + Social + WhatsApp */}
            <div className="space-y-8 animate-on-scroll">
              {/* Contact Information Card */}
              <div className="bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Contact Info</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-gray-300">
                    <Mail className="text-blue-400" size={22} />
                    <a href="mailto:Salehchyctg@gmail.com" className="hover:text-blue-400 transition">
                      Salehchyctg@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-4 text-gray-300">
                    <Phone className="text-blue-400" size={22} />
                    <a href="tel:+8801835069946" className="hover:text-blue-400 transition">
                      +88 01835‑069946
                    </a>
                  </div>
                  <div className="flex items-center gap-4 text-gray-300">
                    <MapPin className="text-blue-400" size={22} />
                    <span>Arkan Society, Bohaddarhar, Chattogram, Bangladesh</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Connect With Me</h2>
                <div className="flex gap-6">
                  <a
                    href="https://github.com/Salehchy46"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-transform hover:scale-110"
                  >
                    <Github size={24} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mohammad-saleh-830389226/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-transform hover:scale-110"
                  >
                    <Linkedin size={24} />
                  </a>
                  <a
                    href="https://facebook.com/yourprofile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-transform hover:scale-110"
                  >
                    <Facebook size={24} />
                  </a>
                </div>
              </div>

              {/* WhatsApp Quick Contact */}
              <div className="bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Prefer WhatsApp?</h2>
                <p className="text-gray-300 mb-6">I reply faster on WhatsApp.</p>
                <a
                  href="https://wa.me/8801835069946?text=Hi%2C%20I%27m%20interested%20in%20working%20with%20you!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition shadow-md hover:shadow-lg"
                >
                  <MessageCircle size={20} /> Chat on WhatsApp
                </a>
              </div>

              {/* Optional Lottie Illustration */}
              <div className="hidden lg:block bg-gray-800 rounded-2xl p-4">
                {/* <Lottie
                  animationData={contactLottie}
                  loop={true}
                  className="w-full max-w-sm mx-auto"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800 bg-gray-900">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Mohammad Saleh. All rights reserved.
            </div>
            <div className="flex gap-6 text-gray-400 text-sm">
              <Link to="/" className="hover:text-blue-400 transition">Home</Link>
              <Link to="/about" className="hover:text-blue-400 transition">About</Link>
              <Link to="/work" className="hover:text-blue-400 transition">Work</Link>
              <Link to="/contact" className="hover:text-blue-400 transition">Contact</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .animate-fade-up {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
};

export default Contact;