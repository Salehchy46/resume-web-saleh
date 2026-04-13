// src/pages/Home.jsx or src/components/Home.jsx
"use client";

import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Code,
  Layout,
  Globe,
  Star,
  Users,
  Smartphone,
  Rocket,
  Code2,
  Headphones,
  CalendarCheck
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import '../Home/hero-animation.css';
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import * as motion from "motion/react-client";

const Fireflies = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationId;
    let fireflies = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
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
        this.speed = 0.15 + Math.random() * 0.4;   // slower, more natural
        this.radius = 2 + Math.random() * 3;
        this.baseBrightness = 0.4 + Math.random() * 0.6;
        this.flickerSpeed = 0.01 + Math.random() * 0.03;
        this.flickerOffset = Math.random() * Math.PI * 2;
        // Random colour: warm yellow/green (real fireflies)
        const hue = 45 + Math.random() * 35; // 45–80
        this.color = `hsl(${hue}, 85%, 65%)`;
        // Lifetime: very long (3000–6000 frames at 60fps = 50–100 seconds)
        this.life = 1.0;
        this.decay = 0.0003 + Math.random() * 0.0007; // extremely slow fading
        // Random "off" behaviour: each firefly randomly goes dark for a short period
        this.offTimer = 0;
        this.isOff = false;
        this.offDuration = 0;
      }
      update() {
        // Random walk – change direction gently
        if (Math.random() < 0.01) {
          this.angle += (Math.random() - 0.5) * 0.6;
        }
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // Wrap around edges
        if (this.x < -30) this.x = width + 30;
        if (this.x > width + 30) this.x = -30;
        if (this.y < -30) this.y = height + 30;
        if (this.y > height + 30) this.y = -30;

        // Natural flicker: brightness oscillates
        const time = Date.now() * this.flickerSpeed;
        let flicker = 0.5 + 0.5 * Math.sin(time + this.flickerOffset);
        // Make flicker more erratic: random spikes
        if (Math.random() < 0.005) flicker = Math.random(); // occasional random dim/bright

        // Random "off" state: firefly turns off completely for a random duration
        if (!this.isOff) {
          // 1% chance per frame to go off (≈ every 1–2 seconds)
          if (Math.random() < 0.008) {
            this.isOff = true;
            this.offDuration = 0.5 + Math.random() * 1.5; // off for 0.5–2 seconds
            this.offTimer = 0;
          }
        } else {
          this.offTimer += 1 / 60; // assume ~60fps
          if (this.offTimer >= this.offDuration) {
            this.isOff = false;
          }
        }

        let brightness = this.baseBrightness * (0.4 + flicker * 0.6);
        if (this.isOff) brightness = 0.05; // almost off but still faint (or set to 0)

        // Slowly fade out over very long life, then respawn fresh
        this.life -= this.decay;
        if (this.life <= 0) {
          this.reset();
          this.life = 1.0;
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          // also reset off state
          this.isOff = false;
        }

        this.currentBrightness = brightness * this.life;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.shadowBlur = 12;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.min(this.currentBrightness, 0.9);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const fireflyCount = 20; // you can increase to 70–80 for denser effect
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
        pointerEvents: "none",
        zIndex: 5,
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
    <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Fireflies */}
      <Fireflies />

      {/* Animated Blue Blurry Balls */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600 rounded-full blur-3xl opacity-30 animate-float1" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-25 animate-float2" />
        <div className="absolute top-1/3 left-1/2 w-80 h-80 bg-blue-400 rounded-full blur-3xl opacity-20 animate-float3" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
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
            <p className="mt-4 text-gray-300 text-base md:text-lg max-w-2xl mx-auto lg:mx-0">
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
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 delay-150 ease-out" />
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
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 delay-150 ease-out" />
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
    <section id="about" className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
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
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Why work with me?</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <Smartphone className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                <span>100% responsive designs that work on all devices</span>
              </li>
              <li className="flex items-start gap-3">
                <Rocket className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                <span>SEO optimized and fast loading</span>
              </li>
              <li className="flex items-start gap-3">
                <Code2 className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                <span>Clean, maintainable code with modern tools</span>
              </li>
              <li className="flex items-start gap-3">
                <Headphones className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                <span>Ongoing support and collaboration</span>
              </li>
              <li className="flex items-start gap-3">
                <CalendarCheck className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                <span>On‑time delivery and clear communication</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};


const Work = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const services = [
    { icon: <Code size={40} />, title: "Custom Web Development", link: "https://www.w3schools.com/whatis/", desc: "React, Next.js, Tailwind, and more – tailored to your needs." },
    { icon: <Layout size={40} />, title: "WordPress Development", link: "https://wordpress.com/", desc: "Custom themes, plugins, and full site management." },
    { icon: <Smartphone size={40} />, title: "Responsive Design", link: "https://www.w3schools.com/html/html_responsive.asp", desc: "Flawless experience on mobile, tablet, and desktop." },
    { icon: <Globe size={40} />, title: "Wix & Website Builders", link: "https://manage.wix.com/studio/sites?viewId=all-items-view", desc: "Professional Wix sites with advanced features." },
  ];

  const cardVariants = {
    offscreen: { y: 80, scale: 0.6, opacity: 0, originY: 1, originX: 0.5 },
    onscreen: { y: 0, scale: 1, opacity: 1, transition: { type: "spring", bounce: 0.4, duration: 0.8 } },
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">What I Offer</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Hover over a card to spotlight it</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => {
            const isHovered = hoveredIndex === idx;
            const isOtherHovered = hoveredIndex !== null && hoveredIndex !== idx;

            return (
              <motion.div
                key={idx}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md transition-all duration-300 text-center cursor-pointer
                  ${isOtherHovered ? "opacity-0 pointer-events-none" : "opacity-100"}
                  ${isHovered ? "scale-105 shadow-2xl z-10" : "scale-100"}
                `}
              >
                <a href={service.link} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="text-blue-600 mb-4 flex justify-center transition-transform group-hover:scale-110">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{service.desc}</p>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    { title: "E‑Commerce Store", tech: "React, Tailwind, MongoDB", image: "https://i.ibb.co.com/7d28nBhP/khela.webp", live: "https://sports-equipment99.netlify.app/", code: "https://github.com/Salehchy46/equipment-management-client" },
    { title: "WordPress Agency Site", tech: "WordPress, Elementor, PHP", image: "https://i.ibb.co.com/vxj8w9bV/download.png", live: "https://www.hurrida.com/", code: "https://github.com/Salehchy46/cookie-policy-hurrida" },
    { title: "Portfolio Dashboard", tech: " Tailwind, React", image: "https://i.ibb.co.com/MDdQR89t/download-1.png", live: "https://superlative-manatee-5fc69d.netlify.app/", code: "https://github.com/Salehchy46/tic-tac-toe" },
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
                  <a href={project.live} className="text-blue-600 hover:underline text-sm font-medium">Live</a>
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
        <Work />
        <Projects />
        <Contact />
      </main>
    </div>
  );
};

export default Home;