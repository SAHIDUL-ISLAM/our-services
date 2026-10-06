'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import services from '@/data/services.json';

// Fallback content details for rich service pages
const serviceDetails = {
  process: [
    { step: '01', title: 'Discovery & Audit', description: 'We analyze your current setup, goals, and target audience to formulate a tailored strategy.' },
    { step: '02', title: 'Architecture & Design', description: 'We blueprint the technical architecture and craft pixel-perfect user interface prototypes.' },
    { step: '03', title: 'Development & Build', description: 'Engineered using modern tech stacks with emphasis on speed, security, and scalability.' },
    { step: '04', title: 'Testing & Launch', description: 'Rigorous QA testing, security audits, and deployment with zero downtime.' },
  ],
  deliverables: [
    'Customized Strategic Roadmap',
    'Production-Ready Source Code / Assets',
    'Comprehensive Documentation',
    'Post-Launch Support & Monitoring',
  ],
  faqs: [
    { q: 'How long does this service usually take?', a: 'Typical delivery ranges from 2 to 6 weeks depending on project scope and custom requirements.' },
    { q: 'Can this service be customized for our specific industry?', a: 'Yes, every project is built from scratch or tailored specifically to match your industry compliance and workflow standards.' },
  ]
};

export default function ServiceDetailPage({ params }) {
  // Safe param unwrapping across Next.js versions
  const resolvedParams = params && typeof params.then === 'function' ? use(params) : params;
  const id = resolvedParams?.id;

  // Find service by matching id OR slugified title
  const service = services.find((s) => {
    if (!s) return false;
    const serviceId = s.id || s.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return serviceId === id;
  });

  // Fallback UI if no service matches
  if (!service) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-bold text-red-500">Service Not Found</h1>
        <p className="mt-4 text-slate-400">No service found matching the URL ID: <code className="text-indigo-400 font-mono">{id}</code></p>
        <Link href="/" className="mt-8 px-6 py-3 bg-indigo-600 rounded-full font-bold text-white hover:bg-indigo-500 transition-all">
          Return Home
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 font-sans text-slate-100 overflow-x-hidden">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex flex-col sm:flex-row items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">

            <span className="text-xl font-black tracking-tight text-white">
              Digital Solutions Agency
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              ← Back to All Services
            </Link>
            <a
              href="#contact"
              className="px-5 py-2 text-xs font-semibold text-white rounded-full bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/30"
            >
              Get Started
            </a>
          </div>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-20 md:pt-28 md:pb-28 border-b border-slate-800/80">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1 text-xs font-semibold text-indigo-300 mb-6">
              {service.category || 'Core Service'}
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
              {service.title}
            </h1>

            <p className="mt-6 text-lg text-slate-400 leading-relaxed">
              {service.description ||
                `Elevate your brand with our tailored ${service.title.toLowerCase()} solutions. Designed for high performance, enterprise scalability, and maximum business impact.`}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-500/20 hover:opacity-90 transition-all"
              >
                Request a Proposal
              </a>
              <a
                href="#process"
                className="rounded-full border border-slate-700 bg-slate-900/60 px-8 py-3.5 text-sm font-bold text-slate-300 hover:border-slate-500 hover:text-white transition-all"
              >
                Our Process
              </a>
            </div>
          </div>

          <div className="relative h-[320px] md:h-[420px] w-full rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
            {service.image ? (
              <Image
                src={service.image}
                alt={service.alt || service.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">No Image Available</div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-3xl font-black text-white tracking-tight">What's Included</h2>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
              Every engagement is structured to deliver clear, measurable outcomes and production-ready deliverables.
            </p>
          </div>

          <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
            {(service.deliverables || serviceDetails.deliverables).map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0 text-indigo-400 font-bold text-sm">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{item}</h3>
                  <p className="mt-1 text-xs text-slate-400">Maintained and delivered to enterprise standards.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 border-y border-slate-800/80 bg-slate-900/30 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white">How We Work</h2>
            <p className="mt-3 text-slate-400">A transparent, step-by-step workflow engineered for success.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(service.process || serviceDetails.process).map((p) => (
              <div
                key={p.step}
                className="p-8 rounded-3xl border border-slate-800 bg-slate-900/80 hover:border-slate-700 transition-all relative overflow-hidden"
              >
                <span className="text-4xl font-black text-indigo-500/30 absolute top-4 right-6">
                  {p.step}
                </span>
                <h3 className="text-lg font-bold text-white mt-4">{p.title}</h3>
                <p className="mt-3 text-xs text-slate-400 leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-black text-white text-center mb-12">Service FAQ</h2>
        <div className="space-y-4">
          {(service.faqs || serviceDetails.faqs).map((faq, i) => (
            <div key={i} className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50">
              <h3 className="text-base font-bold text-white">{faq.q}</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="pb-32 max-w-5xl mx-auto px-6">
        <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/60 via-slate-900 to-slate-950 p-10 md:p-14 text-center">
          <h2 className="text-3xl font-black text-white">Ready for {service.title}?</h2>
          <p className="mt-3 text-slate-300 text-sm max-w-xl mx-auto">
            Get in touch with our engineering team today for a free scoping call and project estimate.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="mailto:hello@dsa.com"
              className="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-slate-950 hover:bg-slate-200 transition-all"
            >
              Contact Us About {service.title}
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 py-12 text-center text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Digital Solutions Agency. All rights reserved.</p>
          <Link href="/" className="text-indigo-400 hover:underline">
            Back to Home
          </Link>
        </div>
      </footer>
    </main>
  );
}