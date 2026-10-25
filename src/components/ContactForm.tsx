'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { GA_EVENTS, trackEvent, trackGoogleAdsConversion, trackLead } from '@/lib/analytics';

type ContactFormProps = {
  locale?: 'es' | 'en';
  variant?: 'default' | 'diagnostic';
  location?: string;
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
    messagePlaceholder: 'Describe brevemente tu proyecto, necesidades o plazo…',
    namePlaceholder: 'María García',
    emailPlaceholder: 'maria@empresa.com',
    companyPlaceholder: 'Tu empresa S.L.',
    submit: 'Enviar mensaje',
    sending: 'Enviando…',
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
    messagePlaceholder: 'Briefly describe your project, needs or timeline…',
    namePlaceholder: 'Jane Doe',
    emailPlaceholder: 'jane@company.com',
    companyPlaceholder: 'Your company Ltd.',
    submit: 'Send message',
    sending: 'Sending…',
    success: 'Message sent! We will contact you soon.',
    error: 'Something went wrong. Please try again or reach us on WhatsApp.',
    required: 'Required field',
    invalidEmail: 'Please enter a valid email',
    nameTooShort: 'Name must be at least 2 characters',
    messageTooShort: 'Message must be at least 10 characters',
    chars: 'characters',
  },
};

const diagnosticCopy = {
  es: {
    title: 'Solicita tu diagnóstico gratuito de 30 minutos',
    subtitle: 'Analizaremos el proceso que quieres mejorar y te responderemos en menos de 24 horas.',
    message: '¿Qué proceso te gustaría mejorar?',
    messagePlaceholder: 'Describe brevemente el proceso, las tareas que más tiempo consumen o el problema que quieres resolver…',
    submit: 'Solicitar diagnóstico gratuito',
    success: '¡Solicitud enviada! Te responderemos en menos de 24 horas para coordinar tu diagnóstico gratuito.',
  },
  en: {
    title: 'Request your free 30-minute assessment',
    subtitle: 'We will review the process you want to improve and get back to you within 24 hours.',
    message: 'Which process would you like to improve?',
    messagePlaceholder: 'Briefly describe the process, the most time-consuming tasks or the problem you want to solve…',
    submit: 'Request free assessment',
    success: 'Request sent! We will get back to you within 24 hours to arrange your free assessment.',
  },
};

export default function ContactForm({
  locale = 'es',
  variant = 'default',
  location = 'contact_form',
}: ContactFormProps) {
  const t = variant === 'diagnostic'
    ? { ...copy[locale], ...diagnosticCopy[locale] }
    : copy[locale];
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [messageLength, setMessageLength] = useState(0);
  const formId = useId();
  const titleId = `${formId}-title`;
  const subtitleId = `${formId}-subtitle`;
  const nameId = `${formId}-name`;
  const emailId = `${formId}-email`;
  const phoneId = `${formId}-phone`;
  const companyId = `${formId}-company`;
  const messageId = `${formId}-message`;
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const hasTrackedFormStart = useRef(false);

  useEffect(() => {
    if (errors.name) nameInputRef.current?.focus();
    else if (errors.email) emailInputRef.current?.focus();
    else if (errors.message) messageInputRef.current?.focus();
  }, [errors]);

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (hasTrackedFormStart.current || !event.nativeEvent.isTrusted) return;

    hasTrackedFormStart.current = true;
    trackEvent(GA_EVENTS.FORM_START, {
      event_category: 'lead',
      event_label: location,
      offer: variant,
    });
  };

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

    const form = e.currentTarget;
    const formData = new FormData(form);
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('idle');
      return;
    }

    setErrors({});
    setStatus('submitting');

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
        trackLead(location, { offer: variant });
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
      <div
        className="rounded-2xl border border-green-500/20 bg-green-500/10 p-8 text-center"
        role="status"
        aria-atomic="true"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
          <svg className="h-8 w-8 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="mb-2 text-xl font-bold text-brand-heading">{t.success}</h2>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="brand-card rounded-2xl border border-white/10 p-6 shadow-[0_24px_70px_-35px_rgba(37,99,235,0.45)] md:p-8"
      aria-labelledby={titleId}
      aria-describedby={subtitleId}
      noValidate
    >
      <div className="grid md:grid-cols-2 gap-5">
        {/* Honeypot */}
        <div className="hidden" aria-hidden="true">
          <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="md:col-span-2">
          <h2 id={titleId} className="mb-2 text-2xl font-bold text-brand-heading md:text-3xl">{t.title}</h2>
          <p id={subtitleId} className="mb-6 text-brand-body">{t.subtitle}</p>
        </div>

        <div>
          <label htmlFor={nameId} className="mb-1.5 block text-sm font-medium text-brand-heading">
            {t.name} <span className="text-red-300" aria-hidden="true">*</span>
          </label>
          <input
            ref={nameInputRef}
            id={nameId}
            name="name"
            type="text"
            required
            minLength={2}
            autoComplete="name"
            onChange={handleFieldChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${nameId}-error` : undefined}
            className="w-full rounded-xl border border-white/15 bg-brand-canvas/60 px-4 py-3 text-brand-heading placeholder:text-brand-body/70 transition-[border-color,box-shadow] duration-200 focus:outline-none focus-visible:border-brand-blue focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface"
            placeholder={t.namePlaceholder}
          />
          {errors.name && (
            <p id={`${nameId}-error`} role="alert" className="mt-1.5 text-sm text-red-300">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={emailId} className="mb-1.5 block text-sm font-medium text-brand-heading">
            {t.email} <span className="text-red-300" aria-hidden="true">*</span>
          </label>
          <input
            ref={emailInputRef}
            id={emailId}
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            spellCheck={false}
            onChange={handleFieldChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${emailId}-error` : undefined}
            className="w-full rounded-xl border border-white/15 bg-brand-canvas/60 px-4 py-3 text-brand-heading placeholder:text-brand-body/70 transition-[border-color,box-shadow] duration-200 focus:outline-none focus-visible:border-brand-blue focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface"
            placeholder={t.emailPlaceholder}
          />
          {errors.email && (
            <p id={`${emailId}-error`} role="alert" className="mt-1.5 text-sm text-red-300">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={phoneId} className="mb-1.5 block text-sm font-medium text-brand-heading">
            {t.phone}
          </label>
          <input
            id={phoneId}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            onChange={handleFieldChange}
            className="w-full rounded-xl border border-white/15 bg-brand-canvas/60 px-4 py-3 text-brand-heading placeholder:text-brand-body/70 transition-[border-color,box-shadow] duration-200 focus:outline-none focus-visible:border-brand-blue focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface"
            placeholder="+34 600 000 000"
          />
        </div>

        <div>
          <label htmlFor={companyId} className="mb-1.5 block text-sm font-medium text-brand-heading">
            {t.company}
          </label>
          <input
            id={companyId}
            name="company"
            type="text"
            autoComplete="organization"
            onChange={handleFieldChange}
            className="w-full rounded-xl border border-white/15 bg-brand-canvas/60 px-4 py-3 text-brand-heading placeholder:text-brand-body/70 transition-[border-color,box-shadow] duration-200 focus:outline-none focus-visible:border-brand-blue focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface"
            placeholder={t.companyPlaceholder}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor={messageId} className="mb-1.5 block text-sm font-medium text-brand-heading">
            {t.message} <span className="text-red-300" aria-hidden="true">*</span>
          </label>
          <textarea
            ref={messageInputRef}
            id={messageId}
            name="message"
            rows={4}
            required
            minLength={10}
            onChange={(e) => {
              handleFieldChange(e);
              setMessageLength(e.target.value.length);
            }}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${messageId}-error` : undefined}
            className="w-full resize-none rounded-xl border border-white/15 bg-brand-canvas/60 px-4 py-3 text-brand-heading placeholder:text-brand-body/70 transition-[border-color,box-shadow] duration-200 focus:outline-none focus-visible:border-brand-blue focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface"
            placeholder={t.messagePlaceholder}
          />
          <div className="mt-1.5 flex items-center justify-between">
            {errors.message ? (
              <p id={`${messageId}-error`} role="alert" className="text-sm text-red-300">
                {errors.message}
              </p>
            ) : (
              <span />
            )}
            <p className={`text-xs ${messageLength < 10 ? 'text-brand-body/80' : 'text-green-300'}`}>
              {messageLength} {t.chars}
            </p>
          </div>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={status === 'submitting'}
            aria-busy={status === 'submitting'}
            className="brand-button-primary w-full rounded-xl px-8 py-3.5 text-base font-semibold text-white transition-shadow duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
          >
            <span className="inline-flex items-center justify-center gap-2">
              {status === 'submitting' && (
                <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
              )}
              <span>{status === 'submitting' ? t.sending : t.submit}</span>
            </span>
          </button>
          <span className="sr-only" role="status">
            {status === 'submitting' ? t.sending : ''}
          </span>
        </div>

        {status === 'error' && (
          <div className="md:col-span-2">
            <p role="alert" className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
              {t.error}
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
