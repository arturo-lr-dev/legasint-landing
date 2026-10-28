# Sistema de diseño de Legasint

Versión: 1.0 · Estado: implementado

Este documento describe el sistema utilizado en la home, `/servicios`, `/services` y `/qr`. Su fuente de verdad es el código indicado en la sección “Mapa del código”.

## 1. Principios

1. **Primero la acción y el contenido.** La persona debe entender qué hace Legasint, para quién y cuál es el siguiente paso.
2. **La marca se reconoce por el color, no por el ruido.** Azul y morado tienen presencia continua, pero el texto siempre conserva superficies legibles.
3. **Un solo protagonista visual por pantalla.** La animación explica una transformación o responde a una acción; no decora todo a la vez.
4. **Móvil primero.** El mensaje y el CTA principal aparecen antes que la ilustración.
5. **Accesibilidad por defecto.** Teclado, foco visible, contraste, semántica y movimiento reducido forman parte del componente, no de una revisión posterior.
6. **Prueba antes que promesa.** Los casos explican reto, solución y resultado funcional. No se inventan métricas, testimonios ni condiciones comerciales.

## 2. Tokens de color

Definidos en `tailwind.config.ts` bajo `theme.extend.colors.brand`.

| Token | Valor | Uso |
|---|---|---|
| `canvas` | `#111831` | Fondo principal y superficies de inputs |
| `surface` | `#1B2540` | Base de tarjetas y superficies elevadas |
| `heading` | `#F5F7FA` | Titulares y texto principal |
| `body` | `#C3CBDD` | Texto secundario y párrafos |
| `violet` | `#8B5CF6` | Acentos, bordes e indicadores |
| `blue` | `#60A5FA` | Enlaces, iconos, checks y foco |
| `cyan` | `#22D3EE` | Detalles gráficos, nodos e iconos puntuales |

Uso con Tailwind:

```text
bg-brand-canvas
bg-brand-surface
text-brand-heading
text-brand-body
text-brand-violet
text-brand-blue
text-brand-cyan
border-brand-blue/30
```

### Degradado principal de CTA

- Normal: `#2563EB → #7C3AED`.
- Hover: `#1D4ED8 → #6D28D9`.
- Texto: blanco.
- Dirección: `120deg`.

El violeta `#8B5CF6` se reserva para acentos. No debe usarse como fondo de botones pequeños con texto blanco: su contraste es aproximadamente 4.23:1, inferior al objetivo de 4.5:1.

### WhatsApp

- Fondo: `bg-green-700`.
- Hover: `hover:bg-green-800`.
- Se utiliza únicamente para acciones explícitas de WhatsApp, nunca como CTA genérico.

## 3. Recetas compartidas

Definidas en `src/app/globals.css` dentro de `@layer components`.

| Clase | Función | Dónde se usa |
|---|---|---|
| `brand-page` | Fondo continuo azul/morado, sin movimiento | Home, servicios, QR y menú móvil |
| `brand-section-blue` | Superficie azul oscura y silenciosa | Casos |
| `brand-section-violet` | Superficie violeta oscura y silenciosa | Servicios y prueba |
| `process-section` | Bloque azul cobalto de máximo énfasis | Proceso de home |
| `diagnostic-section` | Superficie índigo del diagnóstico | Home ES/EN |
| `brand-card` | Tarjeta oscura con tinte azul | Servicios, casos, formularios y QR |
| `brand-card-violet` | Tarjeta oscura con tinte morado | Alternancia de tarjetas |
| `brand-button-primary` | CTA azul → morado, hover y sombra | Header, servicios, formulario y cookies |

Reglas:

- No crear un degradado nuevo para cada componente.
- Las recetas de fondo no sustituyen la necesidad de contraste del contenido.
- Las tarjetas de lectura no usan transparencia tipo glassmorphism ni fondos animados.
- Los cambios de marca se hacen primero en los tokens o recetas, no copiando estilos entre archivos.

## 4. Tipografía

### Familia

- **Montserrat**, cargada con `next/font/google` en `src/components/RootShell.tsx`.
- `subsets: ['latin']` y `display: 'swap'`.
- Se mantiene una sola familia principal para toda la interfaz.

### Escala

| Elemento | Tratamiento |
|---|---|
| H1 home | `text-4xl` → `sm:text-5xl` → `lg:text-[3.25rem]` → `xl:text-6xl` |
| H1 servicios | `text-3xl` → `sm:text-4xl` → `md:text-5xl` |
| H2 de sección | `text-3xl` → `md:text-4xl` |
| H3 / título de tarjeta | `text-lg` o `text-xl`, peso 600 |
| Cuerpo principal | 16 px; 18 px en pantallas medias/grandes |
| Texto auxiliar | 14 px; metadatos puntuales de 12 px |
| CTA | 14–16 px, peso 600 |

### Lectura

- H1 con `leading-[1.08]` y `tracking-tight`.
- Titulares con `text-balance`.
- Párrafos con `text-pretty` y `leading-relaxed`.
- Medida objetivo: 55–70 caracteres.
- Mono solo para el logotipo, números de una secuencia real y detalles técnicos puntuales.
- No usar comentarios de código (`//`, `/* */`) ni mayúsculas decorativas en encabezados.

## 5. Layout y espaciado

### Contenedores

| Contexto | Anchura |
|---|---|
| Hero home | `max-w-7xl` |
| Secciones y servicios | `max-w-6xl` |
| FAQ, diagnóstico y formularios | `max-w-3xl` |
| Tarjeta QR | `max-w-5xl` |

### Ritmo

- Margen lateral base: `px-4`.
- Secciones normales: `py-16 md:py-24`.
- Secciones compactas: `py-14 md:py-20`.
- Grids de tarjetas: `gap-5` o `gap-6`.
- Separación entre bloques de texto: múltiplos de 4/8 px.
- Primer y último elemento de una lista conservan el padding previsto; no se elimina con `first:pt-0` salvo necesidad demostrada.

### Hero

- Desktop: `height: 100svh`, con `min-height: 720px`.
- Grid: `1.08fr / 0.92fr`.
- Móvil: altura automática; el contenido fluye y el CTA aparece en la primera pantalla.
- La imagen nunca debe empujar el H1 o el CTA fuera del viewport en desktop.

### Responsive

Puntos de comprobación habituales:

- 390 × 844.
- 1366 × 768.
- 1440 × 900.
- 1920 × 1080.

No debe existir overflow horizontal ni texto oculto por animaciones.

## 6. Forma, bordes y elevación

| Elemento | Radio | Tratamiento |
|---|---|---|
| Botones e inputs | `rounded-xl` | 12 px |
| Tarjetas | `rounded-2xl` | 16 px |
| Hero visual / tarjeta QR | `rounded-3xl` | 24 px |
| Bordes | `border-white/10` o `/15` | Suaves y constantes |
| Bordes de marca | `border-brand-blue/20–45` | Solo en puntos de énfasis |
| Sombras | Azul o violeta oscuro, baja opacidad | Elevación discreta, no glow permanente |

Los elementos interactivos pueden cambiar borde, color o elevación. No se utiliza `scale` como efecto genérico y una tarjeta sin destino no debe parecer clicable.

## 7. Componentes

### Botones

**Primario**

```tsx
<button className="brand-button-primary inline-flex min-h-12 items-center justify-center rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue">
  Solicitar diagnóstico gratuito
</button>
```

**Secundario**

- `border-white/15` o `border-white/20`.
- `bg-white/[0.04]`; hover con `bg-white/[0.08]` o borde azul.
- Misma altura mínima que el primario.

**Enlaces de texto**

- `text-brand-blue` y subrayado con `underline-offset-4`.
- Deben describir el destino: “Ver software a medida”, no “Más información”.

### Tarjetas

- Alternar `brand-card` y `brand-card-violet` cuando ayude al ritmo visual.
- Título, resultado, máximo 3 ejemplos y una acción clara.
- Si toda la tarjeta es enlace, el foco debe llegar a toda ella y el hover debe ser coherente.
- Si no es enlace, no se añaden tilt, escala o affordance de clic.

### Header y navegación

- Header fijo con CTA de diagnóstico en desktop y móvil.
- Fondo `bg-brand-canvas/90` al hacer scroll.
- Menú móvil: una sola transición de opacidad, navegación simple, idioma y CTA.
- Al abrir, foco al primer enlace; Escape cierra y devuelve el foco al botón.
- Estado activo mediante `aria-current="page"`.
- `/services` y `/privacy-policy` se detectan como páginas inglesas.

### Hero visual

- Una transformación automática “Antes → Después” al cargar.
- Cambio de estado a los 1400 ms.
- Sin botón “Repetir animación” y sin loop permanente.
- Imagen real con `next/image`, dimensiones reservadas y `priority` por estar above the fold.
- Con `prefers-reduced-motion`, se muestra directamente el estado final.

### Ritmo entre secciones, proceso y FAQ

- Los cambios de sección se expresan mediante superficies y composición, sin bandas o separadores decorativos independientes.
- El proceso es el único bloque con azul cobalto saturado; usa texto blanco y azul claro para conservar el contraste.
- La lista ordenada presenta número, fase y descripción en columnas desde `md`, sin nodos, conectores ni tarjetas.
- La FAQ de home puede usar `split` para situar el encabezado y el acordeón en dos columnas desde `lg`; otras páginas conservan la composición apilada.
- El cian se limita a iconos y detalles gráficos; no cambia el color de párrafos ni controles.

### Casos

Estructura de cada caso:

1. Reto.
2. Solución.
3. Resultado funcional.
4. Enlace explícito al proyecto, si existe.

No se publican cifras sin fuente. La propiedad del código se describe como condición definida en propuesta y contrato.

### Formulario

- Variantes: `default` y `diagnostic`, con `location` opcional.
- Etiquetas visibles, `autoComplete`, tipos e `inputMode` adecuados.
- Email con `spellCheck={false}`.
- `aria-invalid` y `aria-describedby` en errores.
- Foco al primer error.
- Spinner y `aria-busy` durante el envío.
- Éxito y error anunciados mediante `role="status"` o `role="alert"`.
- `generate_lead` y la conversión de Ads se emiten solo después de `data.success`.

### FAQ

- Botón con `aria-expanded` y `aria-controls`.
- Panel con `role="region"` y `aria-labelledby`.
- Apertura de 200 ms; duración 0 con movimiento reducido.

### Cookies y redes

- Banner compacto, aceptar/rechazar con igual facilidad.
- `env(safe-area-inset-bottom)` en móvil.
- Redes flotantes solo en `md` o superior; nunca compiten con el CTA móvil.

### QR

- `/qr` no muestra header ni iconos sociales flotantes.
- Mantiene `noindex, nofollow`.
- WhatsApp usa solo dígitos en `wa.me` y mensaje específico de origen QR.
- La descarga de `contacto.vcf` es nativa y no se intercepta con navegación JavaScript.
- La imagen usa `next/image` con `width`, `height` y `priority`.

## 8. Movimiento

### Entrada de secciones

- `Reveal` renderiza un `div` estático: el contenido esencial es visible desde el HTML y no depende de JavaScript ni de `IntersectionObserver`.
- Las animaciones de entrada no pueden dejar secciones con `opacity: 0` cuando falla la hidratación.
- La animación se reserva para interacciones y para la transición del hero, que tiene contenido visible desde el primer render incluso si JavaScript no está disponible.

### Global

- `MotionConfig reducedMotion="user"` en `RootShell`.
- CSS adicional para detener animaciones no esenciales bajo `prefers-reduced-motion`.
- En home, servicios y QR no se usan partículas 3D, parallax, tilt, bounce, pulse ni loops ambientales.
- Las animaciones usan principalmente `transform` y `opacity`.

Una animación nueva debe responder “¿qué entiende mejor el usuario gracias a esto?”. Si no hay respuesta, no se añade.

## 9. Accesibilidad

- Contraste mínimo objetivo: 4.5:1 para texto normal y 3:1 para texto grande y controles.
- Foco visible con `focus-visible:ring-2`, normalmente `ring-brand-blue`.
- Un H1 visible por página; no usar H1 oculto ni párrafos SEO invisibles.
- `main` con `id="main-content"` en las páginas principales.
- Enlaces para navegación; botones para acciones.
- Iconos decorativos con `aria-hidden="true"` y botones de icono con `aria-label`.
- Imágenes con `alt`, dimensiones reservadas y `sizes` cuando sea responsive.
- CTA principales con altura mínima de 48 px. Los controles nuevos deben tener objetivos táctiles de 44–48 px.
- No se deshabilita el zoom del usuario.

## 10. Contenido e i18n

- `src/i18n/home-copy.ts` es la fuente de textos ES/EN de home y servicios.
- Todo texto nuevo debe existir en ambos idiomas; no hardcodear inglés dentro de páginas españolas.
- Usar lenguaje comprensible antes que terminología técnica.
- Los CTA describen la acción y mantienen el mismo nombre durante el flujo.
- Oferta principal: **“Diagnóstico gratuito de 30 minutos”** / **“Free 30-minute assessment”**.
- No publicar resultados, propiedad del código, precios o tiempos que no puedan sostenerse comercialmente.

Anclas vigentes:

```text
#diagnostico
#casos
#formulario
#software
#apis
#ia
#consultoria
```

El ancla antigua `#portfolio` no debe utilizarse.

## 11. Analítica

| Evento | Cuándo se emite |
|---|---|
| `contact_click` | CTA de contacto o diagnóstico, con ubicación |
| `whatsapp_click` | Selección real de WhatsApp |
| `email_click` | Selección real de email |
| `service_click` | Navegación hacia un servicio |
| `case_study_click` | Acceso a un proyecto |
| `form_start` | Primer cambio real en un formulario, una vez por montaje |
| `generate_lead` | Solo tras respuesta correcta de Web3Forms |
| `conversion` (Ads) | Solo tras respuesta correcta de Web3Forms |
| `contact_download` | Descarga de la vCard |
| `qr_navigation` | Navegación desde la tarjeta QR |

`trackEvent` envía a GA4 y PostHog. Los clics de contacto no son leads.

En QA no se envían leads reales: se bloquea analítica y se simula Web3Forms. La conversión se verifica en el `dataLayer`.

## 12. Qué hacer y qué evitar

### Hacer

- Recuperar la identidad mediante fondos y superficies con intención.
- Mantener una acción primaria clara por contexto.
- Mostrar ejemplos y proyectos reales.
- Probar teclado, responsive y movimiento reducido.
- Reutilizar tokens y componentes compartidos.

### Evitar

- Gradientes nuevos e inconsistentes.
- Glows, escalados y animaciones infinitas como decoración.
- Titulares con símbolos de código.
- CTA formados solo por iconos sin explicación visible.
- Tarjetas clicables sin destino.
- Métricas o testimonios inventados.
- Nuevas dependencias sin justificación.

## 13. Mapa del código

| Responsabilidad | Archivo |
|---|---|
| Tokens Tailwind | `tailwind.config.ts` |
| Recetas de marca y motion CSS | `src/app/globals.css` |
| Fuente y MotionConfig | `src/components/RootShell.tsx` |
| Hero | `src/components/landing/AnimatedLanding.tsx` |
| Visual del hero | `src/components/landing/HeroProcessVisual.tsx` |
| Problemas | `src/components/landing/ProblemsSection.tsx` |
| Casos | `src/components/landing/PortfolioSection.tsx` |
| Servicios en home | `src/components/landing/ServicesSection.tsx` |
| Proceso | `src/components/landing/ProcessSection.tsx` |
| FAQ | `src/components/landing/FaqSection.tsx` |
| Página de servicios compartida | `src/components/services/ServicesPageContent.tsx` |
| Formulario | `src/components/ContactForm.tsx` |
| Header | `src/components/Header.tsx` |
| Cookies | `src/components/CookieConsent.tsx` |
| Redes flotantes | `src/components/FloatingSocialIcons.tsx` |
| Tracking | `src/lib/analytics.ts` |
| Contenido ES/EN | `src/i18n/home-copy.ts` |
| Tarjeta QR | `src/app/(es)/qr/QrLandingClient.tsx` |
| Datos de contacto | `src/data/company.json` |
| vCard | `public/contacto.vcf` |

## 14. Checklist para nuevos cambios

Antes de considerar terminado un componente:

1. Usa tokens y recetas existentes.
2. Mantiene ES y EN cuando corresponda.
3. Funciona a 390 px y no genera overflow.
4. Tiene foco visible y semántica correcta.
5. Respeta `prefers-reduced-motion`.
6. No introduce loops, parallax o glassmorphism sin justificación.
7. Los eventos y conversiones se disparan en el momento correcto.
8. `npm run lint` pasa.
9. `npm run build` pasa.
10. Se revisa el resultado real en navegador, no solo el código.
