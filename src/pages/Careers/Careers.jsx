/* eslint-disable no-unused-vars */
// src/pages/Careers/Careers.jsx
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Award, Calendar, ExternalLink, CheckCircle, 
  Code, Search, Filter 
} from 'lucide-react';
import certificatesData from '../../assets/jsons/certificates.json';

const Careers = () => {
  const [certificates, setCertificates] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCertificates(certificatesData);
  }, []);

  // Extract unique skills from all certificates for filter
  const allSkills = ['all', ...new Set(certificates.flatMap(cert => cert.skills))];

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cert.issuer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || cert.skills.includes(filter);
    return matchesSearch && matchesFilter;
  });

  // Scroll reveal effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/5 blur-3xl" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Certifications & Achievements
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 mt-4 max-w-2xl mx-auto"
          >
            Professional credentials that validate my skills and expertise.
          </motion.p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-gray-800/30 border-b border-gray-700">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            <div className="bg-gray-800/50 rounded-xl p-4">
              <Award className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{certificates.length}+</div>
              <div className="text-xs text-gray-400">Certifications</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <Code className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">10+</div>
              <div className="text-xs text-gray-400">Skills Covered</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">2022–2025</div>
              <div className="text-xs text-gray-400">Active Learning</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-gray-900">
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by title or issuer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800/80 border border-gray-700 rounded-lg focus:border-blue-500 outline-none transition"
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <Filter size={18} className="text-gray-400 self-center" />
              {allSkills.map((skill, idx) => (
                <button
                  key={skill}
                  onClick={() => setFilter(skill)}
                  className={`px-3 py-1 rounded-full text-xs sm:text-sm transition-all ${
                    filter === skill
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {skill === 'all' ? 'All' : skill}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Grid */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          {filteredCertificates.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg">No certificates found. Try a different search or filter.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCertificates.map((cert, idx) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="group bg-gray-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all hover:-translate-y-2"
                >
                  {/* Certificate Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                          {cert.title}
                        </h3>
                        <p className="text-sm text-blue-400">{cert.issuer}</p>
                      </div>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar size={12} /> {cert.date}
                      </span>
                    </div>
                    
                    {/* Skills chips */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {cert.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-gray-700/70 rounded-md text-gray-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div> 
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to work together?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Let's discuss how my certified skills can benefit your project.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-lg"
          >
            Hire Me <Award size={18} />
          </Link>
        </div>
      </section>

      <style jsx>{`
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

export default Careers;