'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import services from '@/data/services.json';

// --- DATA ---
const stats = [
  { value: '15+', label: 'Core Services' },
  { value: '200+', label: 'Projects Delivered' },
  { value: '50+', label: 'Happy Clients' },
  { value: '24/7', label: 'Dedicated Support' },
];

const reasons = [
  {
    icon: (
      <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: 'End-to-End Solutions',
    text: 'From strategy and UI/UX design to robust development, cloud deployment, and growth marketing—everything under one roof.',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Built To Scale',
    text: 'Cloud-ready, lightning-fast, and secure digital architectures designed to perform smoothly as your business grows.',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: 'Dedicated Support',
    text: 'A proactive team providing continuous maintenance, security monitoring, and optimization long after launch.',
  },
];

const estimationOptions = [
  { id: 'web', label: 'Web / App Development', price: 3500 },
  { id: 'design', label: 'UI/UX Design', price: 1500 },
  { id: 'marketing', label: 'Growth Marketing & SEO', price: 1200 },
  { id: 'cloud', label: 'Cloud & DevOps', price: 2000 },
  { id: 'security', label: 'Cybersecurity Audit', price: 1800 },
];

const faqs = [
  {
    q: 'How long does a typical project take?',
    a: 'Timeline varies depending on complexity. Standard websites usually take 3-5 weeks, while custom enterprise platforms range between 8 to 12 weeks.',
  },
  {
    q: 'Do you offer ongoing post-launch maintenance?',
    a: 'Yes, we provide 24/7 dedicated support and flexible monthly maintenance packages to ensure your software is always secure and updated.',
  },
  {
    q: 'How do we handle communication during development?',
    a: 'We use Slack/Teams for daily async updates, weekly video syncs, and real-time project management dashboards via Figma and Jira.',
  },
];

export default function LandingPage() {
  // Service Filter State
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Interactive Calculator State
  const [selectedServices, setSelectedServices] = useState(['web']);
  
  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  // Extract category filters dynamically from services.json
  const categories = ['All', ...Array.from(new Set(services.map((s) => s.category || 'Core')))];

  // Filtered services
  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter((s) => (s.category || 'Core') === selectedCategory);

  // Calculator logic
  const toggleServiceEstimate = (id) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const estimatedTotal = selectedServices.reduce((sum, id) => {
    const item = estimationOptions.find((o) => o.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  return (
    <main className="min-h-screen bg-slate-950 font-sans text-slate-100 overflow-x-hidden">
      
      {/* ---------------- NAVBAR ---------------- */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex flex-col sm:flex-row items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="text-xl font-black tracking-tight text-white">
              Digital Solutions Agency
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <li><a href="#services" className="hover:text-indigo-400 transition-colors">Services</a></li>
            <li><a href="#why-us" className="hover:text-indigo-400 transition-colors">Why Us</a></li>
            <li><a href="#estimator" className="hover:text-indigo-400 transition-colors">Cost Estimator</a></li>
            <li><a href="#faq" className="hover:text-indigo-400 transition-colors">FAQ</a></li>
          </ul>

          <a
            href="#contact"
            className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white transition-all rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-90 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            Get a Quote
          </a>
        </nav>
      </header>

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative pt-24 pb-32 md:pt-36 md:pb-44">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs md:text-sm font-medium text-indigo-300 backdrop-blur-md mb-8">
              <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
              Software · Design · Marketing
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.08] max-w-5xl mx-auto text-white">
              Digital Solutions That{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Grow Your Business
              </span>
            </h1>

            <p className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed">
              Custom software, e-commerce, design, cloud, and cybersecurity services delivered by one trusted team.
            </p>

            <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
              <a
                href="#services"
                className="rounded-full bg-white px-8 py-4 text-sm font-bold text-slate-950 hover:bg-slate-200 transition-all shadow-xl shadow-white/10 hover:-translate-y-0.5"
              >
                Explore Services
              </a>
              <a
                href="#estimator"
                className="rounded-full border border-slate-700 bg-slate-900/60 backdrop-blur-md px-8 py-4 text-sm font-bold text-white hover:border-slate-500 hover:bg-slate-800/80 transition-all hover:-translate-y-0.5"
              >
                Calculate Estimate
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------- STATS SECTION ---------------- */}
      <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 rounded-3xl border border-slate-800 bg-slate-900/90 p-8 md:p-10 backdrop-blur-2xl shadow-2xl">
          {stats.map((s) => (
            <div key={s.label} className="text-center group">
              <p className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 group-hover:scale-105 transition-transform">
                {s.value}
              </p>
              <p className="mt-2 text-xs md:text-sm font-medium text-slate-400 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- SERVICES SECTION ---------------- */}
      <section id="services" className="max-w-7xl mx-auto px-6 py-32">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Our Services</h2>
          <p className="mt-4 text-slate-400 text-lg">
            Everything you need to build, launch, and scale modern digital products online.
          </p>
        </div>

        {/* Dynamic Category Filters */}
        {categories.length > 2 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Services Grid */}
        <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredServices.map((service) => (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={service.id || service.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900/90 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-950">
                  <Image
                    src={service.image}
                    alt={service.alt || service.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                </div>

                {/* Card Body */}
                <div className="p-8 relative flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {service.title}
                    </h3>
                  </div>

<Link
  href={`/services/${service.id || service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300"
>
  Learn more →
</Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ---------------- WHY CHOOSE US ---------------- */}
      <section id="why-us" className="relative border-y border-slate-800/80 bg-slate-900/30 py-32 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Why Choose Us</h2>
            <p className="mt-4 text-slate-400 text-lg">
              We combine design excellence, technical rigor, and growth strategy.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {reasons.map((r) => (
              <div
                key={r.title}
                className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 md:p-10 hover:border-slate-700 transition-all duration-300 shadow-lg"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-6">
                  {r.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{r.title}</h3>
                <p className="mt-4 text-slate-400 text-sm leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- PROJECT COST ESTIMATOR ---------------- */}
      <section id="estimator" className="py-32 max-w-7xl mx-auto px-6">
        <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-slate-900 to-slate-950 p-8 md:p-14 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">Instant Calculator</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-2">Estimate Your Project Scope</h2>
            <p className="mt-3 text-slate-400">Select the modules you need for an instant budget estimate.</p>

            {/* Checklist */}
            <div className="mt-8 space-y-3">
              {estimationOptions.map((option) => {
                const isSelected = selectedServices.includes(option.id);
                return (
                  <button
                    key={option.id}
                    onClick={() => toggleServiceEstimate(option.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-500/10 text-white'
                        : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-semibold text-sm md:text-base">{option.label}</span>
                    <span className="text-xs md:text-sm font-bold text-indigo-400">+${option.price.toLocaleString()}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Price Display */}
          <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-sm text-slate-400">Estimated Investment</p>
              <p className="text-4xl font-black text-white mt-1">
                ${estimatedTotal.toLocaleString()}{' '}
                <span className="text-xs font-normal text-slate-500">USD (approx.)</span>
              </p>
            </div>
            <a
              href="#contact"
              className="w-full md:w-auto rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 font-bold text-white text-center hover:opacity-90 shadow-xl shadow-indigo-500/25"
            >
              Lock In This Estimate
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ACCORDION ---------------- */}
      <section id="faq" className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={faq.q}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left text-white font-bold text-base md:text-lg"
              >
                <span>{faq.q}</span>
                <span className="text-indigo-400 text-xl">{openFaq === idx ? '−' : '+'}</span>
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed border-t border-slate-800/50 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- CTA / CONTACT ---------------- */}
      <section id="contact" className="py-32 relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/60 via-slate-900 to-slate-950 p-10 md:p-16 text-center overflow-hidden shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Ready to start your project?
            </h2>
            <p className="mt-4 text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
              Tell us what you need and we will get back to you within 24 hours.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
              <a
                href="mailto:hello@dsa.com"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 font-bold text-slate-950 hover:bg-slate-200 transition-all shadow-xl hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hello@dsa.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="border-t border-slate-800/80 py-12 text-center text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Digital Solutions Agency. All rights reserved.</p>
          <div className="flex gap-6 text-slate-400">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#why-us" className="hover:text-white transition-colors">Why Us</a>
            <a href="#estimator" className="hover:text-white transition-colors">Estimator</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}