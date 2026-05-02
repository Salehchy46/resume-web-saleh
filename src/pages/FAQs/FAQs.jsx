import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import {
    Mail,
    Phone,
    MessageCircle,
    ChevronDown,
    ChevronUp,
    Send,
    CheckCircle,
    HelpCircle,
    FileText,
    Users,
    Clock,
    ArrowRight,
} from 'lucide-react';

const FAQs = () => {
    const [openFaq, setOpenFaq] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const faqs = [
        {
            question: 'What services do you offer?',
            answer: 'I offer website design, WordPress development, React/Next.js applications, landing page creation, and performance optimization. Check my Services page for details.',
        },
        {
            question: 'How long does a typical project take?',
            answer: 'Timeline depends on complexity. Landing pages: 5-7 days. Marketing websites: 2-4 weeks. Full React applications: 4-8 weeks. I’ll provide a clear timeline before starting.',
        },
        {
            question: 'Do you provide ongoing maintenance?',
            answer: 'Yes! I offer maintenance packages including updates, backups, security monitoring, and content changes. Contact me for a custom plan.',
        },
        {
            question: 'What is your pricing model?',
            answer: 'I work on a project‑basis or hourly. Typical ranges: Landing page ($900–$2,000), WordPress site ($1,200–$3,500), React app ($3,500–$10,000+). Get a free quote for your specific project.',
        },
        {
            question: 'Do you work with international clients?',
            answer: 'Absolutely! I’ve worked with clients from the US, UK, Australia, and Europe. Time zones are not a barrier – I communicate clearly and deliver on time.',
        },
        {
            question: 'What happens after I submit a support request?',
            answer: 'You’ll receive an automated confirmation. I personally respond within 24 hours (usually sooner). For urgent issues, contact me via WhatsApp.',
        },
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        // Simulate API call – replace with actual form submission (e.g., Formspree)
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setSubmitStatus(null), 5000);
        } catch {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(null), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div>
            {/* FAQ Section - Full Width with Attractive Design */}
            <section className="py-20 bg-gray-800/30 relative overflow-hidden">
                {/* Background decorative blobs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 mb-4"
                        >
                            <HelpCircle className="w-4 h-4 text-blue-400" />
                            <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">Knowledge Base</span>
                        </motion.div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Frequently Asked Questions</h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mt-4 rounded-full" />
                        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                            Everything you need to know about working with me
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="group"
                            >
                                <div
                                    className={`bg-gray-800/60 backdrop-blur-sm rounded-2xl border transition-all duration-300 ${openFaq === idx
                                        ? 'border-blue-500/50 shadow-lg shadow-blue-500/10'
                                        : 'border-gray-700 hover:border-gray-600'
                                        }`}
                                >
                                    <button
                                        onClick={() => toggleFaq(idx)}
                                        className="w-full flex justify-between items-center p-5 text-left"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                                                <HelpCircle size={16} className="text-blue-400" />
                                            </div>
                                            <span className="text-base md:text-lg font-medium text-white group-hover:text-blue-400 transition-colors">
                                                {faq.question}
                                            </span>
                                        </div>
                                        <div className="flex-shrink-0 ml-4 text-gray-400 group-hover:text-blue-400 transition-colors">
                                            {openFaq === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </div>
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === idx && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-5 pb-5 pt-2 text-gray-300 text-sm leading-relaxed border-t border-gray-700/50 ml-11">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form - Enhanced Full Width */}
            <section className="py-20 md:py-28 bg-gray-900 relative overflow-hidden">
                {/* Background gradient orbs */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float-slow" />
                    <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-float-slower" />
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gray-800/40 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden"
                    >
                        {/* Gradient top bar */}
                        <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />

                        <div className="p-6 md:p-10">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl md:text-3xl font-bold text-white">Still have questions?</h2>
                                <p className="text-gray-400 mt-2">I’m just a message away. Let’s talk!</p>
                            </div>

                            {submitStatus === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-xl text-green-400 flex items-center gap-3"
                                >
                                    <CheckCircle size={20} />
                                    <span>Message sent! I'll reply within 24 hours.</span>
                                </motion.div>
                            )}
                            {submitStatus === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-xl text-red-400"
                                >
                                    Something went wrong. Please email me directly or try again later.
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-300 mb-2 text-sm font-medium">Your name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-white placeholder-gray-500"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-300 mb-2 text-sm font-medium">Email address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-white placeholder-gray-500"
                                            placeholder="hello@example.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2 text-sm font-medium">Subject *</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-white placeholder-gray-500"
                                        placeholder="What's this about?"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2 text-sm font-medium">Message *</label>
                                    <textarea
                                        name="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition text-white placeholder-gray-500 resize-none"
                                        placeholder="Tell me more about your project or question..."
                                    />
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                                    >
                                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <span className="relative flex items-center gap-2">
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Send Message <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
                <style jsx>{`
                  @keyframes float-slow {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    50% { transform: translate(20px, 20px) rotate(5deg); }
                  }
                  @keyframes float-slower {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); }
                    50% { transform: translate(-20px, 30px) rotate(-5deg); }
                  }
                  @keyframes pulse-slow {
                    0%, 100% { opacity: 0.2; transform: scale(1); }
                    50% { opacity: 0.35; transform: scale(1.05); }
                  }
                  .animate-float-slow {
                    animation: float-slow 15s ease-in-out infinite;
                  }
                  .animate-float-slower {
                    animation: float-slower 20s ease-in-out infinite;
                  }
                  .animate-pulse-slow {
                    animation: pulse-slow 8s ease-in-out infinite;
                  }
                  .delay-1000 {
                    animation-delay: 1s;
                  }
                `}</style>
            </section>
        </div>
    );
};

export default FAQs;