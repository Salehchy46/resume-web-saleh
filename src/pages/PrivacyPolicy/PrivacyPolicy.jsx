// src/pages/PrivacyPolicy/PrivacyPolicy.jsx
import React, { useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Shield, Lock, Cookie, Eye, Database, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
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
      icon: <Shield size={24} />,
      title: 'Information I Collect',
      content: [
        'Personal data you provide voluntarily (name, email address) when contacting me via forms or email.',
        'Usage data such as pages visited, time spent, and referral sources (via analytics).',
        'Cookies and similar technologies to improve your browsing experience.',
      ],
    },
    {
      icon: <Database size={24} />,
      title: 'How I Use Your Information',
      content: [
        'To respond to your inquiries and provide customer support.',
        'To improve and personalize your experience on this website.',
        'To send occasional updates or newsletters (only if you opt in).',
        'To analyze website traffic and usage patterns.',
      ],
    },
    {
      icon: <Cookie size={24} />,
      title: 'Cookies & Tracking',
      content: [
        'This website uses essential cookies for functionality and analytics cookies (e.g., Google Analytics) to understand visitor behavior.',
        'You can disable cookies in your browser settings, but some features may not work properly.',
        'Third-party services (like hosting, analytics) may also use cookies.',
      ],
    },
    {
      icon: <Lock size={24} />,
      title: 'Data Security',
      content: [
        'I take reasonable precautions to protect your personal information from unauthorized access, alteration, or disclosure.',
        'However, no method of transmission over the internet is 100% secure.',
        'Your data is stored securely and only accessed when necessary.',
      ],
    },
    {
      icon: <Eye size={24} />,
      title: 'Your Rights',
      content: [
        'You have the right to access, correct, or delete your personal data.',
        'You can opt out of marketing communications at any time.',
        'Request a copy of the data I hold about you by contacting me.',
      ],
    },
    {
      icon: <Mail size={24} />,
      title: 'Contact Me',
      content: [
        'If you have any questions about this Privacy Policy, please reach out:',
        'Email: Salehchyctg@gmail.com',
        'Phone: +880 1835-069946',
        'Address: Chattogram, Bangladesh',
      ],
    },
  ];

  const lastUpdated = 'May 2, 2025';

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
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto"
          >
            Your privacy matters. This policy explains how I collect, use, and protect your information.
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

      {/* Policy Content */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
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
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    {section.icon}
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white">{section.title}</h2>
                </div>
                <div className="space-y-2 text-gray-300 leading-relaxed ml-4 md:ml-16">
                  {section.content.map((item, i) => (
                    <p key={i} className="text-sm md:text-base">
                      {item}
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
              By using this website, you consent to this Privacy Policy. I reserve the right to update this policy at any time.
              Changes will be posted on this page with an updated revision date.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-gray-800 to-gray-900 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Questions?</h2>
          <p className="text-gray-300 mb-6">If you have any concerns about your privacy, feel free to reach out.</p>
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

export default PrivacyPolicy;