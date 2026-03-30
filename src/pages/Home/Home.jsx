"use client";

import React from "react";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"; 

const Hero = () => {
  const skills = [
    "WordPress",
    "Wix",
    "Figma",
    "HTML/CSS",
    "Tailwind",
    "DaisyUI",
    "React",
    "MongoDB",
    "Express",
    "JavaScript",
    "TypeScript",
  ];

  return (
    <section className="relative bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 md:py-24 lg:py-32">
      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
              Hi, I'm <span className="text-blue-600 dark:text-blue-400">Saleh</span>
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-300 mt-2">
              Frontend Web Developer
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto lg:mx-0">
              I craft responsive, high‑performance websites that help you connect with your audience.
              Whether it’s a custom React app, a WordPress site, or a Wix design — I bring ideas to life.
            </p>

            {/* Skills Tags */}
            <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Call to Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              >
                Hire Me
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                View Projects
              </a>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex justify-center lg:justify-start space-x-5">
              <a
                href="https://github.com/Salehchy46"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/mohammad-saleh-830389226/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:Salehchyctg@gmail.com"
                className="text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 flex justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 blur-2xl animate-pulse"></div>
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

export default Hero;