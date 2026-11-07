'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'framer-motion';
import { getGpuTier, type GpuTier } from '@/lib/device';
import type { HomeCopy, Locale } from '@/i18n/home-copy';

const MachineScene = dynamic(() => import('./HeroMachineScene'), { ssr: false, loading: () => null });

type HeroProcessVisualProps = {
  visual: HomeCopy['hero']['visual'];
  locale: Locale;
  initialProcess?: number;
};

const processCopy = {
  es: {
    selector: 'Elige un proceso',
    sequence: 'Pasos de la transformación',
    replay: 'Repetir transformación',
    project: 'Ver proyecto real',
    processing: 'Organizando…',
    steps: [
      { short: 'Entrada', label: 'Trabajo disperso' },
      { short: 'Conexión', label: 'Conectamos las fuentes' },
      { short: 'Orden', label: 'Organizamos el proceso' },
      { short: 'Resultado', label: 'Sistema en marcha' },
    ],
    processes: [
      { label: 'Pedidos', sources: ['Excel', 'Correo', 'WhatsApp'], results: ['Pedido confirmado', 'Stock reservado', 'Albarán preparado'] },
      { label: 'Expedientes', sources: ['Documentos', 'Correo', 'Carpetas'], results: ['Documentación reunida', 'Estado actualizado', 'Informe preparado'] },
      { label: 'Integraciones', sources: ['ERP', 'Ecommerce', 'CRM'], results: ['Datos sincronizados', 'Tarea automatizada', 'Revisión humana'] },
    ],
  },
  en: {
    selector: 'Choose a process',
    sequence: 'Transformation steps',
    replay: 'Replay transformation',
    project: 'See real project',
    processing: 'Organising…',
    steps: [
      { short: 'Input', label: 'Scattered work' },
      { short: 'Connect', label: 'Sources connected' },
      { short: 'Organise', label: 'Process organised' },
      { short: 'Result', label: 'System in motion' },
    ],
    processes: [
      { label: 'Orders', sources: ['Spreadsheet', 'Email', 'WhatsApp'], results: ['Order confirmed', 'Stock reserved', 'Delivery note ready'] },
      { label: 'Case files', sources: ['Documents', 'Email', 'Folders'], results: ['Documents collected', 'Status updated', 'Report prepared'] },
      { label: 'Integrations', sources: ['ERP', 'Ecommerce', 'CRM'], results: ['Data synchronised', 'Task automated', 'Human review'] },
    ],
  },
};

export default function HeroProcessVisual({ visual, locale, initialProcess = 0 }: HeroProcessVisualProps) {
  const [activeProcess, setActiveProcess] = useState(initialProcess);
  const [step, setStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [gpuTier, setGpuTier] = useState<GpuTier>('off');
  const [sceneReady, setSceneReady] = useState(false);
  const figureRef = useRef<HTMLElement>(null);
  const inView = useInView(figureRef, { margin: '160px' });
  const copy = processCopy[locale];
  const current = copy.processes[activeProcess];

  useEffect(() => {
    const tier = getGpuTier();
    setGpuTier(tier);
    if (tier === 'off') {
      setStep(3);
      setAutoPlay(false);
    }
  }, []);

  useEffect(() => {
    if (!autoPlay || gpuTier === 'off' || !inView || step >= 3) return;
    const timer = setTimeout(() => setStep((value) => Math.min(3, value + 1)), step === 0 ? 1500 : 1700);
    return () => clearTimeout(timer);
  }, [autoPlay, gpuTier, inView, step]);

  return (
    <figure ref={figureRef} className="dispatch-machine" aria-label={visual.caption}>
      <div className="dispatch-machine__viewport" aria-hidden="true">
        {!sceneReady && (
          <div className={`dispatch-machine-fallback dispatch-machine-fallback--step-${step}`}>
            <div className="dispatch-machine-fallback__inputs">
              {current.sources.map((source) => <span key={source}>{source}</span>)}
            </div>
            <div className="dispatch-machine-fallback__core">Legasint</div>
            <div className="dispatch-machine-fallback__outputs">
              {current.results.map((result) => <span key={result}>{result}</span>)}
            </div>
          </div>
        )}
        {gpuTier !== 'off' && (
          <MachineScene processIndex={activeProcess} step={step} active={inView} onReady={() => setSceneReady(true)} />
        )}
      </div>
      <div className="dispatch-machine__shade" aria-hidden="true" />

      {sceneReady && gpuTier !== 'off' && (
        <div className="dispatch-machine__annotations" aria-hidden="true">
          <div className={`dispatch-machine__input-labels ${step === 3 ? 'is-hidden' : ''}`}>
            {current.sources.map((source) => <span key={source}>{source}</span>)}
          </div>
          <div className={`dispatch-machine__output-label ${step >= 2 ? 'is-visible' : ''}`}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m5 12 4 4L19 6" />
            </svg>
            {step === 2 ? copy.processing : current.results[0]}
          </div>
        </div>
      )}

      <div className="dispatch-machine__controls">
        <div className="dispatch-machine__tabs" role="group" aria-label={copy.selector}>
          {copy.processes.map((process, index) => (
            <button
              key={process.label}
              type="button"
              aria-pressed={activeProcess === index}
              onClick={() => {
                setActiveProcess(index);
                setStep(gpuTier === 'off' ? 3 : 0);
                setAutoPlay(gpuTier !== 'off');
              }}
            >
              {process.label}
            </button>
          ))}
        </div>

        <ol className="dispatch-machine__steps" aria-label={copy.sequence}>
          {copy.steps.map((item, index) => (
            <li key={item.short}>
              <button
                type="button"
                aria-current={step === index ? 'step' : undefined}
                onClick={() => {
                  setStep(index);
                  setAutoPlay(false);
                }}
              >
                <span>{`0${index + 1}`}</span>
                {item.short}
              </button>
            </li>
          ))}
        </ol>
        <div className="dispatch-machine__progress" aria-hidden="true">
          <span style={{ width: `${(step / 3) * 100}%` }} />
        </div>
        <div className="dispatch-machine__footer">
          <p>{copy.steps[step].label}</p>
          {gpuTier !== 'off' && (
            <button
              type="button"
              className="dispatch-machine__replay"
              onClick={() => {
                setStep(0);
                setAutoPlay(true);
              }}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 11a8 8 0 1 0-2.34 5.66M20 4v7h-7" />
              </svg>
              {copy.replay}
            </button>
          )}
        </div>
      </div>
      <span className="sr-only" role="status">
        {copy.steps[step].label}. {current.label}: {current.sources.join(', ')} → {current.results.join(', ')}
      </span>
      <figcaption className="sr-only">{visual.caption}</figcaption>
    </figure>
  );
}
