'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import ContactForm from '@/components/ContactForm';
import HeroBackground from '@/components/landing/three/HeroBackground';

const modules = [
  {
    title: 'Sales & CRM',
    description: 'Customer management, quotes, orders and invoicing.',
  },
  {
    title: 'Purchasing & suppliers',
    description: 'Purchase orders, goods receipt and supplier control.',
  },
  {
    title: 'Warehouse & inventory',
    description: 'Real-time stock, locations, batches and traceability.',
  },
  {
    title: 'Production',
    description: 'Planning, manufacturing orders and cost control.',
  },
  {
    title: 'HR',
    description: 'Time tracking, holidays, payroll and performance reviews.',
  },
  {
    title: 'Finance & accounting',
    description: 'Treasury, budgets, analytics and financial close.',
  },
];

const process = [
  {
    step: '01',
    title: 'Analysis',
    description: 'We map your processes and identify what the ERP must cover.',
  },
  {
    step: '02',
    title: 'Proposal',
    description: 'Scope, modules, integrations, timelines and fixed pricing.',
  },
  {
    step: '03',
    title: 'Development',
    description: 'Sprints with working demos every few weeks.',
  },
  {
    step: '04',
    title: 'Deployment',
    description: 'Data migration, training and go-live.',
  },
  {
    step: '05',
    title: 'Evolution',
    description: 'Maintenance, improvements and new modules on demand.',
  },
];

const faq = [
  {
    question: 'How much does a custom ERP cost?',
    answer:
      'It depends on the number of modules and integrations. Typical projects range from €15,000 for a basic 3-4 module ERP to €60,000+ for complex systems with production and multi-warehouse. After the first session we provide a fixed quote.',
  },
  {
    question: 'How long does it take to be ready?',
    answer:
      'A functional MVP is usually ready in 3-4 months. A complete ERP with all modules can take 6-12 months, but we deliver value from the first month with working modules.',
  },
  {
    question: 'Do you migrate data from our current system?',
    answer:
      'Yes. We migrate data from Excel, Access, legacy ERPs (Sage, SAP Business One, Navision, Odoo...) or any database. We clean, transform and validate the information before migration.',
  },
  {
    question: 'Does it integrate with other tools?',
    answer:
      'Yes. We integrate with ecommerce, POS, banks, transport agencies, e-invoicing, CRMs and any external API you use.',
  },
  {
    question: 'Who maintains the system afterwards?',
    answer:
      'We offer ongoing maintenance: technical support, backups, security updates and new features on demand.',
  },
  {
    question: 'Is a custom ERP better than a standard one like SAP or Odoo?',
    answer:
      'If your processes are standard and you don’t need customisation, a SaaS ERP may be cheaper. But if you have unique processes, need complex integrations or want to scale without licence dependency, a custom ERP is usually more cost-effective in the medium term.',
  },
];

export default function CustomErpContent() {
  return (
    <main
      className="min-h-screen w-full pt-28 pb-16 px-4"
      style={{
        background:
          'conic-gradient(from 90deg at calc(50% - 95px) calc(50% + 30px), #1e3a8a, #581c87)',
        backgroundImage: `url("/bg.svg"), conic-gradient(from 90deg at calc(50% - 95px) calc(50% + 30px), #1e3a8a, #581c87)`,
        backgroundBlendMode: 'overlay',
        backgroundSize: 'auto',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <HeroBackground />

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="max-w-4xl mx-auto relative z-10"
      >
        {/* Hero */}
        <motion.header variants={fadeInUp} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Custom ERP Development
          </h1>
          <p className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto mb-6">
            Business management software designed specifically for your processes.
            Sales, purchasing, inventory, production, HR and finance integrated in one system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#quote"
              className="inline-block px-8 py-3.5 text-lg font-bold text-white rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-900/30 transition-all hover:scale-105"
            >
              Request a quote
            </Link>
            <Link
              href="/contact"
              className="inline-block px-8 py-3.5 text-lg font-bold text-white rounded-full border border-white/20 hover:bg-white/10 transition-colors"
            >
              Talk to us
            </Link>
          </div>
        </motion.header>

        {/* Problem */}
        <motion.section variants={fadeInUp} className="mb-16">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">
              Does your current ERP not fit your business?
            </h2>
            <p className="text-blue-200 leading-relaxed mb-4">
              Off-the-shelf ERPs force you to adapt your processes to the software. With a custom
              ERP, the software adapts to the way you work: no unused modules, no runaway per-user
              licensing and no waiting months for a vendor to change a screen.
            </p>
            <p className="text-blue-200 leading-relaxed">
              Especially suited for <strong className="text-white">industrial SMEs,
              distributors and service companies</strong> that have outgrown what Excel or a
              basic ERP can manage.
            </p>
          </div>
        </motion.section>

        {/* Modules */}
        <motion.section variants={fadeInUp} className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Typical modules
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((mod) => (
              <div
                key={mod.title}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-colors"
              >
                <h3 className="text-lg font-bold text-white mb-2">{mod.title}</h3>
                <p className="text-blue-200 text-sm leading-relaxed">{mod.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Process */}
        <motion.section variants={fadeInUp} className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            How we work
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            {process.map((item) => (
              <div
                key={item.step}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-5 border border-white/10"
              >
                <span className="font-mono text-sm text-violet-400 font-bold">
                  {item.step}
                </span>
                <h3 className="text-base font-bold text-white mt-2 mb-2">
                  {item.title}
                </h3>
                <p className="text-blue-200 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Pricing */}
        <motion.section variants={fadeInUp} className="mb-16">
          <div className="bg-gradient-to-r from-violet-600/20 to-indigo-600/20 backdrop-blur-lg rounded-2xl p-8 border border-violet-500/30 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Indicative investment
            </h2>
            <p className="text-blue-200 mb-4 max-w-2xl mx-auto">
              A custom ERP is an investment, not an expense. You recover the cost in efficiency
              and better-informed decisions.
            </p>
            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="bg-white/10 rounded-xl p-5">
                <p className="text-violet-300 text-sm font-semibold mb-1">Basic ERP</p>
                <p className="text-2xl font-bold text-white">from €15,000</p>
                <p className="text-blue-200 text-sm mt-2">3-4 modules, small SME</p>
              </div>
              <div className="bg-white/10 rounded-xl p-5 border-2 border-violet-500/50">
                <p className="text-violet-300 text-sm font-semibold mb-1">Standard ERP</p>
                <p className="text-2xl font-bold text-white">from €30,000</p>
                <p className="text-blue-200 text-sm mt-2">5-6 modules, growing company</p>
              </div>
              <div className="bg-white/10 rounded-xl p-5">
                <p className="text-violet-300 text-sm font-semibold mb-1">Complex ERP</p>
                <p className="text-2xl font-bold text-white">from €60,000</p>
                <p className="text-blue-200 text-sm mt-2">multi-warehouse, production, integrations</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section variants={fadeInUp} className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Frequently asked questions about custom ERP
          </h2>
          <div className="space-y-4">
            {faq.map((item, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
              >
                <h3 className="text-lg font-bold text-white mb-2">
                  {item.question}
                </h3>
                <p className="text-blue-200 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA + Form */}
        <motion.section variants={fadeInUp} id="quote" className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Let&apos;s talk about your ERP
            </h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              Tell us what you need and we will prepare a no-obligation proposal.
            </p>
          </div>
          <ContactForm locale="en" />
        </motion.section>
      </motion.div>
    </main>
  );
}
