---
title: "ERP a Medida: Checklist para Elegir el Partner de Desarrollo Adecuado"
date: "2026-10-04"
language: "es"
canonical: "https://legasint.com/blog/checklist-partner-erp-a-medida"
tags: ["ERP a medida", "partner tecnológico", "desarrollo", "checklist", "proveedor"]
---

# ERP a Medida: Checklist para Elegir el Partner de Desarrollo Adecuado

Guía práctica para elegir el partner tecnológico de tu ERP a medida: qué preguntar, cómo evaluar propuestas y señales de alerta que debes evitar.

## El 70% de los Proyectos de ERP Fracasan Por Esto

**Una empresa gastó €200.000 y 18 meses con un partner que no entregó nada funcional.**

El problema no fue la tecnología. Fue elegir al partner equivocado: sin experiencia en ERP, sin metodología clara, sin entregar el código.

Este artículo te da el checklist completo para evaluar partners y evitar que te pase lo mismo.

---

## Fase 1: Antes de Contactar Partners

### Define Tu Proyecto (Mínimo Viable)

Antes de pedir propuestas, responde:

- [ ] ¿Qué procesos quiero digitalizar? (producción, inventario, ventas, contabilidad...)
- [ ] ¿Cuántos usuarios usarán el ERP?
- [ ] ¿Qué integraciones necesito? (CRM, e-commerce, producción, etc.)
- [ ] ¿Cuál es mi presupuesto realista? (€80K - €300K para pymes)
- [ ] ¿Cuál es mi horizonte temporal? (6-12 meses típico)
- [ ] ¿Tengo alguien interno que será "product owner"?

**Sin esto claro, cualquier propuesta es humo.**

---

## Fase 2: Evaluación de Partners

### Criterio 1: Experiencia Específica en ERP

**Pregunta clave:** "¿Cuántos ERPs a medida has implementado en mi sector?"

| Respuesta | Señal |
|-----------|-------|
| "Hemos hecho muchas apps web" | 🚩 No específico en ERP |
| "Hemos integrado con ERPs" | 🚩 No han construido, solo integrado |
| "Hemos desarrollado 3 ERPs para manufactura" | ✅ Experiencia relevante |

**Verificación:** Pide referencias de proyectos similares. Llama a esos clientes.

---

### Criterio 2: Metodología de Trabajo

**Pregunta clave:** "¿Cómo gestionas el desarrollo?"

| Metodología | Señal |
|-------------|-------|
| "Cascada: definimos todo, luego desarrollamos" | 🚩 Riesgo alto de desviación |
| "Ágil con sprints de 2 semanas y demos" | ✅ Iterativo, feedback temprano |
| "Lean: MVP primero, luego escalamos" | ✅ Enfoque en validación |

**Lo que debes exigir:**
- Sprints de 2 semanas con entregables funcionales
- Demos al final de cada sprint
- Acceso a repositorio de código (Git) desde el día 1
- Tablero de tareas visible (Jira, Linear, etc.)

---

### Criterio 3: Equipo y Perfiles

**Pregunta clave:** "¿Quiénes trabajarán en mi proyecto?"

| Situación | Señal |
|-----------|-------|
| "Tenemos un equipo asignado" pero no te dejan hablar con ellos | 🚩 Subcontrata o rotación |
| "El equipo lo asignamos según disponibilidad" | 🚩 No hay continuidad garantizada |
| "Te presentamos al Tech Lead y al Product Owner" | ✅ Compromiso de equipo fijo |

**Perfiles mínimos necesarios:**
- Tech Lead/Arquitecto (diseña, supervisa)
- 2-3 Desarrolladores full-stack
- Diseñador UX/UI (para interfaces usable)
- QA/Tester (calidad no es opcional)

---

### Criterio 4: Propiedad del Código y Datos

**Pregunta clave:** "¿Quién es dueño del código?"

| Respuesta | Señal |
|-----------|-------|
| "El código es nuestro, te damos licencia" | 🚩 Vendor lock-in extremo |
| "Código en nuestro repositorio, te damos acceso" | 🚩 Dependencia del partner |
| "Repositorio en tu cuenta (GitHub/GitLab), tú eres owner" | ✅ Control total |

**Debes exigir:**
- Repositorio en tu cuenta o cuenta compartida
- Documentación técnica completa
- Acceso a todo desde el día 1
- Cláusula de entrega de código si termina contrato

---

### Criterio 5: Presupuesto y Pagos

**Estructura de pago típica (sana):**

| Fase | % del presupuesto |
|------|-------------------|
| Firma contrato | 20-30% |
| Sprint 3-4 (MVP funcional) | 20-30% |
| Sprint 6-8 (versión beta) | 20-30% |
| Entrega final + documentación | 10-20% |

**Señales de alerta:**
- 🚩 "Paga el 100% por adelantado"
- 🚩 "Sin hitos claros, pagamos mensualmente y ya"
- 🚩 "El presupuesto es cerrado pero no desglosado"

**Debes exigir:**
- Desglose por fases y entregables
- Precio cerrado por sprint o por módulo
- Cláusula de penalización por retraso (opcional pero recomendable)

---

### Criterio 6: Mantenimiento y Soporte

**Pregunta clave:** "¿Qué pasa después del lanzamiento?"

| Respuesta | Señal |
|-----------|-------|
| "Te damos 3 meses de garantía y luego ya veremos" | 🚩 Sin compromiso a largo plazo |
| "Mantenimiento obligatorio de €X/año" | 🚩 Atadura forzosa |
| "Ofrecemos mantenimiento opcional, tú decides" | ✅ Flexibilidad |

**Acuerdo de mantenimiento típico:**
- 15-25% del coste de desarrollo anual
- SLA de respuesta (crítico: 4h, importante: 24h, menor: 1 semana)
- Actualizaciones de seguridad incluidas
- Mejoras evolutivas por horas o por sprint

---

### Criterio 7: Stack Tecnológico

**Pregunta clave:** "¿Qué tecnologías usarás y por qué?"

| Respuesta | Señal |
|-----------|-------|
| "Usamos nuestra plataforma propietaria" | 🚩 Lock-in tecnológico |
| "Lo que más te guste" | 🚩 Sin criterio técnico |
| "Node.js/Python + PostgreSQL + React, estándar del mercado" | ✅ Tecnologías maduras |

**Stack recomendado para ERP:**
- **Backend:** Node.js, Python (Django/FastAPI) o Java
- **Frontend:** React, Vue o Angular
- **Base de datos:** PostgreSQL (robusta, escalable)
- **Infraestructura:** AWS, Azure o GCP (cloud público)

**Evita:**
- Tecnologías exóticas o poco maduras
- Stack propietario del partner
- Lenguajes sin comunidad (diffícil encontrar desarrolladores después)

---

### Criterio 8: Seguridad y Compliance

**Pregunta clave:** "¿Cómo garantizas la seguridad de los datos?"

| Elemento | Debe incluir |
|----------|--------------|
| Encriptación | En tránsito (TLS) y en reposo (AES-256) |
| Autenticación | OAuth 2.0, MFA, roles y permisos |
| Auditoría | Logs de acceso y cambios |
| Backup | Automático, diario, con retención |
| Compliance | GDPR, AI Act si aplica IA |
| Testing | Pentest antes de producción |

**Pregunta adicional:** "¿Has tenido brechas de seguridad en otros proyectos?" (La honestidad aquí dice mucho.)

---

### Criterio 9: Comunicación y Cultura

**Señales positivas:**
- Responden en menos de 24 horas
- Hablan tu idioma (no solo técnico, sino de negocio)
- Proponen mejoras, no solo ejecutan
- Te dicen "no" cuando algo no tiene sentido

**Señales de alerta:**
- 🚩 Solo hablan con jerga técnica
- 🚩 Dicen "sí" a todo sin cuestionar
- 🚩 Comunicación lenta o errática

**Prueba:** Pide una reunión de 30 minutos con el equipo técnico (no solo comercial). Evalúa si entienden tu negocio.

---

### Criterio 10: Escalabilidad del Partner

**Pregunta clave:** "Si mi proyecto crece, ¿puedes escalar conmigo?"

| Situación | Señal |
|-----------|-------|
| "Somos 5 personas, hacemos lo que podemos" | 🚩 Capacidad limitada |
| "Tenemos 50 desarrolladores, escalamos fácil" | ✅ Capacidad garantizada |
| "Colaboramos con otros partners si necesitamos más recursos" | ⚠️ Posible descontrol |

**Evalúa:**
- Tamaño del equipo técnico total
- Proyectos activos actuales (¿están sobrecargados?)
- Capacidad de incorporar desarrolladores rápidamente

---

## Red Flags: Cuándo Huir

Estas señales indican riesgo alto de fracaso:

### 1. Presupuesto Sin Desglose
"€150.000, confía en nosotros." Sin desglose por fases, sin hitos, sin detalle.

### 2. No Te Dejan Hablar con el Equipo Técnico
Solo hablas con comercial. El equipo técnico es "interno" o "lo verás después".

### 3. Código Propio Intransferible
"Usamos nuestra plataforma, es mejor." No puedes llevarte el código si terminas.

### 4. Sin Referencias Verificables
No pueden darte clientes de proyectos similares que puedas llamar.

### 5. Promesas Irreales
"En 2 meses tendrás un ERP completo con todo lo que pidas." Imposible.

### 6. Cambian de Scope Constantemente
"Cada cambio es un extra." Sin proceso de gestión de cambios claro.

### 7. No Documentan
"El código es su documentación." Frase clásica de equipos que no documentan.

### 8. Subcontratan Sin Decirlo
Descubres que el desarrollo lo hace un tercero en otro país sin tu conocimiento.

---

## Proceso de Selección Recomendado

### Paso 1: Long List (5-10 partners)
- Búsqueda en LinkedIn, Google, referencias
- Filtro: experiencia en ERP, sector, tamaño

### Paso 2: Short List (3-5 partners)
- Revisión de portfolio y casos
- Primera llamada de 30 minutos
- Envío de brief de proyecto

### Paso 3: Propuestas (2-3 partners)
- RFP o brief detallado
- Propuesta técnica y económica
- Presentación de 1 hora con equipo técnico

### Paso 4: Selección (1 partner)
- Validación de referencias
- Negociación de contrato
- Definición de kick-off

### Paso 5: Periodo de Prueba (opcional)
- Contrato por 1-2 sprints inicial
- Evaluación de ejecución
- Continuar o cambiar

---

## Preguntas Finales Para el Partner Ganador

Antes de firmar, asegúrate de respuestas claras a:

- [ ] ¿Quién es exactamente el equipo asignado? (nombres y roles)
- [ ] ¿Cuál es el cronograma detallado con hitos?
- [ ] ¿Cómo se gestionan los cambios de scope?
- [ ] ¿Qué pasa si hay retrasos? ¿Penalización o renegociación?
- [ ] ¿Cómo se entrega el código y la documentación?
- [ ] ¿Cuál es el SLA de soporte post-lanzamiento?
- [ ] ¿Qué garantías ofrecen sobre bugs y errores?
- [ ] ¿Cómo terminamos el contrato si no estamos satisfechos?

---

## Caso Real: La Diferencia Entre Éxito y Fracaso

### Caso A: Partner Correcto
**Empresa:** Manufacturer de 80 empleados.

**Proceso:**
- Evaluaron 4 partners con checklist detallado
- Seleccionaron uno con experiencia en manufactura
- Contrato por fases con hitos claros
- Sprints de 2 semanas con demos
- Código en repositorio del cliente desde el día 1

**Resultado:** ERP en 9 meses, ROI en 18 meses, relación de confianza continua.

### Caso B: Partner Incorrecto
**Empresa:** Distribuidora de 50 empleados.

**Proceso:**
- Elegieron el más barato sin evaluar experiencia
- No pidieron referencias
- Contrato sin hitos claros
- Solo hablaron con comercial, nunca con técnico

**Resultado:** 18 meses de retraso, €200K gastados, ERP inusable, código no entregado, demanda legal.

---

## Conclusión

Elegir el partner de tu ERP a medida es tan importante como definir el ERP mismo. Un buen partner acelera y asegura el éxito. Un mal partner convierte tu inversión en pesadilla.

**Dedica tiempo a evaluar. No te dejes llevar por precio o promesas. Verifica, pregunta, exige.**

**¿Estás buscando partner para tu ERP a medida?**

No elijas por intuición. Usa este checklist, compara 3+ propuestas y verifica referencias reales. Si quieres, te ayudamos a evaluar las propuestas que tengas en la mesa —sin coste, sin compromiso.

**[Evalúa tu partner con nosotros →](/contacto)**

---

*¿Conoces a alguien que haya sufrido con un mal partner de desarrollo? Compártelo.*
