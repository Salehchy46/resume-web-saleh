// src/components/home/Projects.jsx (Admin version – use in Dashboard)
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ExternalLink, Github, ArrowRight, Plus, Edit, Trash2, 
  ChevronUp, ChevronDown, X, Save 
} from 'lucide-react';
import { 
  fetchProjects, createProject, updateProject, deleteProject, reorderProjects 
} from '../../../apis/projectService';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    image: '',
    tech: [],
    liveLink: '',
    codeLink: '',
    featured: false,
  });
  const [techInput, setTechInput] = useState('');

  // Load projects
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const res = await fetchProjects();
      if (res.success) setProjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Modal handlers
  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({ title: '', category: '', description: '', image: '', tech: [], liveLink: '', codeLink: '', featured: false });
    setTechInput('');
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      image: project.image,
      tech: [...project.tech],
      liveLink: project.liveLink || '',
      codeLink: project.codeLink || '',
      featured: project.featured || false,
    });
    setTechInput('');
    setIsModalOpen(true);
  };

  const handleAddTech = () => {
    if (techInput.trim() && !formData.tech.includes(techInput.trim())) {
      setFormData({ ...formData, tech: [...formData.tech, techInput.trim()] });
      setTechInput('');
    }
  };

  const handleRemoveTech = (tech) => {
    setFormData({ ...formData, tech: formData.tech.filter(t => t !== tech) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await updateProject(editingProject._id, formData);
      } else {
        await createProject(formData);
      }
      await loadProjects();
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert('Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this project permanently?')) {
      try {
        await deleteProject(id);
        await loadProjects();
      } catch (err) {
        console.error(err);
        alert('Delete failed');
      }
    }
  };

  const moveProject = async (id, direction) => {
    const index = projects.findIndex(p => p._id === id);
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === projects.length - 1)) return;
    const newProjects = [...projects];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newProjects[index], newProjects[swapIndex]] = [newProjects[swapIndex], newProjects[index]];
    // Save new order to backend
    const orderedIds = newProjects.map(p => p._id);
    try {
      await reorderProjects(orderedIds);
      await loadProjects(); // refresh with server order
    } catch (err) {
      console.error(err);
      alert('Reorder failed');
    }
  };

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
    <section className="py-16 md:py-24 bg-gray-900">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header with Create button */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-gray-400 mt-2">Manage your project portfolio</p>
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={18} /> Create Project
          </button>
        </div>

        {/* Projects Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-700">
              <tr className="text-gray-400 text-sm">
                <th className="pb-3 w-12">Order</th>
                <th className="pb-3 font-medium">Project</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Tech Stack</th>
                <th className="pb-3 font-medium text-center">Actions</th>
                <th className="pb-3 font-medium text-center">Reorder</th>
               </tr>
            </thead>
            <tbody>
              {projects.map((project, idx) => (
                <motion.tr
                  key={project._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-b border-gray-800 hover:bg-gray-800/30 transition"
                >
                  <td className="py-4 text-gray-400 text-sm">{idx + 1} </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img src={project.image} alt={project.title} className="w-10 h-10 rounded object-cover" />
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
                      {project.tech.length > 3 && <span className="text-xs text-gray-400">+{project.tech.length - 3}</span>}
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex justify-center gap-3">
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                          <ExternalLink size={18} />
                        </a>
                      )}
                      {project.codeLink && (
                        <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-200">
                          <Github size={18} />
                        </a>
                      )}
                      <button onClick={() => openEditModal(project)} className="text-yellow-400 hover:text-yellow-300">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDelete(project._id)} className="text-red-400 hover:text-red-300">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => moveProject(project._id, 'up')} disabled={idx === 0} className="text-gray-400 hover:text-white disabled:opacity-30">
                        <ChevronUp size={18} />
                      </button>
                      <button onClick={() => moveProject(project._id, 'down')} disabled={idx === projects.length - 1} className="text-gray-400 hover:text-white disabled:opacity-30">
                        <ChevronDown size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Create/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
          <div className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-blue-500/30" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">{editingProject ? 'Edit Project' : 'Create New Project'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-1 text-sm">Title *</label>
                  <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1 text-sm">Category *</label>
                  <input type="text" required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1 text-sm">Description *</label>
                  <textarea rows="3" required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white resize-none" />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1 text-sm">Image URL *</label>
                  <input type="url" required value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white" />
                  {formData.image && <img src={formData.image} alt="preview" className="mt-2 w-20 h-20 object-cover rounded" />}
                </div>
                <div>
                  <label className="block text-gray-300 mb-1 text-sm">Tech Stack</label>
                  <div className="flex gap-2">
                    <input type="text" value={techInput} onChange={(e) => setTechInput(e.target.value)} placeholder="e.g., React" className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white" />
                    <button type="button" onClick={handleAddTech} className="px-3 py-2 bg-blue-600 rounded-lg">Add</button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tech.map(t => (
                      <span key={t} className="inline-flex items-center gap-1 bg-gray-700 px-2 py-1 rounded-full text-xs">
                        {t} <button type="button" onClick={() => handleRemoveTech(t)} className="text-red-400"><X size={12} /></button>
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 mb-1 text-sm">Live Demo URL</label>
                  <input type="url" value={formData.liveLink} onChange={(e) => setFormData({...formData, liveLink: e.target.value})} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1 text-sm">Code Repository URL</label>
                  <input type="url" value={formData.codeLink} onChange={(e) => setFormData({...formData, codeLink: e.target.value})} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white" />
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="featured" checked={formData.featured} onChange={(e) => setFormData({...formData, featured: e.target.checked})} className="w-4 h-4 accent-blue-500" />
                  <label htmlFor="featured" className="text-gray-300">Show on home page (Featured)</label>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-700 rounded-lg">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                    <Save size={16} /> {editingProject ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;