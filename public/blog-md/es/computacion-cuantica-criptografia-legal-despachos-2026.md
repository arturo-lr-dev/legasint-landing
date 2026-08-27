---
title: "Computación cuántica y criptografía legal: preparando los despachos para la era post-cuántica"
date: "2026-08-16"
language: "es"
canonical: "https://legasint.com/blog/computacion-cuantica-criptografia-legal-despachos-2026"
tags: ["computación cuántica", "criptografía post-cuántica", "ciberseguridad", "NIS2", "protección datos", "despachos"]
---

# Computación cuántica y criptografía legal: preparando los despachos para la era post-cuántica

La computación cuántica amenaza los sistemas criptográficos actuales. Guía para despachos de abogados sobre migración post-cuántica, regulación y protección de datos confidenciales.

## Introducción

La **computación cuántica** ha dejado de ser ciencia ficción para convertirse en una realidad tecnológica que redefine la seguridad digital. En 2026, empresas como IBM, Google y startups especializadas han demostrado capacidades que, aunque aún limitadas, apuntan hacia un horizonte donde la criptografía actual —RSA, ECC, curvas elípticas— será vulnerable.

Para los **despachos de abogados**, esto no es una amenaza lejana. Es una realidad que exige **acción inmediata**: los contratos, comunicaciones privilegiadas, datos de clientes y documentación estratégica que hoy se consideran seguros podrían ser descifrados en el futuro por computadoras cuánticas. Este artículo analiza el marco regulatorio, los riesgos específicos del sector legal y un plan de migración criptográfica post-cuántica.

---

## 1. El problema: "Harvest now, decrypt later"

### La amenaza cuántica real

Los algoritmos de cifrado asimétrico (RSA-2048, ECC-256) que protegen el 99% de las comunicaciones digitales se basan en problemas matemáticos que las computadoras clásicas no pueden resolver en tiempo razonable. Sin embargo, el **algoritmo de Shor** —ejecutable en un ordenador cuántico suficientemente potente— factoriza números enteros y resuelve logaritmos discretos en tiempo polinomial, rompiendo estos esquemas.

### El ataque del presente al futuro

El vector de ataque más peligroso no es el descifrado inmediato, sino el **"harvest now, decrypt later"** (recolectar ahora, descifrar después):

1. **Hoy**: Un actor malicioso almacena tráfico cifrado de forma masiva
2. **Mañana**: Cuando disponga de un ordenador cuántico, descifra todo retroactivamente
3. **Impacto**: Contratos, estrategias M&A, litigios, datos de clientes expuestos años después

> **Dato clave**: La NSA estima que la criptografía actual podría vulnerarse entre 2030-2035. La Agencia de Ciberseguridad de la UE (ENISA) recomienda iniciar la migración post-cuántica ya en 2026.

---

## 2. Impacto específico en el sector legal

### Documentos con valor temporal prolongado

| Tipo de documento | Período de sensibilidad | Riesgo cuántico |
|-------------------|------------------------|----------------|
| Contratos de M&A | 10-30 años | 🔴 Crítico |
| Patentes y secretos industriales | 20 años | 🔴 Crítico |
| Comunicaciones privilegiadas | Ilimitado (secreto profesional) | 🔴 Crítico |
| Datos de clientes (GDPR) | Durante relación + plazo legal | 🟡 Alto |
| Documentación fiscal | 4-10 años | 🟡 Alto |
| Correspondencia ordinaria | 1-3 años | 🟢 Medio |

### Obligaciones regulatorias afectadas

- **GDPR (Art. 32)**: Medidas técnicas apropiadas para garantizar seguridad del tratamiento
- **NIS2**: Seguridad de redes y sistemas de información — obligaciones de ciberseguridad
- **eIDAS 2.0**: Validez de firmas electrónicas cualificadas
- **Directiva de secretos empresariales**: Protección contra acceso no autorizado
- **Código deontológico de la Abogacía**: Deber de custodia y secreto profesional

---

## 3. Estándares post-cuánticos: el estado en 2026

### NIST: algoritmos aprobados

En agosto de 2024, el NIST publicó los primeros estándares post-cuánticos. En 2026, su adopción está en marcha:

| Estándar | Algoritmo | Uso | Estado |
|----------|-----------|-----|--------|
| **FIPS 203** | ML-KEM (Kyber) | Intercambio de claves | ✅ Aprobado |
| **FIPS 204** | ML-DSA (Dilithium) | Firmas digitales | ✅ Aprobado |
| **FIPS 205** | SLH-DSA (SPHINCS+) | Firmas digitales (backup) | ✅ Aprobado |

### Estrategias de migración híbrida

La transición no es un "big bang". La estrategia recomendada es **híbrida**:

```
Cifrado híbrido = Cifrado clásico (RSA/ECC) + Cifrado post-cuántico (ML-KEM)
```

Esto garantiza que:
- Hoy: La seguridad no empeora (sigue protegido por RSA)
- Mañana: Cuando RSA caiga, ML-KEM sigue protegiendo

---

## 4. Plan de migración para despachos de abogados

### Fase 1: Inventario y evaluación (Mes 1-2)

**Objetivo**: Saber qué se protege, con qué y durante cuánto tiempo.

```markdown
- [ ] Inventario de sistemas criptográficos activos
- [ ] Clasificación de datos por sensibilidad y vida útil
- [ ] Identificación de proveedores y dependencias
- [ ] Evaluación de riesgo: ¿qué datos están en riesgo de "harvest now, decrypt later"?
- [ ] Priorización: sistemas críticos primero
```

### Fase 2: Pruebas piloto (Mes 3-4)

**Objetivo**: Validar compatibilidad sin romper nada.

- Implementar TLS 1.3 con grupos híbridos post-cuánticos en servicios no críticos
- Probar firmas ML-DSA en documentos internos
- Validar interoperabilidad con clientes y contrapartes

### Fase 3: Migración progresiva (Mes 5-9)

**Orden de prioridad**:

1. **VPN y acceso remoto** (protege acceso día a día)
2. **Email cifrado** (protege comunicaciones privilegiadas)
3. **Almacenamiento de documentos sensibles** (contratos M&A, litigios)
4. **Firmas electrónicas** (cumplimiento eIDAS)
5. **Comunicaciones con clientes** (portales seguros)

### Fase 4: Auditoría y mantenimiento (Mes 10-12)

- Auditoría de cumplimiento post-cuántico
- Documentación de políticas actualizadas
- Formación del equipo
- Plan de revisión anual

---

## 5. Marco regulatorio y compliance

### NIS2: ¿incluye criptografía post-cuántica?

La Directiva NIS2 (transpuesta en España) exige medidas de cifrado apropiadas. Aunque no menciona explícitamente "post-cuántico", el principio de **seguridad proporcionada** y el deber de **actualización tecnológica** implican que los despachos deben anticiparse.

### Recomendaciones ENISA 2026

La Agencia de Ciberseguridad de la UE publicó en 2026:

> "Las entidades que manejen datos con vida útil superior a 10 años deben iniciar la migración a criptografía post-cuántica antes de 2028."

Esto incluye a prácticamente todos los despachos de tamaño medio y grande.

### eIDAS 2.0 y firmas cualificadas

El nuevo marco eIDAS 2.0 introduce requisitos de **resistencia cuántica** para firmas electrónicas cualificadas de alta seguridad. Los despachos que usen firma cualificada deberán actualizar sus sistemas para mantener validez legal.

---

## 6. Checklist de acción inmediata

### Este mes

- [ ] Reunir al equipo de IT y compliance
- [ ] Inventariar sistemas criptográficos
- [ ] Contactar proveedores: ¿roadmap post-cuántico?
- [ ] Revisar pólizas de ciberseguro: ¿cubre amenazas cuánticas?

### Este trimestre

- [ ] Implementar TLS híbrido en servicios críticos
- [ ] Actualizar política de cifrado de documentos
- [ ] Formar al equipo sobre concienciación cuántica
- [ ] Evaluar herramientas post-cuánticas disponibles

### Este año

- [ ] Completar migración de sistemas críticos
- [ ] Documentar proceso para auditorías
- [ ] Revisar contratos con cláusulas de criptografía
- [ ] Establecer programa de renovación criptográfica continua

---

## Conclusión

La computación cuántica no es una amenaza futura: es una realidad que exige **preparación hoy**. Para los despachos de abogados, la migración post-cuántica no es solo una cuestión técnica, sino de **cumplimiento regulatorio, protección del secreto profesional y responsabilidad hacia los clientes**.

Los despachos que actúen ahora estarán protegidos contra el "harvest now, decrypt later". Los que esperen podrán descubrir en 2030 que sus comunicaciones más sensibles de 2026 fueron comprometidas.

**La criptografía post-cuántica no es opcional. Es la próxima frontera del compliance digital.**

---

*¿Necesitas asesoramiento para preparar tu despacho para la era post-cuántica? En Legasint ayudamos a firmas legales a navegar la transición criptográfica con seguridad y cumplimiento.*
