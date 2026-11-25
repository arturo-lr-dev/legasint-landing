---
title: "Serverless y edge computing en 2026: guía práctica 2026"
date: "2026-11-13"
language: "es"
canonical: "https://legasint.com/blog/serverless-y-edge-computing-en-2026-2026"
tags: ["serverless", "edge computing", "cloud", "arquitectura de software", "infraestructura", "desarrollo de software a medida", "2026"]
---

# Serverless y edge computing en 2026: guía práctica 2026

Qué cambia con serverless y edge computing en 2026: cuándo migrar y cuándo no, los pasos de una migración por fases, costes reales y tres casos con números de factura y retorno.

## 43 minutos de caída, 38.000 euros en pedidos a medias

Una tienda online de iluminación de Valencia factura unos tres millones de euros al año. En el Black Friday de 2025 lanzó una campaña con dos influencers y recibió 27.000 visitas en una hora. Su servidor, un VPS de 8 GB contratado precisamente para "aguantar campañas", se saturó a las 21:43.

La web estuvo caída 43 minutos y lenta dos horas más. Se quedaron a medias 612 pedidos con un ticket medio de 62 euros: casi 38.000 euros de venta que no llegó. El servidor costaba 1.180 euros al mes, con un uso medio de CPU del 9 %.

Eso es lo que casi nadie suma de la infraestructura tradicional: pagas por el pico durante todo el año, o pagas la caída cuando el pico llega. En enero de 2026 migraron checkout y API a funciones serverless, con la capa edge sirviendo catálogo y contenido. La factura de mayo, campaña incluida, fue de 740 euros.

La campaña de septiembre trajo 71.000 visitas en un día, el triple del pico que los tumbó. Cero caídas, latencia p95 por debajo de 900 ms.

## El problema: capacidad que no usas o capacidad que te falta

El servidor propio obliga a elegir un número fijo: vCPU, memoria y disco para las 8.760 horas del año. En las revisiones que hacemos se repiten dos escenarios:

- **Sobredimensionar**: pagas de más once meses para no caerte en uno. Es lo habitual: máquinas con uso medio por debajo del 15 %.
- **Subdimensionar**: ahorras todo el año y pierdes en una tarde lo ahorrado. Una tienda con ticket medio de 60 euros y conversión del 2 % pierde unos 550 euros por cada minuto de caída en hora punta.

Hay un tercer coste silencioso: horas de equipo. Parches del sistema operativo, certificados, reglas de escalado, discos que se llenan. En una pyme son fácilmente 6-8 horas semanales de alguien que podría estar construyendo producto.

## Qué son serverless y edge computing, sin humo

**Serverless**: tu código se ejecuta en una plataforma gestionada (AWS Lambda, Google Cloud Run, Azure Functions) que escala sola y cobra por uso real. Si no hay tráfico, la factura tiende a cero.

**Edge computing**: el código corre en cientos de puntos de presencia cercanos al usuario, no en un datacenter a mil kilómetros. Sirve para lo que debe responder rápido: verificación de tokens, redirecciones, tests A/B, cache de contenido dinámico.

En 2026 esto ya no es una apuesta. Los arranques en frío por debajo de 100 milisegundos son la norma en los principales proveedores, el modelo de runtimes aislados se ha consolidado y WebAssembly permite llevar funciones escritas en casi cualquier lenguaje a la red de edge.

Comparado con lo que había hace cinco años:

| | Servidor propio (VPS) | Serverless | Edge |
|---|---|---|---|
| Escala | Manual, con techo | Automática, hasta cero | Automática, multirregión |
| Cobro | Fijo cada mes | Por ejecuciones y consumo | Por peticiones y datos |
| Latencia desde España | 30-80 ms | 40-120 ms | 10-40 ms |
| Mantenimiento de plataforma | SO, parches, certificados | A cargo del proveedor | A cargo del proveedor |
| Mejor encaje | Carga estable y previsible | APIs, eventos, picos | Auth, reglas, cache dinámico |

## Qué se mueve y qué se queda

Un buen plan migra lo que sale ganando, no todo. En nuestras auditorías, el reparto habitual es:

- **A serverless**: APIs sin estado, formularios, webhooks, tareas programadas, procesos encadenados con colas.
- **A edge**: autenticación, redirecciones, tests A/B, cabeceras de seguridad, respuestas cacheadas con datos dinámicos.
- **Donde está**: bases de datos con estado intenso, procesos batch de horas, conexiones websocket persistentes y cargas con residencia de datos estricta.

El criterio es de ingeniería: el estado y la latencia extrema se quedan cerca del dato; todo lo demás escala mejor sin servidor.

## Los pasos de una migración por fases

El orden que repetimos en proyectos de desarrollo a medida:

1. **Semanas 1-2: medir.** Curvas de tráfico por hora, latencia p95 y p99, dependencias con estado y factura actual. Sin medición no hay ahorro que defender.
2. **Semana 3: elegir el primer candidato.** Un endpoint sin estado, con volumen medio y riesgo bajo. Nunca el checkout ni el login como primera pieza.
3. **Semanas 4-6: adaptar el diseño.** Idempotencia en cada función, timeouts explícitos, colas entre pasos y secretos en un gestor dedicado, no en variables de entorno planas.
4. **Semanas 7-10: migrar con convivencia.** Funciones nuevas detrás de feature flags, con rollback en un cambio de configuración. Las dos versiones conviven sin que el usuario note nada.
5. **Semana 11: presupuesto y alertas.** Límites duros en entornos no productivos, alertas al 80 % y al 100 % del presupuesto y un dashboard de coste por servicio.
6. **Continuo: revisión mensual.** La factura del cloud se revisa cada mes, con un test de carga anual para recalibrar límites.

Con ese orden, al trimestre tienes producción real corriendo y datos para decidir el resto de la migración con números en la mano.

## ¿Cuánto cuesta?

Rangos orientativos para una pyme con una o dos aplicaciones:

| Elemento | Coste estimado |
|---|---|
| Auditoría de infraestructura y tráfico | 2.500-4.500 euros |
| Migración de un servicio o API a funciones | 6.000-14.000 euros |
| Capa edge (auth, cache, reglas de enrutado) | 3.000-7.000 euros |
| Alertas de gasto y observabilidad | 1.500-3.000 euros |
| Mantenimiento anual | 2.000-4.000 euros |

El otro lado de la cuenta: una empresa con dos o tres campañas al año paga de más entre 6.000 y 10.000 euros anuales en capacidad ociosa, y una caída en hora punta cuesta entre 500 y 1.500 euros por minuto según el negocio.

**¿No sabes cuánto pagas hoy por capacidad que no usas?** En Legasint hacemos una auditoría de infraestructura de una semana: medimos tu tráfico real, tu p95 y tu factura, y te devolvemos un plan de migración con costes y ahorro estimados. [Solicita la auditoría de infraestructura →](/contacto)

## Casos con números

### Tienda de iluminación, Valencia

La del principio. Migraron checkout y API a funciones serverless y movieron catálogo y estáticos a la red edge.

- Factura del proyecto: 14.800 euros.
- Infraestructura mensual: de 1.180 euros fijos a una media de 640.
- Pico soportado: el triple de tráfico que el de la caída, sin incidencias.
- Retorno por infraestructura: unos 27 meses. Evitando una sola caída como la de noviembre de 2025, el proyecto se amortiza en menos de cinco meses.

### SaaS de logística, Zaragoza

Su proceso nocturno generaba albaranes, facturas y mensajes EDI: seis horas de servidor cada madrugada, y los lunes se acumulaba hasta media mañana. Lo pasamos a funciones con cola gestionada.

- Factura del proyecto: 11.200 euros.
- Ventana de proceso: de 6 horas a 38 minutos, también los lunes.
- Servidor apagado: 420 euros al mes que dejaron de pagar; la ejecución serverless cuesta una media de 90 euros al mes.
- Horas recuperadas: unas 6 semanales del equipo de operaciones en reintentos y vigilancia.
- Retorno: 10 meses.

### Plataforma de formación con usuarios en Latinoamérica

Su API respondía desde Madrid con una latencia p95 de 480 ms y los tickets de "la plataforma va lenta" no bajaban de 23 al mes. Desplegamos funciones en la red edge, con cache de contenido público y verificación de tokens en el borde. Los datos personales siguen procesándose en región europea.

- Factura del proyecto: 6.400 euros.
- Latencia p95 para el usuario: de 480 ms a 90 ms.
- Tickets de lentitud: de 23 al mes a 4.
- Sesiones por usuario: un 17 % más el primer trimestre.
- Retorno estimado: 7 meses por efecto en retención.

## Preguntas frecuentes

### ¿Serverless siempre sale más barato?

No. Con tráfico alto, estable y previsible, un contenedor o un VPS dedicado puede salir mejor. La regla práctica: si tu carga ocupa siempre más del 60-70 % de una máquina, haz números antes de migrar. El serverless gana con picos, valles y carga impredecible, que es lo habitual fuera de las grandes plataformas.

### ¿Y el vendor lock-in?

Existe y conviene gestionarlo. Mitigaciones reales: mantener interfaces propias entre tu código y el proveedor, desplegar funciones como contenedores estándar cuando sea posible y reservar los servicios propietarios a lo que no tenga alternativa. Un cambio de proveedor completo cuesta semanas, no meses, si el código no está cosido a SDKs concretos.

### ¿Las cold starts siguen siendo un problema en 2026?

Para la mayoría de endpoints, no. Los arranques en frío por debajo de 100 ms son ya la norma en los principales proveedores, y las funciones con tráfico constante apenas los sufren. Sí importan en flujos de tiempo crítico o en funciones muy grandes; ahí tiene sentido pagar instancias siempre encendidas.

### ¿Qué pasa con el RGPD y la residencia de datos?

Procesa los datos personales en región europea y revisa el acuerdo de tratamiento de datos del proveedor. Usa la red edge para contenido público, autenticación y reglas, y evita replicar datos personales por el mundo si tu evaluación de impacto no lo justifica. Ojo también con los logs: ahí se cuelan datos personales sin que nadie lo decida.

### ¿Hay que reescribir la aplicación?

Casi nunca entera. El patrón habitual es extraer endpoints sin estado uno a uno, mover lo estático y el cache al edge y dejar lo con estado donde está. Una aplicación monolítica típica migra por fases en 8-12 semanas, con convivencia entre versiones.

### ¿Cómo evito sustos en la factura?

Tres medidas desde el primer día: límites de gasto duros en todo entorno que no sea producción, alertas al 80 % y al 100 % del presupuesto mensual, y cache agresivo de lo que se repite. Después, una revisión mensual de la factura y un test de carga anual para recalibrar.

## Conclusión

En 2026, serverless y edge computing son decisiones de números: mides tu tráfico real, migras por fases lo que escala mal hoy y vigilias la factura como vigilarías a cualquier proveedor.

Los equipos que sacan partido de esto son los que saben qué se mueve, qué se queda y qué se mide cada mes. Migrar todo de golpe es el error que más proyectos estropea.

**¿Tu infraestructura aguantará el próximo pico de campaña?** En Legasint migramos aplicaciones a medida a serverless y edge con plan por fases y estimación de ahorro antes de escribir la primera línea. [Cuéntanos cómo se comporta tu tráfico hoy →](/contacto)
