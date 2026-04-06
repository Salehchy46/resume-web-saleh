// src/pages/Home.jsx or src/components/Home.jsx
"use client";

import { ArrowRight, Github, Linkedin, Mail, Code, Layout, Smartphone, Globe, Star, Users } from "lucide-react";
import React, { useState, useEffect } from "react";
import '../Home/hero-animation.css';
import { Link } from "react-router-dom";

const Hero = () => {
  // Phase: 'hello' or 'intro'
  const [phase, setPhase] = useState("hello");

  // Typing animation states
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const words = ["Saleh", "Front-end Developer", "WordPress Developer", "Web Designer", "Problem Solver"];

  // Switch from "Hello World" to intro after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("intro");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Typing effect (only runs when phase === "intro")
  useEffect(() => {
    if (phase !== "intro") return;
    const currentWord = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 1500); // pause before delete
        }
      } else {
        setDisplayText(currentWord.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 80 : 120);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex, phase, words]);


  return (
    <section className="relative bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 md:py-24 lg:py-32">
      <div className="max-w-350 mx-auto px-4 sm:px-2 lg:px-6 xl:px-12 2xl:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Animated Heading */}
            {phase === "hello" ? (
              <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                Hello World
              </h1>
            ) : (
              <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                I'm{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  {displayText}
                  <span className="animate-pulse">|</span>
                </span>
              </h1>
            )}

            {/* Rest of the hero content */}
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto lg:mx-0">
              I craft responsive, high‑performance websites that help you connect with your audience.
              Whether it’s a custom React app, a WordPress site, or a Wix design — I bring ideas to life.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                className="relative inline-flex items-center justify-center px-6 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white font-medium rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300"
                to="/contact"
              >
                {/* Two shimmer layers for a more complex sparkle */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                  <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 delay-150 ease-out" />
                </span>

                <span className="relative z-10 flex items-center gap-2">
                  Hire Me <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                className="relative inline-flex items-center justify-center px-6 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white font-medium rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300"
                to="/work"
              >
                {/* Two shimmer layers for a more complex sparkle */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                  <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 delay-150 ease-out" />
                </span>

                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                </span>
              </Link>
            </div>

            <div className="mt-8 flex justify-center lg:justify-start space-x-5">
              <a href="https://github.com/Salehchy46" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition"><Github size={24} /></a>
              <a href="https://www.linkedin.com/in/mohammad-saleh-830389226/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition"><Linkedin size={24} /></a>
              <a href="mailto:Salehchyctg@gmail.com" className="text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition"><Mail size={24} /></a>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 blur-2xl"></div>
              <img
                src="https://i.ibb.co.com/BVCWm6zh/saleh.jpg"
                alt="Mohammad Saleh - Frontend Developer"
                className="relative rounded-full object-cover w-full h-full border-4 border-white dark:border-gray-700 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">About Me</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              I'm <span className="font-semibold text-gray-900 dark:text-white">Mohammad Saleh</span>, a passionate frontend developer with 3+ years of experience building modern, responsive websites.
              I love turning ideas into reality through clean code and intuitive design. I work with both <strong>React</strong> and <strong>WordPress</strong>, ensuring fast, SEO‑friendly, and user‑centric results.
            </p>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Beyond coding, I enjoy mentoring, contributing to open source, and constantly learning new technologies. Let's build something amazing together!
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center gap-2"><Star className="text-yellow-500" fill="currentColor" size={20} /><span className="text-gray-700 dark:text-gray-300">100+ projects delivered</span></div>
              <div className="flex items-center gap-2"><Users className="text-blue-500" size={20} /><span className="text-gray-700 dark:text-gray-300">50+ happy clients</span></div>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Why work with me?</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li>✅ 100% responsive designs that work on all devices</li>
              <li>✅ SEO optimized and fast loading</li>
              <li>✅ Clean, maintainable code with modern tools</li>
              <li>✅ Ongoing support and collaboration</li>
              <li>✅ On‑time delivery and clear communication</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { icon: <Code size={40} />, title: "Custom Web Development", desc: "React, Next.js, Tailwind, and more – tailored to your needs." },
    { icon: <Layout size={40} />, title: "WordPress Development", desc: "Custom themes, plugins, and full site management." },
    { icon: <Smartphone size={40} />, title: "Responsive Design", desc: "Flawless experience on mobile, tablet, and desktop." },
    { icon: <Globe size={40} />, title: "Wix & Website Builders", desc: "Professional Wix sites with advanced features." },
  ];
  return (
    <section id="services" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">What I Offer</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">End‑to‑end solutions to bring your website vision to life.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow text-center">
              <div className="text-blue-600 mb-4 flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    { title: "E‑Commerce Store", tech: "React, Tailwind, MongoDB", image: "https://placehold.co/600x400/1e293b/ffffff?text=Project+1", live: "#", code: "#" },
    { title: "WordPress Agency Site", tech: "WordPress, Elementor, PHP", image: "https://placehold.co/600x400/1e293b/ffffff?text=Project+2", live: "#", code: "#" },
    { title: "Portfolio Dashboard", tech: "Next.js, Tailwind, Framer", image: "https://placehold.co/600x400/1e293b/ffffff?text=Project+3", live: "#", code: "#" },
  ];
  return (
    <section id="projects" className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Recent Projects</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Some of my best work – live links available.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div key={idx} className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition">
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{project.tech}</p>
                <div className="mt-4 flex gap-3">
                  <a href={project.live} className="text-blue-600 hover:underline text-sm font-medium">Live Demo →</a>
                  <a href={project.code} className="text-gray-600 dark:text-gray-400 hover:underline text-sm">Code</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a href="#" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">View all projects <ArrowRight size={16} /></a>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Let's Work Together</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">Have a project in mind? I'd love to hear about it.</p>
        </div>
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-8">
          <form action="https://formspree.io/f/yourformid" method="POST" className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div><label className="block text-gray-700 dark:text-gray-300 mb-2">Name</label><input type="text" name="name" required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white" /></div>
              <div><label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label><input type="email" name="email" required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white" /></div>
            </div>
            <div><label className="block text-gray-700 dark:text-gray-300 mb-2">Message</label><textarea name="message" rows="5" required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"></textarea></div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium">Send Message</button>
          </form>
          <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
            <p>Or reach me directly: <a href="mailto:Salehchyctg@gmail.com" className="text-blue-600">Salehchyctg@gmail.com</a> | +88 01835‑069946</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>
    </div>
  );
};

export default Home;