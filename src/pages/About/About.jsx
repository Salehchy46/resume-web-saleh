 
// src/pages/About.jsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code,
  Layout,
  Smartphone,
  Zap,
  Globe,
  BookOpen,
  Users,
  Coffee,
  Heart,
  Code2,
  PenTool,
  Terminal,
  Figma,
  Database,
  Server,
  Sparkles,
  Music,
  Camera,
  BookMarked,
  Video,
  Smile,
  Github,
  Plane,
  Gamepad2,
  Pizza,
  Brain,
  Cat,
  Leaf,
  Moon,
  Sun,
  MessageCircle,
  Medal,
} from "lucide-react";

// ---------- Animated Background Component ----------
const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // eslint-disable-next-line react-hooks/unsupported-syntax
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.3 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 150, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    const init = () => {
      resize();
      particles = [];
      const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener("resize", init);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <>
      <>
        <div className="fixed inset-0 bg-linear-to-br from-gray-900 via-blue-900/20 to-gray-900 animate-gradient-xy pointer-events-none" />
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />
      </>
    </>
  );
};

// ---------- Timeline Component (with growing line) ----------
const LifeTimeline = () => {
  const events = [
    { year: "2002", title: "Born in Satkania", description: "Born in Satkania, Chattogram, Bangladesh – the start of an incredible journey." },
    { year: "2007 – 2012", title: "Primary Education", description: "Studied at Barodona Al-Amin Ideal Madrasha. Completed primary education here." },
    { year: "2013 – 2018", title: "Secondary (Dakhil) & First Computer Course", description: "Joined Adhunagar Islamia Kamil Madrasha in Lohagara. Completed Dakhil in 2018. That same year, I finished my first computer course: Microsoft Office (Word, PowerPoint, Excel)." },
    { year: "2020", title: "Higher Secondary (Alim) & COVID Skills", description: "Completed Alim from the same madrasha. During the pandemic lockdown, I learned Canva, Figma design, and other soft skills from home." },
    { year: "2022", title: "University & German Language", description: "Started Honours in English Language and Literature at the University of Chittagong. In 2023, I completed A1 level German." },
    { year: "2023 – 2024", title: "Web Development Foundations", description: "Influenced by Affan, I dived into Wix, WordPress, HTML, CSS, and JavaScript. Built my first websites and discovered my passion for coding." },
    { year: "2024", title: "React & Spanish", description: "My friend Saif introduced me to frontend frameworks. Started learning React and JavaScript seriously. Also began daily Spanish practice (3–5 min/day)." },
    { year: "2025", title: "Japanese & Continuous Growth", description: "Started learning Japanese (Hiragana/Katakana) toward the end of 2025. Still exploring new technologies and building modern web apps." },
    { year: "Today", title: "Always Learning, Always Building", description: "Currently improving my React skills, expanding into full‑stack, and helping others achieve their web development goals." },
  ];

  const [completedSteps, setCompletedSteps] = useState({});
  const [lineProgress, setLineProgress] = useState(0);
  const cardRefs = useRef([]);
  const lineContainerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let maxVisibleIdx = -1;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-idx"));
            if (!completedSteps[idx]) {
              setCompletedSteps((prev) => ({ ...prev, [idx]: true }));
            }
            if (idx > maxVisibleIdx) maxVisibleIdx = idx;
          }
        });
        if (maxVisibleIdx >= 0) {
          const progress = (maxVisibleIdx + 1) / events.length;
          setLineProgress(progress);
        }
      },
      { threshold: 0.5, rootMargin: "0px 0px 200px 0px" }
    );

    cardRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, [completedSteps, events.length]);

  const TimelineCard = ({ event, isDesktop }) => (
    <div className="card bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 group">
      <div className="card-body p-4 sm:p-5">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <span className="badge badge-primary badge-sm font-mono">{event.year}</span>
          <span className="h-px flex-1 bg-linear-to-r from-blue-500/50 to-transparent" />
        </div>
        <h3 className={`card-title text-white group-hover:text-blue-400 transition-colors ${isDesktop ? "text-xl" : "text-lg"}`}>
          {event.title}
        </h3>
        <p className={`text-gray-300 leading-relaxed ${!isDesktop && "text-sm"}`}>
          {event.description}
        </p>
      </div>
    </div>
  );

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 reveal-fade-up">
        <h2 className="text-3xl md:text-4xl font-bold text-white">My Journey</h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Becoming a web developer – the road so far.
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Growing vertical line (desktop only) */}
        <div ref={lineContainerRef} className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-700 overflow-hidden">
          <div
            className="w-full bg-linear-to-b from-blue-500 to-cyan-400 transition-all duration-700 ease-out"
            style={{ height: `${lineProgress * 100}%` }}
          />
        </div>

        {events.map((event, idx) => {
          const isCompleted = completedSteps[idx];
          const isLeft = idx % 2 === 0;

          return (
            <div
              key={idx}
              ref={(el) => (cardRefs.current[idx] = el)}
              data-idx={idx}
              className={`relative mb-12 md:mb-16 transition-opacity duration-700 ${isCompleted ? "opacity-100" : "opacity-70"}`}
            >
              {/* Desktop layout */}
              <div className="hidden md:block">
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-all duration-500 ${isCompleted ? "bg-green-500/20 ring-4 ring-green-400/50 scale-110" : "bg-gray-800 ring-2 ring-gray-600"}`}>
                    <CheckIcon completed={isCompleted} />
                    {isCompleted && <span className="absolute inset-0 rounded-full animate-ping bg-green-400/40" />}
                  </div>
                </div>
                <div className={`${isLeft ? "mr-auto pr-12" : "ml-auto pl-12"} w-[calc(50%-2rem)]`}>
                  <TimelineCard event={event} isDesktop />
                </div>
              </div>

              {/* Mobile layout */}
              <div className="md:hidden flex items-start gap-4">
                <div className="shrink-0">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-all duration-500 ${isCompleted ? "bg-green-500/20 ring-4 ring-green-400/50 scale-110" : "bg-gray-800 ring-2 ring-gray-600"}`}>
                    <CheckIcon completed={isCompleted} />
                    {isCompleted && <span className="absolute inset-0 rounded-full animate-ping bg-green-400/40" />}
                  </div>
                </div>
                <div className="flex-1">
                  <TimelineCard event={event} isDesktop={false} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CheckIcon = ({ completed }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 transition-colors ${completed ? "text-green-400" : "text-blue-400"}`}>
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
  </svg>
);

// ---------- Skills Section (already animated) ----------
const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const skills = [
    { name: "HTML5 / CSS3", icon: <Code2 size={40} />, color: "text-orange-500", level: 90 },
    { name: "JavaScript", icon: <Code2 size={40} />, color: "text-yellow-500", level: 65 },
    { name: "React", icon: <Terminal size={40} />, color: "text-cyan-500", level: 80 },
    { name: "Tailwind CSS", icon: <PenTool size={40} />, color: "text-blue-400", level: 93 },
    { name: "Figma", icon: <Figma size={40} />, color: "text-purple-500", level: 75 },
    { name: "Node.js", icon: <Server size={40} />, color: "text-green-500", level: 50 },
    { name: "WordPress", icon: <Globe size={40} />, color: "text-indigo-400", level: 85 },
    { name: "Python", icon: <Coffee size={40} />, color: "text-blue-300", level: 35 },
    { name: "MongoDB", icon: <Database size={40} />, color: "text-cyan-400", level: 65 },
    { name: "Responsive Design", icon: <Smartphone size={40} />, color: "text-emerald-400", level: 92 },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-size-[50px_50px]" />
      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Skills & <span className="bg-linear-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Technologies</span>
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-blue-500 to-cyan-400 mx-auto mt-5 rounded-full" />
          <p className="text-gray-400 mt-5 max-w-2xl mx-auto text-lg">Tools and frameworks I work with to bring ideas to life.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              style={{ transitionDelay: `${idx * 50}ms` }}
              className={`group relative bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-700 hover:border-blue-500/50 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-600/0 via-transparent to-cyan-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className={`flex justify-center mb-4 transform transition-transform duration-300 group-hover:scale-110 ${skill.color}`}>
                {skill.icon}
              </div>
              <h3 className="font-semibold text-gray-200 text-lg mb-2 group-hover:text-white transition-colors">{skill.name}</h3>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-3 overflow-hidden">
                <div className="bg-linear-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: isVisible ? `${skill.level}%` : "0%", transitionDelay: `${idx * 50 + 200}ms` }} />
              </div>
              <span className="text-xs text-gray-400 mt-1 inline-block">{skill.level}% proficient</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-16 text-gray-500 text-sm">
          <span className="inline-block px-4 py-2 bg-gray-800/50 rounded-full backdrop-blur-sm">⚡ Constantly learning & improving</span>
        </div>
      </div>
      <style jsx>{`
        .bg-grid-white\\/[0.02] {
          background-image: linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
        }
      `}</style>
    </section>
  );
};


const BeyondTheCode = () => {
  const [selectedFact, setSelectedFact] = useState(null);

  const openModal = (fact) => {
    setSelectedFact(fact);
    // eslint-disable-next-line react-hooks/immutability
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedFact(null);
    // eslint-disable-next-line react-hooks/immutability
    document.body.style.overflow = "unset";
  };

  const funFacts = [
    {
      icon: <BookOpen size={20} />,
      text: "Teach English to beginners",
      detail: "Volunteer teacher for 2+ years · helped 30+ students gain confidence"
    },
    {
      icon: <Coffee size={20} />,
      text: "Coffee addict ☕",
      detail: "Minimum 4 cups per day – espresso lover · own pour‑over setup"
    },
    {
      icon: <Music size={20} />,
      text: "Lo‑fi & jazz lover 🎧",
      detail: "Coding soundtrack · playlists on Spotify (10k+ followers)"
    },
    {
      icon: <Camera size={20} />,
      text: "Street photography enthusiast",
      detail: "Capturing raw moments · Fujifilm X100V · featured in local zine"
    },
    {
      icon: <Code size={20} />,
      text: "Late‑night coder (12 AM – 5 AM) 🌙",
      detail: "Most productive when the world sleeps · built 3 side projects at night"
    },
    {
      icon: <BookMarked size={20} />,
      text: "Read 24 books in 2024",
      detail: "Mix of fiction, tech, and self‑improvement · current read: ‘Atomic Habits’"
    },
    {
      icon: <Video size={20} />,
      text: "Watched 100+ coding tutorials",
      detail: "YouTube University graduate · recommend FrontendMasters and freeCodeCamp"
    },
    {
      icon: <Brain size={20} />,
      text: "Solve LeetCode before breakfast",
      detail: "Daily ritual since 2023 · solved 300+ problems, focused on medium/hard"
    },
    {
      icon: <Cat size={20} />,
      text: "Foster stray cats 🐱",
      detail: "Found homes for 8 cats · currently fostering ‘Luna’ and ‘Mochi’"
    },
    {
      icon: <Moon size={20} />,
      text: "Night owl – most creative after 11 PM",
      detail: "Deep work hours: 11 PM – 3 AM · morning meetings are optional 😴"
    },
    {
      icon: <MessageCircle size={20} />,
      text: "Reply to DMs within 2 hours",
      detail: "Active on Twitter & LinkedIn · love mentoring and discussing tech"
    },
    {
      icon: <Sparkles size={20} />,
      text: "Learned 5 frameworks last year",
      detail: "React, Next.js, Vue, Svelte, Angular – each taught me unique lessons"
    },
  ];

  return (
    <>
      <section className="py-20 md:py-28 bg-gray-800">
        {/* Background decorations unchanged */}
        <div className="absolute inset-0 bg-linear-to-tl from-blue-900/5 via-transparent to-cyan-900/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />

        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          {/* Section header – same as before */}
          <div className="text-center mb-16 reveal-fade-up">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Beyond the <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Code</span>
            </h2>
            <div className="w-24 h-1 bg-linear-to-r from-blue-500 to-cyan-400 mx-auto mt-5 rounded-full" />
            <p className="text-gray-400 mt-5 max-w-2xl mx-auto text-lg">
              A glimpse into the person behind the developer – passions, quirks, and daily joys.
            </p>
          </div>

          {/* Grid – clickable cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {funFacts.map((fact, idx) => (
              <div
                key={idx}
                className="group relative bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6
                           border border-gray-700 hover:border-blue-500/50
                           shadow-lg hover:shadow-2xl hover:shadow-blue-500/20
                           transition-all duration-500 ease-out hover:-translate-y-2
                           cursor-pointer reveal-fade-up"
                style={{ transitionDelay: `${idx * 80}ms` }}
                onClick={() => openModal(fact)}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-600/0 via-transparent to-cyan-600/0 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Icon container */}
                <div className="relative mb-5 flex justify-center">
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-xl 
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-gray-900/80 rounded-full p-3 backdrop-blur-sm border border-gray-700
                                  group-hover:border-blue-500/30 transition-all duration-300
                                  group-hover:scale-110 group-hover:rotate-6">
                    <div className="text-blue-400 transition-colors group-hover:text-cyan-400 text-2xl">
                      {fact.icon}
                    </div>
                  </div>
                </div>

                <h3 className="text-center text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {fact.text}
                </h3>
                <div className="mt-3 text-center text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Click to explore ✨
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedFact && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/60"
          onClick={closeModal}
        >
          <div
            className="relative bg-gray-800/90 rounded-2xl max-w-md w-full p-6 border border-blue-500/30 shadow-2xl animate-modal-popup"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button – simple SVG, no external icon */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Modal content */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full">
                <div className="text-blue-400 text-4xl">{selectedFact.icon}</div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{selectedFact.text}</h3>
              <p className="text-gray-300 mb-4">{selectedFact.detail || "No additional detail."}</p>
              <button
                onClick={closeModal}
                className="mt-2 px-5 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes modalPopup {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-modal-popup {
          animation: modalPopup 0.3s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
        }
      `}</style>

    </>
  );
};


// ---------- Main About Component ----------
const About = () => {
  // Services
  const services = [
    { title: "Website Design", icon: <Layout size={28} />, desc: "Modern, responsive, and user‑friendly interfaces." },
    { title: "WordPress Development", icon: <Globe size={28} />, desc: "Custom themes, plugins, and full site management." },
    { title: "Landing Page Creation", icon: <Smartphone size={28} />, desc: "High‑conversion pages optimized for performance." },
    { title: "Problem Solving", icon: <Zap size={28} />, desc: "Debugging, performance tuning, and creative solutions." },
  ];

  const learning = [
    { name: "React", progress: 70, icon: <Sparkles size={24} /> },
    { name: "Advanced JavaScript", progress: 85, icon: <Code size={24} /> },
    { name: "Mobile App Development", progress: 25, icon: <Smartphone size={24} /> },
  ];

  // Scroll reveal observer
  useEffect(() => {
    const options = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, options);
    document.querySelectorAll(".reveal-fade-up, .reveal-slide-right, .reveal-scale").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <AnimatedBackground />

      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-gray-900 to-gray-800 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/5 blur-3xl" />
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="text-center reveal-fade-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              About Me
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Web creator | Lifelong learner</p>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-16 md:py-20 bg-gray-900">
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="shrink-0 reveal-scale">
              <div className="rounded-full w-64 h-64 md:w-80 md:h-80">
                <div className="rounded-full relative w-full h-full bg-linear-to-br from-blue-500 to-cyan-500 p-1">
                  <div className="rounded-full w-full h-full overflow-hidden bg-gray-800">
                    <img src="https://i.ibb.co.com/BVCWm6zh/saleh.jpg" alt="Mohammad Saleh" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-4 reveal-slide-right">
              <h2 className="text-3xl md:text-4xl font-bold text-white">I'm <span className="text-blue-400">Saleh</span></h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                A passionate web developer who loves turning ideas into reality through clean,
                responsive, and high‑performance websites. With deep expertise in <strong className="text-blue-400">WordPress</strong> and
                growing skills in <strong className="text-cyan-400">React</strong>, I build solutions that make a difference.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Beyond coding, I enjoy teaching English, mentoring aspiring developers, and
                contributing to open source. Every day is a chance to learn something new and
                help others grow.
              </p>
              <div className="flex gap-4 pt-2">
                <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-md">
                  Hire Me <ArrowRight size={18} />
                </Link>
                <a href="/resume.pdf" download className="inline-flex items-center gap-2 px-5 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition">
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Journey Timeline */}
      <section className="py-16 md:py-20 bg-gray-800">
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <LifeTimeline />
        </div>
      </section>

      {/* Skills & Technologies Grid */}
      <SkillsSection />

      {/* What I Do (Services) – Sophisticated Version */}
      <section className="py-16 md:py-20 bg-gray-800
      ">
        {/* Optional: soft background decoration */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-900/10 via-transparent to-cyan-900/10" />

        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          {/* Section header with refined typography */}
          <div className="text-center mb-16 reveal-fade-up">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              What <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">I Do</span>
            </h2>
            <div className="w-24 h-1 bg-linear-to-r from-blue-500 to-cyan-400 mx-auto mt-5 rounded-full" />
            <p className="text-gray-400 mt-5 max-w-2xl mx-auto text-lg">
              Crafting digital experiences that blend creativity with performance.
            </p>
          </div>

          {/* Services Grid – improved cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="group relative bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 text-center
                     border border-gray-700 hover:border-blue-500/50
                     shadow-lg hover:shadow-2xl hover:shadow-blue-500/20
                     transition-all duration-500 ease-out hover:-translate-y-2
                     reveal-fade-up"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {/* Animated gradient overlay on hover */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-600/0 via-transparent to-cyan-600/0 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Icon container with circular background and floating animation */}
                <div className="relative mb-5 inline-flex items-center justify-center">
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-gray-900/80 rounded-2xl p-3 backdrop-blur-sm border border-gray-700
                            group-hover:border-blue-500/30 transition-all duration-300
                            group-hover:scale-110 group-hover:rotate-3">
                    <div className="text-blue-400 transition-colors group-hover:text-cyan-400">
                      {service.icon}
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.desc}
                </p>

                {/* Decorative underline that appears on hover */}
                <div className="w-12 h-0.5 bg-linear-to-r from-blue-500 to-cyan-400 mx-auto mt-4 
                          opacity-0 group-hover:opacity-100 transition-all duration-300 scale-x-0 group-hover:scale-x-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What I'm Learning – Sophisticated Version */}
      <section className="py-20 md:py-28 bg-gray-900 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 bg-linear-to-tr from-blue-900/5 via-transparent to-cyan-900/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          {/* Refined section header */}
          <div className="text-center mb-16 reveal-fade-up">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              What I'm <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Learning</span>
            </h2>
            <div className="w-24 h-1 bg-linear-to-r from-blue-500 to-cyan-400 mx-auto mt-5 rounded-full" />
            <p className="text-gray-400 mt-5 max-w-2xl mx-auto text-lg">
              Always growing, always improving – my current focus areas.
            </p>
          </div>

          {/* Learning cards grid */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {learning.map((item, idx) => (
              <div
                key={idx}
                className="group relative bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6
                     border border-gray-700 hover:border-blue-500/50
                     shadow-lg hover:shadow-2xl hover:shadow-blue-500/20
                     transition-all duration-500 ease-out hover:-translate-y-2
                     reveal-fade-up"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {/* Glowing gradient overlay on hover */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-600/0 via-transparent to-cyan-600/0 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Header with icon and title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-linear-to-br from-blue-500/30 to-cyan-500/30 rounded-xl blur-md 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative bg-gray-900/80 rounded-xl p-2.5 backdrop-blur-sm border border-gray-700
                              group-hover:border-blue-500/30 transition-all duration-300
                              group-hover:scale-110 group-hover:rotate-3">
                      <div className="text-blue-400 transition-colors group-hover:text-cyan-400">
                        {item.icon}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {item.name}
                  </h3>
                </div>

                {/* Animated progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-blue-400 font-mono">{item.progress}%</span>
                  </div>
                  <div className="relative w-full bg-gray-700/50 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                    <div
                      className="bg-linear-to-r from-blue-500 to-cyan-400 h-full rounded-full 
                           transition-all duration-1000 ease-out relative"
                      style={{ width: `${item.progress}%` }}
                    >
                      {/* Shimmer effect on hover */}
                      <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent 
                                -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                  </div>
                </div>

                {/* Decorative footer line */}
                <div className="mt-5 pt-3 border-t border-gray-700/50 flex items-center justify-between">
                  <span className="text-xs text-gray-500">Mastery level</span>
                  <span className="text-xs font-medium text-cyan-400">
                    {item.progress >= 80 ? 'Advanced' : item.progress >= 50 ? 'Intermediate' : 'Beginner'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Optional: Motivational note */}
          <div className="text-center mt-16 reveal-fade-up">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700">
              <span className="text-yellow-400">⚡</span>
              <span className="text-gray-300 text-sm">Daily practice • 2+ hours of coding • Never stop learning</span>
            </div>
          </div>
        </div>
      </section>
      {/* Beyond the Code – Interactive Fun Facts */}
      <section className="py-20 md:py-28 bg-gray-800">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-linear-to-tl from-blue-900/5 via-transparent to-cyan-900/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />

        <BeyondTheCode />
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-28 bg-linear-to-r from-gray-900 to-gray-800 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4">
          <div className="reveal-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Let’s build something <span className="text-blue-400">great</span> together
            </h2>
            <p className="text-gray-300 text-lg mb-8">Have a project in mind or just want to say hi? I’m always excited to connect.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl">
                Hire Me <ArrowRight size={18} />
              </Link>
              <Link to="/work" className="inline-flex items-center gap-2 px-6 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition">
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .reveal-fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        .reveal-fade-up.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-slide-right {
          opacity: 0;
          transform: translateX(40px);
          transition: all 0.7s ease-out;
        }
        .reveal-slide-right.revealed {
          opacity: 1;
          transform: translateX(0);
        }
        .reveal-scale {
          opacity: 0;
          transform: scale(0.9);
          transition: all 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.2);
        }
        .reveal-scale.revealed {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>
    </div>
  );
};

export default About;