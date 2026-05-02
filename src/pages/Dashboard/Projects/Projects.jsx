// src/components/home/Projects.jsx
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, ArrowRight, Eye } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        // eslint-disable-next-line no-undef
        const res = await fetchProjects();
        if (res.success) {
          // Show only featured projects (or all if you prefer)
          setProjects(res.data.filter(p => p.featured));
        }
      } catch (error) {
        console.error('Failed to load projects', error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
          <div className="animate-pulse text-gray-400">Loading projects...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="lg:relative lg:right-32 py-16 md:py-24 bg-gray-900">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
             <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            A selection of my best work – each built with passion and precision.
          </p>
        </div>

        {/* Projects Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-700">
              <tr className="text-gray-400 text-sm">
                <th className="pb-3 font-medium">Project</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Tech Stack</th>
                <th className="pb-3 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, idx) => (
                <motion.tr
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-gray-800 hover:bg-gray-800/30 transition"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium text-white">{project.title}</p>
                        <p className="text-xs text-gray-400 line-clamp-1">{project.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                      {project.category}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-wrap gap-1">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs px-2 py-0.5 bg-gray-700 rounded-md text-gray-300">
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="text-xs text-gray-400">+{project.tech.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex justify-center gap-4">
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition"
                        title="Live Demo"
                      >
                        <ExternalLink size={18} />
                      </a>
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-200 transition"
                        title="Source Code"
                      >
                        <Github size={18} />
                      </a>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* View All Button */}
        {projects.length > 0 && (
          <div className="text-center mt-12">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white font-medium hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              View All Projects <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;