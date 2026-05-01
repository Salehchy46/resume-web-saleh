// src/pages/Services/Services.jsx
import React, { useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Code2,
  Layout,
  Smartphone,
  Zap,
  Globe,
  Figma,
  Server,
  PenTool,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from 'lucide-react';

const Services = () => {
  // Scroll reveal animation (similar to other pages)
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

  const services = [
    {
      title: 'Website Design',
      icon: <Layout size={40} />,
      description: 'Modern, responsive, and user‑friendly interfaces that convert visitors into customers.',
      features: ['Custom UI/UX design', 'Mobile-first approach', 'SEO optimized', 'Fast loading'],
      price: 'From $800',
    },
    {
      title: 'WordPress Development',
      icon: <Globe size={40} />,
      description: 'Custom WordPress themes, plugins, and full site management for businesses.',
      features: ['Custom theme development', 'Plugin integration', 'WooCommerce setup', 'Speed optimization'],
      price: 'From $1,200',
    },
    {
      title: 'React / Next.js Apps',
      icon: <Code2 size={40} />,
      description: 'Scalable, high-performance web applications using modern React ecosystem.',
      features: ['SPA & SSR', 'State management', 'API integration', 'TypeScript ready'],
      price: 'From $2,500',
    },
    {
      title: 'Figma to Code',
      icon: <Figma size={40} />,
      description: 'Pixel‑perfect conversion of Figma designs into fully functional websites.',
      features: ['Responsive implementation', 'Interactive animations', 'Cross‑browser compatible', 'Clean code'],
      price: 'From $450 per screen',
    },
    {
      title: 'Landing Pages',
      icon: <Smartphone size={40} />,
      description: 'High‑converting, fast landing pages designed to capture leads and drive sales.',
      features: ['Optimized for conversions', 'A/B testing ready', 'Analytics integration', '5‑7 day delivery'],
      price: 'From $900',
    },
    {
      title: 'Performance Optimization',
      icon: <Zap size={40} />,
      description: 'Boost your site speed, Lighthouse scores, and overall user experience.',
      features: ['Core Web Vitals', 'Code splitting', 'Image optimization', 'Caching strategies'],
      price: 'From $500',
    },
  ];

  const processSteps = [
    { step: '01', title: 'Discovery', desc: 'Understand your goals, audience, and requirements.' },
    { step: '02', title: 'Planning', desc: 'Create wireframes, sitemaps, and technical specifications.' },
    { step: '03', title: 'Design', desc: 'Craft modern, user‑centric visual designs.' },
    { step: '04', title: 'Development', desc: 'Build with clean, maintainable code.' },
    { step: '05', title: 'Testing', desc: 'Rigorous QA, performance checks, and browser testing.' },
    { step: '06', title: 'Launch & Support', desc: 'Deploy, monitor, and provide ongoing maintenance.' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/5 blur-3xl" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
          >
            My Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            I build digital solutions that help businesses grow and succeed online.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-white">What I Offer</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Comprehensive web development services tailored to your needs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group"
              >
                <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{service.description}</p>
                <div className="space-y-2 mb-4">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-400 text-xs">
                      <CheckCircle size={12} className="text-blue-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                  <span className="text-cyan-400 font-semibold text-sm">{service.price}</span>
                  <Link
                    to="/contact"
                    className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    Discuss <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-20 bg-gray-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-white">How I Work</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              A transparent, collaborative process from idea to launch.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700 hover:border-blue-500/30 transition-all group"
              >
                <div className="text-4xl font-bold text-blue-500/30 mb-2">{step.step}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-gray-900 to-gray-800 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Sparkles className="w-12 h-12 text-blue-400 mx-auto" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to start your project?
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Let’s discuss your ideas and create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
              >
                Get a free quote <ArrowRight size={18} />
              </Link>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition"
              >
                View my work
              </Link>
            </div>
          </motion.div>
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

export default Services;