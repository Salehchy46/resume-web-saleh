// src/components/home/SharedProjects.jsx
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

const SharedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        // eslint-disable-next-line no-undef
        const res = await fetchProjects();
        if (res.success) setProjects(res.data);
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
      <div className="text-center py-10 text-gray-400">
        Loading projects...
      </div>
    );
  }

  return (
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
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
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

      {/* Optional: View All link if truncated, or show count */}
      {projects.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-400">
          Showing {projects.length} {projects.length === 1 ? 'project' : 'projects'}
        </div>
      )}
    </div>
  );
};

export default SharedProjects;