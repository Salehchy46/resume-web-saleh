// src/pages/Projects.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  X,
  ExternalLink,
  Github,
  Filter,
  ChevronRight,
  Star,
  Eye,
  ArrowRight,
} from "lucide-react";

// Sample project data
const projectsData = [
  {
    id: 1,
    title: "Sports Equipment Store",
    category: "react",
    tech: ["React", "Tailwind CSS", "MongoDB"],
    image: "https://i.ibb.co.com/7d28nBhP/khela.webp",
    logo: "https://i.ibb.co.com/FLFLk2T1/image-5c7ee4da.png", // hexagon logo
    description:
      "Full‑featured e‑commerce platform for sports gear with cart, checkout, and user authentication.",
    liveLink: "https://sports-equipment99.netlify.app/",
    codeLink: "https://github.com/Salehchy46/equipment-management-client",
    featured: true,
    detailedImages: [
      "https://i.ibb.co.com/7d28nBhP/khela.webp",
      "https://i.ibb.co.com/7d28nBhP/khela.webp",
    ],
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
    title: "Portfolio Dashboard",
    category: "uiux",
    tech: ["Figma", "React", "Tailwind"],
    image: "https://i.ibb.co.com/MDdQR89t/download-1.png",
    logo: "https://i.ibb.co.com/FLFLk2T1/image-5c7ee4da.png",
    description:
      "Analytics dashboard design with dark mode and interactive charts.",
    liveLink: "#",
    codeLink: "#",
    featured: false,
    fullDescription: "A concept design for a modern analytics dashboard.",
  },
  {
    id: 5,
    title: "E‑Learning Platform",
    category: "fullstack",
    tech: ["React", "Node.js", "MongoDB"],
    image: "https://i.ibb.co.com/7d28nBhP/khela.webp",
    logo: "https://i.ibb.co.com/FLFLk2T1/image-5c7ee4da.png",
    description: "Online course platform with video streaming and quizzes.",
    liveLink: "#",
    codeLink: "#",
    featured: false,
    fullDescription: "Full‑stack MERN application for online education.",
  },
  {
    id: 6,
    title: "Restaurant Website",
    category: "wordpress",
    tech: ["WordPress", "ACF", "SCSS"],
    image: "https://i.ibb.co.com/vxj8w9bV/download.png",
    logo: "https://i.ibb.co.com/FLFLk2T1/image-5c7ee4da.png",
    description:
      "Modern restaurant site with online reservation system and menu.",
    liveLink: "#",
    codeLink: "#",
    featured: false,
    fullDescription:
      "Built with WordPress and Advanced Custom Fields for easy menu management.",
  },
];

const categories = [
  { id: "all", label: "All" },
  { id: "wordpress", label: "WordPress" },
  { id: "react", label: "React" },
  { id: "uiux", label: "UI/UX" },
  { id: "fullstack", label: "Full Stack" },
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  // eslint-disable-next-line no-unused-vars
  const observerRef = useRef(null);

  // Filter projects based on category
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

  // Intersection Observer for scroll animations
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

  // Featured project (first in list)
  const featuredProject = projectsData.find((p) => p.featured) || projectsData[0];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/5 blur-3xl" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            My Work
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A selection of projects I’ve built with passion and precision.
          </p>
        </div>
      </section>

      {/* Featured Project (Optional) */}
      <section className="py-12 md:py-16 bg-gray-900">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl animate-on-scroll">
            <div className="grid md:grid-cols-2 gap-6 p-6 md:p-8">
              <div>
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <span className="text-blue-400 text-sm uppercase tracking-wider">
                  Featured Project
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  {featuredProject.title}
                </h2>
                <p className="text-gray-300">{featuredProject.description}</p>
                <div className="flex flex-wrap gap-2">
                  {featuredProject.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-700 rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 pt-2">
                  <a
                    href={featuredProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                  >
                    Live Demo <ExternalLink size={16} />
                  </a>
                  <a
                    href={featuredProject.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition"
                  >
                    View Code <Github size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 bg-gray-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
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
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                className="group animate-on-scroll cursor-pointer"
                onClick={() => setSelectedProject(project)}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="relative bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  {/* Image with overlay on hover */}
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium flex items-center gap-2">
                        <Eye size={16} /> Quick View
                      </button>
                    </div>
                  </div>

                  <div className="p-5">
                    {/* Hexagon logo + title */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="hexagon-small w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <img
                          src={project.logo}
                          alt="logo"
                          className="w-7 h-7 object-contain"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    </div>

                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-md"
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
      <section className="py-20 md:py-28 bg-gradient-to-r from-gray-800 to-gray-900 text-center">
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
            className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
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
                <div className="hexagon-small w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <img
                    src={selectedProject.logo}
                    alt="logo"
                    className="w-8 h-8 object-contain"
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

      {/* Custom CSS for hexagon shape and animations */}
      <style jsx>{`
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