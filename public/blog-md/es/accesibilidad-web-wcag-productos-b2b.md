---
title: "Accesibilidad Web en Productos B2B: WCAG y Oportunidades de Negocio"
date: "2026-11-19"
language: "es"
canonical: "https://legasint.com/blog/accesibilidad-web-wcag-productos-b2b"
tags: ["accesibilidad", "WCAG 2.2", "European Accessibility Act", "productos B2B", "desarrollo a medida", "cumplimiento normativo"]
---

# Accesibilidad Web en Productos B2B: WCAG y Oportunidades de Negocio

La European Accessibility Act exige accesibilidad en productos y servicios digitales de la UE desde junio de 2025. Qué pide WCAG 2.2, cómo afecta al software B2B y cómo convertir el cumplimiento en ventaja comercial.

## Introducción

En octubre de 2019, el Tribunal Supremo de Estados Unidos dejó sin efecto el recurso de Domino's Pizza. Desde 2016, la cadena se había defendido de una demanda de Guillermo Robles, un cliente ciego que no podía pedir con lector de pantalla en su web ni en su app. El litigio le costó tres años de abogados, mala prensa y un rediseño caro de ambas plataformas.

La lección llegó a Europa por vía regulatoria. Desde el 28 de junio de 2025, la **European Accessibility Act (EAA)** obliga a que determinados productos y servicios digitales vendidos en la Unión Europea sean accesibles. El texto cubre banca, seguros, comercio electrónico y telecomunicaciones, entre otros sectores. El software B2B entra por la puerta de sus clientes: quien vende a esas industrias ya encuentra requisitos de accesibilidad en pliegos, contratos marco y cuestionarios de proveedor.

El mercado está desprevenido. El estudio WebAIM Million, que analiza cada año el millón de páginas más visitadas, detectó fallos automáticos de WCAG en el 96,3 % de las home pages en 2024. Quien cumpla hoy parte con ventaja en cualquier licitación.

## 1. El problema, en cifras

La accesibilidad se suele contar como un tema social. También es un problema de caja. Los números que importan a un negocio B2B:

- **Mercado:** en España hay 4,38 millones de personas con discapacidad certificada (INE), una cifra que crece con la edad de la plantilla. En la Unión Europea hablamos de unas 87 millones de personas.
- **Conducta:** el informe Click-Away Pound calculó que los comercios británicos perdían 17.100 millones de libras al año porque usuarios con necesidades de accesibilidad abandonaban webs y apps que no podían usar.
- **Coste interno:** cuando un empleado de tu cliente no puede operar tu herramienta con teclado o lector de pantalla, abre tickets, monta hojas de cálculo paralelas y comete errores. Tu producto se convierte en su problema, y tu cliente lo sabe.
- **Compras:** los departamentos de compras de grandes cuentas añaden criterios WCAG a las RFP desde 2024, una tendencia que la EAA acelera.

Ignorar el tema tiene también precio regulatorio. Italia ya fija sanciones de 5.000 a 40.000 euros por infracción en su transposición de la EAA, y el resto de Estados miembros avanza por el mismo camino.

## 2. Qué exige WCAG 2.2

El estándar de referencia es **WCAG 2.2**, recomendación del W3C desde octubre de 2023. La norma armonizada europea **EN 301 549** remite a WCAG, y la práctica del sector marca el **nivel AA** como objetivo: es lo que piden los pliegos y lo que cubre la EAA.

WCAG se apoya en cuatro principios: el contenido debe ser perceptible, operable, comprensible y robusto. La versión 2.2 añade nueve criterios nuevos, varios de ellos muy relevantes para aplicaciones empresariales con tablas densas, cabeceras fijas y formularios largos.

| Criterio WCAG 2.2 | Fallo típico en una app B2B | Esfuerzo típico |
|---|---|---|
| 2.4.11 Focus Not Obscured | Una cabecera sticky o un banner de cookies tapa el elemento con foco | Bajo (CSS) |
| 2.5.8 Target Size (Minimum) | Botones de 16 px en filas de tabla | Bajo |
| 3.3.7 Redundant Entry | Formularios que repiten datos ya introducidos | Medio |
| 3.3.8 Accessible Authentication | Captchas y pruebas de memoria en el login | Medio |
| 2.5.7 Dragging Movements | Un kanban que solo se mueve arrastrando, sin alternativa de teclado | Medio-alto |

Un detalle a vigilar: WCAG 2.2 retira el criterio 4.1.1 Parsing del nivel A. Si tu auditoría de 2022 todavía contaba esos errores de HTML, es hora de actualizar el informe.

## 3. Cómo lo integramos en el desarrollo

El orden importa más que la herramienta. Este es el proceso que aplicamos en proyectos de producto:

1. **Auditoría inicial.** Herramientas automatizadas (axe, Lighthouse, WAVE) más pruebas manuales con lector de pantalla. De tres a cinco días para un producto mediano.
2. **Quick wins de diseño.** Contraste de 4,5:1 en texto, indicador de foco visible, etiquetas en campos y jerarquía correcta de encabezados. La mayoría de los fallos se corrige en el design system, pantalla a pantalla.
3. **Componentes accesibles.** Botones, modales, tablas y date pickers auditados una vez y reutilizados después. Aquí se gana la batalla: el 80 % de las pantallas hereda un comportamiento correcto.
4. **Tests en CI.** jest-axe para pruebas unitarias y checks de Playwright para los flujos críticos. Cada pull request valida los criterios que puedan romperse.
5. **Mantenimiento.** Checklist en el code review, definition of done que incluye teclado y lector de pantalla, y una declaración de accesibilidad con canal de feedback, requisito expreso de la EAA.

## 4. Qué cuesta y qué devuelve

Los rangos que manejamos en proyectos con empresas españolas:

| Concepto | Rango orientativo |
|---|---|
| Auditoría inicial (automática + manual) | 4.000 a 12.000 € |
| Remediación de un producto con deuda acumulada | 15.000 a 60.000 € |
| Integración de accesibilidad en el SDLC | 10-15 % más de tiempo por sprint, al inicio |
| Tests automatizados en CI | Cercano a cero, amortizado en un trimestre |

El sector lleva años citando el mismo cálculo: corregir un problema de accesibilidad en producción cuesta entre 10 y 30 veces más que en diseño. Un contraste malo se arregla cambiando un token de color en Figma. El mismo fallo en producción implica ticket, revisión, despliegue y comunicación al cliente.

El retorno llega por varias vías:

- **Licitaciones:** acceso a concursos que exigen WCAG AA y declaración de accesibilidad.
- **Soporte:** menos tickets de usuarios atascados. El teclado y el foco claro reducen consultas de todo tipo.
- **Usabilidad general:** subtítulos, navegación por teclado y buen contraste benefician a todos los usuarios, con o sin discapacidad.
- **Retención:** un cliente cuya plantilla incluye personas con discapacidad deja de plantearse migrar a otro proveedor.
- **Riesgo legal:** menos exposición a reclamaciones y a sanciones administrativas.

## 5. Caso real: licitación perdida y recuperada

A finales de 2024, una empresa de software B2B de Valencia perdió una licitación de 180.000 € anuales con un operador logístico. El motivo, recogido en el acta de adjudicación: el pliego exigía conformidad con WCAG 2.1 AA y declaración de accesibilidad, y su portal no la tenía. (Proyecto real de 2025, cifras anonimizadas por confidencialidad.)

El trabajo se facturó en dos partes:

- **Factura 2025-1147, 6.400 €:** auditoría de 5 días con informe priorizado por criterio WCAG y estimación de esfuerzo por corrección.
- **Factura 2025-1210, 21.800 €:** remediación durante 6 semanas, con 37 incidencias de nivel AA resueltas e informe de evaluación conforme a la metodología WCAG-EM del W3C.

El resultado se midió un año después. La empresa volvió a concurrir al mismo proceso y esta vez ganó: 210.000 € anuales de contrato. Sus tickets de soporte bajaron un 18 % en dos trimestres. Su equipo de ventas ahora usa el informe de auditoría como argumentario en cada RFP nueva.

## 6. Conclusión

La EAA ha movido la accesibilidad de la casilla de "lo haremos algún día" a la de requisito de mercado. Los pliegos lo piden, los clientes lo auditan y la competencia todavía no está preparada: nueve de cada diez páginas siguen fallando.

Hacer el producto accesible sale más barato cuando se integra en el desarrollo diario que cuando llega la auditoría de un cliente. Y cada criterio WCAG resuelto abre una puerta comercial.

**¿Quieres saber dónde está tu producto hoy?** En Legasint hacemos una auditoría de accesibilidad en 5 días hábiles: escaneo automatizado, sesión de pruebas con lector de pantalla e informe priorizado con el esfuerzo estimado por criterio. [Reserva tu auditoría de accesibilidad →](/contacto)

## Preguntas frecuentes

### ¿Mi producto B2B está obligado por la EAA?

Depende del servicio que prestes y de tus clientes. Si operas en sectores cubiertos (banca, seguros, comercio electrónico, telecomunicaciones) o vendes a empresas que sí están cubiertas, te lo exigirán de facto en contratos y licitaciones. Las microempresas, con menos de 10 empleados y facturación o balance de hasta 2 millones de euros, quedan exentas.

### ¿Un 100 en Lighthouse significa que mi web es accesible?

No. Las herramientas automatizadas detectan entre el 30 % y el 40 % de los problemas. Buena parte de los criterios WCAG se evalúan con pruebas manuales: recorrer los flujos con teclado, con NVDA o VoiceOver, con zoom al 200 %. Lighthouse es un buen primer filtro y un mal certificado.

### ¿Qué nivel de WCAG debo cumplir?

El nivel AA es el objetivo práctico: es lo que remite la EN 301 549, lo que cubre la EAA y lo que piden los pliegos. El nivel AAA es aspiracional y se aplica a casos concretos de contenido, a productos completos.

### ¿La EAA también aplica a apps móviles?

Sí. La norma europea cubre software en general, incluidas aplicaciones móviles, y la EN 301 549 contiene criterios específicos para apps. Si tu producto tiene versión web y móvil, ambas entran en el alcance.

### ¿Cuánto tarda un producto maduro en alcanzar AA?

Con una deuda media, entre 4 y 12 semanas de remediación repartidas en sprints. Los productos que empiezan desde cero integran el coste desde el primer diseño y apenas añaden tiempo de desarrollo.
