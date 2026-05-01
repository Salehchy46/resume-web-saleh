// src/pages/Projects.jsx
"use client";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  X,
  ExternalLink,
  Github,
  Eye,
  ArrowRight,
} from "lucide-react";

// Project data – only 3 projects
const projectsData = [
  {
    id: 1,
    title: "Sports Equipment Store",
    category: "react",
    tech: ["React", "Tailwind CSS", "MongoDB"],
    image: "https://i.ibb.co.com/7d28nBhP/khela.webp",
    logo: "https://i.ibb.co.com/FLFLk2T1/image-5c7ee4da.png",
    description:
      "Full‑featured e‑commerce platform for sports gear with cart, checkout, and user authentication.",
    liveLink: "https://sports-equipment99.netlify.app/",
    codeLink: "https://github.com/Salehchy46/equipment-management-client",
    featured: true,
    fullDescription:
      "A complete online store built with React and Tailwind CSS. Users can browse products, add to cart, and complete orders. The backend uses MongoDB and Express.",
  },
  {
    id: 2,
    title: "Hurrida – Agency Site",
    category: "wordpress",
    tech: ["WordPress", "Elementor", "PHP"],
    image: "https://i.ibb.co.com/vxj8w9bV/download.png",
    logo: "https://i.ibb.co.com/FLFLk2T1/image-5c7ee4da.png",
    description:
      "Professional business website for a digital agency with custom theme and responsive design.",
    liveLink: "https://www.hurrida.com/",
    codeLink: "https://github.com/Salehchy46/cookie-policy-hurrida",
    featured: false,
    fullDescription:
      "Custom WordPress theme with Elementor page builder. Optimised for speed and SEO.",
  },
  {
    id: 3,
    title: "Tic‑Tac‑Toe Game",
    category: "react",
    tech: ["React", "Tailwind CSS"],
    image: "https://i.ibb.co.com/MDdQR89t/download-1.png",
    logo: "https://i.ibb.co.com/FLFLk2T1/image-5c7ee4da.png",
    description:
      "Classic tic‑tac‑toe game with modern UI and smooth animations.",
    liveLink: "https://superlative-manatee-5fc69d.netlify.app/",
    codeLink: "https://github.com/Salehchy46/tic-tac-toe",
    featured: false,
    fullDescription:
      "Built with React and Tailwind, this game demonstrates state management and responsive design.",
  },
  {
    id: 4,
    title: "Roshgolla – Restaurant Site",
    category: "html",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "https://i.etsystatic.com/24762720/r/il/d1ace7/4418170622/il_fullxfull.4418170622_cf16.jpg",
    logo: "https://i.etsystatic.com/24762720/r/il/d1ace7/4418170622/il_fullxfull.4418170622_cf16.jpg",
    description:
      "Classic Restraunt Website with modern UI.",
    liveLink: "https://salehchy46.github.io/Roshgolla/",
    codeLink: "https://github.com/Salehchy46/Roshgolla",
    featured: false,
    fullDescription:
      "This website features a responsive design that works on all devices.",
  },
];

const categories = [
  { id: "all", label: "All" },
  { id: "wordpress", label: "WordPress" },
  { id: "react", label: "React" },
  { id: "html", label: "HTML" },
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState(projectsData);

  useEffect(() => {
    if (activeCategory === "all") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(
        projectsData.filter((project) => project.category === activeCategory)
      );
    }
  }, [activeCategory]);

  // Scroll animations (fade-up)
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

  return (
    <div className="min-h-screen bg-transparent text-white relative">
      {/* ========== ANIMATED BACKGROUND ========== */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Main gradient background – slow shift */}
        <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-blue-900/20 to-gray-900 animate-gradient-xy" />
        
        {/* Floating soft blobs – create depth */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-float-slower" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-indigo-500/5 rounded-full blur-3xl animate-pulse-slow" />
        
        {/* Extra subtle floating particles (small circles) */}
        <div className="absolute top-[15%] left-[10%] w-2 h-2 bg-blue-400/30 rounded-full animate-particle-1" />
        <div className="absolute top-[70%] left-[85%] w-3 h-3 bg-cyan-400/20 rounded-full animate-particle-2" />
        <div className="absolute top-[40%] left-[20%] w-1.5 h-1.5 bg-blue-300/20 rounded-full animate-particle-3" />
        <div className="absolute top-[80%] left-[30%] w-2 h-2 bg-cyan-300/25 rounded-full animate-particle-4" />
        <div className="absolute top-[25%] left-[75%] w-2.5 h-2.5 bg-blue-400/20 rounded-full animate-particle-5" />
      </div>

      {/* Hero Section */}
      <section className="relative bg-transparent py-20 md:py-28 overflow-hidden">
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            My Work
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A selection of projects I’ve built with passion and precision.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 bg-gray-800/50 backdrop-blur-sm border-y border-gray-700/50">
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-24 bg-transparent">
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                className="group animate-on-scroll cursor-pointer"
                onClick={() => setSelectedProject(project)}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className=" bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-700/50">
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 hover:rounded-xl rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium flex items-center gap-2">
                        <Eye size={16} /> Quick View
                      </button>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="rounded-full w-10 h-10 bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <img
                          src={project.logo}
                          alt="logo"
                          className="w-9 h-9 object-contain rounded-full"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    </div>
                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-gray-700/70 text-gray-300 text-xs rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Live Demo <ExternalLink size={14} />
                      </a>
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-300 text-sm flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Code <Github size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-28 bg-linear-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Have a project in mind?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Let’s work together and create something amazing.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
          >
            Let’s Work Together <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Modal for Project Details */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative border border-blue-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-1 rounded-full bg-gray-700 hover:bg-gray-600 transition"
            >
              <X size={20} />
            </button>
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-full w-12 h-12 bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <img
                    src={selectedProject.logo}
                    alt="logo"
                    className="w-11 h-11 object-contain rounded-full"
                  />
                </div>
                <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
              </div>
              <p className="text-gray-300 mb-4">{selectedProject.fullDescription}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tech.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href={selectedProject.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                >
                  Live Demo
                </a>
                <a
                  href={selectedProject.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition"
                >
                  View Code
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Animations & Utility Styles */}
      <style jsx>{`
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
        .hexagon-small {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Projects;