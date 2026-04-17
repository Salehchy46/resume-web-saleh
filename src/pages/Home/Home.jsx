// src/pages/Home.jsx or src/components/Home.jsx
"use client";

import {
  ArrowRight, Github, Linkedin, Mail,
  Code, Layout, Globe, Star,
  Users, Smartphone, Rocket, Code2,
  Headphones, CalendarCheck, DollarSign, Shield,
  MessageCircle, Layers
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import '../Home/hero-animation.css';
import { Link } from "react-router-dom";
import DevloperLottie from "../../assets/lotties/Developer.json";
import Coding from "../../assets/lotties/Coding.json";
import Lottie from "lottie-react";
// import { useLottie, useLottieInteractivity } from "lottie-react";

const Fireflies = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let container = canvas.parentElement;
    let width = container.clientWidth;
    let height = container.clientHeight;
    let animationId;
    let fireflies = [];

    const resize = () => {
      if (!container) container = canvas.parentElement;
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);
    window.addEventListener("resize", resize);
    resize();

    // eslint-disable-next-line react-hooks/unsupported-syntax
    class Firefly {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = 0.15 + Math.random() * 0.3;
        this.radius = 1.5 + Math.random() * 2.5;   // smaller: 1.5–4px
        this.baseBrightness = 0.5 + Math.random() * 0.5;
        this.flickerSpeed = 0.01 + Math.random() * 0.03;
        this.flickerOffset = Math.random() * Math.PI * 2;
        const hue = 45 + Math.random() * 35;
        this.color = `hsl(${hue}, 85%, 65%)`;
        this.life = 1.0;
        this.decay = 0.0003 + Math.random() * 0.0007;
        this.offTimer = 0;
        this.isOff = false;
        this.offDuration = 0;
      }
      update() {
        if (Math.random() < 0.01) {
          this.angle += (Math.random() - 0.5) * 0.6;
        }
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        if (this.x < -30) this.x = width + 30;
        if (this.x > width + 30) this.x = -30;
        if (this.y < -30) this.y = height + 30;
        if (this.y > height + 30) this.y = -30;

        const time = Date.now() * this.flickerSpeed;
        let flicker = 0.5 + 0.5 * Math.sin(time + this.flickerOffset);
        if (Math.random() < 0.005) flicker = Math.random();

        if (!this.isOff) {
          if (Math.random() < 0.008) {
            this.isOff = true;
            this.offDuration = 0.5 + Math.random() * 1.5;
            this.offTimer = 0;
          }
        } else {
          this.offTimer += 1 / 60;
          if (this.offTimer >= this.offDuration) {
            this.isOff = false;
          }
        }

        let brightness = this.baseBrightness * (0.4 + flicker * 0.6);
        if (this.isOff) brightness = 0.05;

        this.life -= this.decay;
        if (this.life <= 0) {
          this.reset();
          this.life = 1.0;
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.isOff = false;
        }

        this.currentBrightness = brightness * this.life;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.min(this.currentBrightness, 0.8);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const fireflyCount = 80;
    for (let i = 0; i < fireflyCount; i++) {
      fireflies.push(new Firefly());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      fireflies.forEach((fly) => {
        fly.update();
        fly.draw();
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "block",
        pointerEvents: "none",
        zIndex: 30,
      }}
    />
  );
};


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
    <section className="relative bg-linear-to-br from-gray-900 to-gray-800 py-16 md:py-24 lg:py-32 overflow-hidden">


      {/* Animated Blue Blurry Balls */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600 rounded-full blur-3xl opacity-30 animate-float1" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-25 animate-float2" />
        <div className="absolute top-1/3 left-1/2 w-80 h-80 bg-blue-400 rounded-full blur-3xl opacity-20 animate-float3" />
      </div>

      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Animated Heading */}
            {phase === "hello" ? (
              <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-white">
                Hello World
              </h1>
            ) : (
              <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-white">
                I'm{" "}
                <span className="text-blue-400">
                  {displayText}
                  <span className="animate-pulse">|</span>
                </span>
              </h1>
            )}

            {/* Rest of the hero content */}
            <p className="mt-4 text-gray-300 md:text-lg max-w-2xl mx-auto lg:mx-0">
              I craft responsive, high‑performance websites that help you connect with your audience.
              Whether it’s a custom React app, a WordPress site, or a Wix design — I bring ideas to life.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                className="relative inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium overflow-hidden group transition-all duration-300 shadow-md hover:shadow-xl
              border border-white/30 text-white bg-white/10 backdrop-blur-md hover:bg-white/15"
                to="/contact"
              >
                {/* Shimmer overlay */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                  <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 delay-150 ease-out" />
                </span>
                <span className="relative z-10 flex items-center gap-2">
                  Hire Me
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                className="relative inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium overflow-hidden group transition-all duration-300 shadow-md hover:shadow-xl
              border border-white/30 text-white bg-white/10 backdrop-blur-md hover:bg-white/15"
                to="/work"
              >
                {/* Shimmer overlay */}
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
              <a href="https://github.com/Salehchy46" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/mohammad-saleh-830389226/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition">
                <Linkedin size={24} />
              </a>
              <a href="mailto:Salehchyctg@gmail.com" className="text-gray-400 hover:text-red-400 transition">
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 blur-2xl"></div>
              <img
                src="https://i.ibb.co.com/BVCWm6zh/saleh.jpg"
                alt="Mohammad Saleh - Frontend Developer"
                className="relative rounded-full object-cover w-full h-full border-4 border-gray-700 shadow-2xl"
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
    <section id="about" className="relative bg-linear-to-br from-gray-900 to-gray-800 py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">About Me</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div className="lottie-tint">
            <Lottie animationData={DevloperLottie} loop={true} className="w-full h-auto" />
          </div>
          <div>
            <p className="text-gray-300 text-lg leading-relaxed">
              I'm <span className="font-semibold text-white">Mohammad Saleh</span>, a passionate frontend developer with 3+ years of experience building modern, responsive websites.
              I love turning ideas into reality through clean code and intuitive design. I work with both <strong>React</strong> and <strong>WordPress</strong>, ensuring fast, SEO‑friendly, and user‑centric results.
            </p>
            <p className="mt-4 text-gray-300">
              Beyond coding, I enjoy mentoring, contributing to open source, and constantly learning new technologies. Let's build something amazing together!
            </p>
            <p className="mt-6 text-gray-300 italic">
              "When I'm not coding, you'll find me exploring new tech trends, contributing to open source, or mentoring aspiring developers. I believe in continuous learning and sharing knowledge."
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-4">Why work with me?</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <Smartphone className="h-5 w-5 text-blue-400 mt-0.5 shrink-0" />
                <span>100% responsive designs that work on all devices</span>
              </li>
              <li className="flex items-start gap-3">
                <Rocket className="h-5 w-5 text-blue-400 mt-0.5 shrink-0" />
                <span>SEO optimized and fast loading</span>
              </li>
              <li className="flex items-start gap-3">
                <Code2 className="h-5 w-5 text-blue-400 mt-0.5 shrink-0" />
                <span>Clean, maintainable code with modern tools</span>
              </li>
              <li className="flex items-start gap-3">
                <Headphones className="h-5 w-5 text-blue-400 mt-0.5 shrink-0" />
                <span>Ongoing support and collaboration</span>
              </li>
              <li className="flex items-start gap-3">
                <CalendarCheck className="h-5 w-5 text-blue-400 mt-0.5 shrink-0" />
                <span>On‑time delivery and clear communication</span>
              </li>
              <li className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-blue-400 mt-0.5 shrink-0" />
                <span>Competitive & transparent pricing – no hidden fees</span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-400 mt-0.5 shrink-0" />
                <span>Secure, reliable code with best practices</span>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-blue-400 mt-0.5 shrink-0" />
                <span>24/7 communication & quick turnaround</span>
              </li>
              <li className="flex items-start gap-3">
                <Layers className="h-5 w-5 text-blue-400 mt-0.5 shrink-0" />
                <span>Custom solutions tailored to your business needs</span>
              </li>
            </ul>
          </div>
          <div>
            <Lottie animationData={Coding} loop={true} className="w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};


const Work = () => {
  const services = [
    { icon: <Code size={40} />, title: "Custom Web Development", link: "https://www.w3schools.com/whatis/", desc: "React, Next.js, Tailwind, and more – tailored to your needs." },
    { icon: <Layout size={40} />, title: "WordPress Development", link: "https://wordpress.com/", desc: "Custom themes, plugins, and full site management." },
    { icon: <Smartphone size={40} />, title: "Responsive Design", link: "https://www.w3schools.com/html/html_responsive.asp", desc: "Flawless experience on mobile, tablet, and desktop." },
    { icon: <Globe size={40} />, title: "Wix & Website Builders", link: "https://manage.wix.com/studio/sites?viewId=all-items-view", desc: "Professional Wix sites with advanced features." },
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-gray-800">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">What I Offer</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="flip-card group"
              style={{ perspective: "1000px" }}
            >
              <div className="flip-card-inner relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                {/* Front */}
                <div className="flip-card-front absolute inset-0 backface-hidden bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-white/10 flex flex-col items-center text-center">
                  <div className="text-blue-400 mb-4 transition-transform duration-300 group-hover:scale-110">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-300 text-sm">{service.desc}</p>
                  {/* Shimmer overlay */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                  </div>
                </div>

                {/* Back */}
                <div className="flip-card-back absolute inset-0 backface-hidden bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-blue-400/30 rotate-y-180 flex flex-col items-center justify-center text-center">
                  <div className="text-blue-400 mb-4">
                    <Globe size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <a
                    href={service.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-lg hover:bg-white/20 transition-all hover:shadow-lg hover:scale-105"
                  >
                    Visit Site <ArrowRight size={16} />
                  </a>
                  {/* Glass glow on back */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 pointer-events-none" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS for 3D flip (add to your global CSS or use style tag) */}
      <style jsx>{`
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .group:hover .group-hover\\:rotate-y-180 {
          transform: rotateY(180deg);
        }
        .flip-card {
          height: auto;
          min-height: 320px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 320px;
        }
        .flip-card-front, .flip-card-back {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </section>
  );
};

const Projects = () => {
  const projects = [
    { title: "E‑Commerce Store", tech: "React, Tailwind, MongoDB", image: "https://i.ibb.co.com/7d28nBhP/khela.webp", live: "https://sports-equipment99.netlify.app/", code: "https://github.com/Salehchy46/equipment-management-client" },
    { title: "WordPress Agency Site", tech: "WordPress, Elementor, PHP", image: "https://i.ibb.co.com/vxj8w9bV/download.png", live: "https://www.hurrida.com/", code: "https://github.com/Salehchy46/cookie-policy-hurrida" },
    { title: "Portfolio Dashboard", tech: "Tailwind, React", image: "https://i.ibb.co.com/MDdQR89t/download-1.png", live: "https://superlative-manatee-5fc69d.netlify.app/", code: "https://github.com/Salehchy46/tic-tac-toe" },
  ];

  return (
    <section id="projects" className="py-16 md:py-24 bg-gray-900">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Recent Projects</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-gray-400">Some of my best work – live links available.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div key={idx} className="bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm">{project.tech}</p>
                <div className="mt-4 flex gap-4">
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm font-medium transition">Live</a>
                  <a href={project.code} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 text-sm transition">Code</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition">
            View all projects <ArrowRight size={16} />
          </a>
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

// Home.jsx – updated structure

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <Fireflies />
      <main>   {/* no z-index, or keep lower than canvas */}
        <Hero />
        <About />
        <Work />
        <Projects />
        <Contact />
      </main>
    </div>
  );
};

export default Home;