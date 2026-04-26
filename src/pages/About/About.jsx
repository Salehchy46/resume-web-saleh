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
  Award,
  Users,
  Coffee,
  Heart,
  Calendar,
  CheckCircle,
  Code2,
  PenTool,
  Terminal,
  Figma,
  Database,
  Server,
  Sparkles,
} from "lucide-react";
import Lottie from "lottie-react";
import CodeDarkLottie from "../../assets/lotties/code-dark.json";

// animation
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
      {/* Animated gradient overlay */}
      <div className="fixed inset-0 bg-linear-to-br from-gray-900 via-blue-900/20 to-gray-900 animate-gradient-xy" />
      {/* Canvas particles */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />
    </>
  );
};

const LifeTimeline = () => {
  const events = [
    {
      year: "2002",
      title: "Born in Satkania",
      description:
        "Born in Satkania, Chattogram, Bangladesh – the start of an incredible journey.",
    },
    {
      year: "2007 – 2012",
      title: "Primary Education",
      description:
        "Studied at Barodona Al-Amin Ideal Madrasha. Completed primary education here.",
    },
    {
      year: "2013 – 2018",
      title: "Secondary (Dakhil) & First Computer Course",
      description:
        "Joined Adhunagar Islamia Kamil Madrasha in Lohagara. Completed Dakhil in 2018. That same year, I finished my first computer course: Microsoft Office (Word, PowerPoint, Excel).",
    },
    {
      year: "2020",
      title: "Higher Secondary (Alim) & COVID Skills",
      description:
        "Completed Alim from the same madrasha. During the pandemic lockdown, I learned Canva, Figma design, and other soft skills from home.",
    },
    {
      year: "2022",
      title: "University & German Language",
      description:
        "Started Honours in English Language and Literature at the University of Chittagong. In 2023, I completed A1 level German.",
    },
    {
      year: "2023 – 2024",
      title: "Web Development Foundations",
      description:
        "Influenced by Affan, I dived into Wix, WordPress, HTML, CSS, and JavaScript. Built my first websites and discovered my passion for coding.",
    },
    {
      year: "2024",
      title: "React & Spanish",
      description:
        "My friend Saif introduced me to frontend frameworks. Started learning React and JavaScript seriously. Also began daily Spanish practice (3–5 min/day).",
    },
    {
      year: "2025",
      title: "Japanese & Continuous Growth",
      description:
        "Started learning Japanese (Hiragana/Katakana) toward the end of 2025. Still exploring new technologies and building modern web apps.",
    },
    {
      year: "Today",
      title: "Always Learning, Always Building",
      description:
        "Currently improving my React skills, expanding into full‑stack, and helping others achieve their web development goals.",
    },
  ];

  const [completedSteps, setCompletedSteps] = useState({});
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-idx"));
            if (!completedSteps[idx]) {
              setCompletedSteps((prev) => ({ ...prev, [idx]: true }));
            }
          }
        });
      },
      { threshold: 0.5, rootMargin: "0px 0px 400px 0px" }
    );

    cardRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, [completedSteps]);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">My Journey</h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          From a small town in Chattogram to becoming a web developer – the road so far.
        </p>
      </div>

      {/* Timeline container */}
      <div className="relative max-w-6xl mx-auto">
        {/* Central vertical line – hidden on mobile, visible from md */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-linear-to-b from-blue-500 to-cyan-400 opacity-30" />

        {events.map((event, idx) => {
          const isCompleted = completedSteps[idx];
          const isLeft = idx % 2 === 0; // even → left, odd → right

          return (
            <div
              key={idx}
              ref={(el) => (cardRefs.current[idx] = el)}
              data-idx={idx}
              className={`
                relative mb-12 md:mb-16
                ${isCompleted ? "opacity-100" : "opacity-70"}
                transition-opacity duration-700
              `}
            >
              {/* Desktop layout: marker absolute on centre line, card positioned left/right */}
              <div className="hidden md:block">
                {/* Marker (absolute, centred) */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div
                    className={`
                      flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-all duration-500
                      ${isCompleted
                        ? "bg-green-500/20 ring-4 ring-green-400/50 scale-110"
                        : "bg-gray-800 ring-2 ring-gray-600"
                      }
                    `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className={`w-5 h-5 transition-colors ${isCompleted ? "text-green-400" : "text-blue-400"}`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {isCompleted && (
                      <span className="absolute inset-0 rounded-full animate-ping bg-green-400/40" />
                    )}
                  </div>
                </div>

                {/* Card – left or right side */}
                <div className={`${isLeft ? "mr-auto pr-8" : "ml-auto pl-8"} w-[calc(50%-2rem)]`}>
                  <div className="card bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 group">
                    <div className="card-body p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="badge badge-primary badge-sm font-mono">{event.year}</span>
                        <span className="h-px flex-1 bg-linear-to-r from-blue-500/50 to-transparent" />
                      </div>
                      <h3 className="card-title text-xl text-white group-hover:text-blue-400 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile layout (stacked, marker on left) */}
              <div className="md:hidden flex items-start gap-4">
                <div className="shrink-0">
                  <div
                    className={`
                      flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-all duration-500
                      ${isCompleted
                        ? "bg-green-500/20 ring-4 ring-green-400/50 scale-110"
                        : "bg-gray-800 ring-2 ring-gray-600"
                      }
                    `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className={`w-5 h-5 ${isCompleted ? "text-green-400" : "text-blue-400"}`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {isCompleted && (
                      <span className="absolute inset-0 rounded-full animate-ping bg-green-400/40" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="card bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 group">
                    <div className="card-body p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="badge badge-primary badge-sm font-mono">{event.year}</span>
                        <span className="h-px flex-1 bg-linear-to-r from-blue-500/50 to-transparent" />
                      </div>
                      <h3 className="card-title text-lg text-white group-hover:text-blue-400 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Sample skills array – replace with your own
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
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-size-[50px_50px]"></div>

      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Section Header – with fade-up animation */}
        <div
          className={`text-center mb-16 transition-all duration-700 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Skills & <span className="bg-linear-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">Technologies</span>
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-blue-500 to-cyan-400 mx-auto mt-5 rounded-full"></div>
          <p className="text-gray-400 mt-5 max-w-2xl mx-auto text-lg">
            Tools and frameworks I work with to bring ideas to life.
          </p>
        </div>

        {/* Grid – responsive sophisticated layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              style={{ transitionDelay: `${idx * 50}ms` }}
              className={`
                group relative bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 text-center
                border border-gray-700 hover:border-blue-500/50
                shadow-lg hover:shadow-2xl hover:shadow-blue-500/20
                transition-all duration-500 ease-out
                hover:-translate-y-2 hover:scale-[1.02]
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-600/0 via-transparent to-cyan-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              {/* Icon container with animated scaling */}
              <div
                className={`
                  flex justify-center mb-4 transform transition-transform duration-300 group-hover:scale-110
                  ${skill.color}
                `}
              >
                {skill.icon}
              </div>

              {/* Skill name */}
              <h3 className="font-semibold text-gray-200 text-lg mb-2 group-hover:text-white transition-colors">
                {skill.name}
              </h3>

              {/* Proficiency bar – adds sophistication */}
              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-3 overflow-hidden">
                <div
                  className="bg-linear-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: isVisible ? `${skill.level}%` : "0%",
                    transitionDelay: `${idx * 50 + 200}ms`,
                  }}
                ></div>
              </div>
              <span className="text-xs text-gray-400 mt-1 inline-block">{skill.level}% proficient</span>
            </div>
          ))}
        </div>

        {/* Optional: footer note */}
        <div className="text-center mt-16 text-gray-500 text-sm">
          <span className="inline-block px-4 py-2 bg-gray-800/50 rounded-full backdrop-blur-sm">
            ⚡ Constantly learning & improving
          </span>
        </div>
      </div>

      {/* Custom styles for grid background pattern */}
      <style jsx>{`
        .bg-grid-white\\/[0.02] {
          background-image: linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
        }
      `}</style>
    </section>
  );
};




const About = () => {
  // For scroll animations
  // eslint-disable-next-line no-unused-vars
  const observerRef = useRef(null);

  useEffect(() => {
    const options = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-up");
          observer.unobserve(entry.target);
        }
      });
    }, options);

    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Services
  const services = [
    { title: "Website Design", icon: <Layout size={28} />, desc: "Modern, responsive, and user‑friendly interfaces." },
    { title: "WordPress Development", icon: <Globe size={28} />, desc: "Custom themes, plugins, and full site management." },
    { title: "Landing Page Creation", icon: <Smartphone size={28} />, desc: "High‑conversion pages optimized for performance." },
    { title: "Problem Solving", icon: <Zap size={28} />, desc: "Debugging, performance tuning, and creative solutions." },
  ];

  // What I'm Learning
  const learning = [
    { name: "React", progress: 70, icon: <Sparkles size={24} /> },
    { name: "Advanced JavaScript", progress: 85, icon: <Code size={24} /> },
    { name: "Mobile App Development", progress: 25, icon: <Smartphone size={24} /> },
  ];

  // Fun facts
  const funFacts = [
    { icon: <BookOpen size={20} />, text: "Teach English to beginners" },
    { icon: <Users size={20} />, text: "Mentored 20+ aspiring devs" },
    { icon: <Coffee size={20} />, text: "Coffee addict ☕" },
    { icon: <Heart size={20} />, text: "Open‑source contributor" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-gray-900 to-gray-800 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/5 blur-3xl" />
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="text-center animate-on-scroll">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              About Me
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Web creator | Lifelong learner
            </p>
          </div>
        </div>
      </section>

      {/* Profile Section with circle Image */}
      <section className="py-16 md:py-20 bg-gray-900">
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Circle Image */}
            <div className="shrink-0 animate-on-scroll">
              <div className="rounded-full w-64 h-64 md:w-80 md:h-80">
                <div className="rounded-full relative w-full h-full bg-linear-to-br from-blue-500 to-cyan-500 p-1">
                  <div className="rounded-full w-full h-full overflow-hidden bg-gray-800">
                    <img
                      src="https://i.ibb.co.com/BVCWm6zh/saleh.jpg"
                      alt="Mohammad Saleh"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Introduction */}
            <div className="flex-1 space-y-4 animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                I'm <span className="text-blue-400">Saleh</span>
              </h2>
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
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-md"
                >
                  Hire Me <ArrowRight size={18} />
                </Link>
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 px-5 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition"
                >
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
          <LifeTimeline></LifeTimeline>
        </div>
      </section>

      {/* Skills & Technologies Grid */}
      <section className="py-16 md:py-20 bg-gray-900">
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <SkillsSection></SkillsSection>
        </div>
      </section>

      {/* What I Do (Services) */}
      <section className="py-16 md:py-20 bg-gray-800">
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-white">What I Do</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-xl transition-all group animate-on-scroll"
              >
                <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What I'm Learning (Progress) */}
      <section className="py-16 md:py-20 bg-gray-900">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-white">What I'm Learning</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Always growing, always improving – my current focus areas.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {learning.map((item, idx) => (
              <div key={idx} className="bg-gray-800 p-6 rounded-xl animate-on-scroll">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-blue-400">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white">{item.name}</h3>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2.5 rounded-full transition-all duration-1000"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
                <p className="text-gray-400 text-sm mt-2">{item.progress}% mastered</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fun Facts / Personal Touch */}
      <section className="py-16 md:py-20 bg-gray-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Beyond the Code</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {funFacts.map((fact, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-full px-5 py-2 animate-on-scroll"
              >
                <span className="text-blue-400">{fact.icon}</span>
                <span className="text-gray-300">{fact.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-gray-900 to-gray-800 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Let’s build something <span className="text-blue-400">great</span> together
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Have a project in mind or just want to say hi? I’m always excited to connect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
              >
                Hire Me <ArrowRight size={18} />
              </Link>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition"
              >
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS for hexagon shape and animations */}
      <style jsx>{`
        .hexagon-wrapper {
          display: inline-block;
          position: relative;
        }
        .hexagon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hexagon-inner {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          margin: 4px;
        }
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

export default About;