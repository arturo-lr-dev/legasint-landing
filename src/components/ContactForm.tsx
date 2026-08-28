'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { trackLead, trackGoogleAdsConversion } from '@/lib/analytics';

type ContactFormProps = {
  locale?: 'es' | 'en';
};

const copy = {
  es: {
    title: 'Cuéntanos tu proyecto',
    subtitle: 'Rellena el formulario y te respondemos en menos de 24 horas.',
    name: 'Nombre',
    email: 'Email',
    phone: 'Teléfono (opcional)',
    company: 'Empresa (opcional)',
    message: '¿En qué podemos ayudarte?',
    messagePlaceholder: 'Describe brevemente tu proyecto, necesidades o plazo...',
    submit: 'Enviar mensaje',
    sending: 'Enviando...',
    success: '¡Mensaje enviado! Te contactamos pronto.',
    error: 'Hubo un error. Inténtalo de nuevo o escríbenos por WhatsApp.',
    required: 'Campo obligatorio',
    invalidEmail: 'Introduce un email válido',
    nameTooShort: 'El nombre debe tener al menos 2 caracteres',
    messageTooShort: 'El mensaje debe tener al menos 10 caracteres',
    chars: 'caracteres',
  },
  en: {
    title: 'Tell us about your project',
    subtitle: 'Fill in the form and we will get back to you within 24 hours.',
    name: 'Name',
    email: 'Email',
    phone: 'Phone (optional)',
    company: 'Company (optional)',
    message: 'How can we help?',
    messagePlaceholder: 'Briefly describe your project, needs or timeline...',
    submit: 'Send message',
    sending: 'Sending...',
    success: 'Message sent! We will contact you soon.',
    error: 'Something went wrong. Please try again or reach us on WhatsApp.',
    required: 'Required field',
    invalidEmail: 'Please enter a valid email',
    nameTooShort: 'Name must be at least 2 characters',
    messageTooShort: 'Message must be at least 10 characters',
    chars: 'characters',
  },
};

export default function ContactForm({ locale = 'es' }: ContactFormProps) {
  const t = copy[locale];
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [messageLength, setMessageLength] = useState(0);

  const validate = (formData: FormData) => {
    const nextErrors: Record<string, string> = {};
    const name = (formData.get('name') as string) || '';
    const email = (formData.get('email') as string) || '';
    const message = (formData.get('message') as string) || '';

    if (name.trim().length === 0) nextErrors.name = t.required;
    else if (name.trim().length < 2) nextErrors.name = t.nameTooShort;

    if (email.trim().length === 0) nextErrors.email = t.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = t.invalidEmail;

    if (message.trim().length === 0) nextErrors.message = t.required;
    else if (message.trim().length < 10) nextErrors.message = t.messageTooShort;

    return nextErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('idle');
      return;
    }

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
      if (!accessKey) {
        throw new Error('Web3Forms key is not configured');
      }

      const body = new FormData();
      body.append('access_key', accessKey);
      body.append('subject', `Nuevo lead desde legasint.com (${locale.toUpperCase()})`);
      body.append('from_name', String(formData.get('name') || ''));
      body.append('name', String(formData.get('name') || ''));
      body.append('email', String(formData.get('email') || ''));
      body.append('phone', String(formData.get('phone') || ''));
      body.append('company', String(formData.get('company') || ''));
      body.append('message', String(formData.get('message') || ''));
      body.append('botcheck', String(formData.get('botcheck') || ''));

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body,
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        trackLead('contact_form');
        trackGoogleAdsConversion(undefined, { value: 1.0, currency: 'EUR' });
        form.reset();
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{t.success}</h3>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20"
      noValidate
    >
      <div className="grid md:grid-cols-2 gap-5">
        {/* Honeypot */}
        <div className="hidden" aria-hidden="true">
          <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="md:col-span-2">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{t.title}</h3>
          <p className="text-blue-200 mb-6">{t.subtitle}</p>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-blue-100 mb-1.5">
            {t.name} <span className="text-red-300" aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            placeholder="John Doe"
          />
          {errors.name && <p className="mt-1.5 text-sm text-red-300">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-blue-100 mb-1.5">
            {t.email} <span className="text-red-300" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            placeholder="john@empresa.com"
          />
          {errors.email && <p className="mt-1.5 text-sm text-red-300">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-blue-100 mb-1.5">
            {t.phone}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            placeholder="+34 600 000 000"
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-blue-100 mb-1.5">
            {t.company}
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            placeholder="Empresa S.L."
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium text-blue-100 mb-1.5">
            {t.message} <span className="text-red-300" aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            minLength={10}
            onChange={(e) => setMessageLength(e.target.value.length)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
            placeholder={t.messagePlaceholder}
          />
          <div className="flex items-center justify-between mt-1.5">
            {errors.message ? (
              <p className="text-sm text-red-300">{errors.message}</p>
            ) : (
              <span />
            )}
            <p className={`text-xs ${messageLength < 10 ? 'text-blue-300/70' : 'text-green-300/80'}`}>
              {messageLength} {t.chars}
            </p>
          </div>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="group relative w-full md:w-auto px-8 py-3.5 text-lg font-bold text-white rounded-full overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_35px_rgba(139,92,246,0.7)] hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 bg-gradient-to-r from-violet-600 to-indigo-600"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" aria-hidden="true" />
            <span className="relative">{status === 'submitting' ? t.sending : t.submit}</span>
          </button>
        </div>

        {status === 'error' && (
          <div className="md:col-span-2">
            <p className="text-red-300 text-sm bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              {t.error}
            </p>
          </div>
        )}
      </div>
    </motion.form>
  );
}
