---
title: "Documentación técnica que sí se usa: guía práctica 2026"
date: "2026-11-07"
language: "es"
canonical: "https://legasint.com/blog/documentacion-tecnica-que-si-se-usa-2026"
tags: ["documentación técnica", "docs as code", "desarrollo de software", "conocimiento empresarial", "productividad", "2026"]
---

# Documentación técnica que sí se usa: guía práctica 2026

El 1 de agosto de 2012, Knight Capital perdió 440 millones de dólares en 45 minutos por un paso de despliegue que no estaba documentado. Cómo escribir documentación técnica que tu equipo usa a diario, con pasos, casos y números.

## 440 millones de dólares en 45 minutos

El 1 de agosto de 2012, Knight Capital desplegó un nuevo componente en su plataforma de trading. La actualización exigía copiar el código en ocho servidores y activar una bandera de configuración en cada uno. En siete servidores se hizo. En el octavo, no.

Nadie lo detectó hasta que el mercado abrió. Durante 45 minutos, el servidor olvidado ejecutó órdenes con lógica desactualizada. Al cierre, la empresa había perdido 440 millones de dólares, cerca del 40% de su valor en bolsa, y solo sobrevivió gracias a un rescate financiero en las últimas horas.

La investigación de la SEC fue clara: el procedimiento de despliegue dependía de la memoria de una persona y de pasos manuales que no constaban en ningún documento revisado por el equipo.

Caso extremo, problema común. En la mayoría de las empresas que auditamos, la documentación se trata como un adorno del proyecto, no como una parte del sistema. Y cuando hace falta, hace falta ya.

## El problema: wikis cementerio

El síntoma habitual lo conoces: un wiki que nadie abre, páginas con capturas de pantalla de versiones que ya no existen y respuestas reales que viven en el canal privado de dos personas.

Cuando revisamos proyectos de clientes, entre el 60% y el 70% de las páginas del wiki lleva más de un año sin tocarse. No es que el equipo sea desordenado: es que ese wiki está fuera de su sitio de trabajo. Documentar ahí es escribir una carta para un lector que nunca llega.

El coste se paga en tres sitios:

- **Incorporaciones eternas.** Sin documentación usable, un desarrollador nuevo tarda entre 10 y 12 semanas en alcanzar productividad plena.
- **Interrupciones al equipo senior.** Las preguntas repetidas de soporte y despliegue se concentran en la persona que más sabe, que pierde su mejor hora del día respondiendo lo mismo por tercera vez.
- **Riesgo de persona clave.** Si mañana se marcha quien despliega, renueva certificados o conoce el porqué de cada decisión arquitectónica, ese conocimiento se va con ella.

## La solución: documentación que vive donde trabaja el equipo

La clave está en poner cada documento donde el equipo ya trabaja y tratarlo como código: mismo repositorio, mismo proceso de revisión, misma obligación de mantenerlo.

| | Documentación decorativa | Documentación que se usa |
|---|---|---|
| Dónde vive | Un wiki aparte, con otro login | Junto al código, en el propio repo |
| Quién la escribe | Una persona, al final del proyecto | Quien toca el código, dentro del pull request |
| Cuándo se actualiza | Cuando alguien se acuerda | En cada cambio, como parte de la definición de hecho |
| Qué explica | Qué hay | Por qué se decidió así y cómo se opera |
| Cómo se mide | Número de páginas creadas | Tiempo de onboarding, preguntas resueltas, minutos de diagnóstico |

Los informes **DORA de Google** llevan años mostrando la misma correlación: los equipos con buena documentación interna despliegan con más frecuencia, recuperan antes de los fallos y dependen menos de personas concretas. No es un gasto de oficina: es infraestructura de conocimiento.

## Seis pasos para documentar lo que de verdad se usa

### 1. Documenta primero lo que duele

Empieza por los runbooks operativos: despliegue, restauración de backup, renovación de certificados, alta de un entorno. Si un procedimiento se ejecuta a mano una vez al año y solo una persona sabe hacerlo, esa es tu prioridad número uno.

### 2. Registra las decisiones, no solo el resultado

El código dice qué hace; no dice por qué se hizo así. Un registro de decisiones de arquitectura (ADR) con cuatro apartados basta: contexto, opciones consideradas, decisión y consecuencias. Diez líneas por decisión evitan meses de debate cuando llegue el momento de cambiar.

### 3. Docs as code

Markdown en el mismo repositorio. La documentación entra y sale por pull request, igual que el código, y el revisor puede exigir que el PR que cambia un comportamiento actualice también el documento que lo describe. El doc caduca mucho menos cuando corregirlo cuesta un commit.

### 4. Un dueño y una fecha de revisión para cada documento crítico

Cada runbook importante tiene una persona responsable y una fecha de caducidad. Una revisión trimestral de los diez documentos más consultados mantiene el sistema sano sin convertir la documentación en un segundo trabajo.

### 5. Mide uso, no páginas

Las métricas que importan: semanas de onboarding de un desarrollador nuevo, preguntas repetidas que llegan al equipo senior, minutos que tarda la persona de guardia en diagnosticar un incidente. Si una página no se consulta nunca, sobra; si se consulta mucho, merece revisión prioritaria.

### 6. Ponlo en la definición de hecho

Una funcionalidad terminada es código, tests y documentación actualizada. Sin esa regla, la documentación compite siempre con el siguiente sprint. Con ella, deja de ser voluntad y pasa a ser proceso.

## Qué cuesta y qué ahorra

| Concepto | Sin documentación usable | Con documentación viva |
|---|---|---|
| Onboarding hasta productividad plena | 10-12 semanas | 4-6 semanas |
| Interrupciones diarias al equipo senior | 5-10 preguntas repetidas | Autoservicio con runbooks |
| Diagnóstico de un incidente fuera de horario | Horas de exploración | Minutos con un runbook probado |
| Riesgo ante la baja de una persona clave | Conocimiento irrecuperable | Transferible en semanas |

Cuentas rápidas con un desarrollador senior a 60.000 € brutos anuales: unas 240 € por día laborable. Cada semana que reduces del onboarding ahorra unos 1.200 € por incorporación. Con cuatro altas al año, hablamos de cerca de 9.600 €, antes de contar las interrupciones que dejan de producirse.

**¿Cuántas semanas tarda hoy tu equipo en dejar productivo a alguien nuevo? ¿Y cuánto costaría que se fuera quien despliega?** Si no sabes responder con números, ese desconocimiento ya tiene precio. En LegaSInt hacemos auditorías de documentación de dos semanas: revisamos wikis, runbooks y procesos, y entregamos un informe con un plan priorizado. Escríbenos desde el formulario de contacto con el asunto **"Auditoría de documentación"** y te mostramos un informe real anonimizado antes de que te comprometas a nada.

## Tres facturas: documentar tarde vs documentar bien

### Caso A: la baja que se llevó el despliegue (consultora, 45 empleados)

En 2025 se marchó el desarrollador senior que llevaba siete años con ellos. Los despliegues, la renovación de certificados y tres procesos nocturnos de integración solo existían en su cabeza. El equipo nuevo necesitó tres meses para reconstruir el mapa completo, con dos caídas de servicio por certificados caducados en el camino.

Factura del retraso: 320 horas de ingeniería en reconstrucción (15.000 €), dos incidentes evitables (6.000 €) y externalización temporal de DevOps (11.000 €). Total: **32.000 €** y un equipo tocado durante dos trimestres.

### Caso B: onboarding en semanas, no en meses (SaaS B2B, 30 empleados)

Pasaron la documentación al repositorio, redactaron seis runbooks y empezaron a exigir el punto de documentación en cada PR. El onboarding bajó de 11 semanas a 5 en dos trimestres.

Factura del cambio: 40 horas de migración y redacción (1.900 €) y unas 2 horas semanales de mantenimiento. Con seis incorporaciones al año, el ahorro en ramp-up supera los **11.500 € anuales**, y las interrupciones al equipo senior cayeron un 60%.

### Caso C: el runbook de las tres de la mañana (logística, 60 empleados)

Un incidente de base de datos durante la campaña de noviembre, a las 3:12 de la madrugada. La persona de guardia siguió el runbook y restableció el servicio en 25 minutos. El año anterior, un incidente parecido había costado tres horas y media y las ventas de una noche entera.

Meses después, el mismo repositorio de documentación les sirvió para responder una due diligence de un cliente potencial: contrato de **140.000 € anuales** firmado con evidencias técnicas en cuatro días, no en tres semanas.

## Preguntas frecuentes

### ¿Documentar todo no duplica trabajo?

No: documentas lo operativo y las decisiones. El código bien escrito y los tests siguen siendo la mejor documentación del comportamiento; lo que necesita papel propio es cómo se despliega, cómo se recupera y por qué se eligió este diseño y no otro.

### ¿Con qué herramienta empiezo si no tengo nada?

Markdown en el mismo repositorio es suficiente para empezar esta misma semana. Si necesitas un portal público, MkDocs o Docusaurus lo generan a partir de esos mismos archivos. El wiki corporativo solo conviene si ya está integrado en el flujo de trabajo del equipo.

### ¿Quién escribe la documentación?

Quien construye el cambio, dentro del pull request. La revisión la hace el equipo como parte normal de la revisión de código. Eso no elimina a un editor técnico si lo tienes: lo libera de perseguir páginas sueltas para dedicarse a la arquitectura de la información.

### ¿Cómo evito que caduque?

Tres reglas juntas: documentar dentro del repo, exigir que cada PR que cambia comportamiento actualice su documento, y revisar trimestralmente los documentos más consultados. Con eso, la caducidad se detecta en días en lugar de en años.

### ¿Nos sirve para ISO 27001, NIS2 o una due diligence?

Sí, y mucho. Un sistema de documentación viva genera la evidencia que esas auditorías piden: procedimientos actuales, historial de revisiones y trazabilidad de decisiones. En una due diligence, la diferencia entre tenerlo y reconstruirlo se mide en semanas.

**[Solicita una auditoría de documentación →](/contacto)**

## Conclusión

Knight Capital disponía del conocimiento necesario para evitar su catástrofe: lo que le faltó fue un documento que obligara a verificar cada servidor antes de abrir el mercado.

Tu empresa probablemente no arriesga 440 millones cada mañana, pero arriesga algo más difícil de recuperar que el dinero: el conocimiento acumulado de tu equipo, que hoy vive repartido entre cabezas, canales privados y wikis abandonados. Ningún paso de esta guía exige una herramienta cara: Markdown, tu repositorio actual y una regla clara en la definición de hecho. Lo que separa al Caso A del Caso B es una decisión previa.

*¿Quieres convertir tu documentación en un activo que el equipo use a diario? En LegaSInt realizamos sprints de documentación de tres semanas: documentamos tus runbooks críticos, implantamos docs as code en tu repositorio y dejamos un proceso de mantenimiento que el equipo puede sostener. Escríbenos desde el formulario de contacto con el asunto "Sprint de documentación" y agendamos una primera llamada técnica sin compromiso.*
