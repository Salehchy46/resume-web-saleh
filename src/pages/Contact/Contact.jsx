/* eslint-disable no-unused-vars */
// src/pages/Contact.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Bot,
  User,
  Sparkles,
} from "lucide-react";
import SupportLottie from "../../assets/lotties/Support.json";
import Lottie from "lottie-react";

// ── AI CHATBOT HOOK ─────────────────────────────────────────────────────────
function useChat() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const historyRef = useRef([]);

  const BACKEND = import.meta.env.VITE_BACKEND_URL || "";

  const SYSTEM = `You are Saleh's warm and professional AI assistant on his frontend developer portfolio contact page. Your role is to chat with potential clients, understand their project, and encourage them to work with Saleh.

Saleh's expertise:
- React, TypeScript — scalable, production-grade apps
- Tailwind CSS — utility-first, beautiful, responsive UIs
- Animations — Framer Motion, GSAP, CSS transitions and keyframes
- Landing pages — high-converting, cinematic, pixel-perfect
- Figma to code — faithful, animated, responsive implementation
- Performance — Lighthouse 95+, Core Web Vitals, lazy loading
- UI revamps — modernizing legacy frontend products

Contact info:
- Email: Salehchyctg@gmail.com
- Phone/WhatsApp: +8801835069946
- Location: Chattogram, Bangladesh

Pricing (share approximate ranges freely):
- Landing page: $900 – $2,000
- Multi-page marketing site: $2,000 – $4,500
- React / Next.js web app: $3,500 – $10,000+
- Figma-to-code (per screen): $150 – $450
- Rush delivery under 5 days: +25%
- Typical turnaround: landing pages 5–7 days, apps 2–6 weeks

Your style:
- Warm, confident, concise — 2–4 sentences max per reply
- Ask one clarifying question at a time (project type, designs ready, timeline, budget)
- Try to collect the visitor's email or name naturally in conversation
- Get excited about the project
- Encourage them to fill the contact form above or message on WhatsApp
- Never invent specific project details
- Use plain conversational text — no markdown, no asterisks, no bullets, no headers`;

  useEffect(() => {
    const sessionId =
      sessionStorage.getItem("chat_sid") ||
      (() => {
        const id = Math.random().toString(36).slice(2) + Date.now().toString(36);
        sessionStorage.setItem("chat_sid", id);
        return id;
      })();

    const init = async () => {
      try {
        const r = await fetch(`${BACKEND}/api/conversation/start`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionId }),
        });
        const d = await r.json();
        setConversationId(d.conversation_id);

        if (d.messages && d.messages.length > 0) {
          const restored = d.messages.map((m) => ({
            role: m.role === "user" ? "user" : "bot",
            text: m.content,
            id: Math.random(),
          }));
          setMessages(restored);
          historyRef.current = d.messages.map((m) => ({
            role: m.role === "user" ? "user" : "assistant",
            content: m.content,
          }));
          return;
        }
      } catch {
        // backend not available — client-side only mode
      }
      greet();
    };

    setTimeout(init, 600);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const greet = () => {
    const greeting = "Hi there! 👋 I'm Saleh's assistant. Tell me about your project — what kind of website are you looking to build?";
    setMessages([{ role: "bot", text: greeting, id: Date.now() }]);
    historyRef.current = [{ role: "assistant", content: greeting }];
  };

  const send = async (text) => {
    if (!text.trim() || isTyping) return;

    const userMsg = { role: "user", text, id: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    historyRef.current.push({ role: "user", content: text });
    setIsTyping(true);

    try {
      let reply;

      if (conversationId && BACKEND) {
        const r = await fetch(`${BACKEND}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            conversation_id: conversationId,
            message: text,
            history: historyRef.current,
          }),
        });
        const d = await r.json();
        reply = d.reply;
      } else {
        const apiKey = import.meta.env.VITE_ANTHROPIC_KEY || "";
        const r = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1000,
            system: SYSTEM,
            messages: historyRef.current,
          }),
        });
        const d = await r.json();
        reply = d.content?.[0]?.text;
      }

      reply = reply || "Sorry, something went wrong — please try again!";
      historyRef.current.push({ role: "assistant", content: reply });
      setMessages((prev) => [...prev, { role: "bot", text: reply, id: Date.now() }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Hmm, something went wrong on my end — please try again!", id: Date.now() },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return { messages, isTyping, send };
}

// ── CHATBOT COMPONENT (auto‑scroll removed) ─────────────────────────────────
const SUGGESTIONS = [
  "I need a landing page",
  "I have a Figma design",
  "What's the pricing?",
  "How fast can you deliver?",
];

function ChatBot() {
  const { messages, isTyping, send } = useChat();
  const [input, setInput] = useState("");
  const [suggestionsVisible, setSuggestionsVisible] = useState(true);
  // const bottomRef = useRef(null); // REMOVED auto‑scroll

  // REMOVED the useEffect that scrolled to bottom

  const handleSend = () => {
    if (!input.trim()) return;
    setSuggestionsVisible(false);
    send(input);
    setInput("");
  };

  const handleSuggestion = (s) => {
    setSuggestionsVisible(false);
    send(s);
  };

  return (
    <div className="rounded-2xl shadow-xl overflow-hidden">
      <div className="flex-1 min-w-0 flex flex-col p-2 bg-gray-800">
        {/* Chat header */}
        <div className="flex items-center gap-3 px-5 py-4 bg-gray-900 border-b border-gray-700">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center">
              <Bot size={18} className="text-blue-400" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-gray-900" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-none">Saleh's Assistant</p>
            <p className="text-xs text-green-400 mt-0.5 flex items-center gap-1">
              <Sparkles size={10} /> Online · replies instantly
            </p>
          </div>
        </div>

        {/* Messages – no auto‑scroll, user scrolls manually */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-80 max-h-96">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-end gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold
                    ${m.role === "bot"
                    ? "bg-blue-600/20 border border-blue-500/30 text-blue-400"
                    : "bg-gray-600/40 border border-gray-500/30 text-gray-300"
                  }`}
              >
                {m.role === "bot" ? <Bot size={13} /> : <User size={13} />}
              </div>
              <div
                className={`max-w-[76%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
                    ${m.role === "bot"
                    ? "bg-gray-700 text-gray-100 rounded-bl-sm"
                    : "bg-blue-600 text-white rounded-br-sm"
                  }`}
                style={{ animation: "fadeUp 0.25s ease" }}
              >
                {m.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-end gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                <Bot size={13} className="text-blue-400" />
              </div>
              <div className="bg-gray-700 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-gray-400"
                    style={{ animation: `typingBounce 1.2s ${i * 0.2}s infinite` }}
                  />
                ))}
              </div>
            </div>
          )}
          {/* Removed the bottomRef div */}
        </div>

        {/* Quick replies */}
        {suggestionsVisible && messages.length <= 1 && (
          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSuggestion(s)}
                className="text-xs px-3 py-1.5 rounded-full border border-gray-600 text-gray-400
                         hover:border-blue-500 hover:text-blue-400 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input bar */}
        <div className="px-4 py-3 border-t border-gray-700 bg-gray-900 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Describe your project…"
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white
                     placeholder-gray-500 outline-none focus:border-blue-500 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed
                     rounded-lg text-white transition-colors flex items-center gap-1.5"
          >
            <Send size={15} />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}

// ── MAIN CONTACT PAGE ────────────────────────────────────────────────────────
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
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
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

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
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* ========== ANIMATED BACKGROUND ========== */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Main gradient – slow shift */}
        <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-blue-900/20 to-gray-900 animate-gradient-xy" />

        {/* Floating soft blobs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-float-slower" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-indigo-500/5 rounded-full blur-3xl animate-pulse-slow" />

        {/* Subtle floating particles */}
        <div className="absolute top-[15%] left-[10%] w-2 h-2 bg-blue-400/30 rounded-full animate-particle-1" />
        <div className="absolute top-[70%] left-[85%] w-3 h-3 bg-cyan-400/20 rounded-full animate-particle-2" />
        <div className="absolute top-[40%] left-[20%] w-1.5 h-1.5 bg-blue-300/20 rounded-full animate-particle-3" />
        <div className="absolute top-[80%] left-[30%] w-2 h-2 bg-cyan-300/25 rounded-full animate-particle-4" />
        <div className="absolute top-[25%] left-[75%] w-2.5 h-2.5 bg-blue-400/20 rounded-full animate-particle-5" />
      </div>

      {/* Hero */}
      <section className="relative bg-transparent py-20 md:py-28 overflow-hidden">
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have a project in mind? Let's talk.
          </p>
        </div>
      </section>

      {/* AI CHATBOT BANNER */}
      <section className="py-12 bg-gray-900/50 backdrop-blur-sm border-y border-gray-700/50">
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="animate-on-scroll">
            <div className="flex items-center gap-2 mb-3">
              <Bot size={18} className="text-blue-400" />
              <span className="text-sm font-medium text-blue-400 uppercase tracking-widest">
                AI Assistant
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Not sure where to start?
            </h2>
            <p className="text-gray-400 mb-6 max-w-xl">
              Chat with my AI assistant to scope your project. I'll follow up within 24 hours.
            </p>
            <div className="w-full flex flex-col md:flex-row bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-700/50">
              <div className="flex-1">
                <ChatBot />
              </div>
              <div className="flex-1 flex items-center justify-center p-6 border-t border-gray-700 md:border-t-0 md:border-l md:border-gray-700">
                <Lottie
                  animationData={SupportLottie}
                  loop={true}
                  autoplay={true}
                  className="w-full max-w-xs h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 md:py-24 bg-transparent">
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Contact Form */}
            <div className="animate-on-scroll">
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-gray-700/50">
                <h2 className="text-2xl font-bold text-white mb-6">Send Me a Message</h2>

                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg flex items-center gap-3 text-green-400">
                    <CheckCircle size={20} />
                    <span>Message sent! I'll get back to you soon.</span>
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
                      type="text" name="name" value={formData.name}
                      onChange={handleChange} required
                      className="w-full px-4 py-2 bg-gray-900/70 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Email</label>
                    <input
                      type="email" name="email" value={formData.email}
                      onChange={handleChange} required
                      className="w-full px-4 py-2 bg-gray-900/70 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Subject</label>
                    <input
                      type="text" name="subject" value={formData.subject}
                      onChange={handleChange} required
                      className="w-full px-4 py-2 bg-gray-900/70 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Message</label>
                    <textarea
                      name="message" rows="5" value={formData.message}
                      onChange={handleChange} required
                      className="w-full px-4 py-2 bg-gray-900/70 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition text-white resize-none"
                    />
                  </div>
                  <button
                    type="submit" disabled={isSubmitting}
                    className="relative w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group overflow-hidden"
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                    <span className="relative z-10 flex items-center gap-2">
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <Send size={18} className="group-hover:translate-x-1 transition" />
                    </span>
                  </button>
                </form>
              </div>
            </div>

            {/* Right: Info + Social + WhatsApp */}
            <div className="space-y-8 animate-on-scroll">
              {/* Contact Info */}
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-gray-700/50">
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

              {/* Social */}
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-gray-700/50">
                <h2 className="text-2xl font-bold text-white mb-6">Connect With Me</h2>
                <div className="flex gap-6">
                  <a href="https://github.com/Salehchy46" target="_blank" rel="noopener noreferrer"
                    className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-transform hover:scale-110">
                    <Github size={24} />
                  </a>
                  <a href="https://www.linkedin.com/in/mohammad-saleh-830389226/" target="_blank" rel="noopener noreferrer"
                    className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-transform hover:scale-110">
                    <Linkedin size={24} />
                  </a>
                  <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer"
                    className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-transform hover:scale-110">
                    <Facebook size={24} />
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 text-center border border-gray-700/50">
                <h2 className="text-2xl font-bold text-white mb-4">Prefer WhatsApp?</h2>
                <p className="text-gray-300 mb-6">I reply faster on WhatsApp.</p>
                <a
                  href="https://wa.me/8801835069946?text=Hi%2C%20I%27m%20interested%20in%20working%20with%20you!"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition shadow-md hover:shadow-lg"
                >
                  <MessageCircle size={20} /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Animation Keyframes */}
      <style jsx>{`
        /* Background animations */
        @keyframes gradient-xy {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, 30px) rotate(5deg); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-30px, 20px) rotate(-3deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        @keyframes particleFloat1 {
          0%, 100% { transform: translate(0, 0); opacity: 0.2; }
          50% { transform: translate(40px, -20px); opacity: 0.5; }
        }
        @keyframes particleFloat2 {
          0%, 100% { transform: translate(0, 0); opacity: 0.15; }
          50% { transform: translate(-30px, 40px); opacity: 0.4; }
        }
        @keyframes particleFloat3 {
          0%, 100% { transform: translate(0, 0); opacity: 0.2; }
          50% { transform: translate(20px, -35px); opacity: 0.45; }
        }
        .animate-gradient-xy {
          background-size: 200% 200%;
          animation: gradient-xy 15s ease infinite;
        }
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slower 25s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-particle-1 {
          animation: particleFloat1 14s ease-in-out infinite;
        }
        .animate-particle-2 {
          animation: particleFloat2 18s ease-in-out infinite;
        }
        .animate-particle-3 {
          animation: particleFloat3 12s ease-in-out infinite;
        }
        .animate-particle-4 {
          animation: particleFloat2 16s ease-in-out infinite;
        }
        .animate-particle-5 {
          animation: particleFloat1 20s ease-in-out infinite;
        }
        /* Scroll reveal */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .animate-fade-up {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        /* Chatbot animations */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Contact;