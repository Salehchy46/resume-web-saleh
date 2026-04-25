// src/pages/About.jsx
"use client";

import React, { useEffect, useRef } from "react";
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
  Figma,
  Database,
  Server,
  Sparkles,
} from "lucide-react";
import Lottie from "lottie-react";
import CodeDarkLottie from "../../assets/lotties/code-dark.json"; 

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

  // Skills data
  const skills = [
    { name: "WordPress", icon: <Layout size={32} />, color: "text-blue-400" },
    { name: "JavaScript", icon: <Code size={32} />, color: "text-yellow-400" },
    { name: "React", icon: <Sparkles size={32} />, color: "text-cyan-400" },
    { name: "Tailwind CSS", icon: <Smartphone size={32} />, color: "text-teal-400" },
    { name: "Firebase", icon: <Database size={32} />, color: "text-orange-400" },
    { name: "UI/UX Design", icon: <Figma size={32} />, color: "text-pink-400" },
  ];

  // Services
  const services = [
    { title: "Website Design", icon: <Layout size={28} />, desc: "Modern, responsive, and user‑friendly interfaces." },
    { title: "WordPress Development", icon: <Globe size={28} />, desc: "Custom themes, plugins, and full site management." },
    { title: "Landing Page Creation", icon: <Smartphone size={28} />, desc: "High‑conversion pages optimized for performance." },
    { title: "Problem Solving", icon: <Zap size={28} />, desc: "Debugging, performance tuning, and creative solutions." },
  ];

  // What I'm Learning
  const learning = [
    { name: "React & Next.js", progress: 70, icon: <Sparkles size={24} /> },
    { name: "Advanced JavaScript", progress: 85, icon: <Code size={24} /> },
    { name: "Mobile App Development", progress: 40, icon: <Smartphone size={24} /> },
  ];

  // Fun facts
  const funFacts = [
    { icon: <BookOpen size={20} />, text: "Teach English to beginners" },
    { icon: <Users size={20} />, text: "Mentored 20+ aspiring devs" },
    { icon: <Coffee size={20} />, text: "Coffee addict ☕" },
    { icon: <Heart size={20} />, text: "Open‑source contributor" },
  ];

  // Timeline data
  const timeline = [
    { year: "2019", title: "Started with basics", desc: "Microsoft Office, Graphic Design (Photoshop/Illustrator)" },
    { year: "2020", title: "Discovered Web Development", desc: "HTML, CSS, JavaScript – built my first static sites" },
    { year: "2021", title: "WordPress Developer", desc: "Custom themes, plugins, and client projects" },
    { year: "2023", title: "React Journey", desc: "Building modern SPAs with React, Tailwind, and Firebase" },
    { year: "2025", title: "App Development", desc: "Exploring React Native and full‑stack MERN" },
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

      {/* Profile Section with Hexagon Image */}
      <section className="py-16 md:py-20 bg-gray-900">
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Hexagon Image */}
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
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-white">My Journey</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {timeline.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02] animate-on-scroll"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="text-blue-400 font-mono text-lg mb-2">{item.year}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Technologies Grid */}
      <section className="py-16 md:py-20 bg-gray-900">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Skills & Technologies</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className="bg-gray-800 p-5 rounded-xl text-center hover:shadow-lg hover:scale-105 transition-all animate-on-scroll"
              >
                <div className={`flex justify-center mb-3 ${skill.color}`}>{skill.icon}</div>
                <h3 className="font-medium text-gray-200">{skill.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What I Do (Services) */}
      <section className="py-16 md:py-20 bg-gray-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
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