// src/pages/TermsOfService/TermsOfService.jsx
import React, { useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { 
  FileText, CheckSquare, Scale, Lock, AlertTriangle, 
  Globe, Mail, Shield, BookOpen 
} from 'lucide-react';

const TermsOfService = () => {
  // Scroll reveal animation
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

  const sections = [
    {
      icon: <FileText size={24} />,
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using this website, you accept and agree to be bound by these Terms & Conditions.',
        'If you do not agree with any part of these terms, please do not use this website.',
        'I reserve the right to update or modify these terms at any time without prior notice.',
      ],
    },
    {
      icon: <CheckSquare size={24} />,
      title: 'Use of the Website',
      content: [
        'You agree to use this website only for lawful purposes and in a way that does not infringe the rights of others.',
        'You may not use this website to distribute malicious software, spam, or harass others.',
        'Unauthorized use of this website may give rise to a claim for damages.',
      ],
    },
    {
      icon: <Scale size={24} />,
      title: 'Intellectual Property',
      content: [
        'All content on this website (text, graphics, logos, images, code) is my property or licensed to me.',
        'You may not reproduce, duplicate, copy, sell, or exploit any portion of this website without written permission.',
        'You may download or print content for personal, non-commercial use only.',
      ],
    },
    {
      icon: <Lock size={24} />,
      title: 'User Conduct',
      content: [
        'You agree not to upload or transmit any viruses, malware, or harmful code.',
        'You agree not to attempt to gain unauthorized access to any part of the website or its servers.',
        'You agree not to interfere with the proper working of the website.',
      ],
    },
    {
      icon: <AlertTriangle size={24} />,
      title: 'Limitation of Liability',
      content: [
        'This website is provided "as is" without any warranties, express or implied.',
        'I am not liable for any direct, indirect, incidental, or consequential damages arising from your use of this website.',
        'I do not warrant that the website will be uninterrupted, error-free, or secure.',
      ],
    },
    {
      icon: <Globe size={24} />,
      title: 'Third-Party Links',
      content: [
        'This website may contain links to external sites that are not controlled or endorsed by me.',
        'I am not responsible for the content, privacy policies, or practices of any third-party websites.',
        'You access third-party links at your own risk.',
      ],
    },
    {
      icon: <BookOpen size={24} />,
      title: 'Governing Law',
      content: [
        'These Terms shall be governed by and construed in accordance with the laws of Bangladesh.',
        'Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Chattogram, Bangladesh.',
      ],
    },
    {
      icon: <Shield size={24} />,
      title: 'Changes to Terms',
      content: [
        'I reserve the right to revise these Terms & Conditions at any time without notice.',
        'By continuing to use this website after changes are posted, you agree to the revised terms.',
        'It is your responsibility to review these terms periodically.',
      ],
    },
  ];

  const lastUpdated = 'May 2, 2025';

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-gray-900 to-gray-800 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/5 blur-3xl" />
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Terms & Conditions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto"
          >
            Please read these terms carefully before using this website.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm text-gray-400 mt-6"
          >
            Last updated: {lastUpdated}
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="max-w-330 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700 hover:border-blue-500/30 transition-all group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-linear-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    {section.icon}
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white">{section.title}</h2>
                </div>
                <div className="space-y-2 text-gray-300 leading-relaxed ml-4 md:ml-16">
                  {section.content.map((item, i) => (
                    <p key={i} className="text-sm md:text-base">
                      • {item}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional legal note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50 text-center"
          >
            <p className="text-gray-400 text-sm">
              By using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
              If you have any questions, please contact me.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-linear-to-r from-gray-800 to-gray-900 text-center">
        <div className="max-w-330 mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Questions?</h2>
          <p className="text-gray-300 mb-6">If you need clarification about these terms, feel free to reach out.</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-lg"
          >
            Contact Me
          </a>
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

export default TermsOfService;