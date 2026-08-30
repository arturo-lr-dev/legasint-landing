# Memory — Google Ads Legasint (sesión 29 ago 2026)

> Contexto para futuras revisiones. Qué pasó con la campaña antigua, errores cometidos, métricas malas, y estado de la nueva campaña Search.

## 1. La campaña antigua (Performance Max-1) — PAUSADA el 29-ago

- Lanzada el **27-ago-2026**, presupuesto 8 €/día, objetivo leads.
- Vinculada a GA4 (propiedad LEGASINT WEB - LANDING, id 473775622) el 27-ago.
- **Resultado tras 2 días: 0 leads reales.** Los 8 eventos `generate_lead` registrados eran pruebas propias del usuario.
- **Diagnóstico (informe de ubicaciones)**: 3.333 impresiones en placements basura:
  - Apps móviles: Radios FM, JunkRemover, Pou, "Cleaner" de Xiaomi, dialers, juegos de bebés...
  - Sites de juegos: poki.com, aaxxgames, hypergames, littleyardgames, goodkidsgame...
  - Granjas de contenido: quizwinz, quizela, 92fornew, myfunmax, buzzf.social, lsmagazineimg...
- **Métricas malas**:
  - ~300 clics el 28-ago con ~3.300 impresiones totales → **CTR ~10% irreal** = clics accidentales (juegos/apps).
  - GA4: **0 sesiones engaged de 19** sesiones `google/cpc` (100% rebote).
  - PostHog (session replay): 9 de 10 visitantes de ads se iban en **<30 segundos**, todos Android móvil España.
- **Conclusión**: PMax con presupuesto pequeño (8€/día) y 0 conversiones históricas → Smart Bidding optimiza a clics basura. Mal formato para lead-gen B2B en frío. PMax no permite limitar a red de Search → por eso se decidió migrar a campaña Search pura.

## 2. Errores cometidos durante la migración (para no repetirlos)

1. **El asistente guardó las keywords autogeneradas por Google** (5 en concordancia amplia: "sistemas a medida", "empresas de desarrollo"...) en vez de las de la guía → hubo que borrarlas y rehacer.
2. **Se pegaron los TÍTULOS DEL ANUNCIO como keywords** (7 en amplia: "Pide Presupuesto Gratis", "Tu Socio Tecnológico"...) → Google las marcó "no apta, volumen bajo". Hubo que borrarlas y pegar el bloque correcto con sintaxis `"frase"` y `[exacta]`.
3. **Grupo CTO se creó solo con 2 de 8 keywords** (quedaron pendientes 6: "cto externo", [cto externo], "socio tecnológico", [socio tecnológico], "director tecnología externo", "cto fraccional").
4. **Confusión con "Envíos de formularios por parte de clientes potenciales"** en el asistente: NO es el form de la web, es el formulario nativo de Google en el anuncio. Lo correcto era "Visitas al sitio web". La conversión del form propio ya venía del objetivo de conversión de la cuenta.
5. **Google pidió confirmación de identidad 2 veces** (la 2ª sin opción de saltar) antes de publicar. Es normal en cuentas nuevas.
6. Tracking: al principio `generate_lead` también se disparaba con clics de contacto (WhatsApp/email) → mismatch de datos los primeros días. Ya corregido en código: solo dispara tras envío exitoso del form (Web3Forms). `form_start` (2) vs `generate_lead` (8) reflejaba ese bug.

## 3. Estado de la cuenta a 29-ago-2026

- ⏸️ **Performance Max-1**: pausada (NO reactivar sin revisar placements).
- ✅ **Exclusiones nivel cuenta**: 54 categorías de apps móviles excluidas (Herramientas → Idoneidad del contenido → Emplazamientos excluidos). Objetivo pendiente: las 140. Dominios aparcados ya estaban excluidos.
- ✅ **Campaña "Search - Leads B2B" PUBLICADA el 29-ago**:
  - Tipo: Búsqueda · Solo Red de Búsqueda de Google (sin Display ni partners)
  - Objetivo: Oportunidades de venta → conversión "Envío de formularios para clientes potenciales" (generate_lead del tag AW-18414116550)
  - Puja: Maximizar clics, CPC máx 1,00 € · Presupuesto 8 €/día
  - España (⚠️ verificar que quedó "Presencia" y no "Presencia o interés") · Español
  - IA Max: desactivado
  - Grupos:
    - **Software a medida** — 8 keywords frase/exacta ✓, anuncio RSA con textos generados por Google (pendiente: sustituir por copy de la guía si se quiere)
    - **CTO externo** — anuncio RSA de la guía ✓, keywords 2/8 (⚠️ faltan 6)
    - **Automatización IA** — ⚠️ PENDIENTE DE CREAR (keywords y anuncio en `docs/SEARCH-CAMPAIGN-SETUP.md`)
  - Negativas: 17 definidas en la guía (gratis, curso, empleo, qué es, pdf...) — ⚠️ verificar que se añadieron a nivel campaña
- Token de Google Ads API: nivel "test accounts" — para consultar por API hace falta subir a Basic (Admin → Centro de API en cuenta MCC). Mientras, métricas vía GA4 MCP.

## 3b. Update 30-ago-2026

- Keywords ampliadas en los 3 grupos (guía actualizada, secciones "Ampliación 30-ago"). Grupo 3 "Automatizaciones IA" creado. 5 keywords desactivadas por Google ("volumen de búsquedas bajo"), resto Apto.
- ⚠️ **Límite de inversión diaria de 2 €/día a nivel CUENTA aplicado por Google** (control de riesgo de cuenta nueva). Explica las poquísimas impresiones pese a campaña Apta. Verificación de anunciante **enviada el 30-ago pero el límite NO se levantó al momento** — Google tarda 1-5 días laborables en revisar y el límite se reevalúa después con historial de pagos. Si 1 semana tras la aprobación sigue el límite → Ayuda → Contactar, pedir "removal of the daily spending limit".
- Facturación OK: saldo 9,22 €, primer cobro 10 € (28-ago), Mastercard •••5289.
- NO aplicar la recomendación "Fija un CPA objetivo" hasta tener 15-20 leads reales (sin conversiones, Smart Bidding no tiene datos).

## 3c. Update 30-ago-2026 (tarde) — setup COMPLETO ✅

Verificado en la UI:
- ✅ CPC máx: **1,50 €**
- ✅ Negativas: **17/17** a nivel campaña
- ✅ Ubicación: **"Presencia"** (corregido y guardado, verificado por segunda vez)
- ✅ Otros ajustes correctos: concordancia amplia desactivada a nivel campaña, recursos automáticos desactivados, idioma Español, sin anuncios políticos UE
- Regla acordada con el usuario: **el tope de CPC NO se quita** mientras no haya datos de conversión. Solo subir gradualmente (2 €) si no gana subastas tras levantarse el límite de cuenta. Al pasar a CPA objetivo (15-20 leads) el tope deja de aplicar.
## 3d. Update 30-ago-2026 (noche) — primer clic + hallazgos PostHog

- ✅ Primer clic de la Search: grupo Automatizaciones IA, CPC real 0,61 € (bajo el tope de 1,50 €). 4-5 impresiones día 1.
- PostHog hoy (20 sesiones con gclid):
  - ~15 sesiones "United States" desktop 0-1s SIN campaignid = bots de verificación de clics de Google (no facturables, ignorar).
  - 1 sesión Search (Ecuador?? con targeting Presencia España — vigilar, posible VPN/geoIP impreciso).
  - ⚠️ 2 sesiones España con `gad_campaignid=24191771254` — campaña DESCONOCIDA, no está en la cuenta 4456914784. Posible campaña activa en la segunda cuenta (6804435656) sirviendo a legasint.com. GA4 la atribuyó como "Performance Max-1" pese a estar pausada. PENDIENTE: revisar la otra cuenta.
- GA4 auth: el MCP de la sesión quedó obsoleto tras caducar ADC; el usuario re-autenticó. NOTA para el futuro: gcloud ya NO permite añadir scopes analytics/adwords al client por defecto → si caduca de nuevo, crear OAuth client propio (client-id-file) en GCP o service account. API directa con `gcloud auth application-default print-access-token` funciona como workaround.
- ⏳ Sigue pendiente: que Google levante el límite de 2 €/día (verificación de anunciante enviada, en revisión).

## 3e. Update 30-ago-2026 (noche) — landings PPC dedicadas

Auditoría UX de /servicios (score 55/100, "fair"): sin CTA above the fold, sin prueba social, sin message match. Implementado TODO:
- /servicios: CTA en hero, franja de prueba social (proyectos), anchors por servicio (#software, #apis, #ia, #consultoria), placeholders del form en español, WhatsApp/email junto al form.
- **3 landings PPC nuevas** (componente compartido `src/components/ppc/PpcLanding.tsx`, copy en `src/i18n/ppc-copy.ts`):
  - `/software-a-medida` (Grupo 1), `/cto-as-a-service` (Grupo 2), `/automatizacion-ia` (Grupo 3)
  - Cada una: hero con message match del anuncio, 4 beneficios específicos, prueba social, proceso, CTA final + form + contacto directo.
  - Tracking: `ppc_landing_view` (label=servicio) al cargar, `contact_click` con labels `ppc_<key>_hero|final`, whatsapp/email con label `ppc_<key>` → GA4 + PostHog. El `generate_lead` del form no cambia.
- Sitemap actualizado. Build OK.
- ⚠️ PENDIENTE: deploy a producción + cambiar URL final de los 3 anuncios en Google Ads a las nuevas landings (guía actualizada).

## 4. Por dónde seguir — checklist próxima revisión (~7 días, 5-6 sept)

1. **Confirmar que se levantó el límite de 2 €/día** (si tras 1 semana de verificación aprobada sigue → soporte: "removal of the daily spending limit"). El resto del setup está COMPLETO (verificado 30-ago tarde).
2. **Rendimiento**: ¿impresiones/clics en Search? ¿CPC real vs 1€ máx?
3. **Calidad del tráfico en GA4**: el `google/cpc` debería pasar de ~0% a **>40% sesiones engaged**. Si sigue 100% rebote → problema de landing, no de anuncio.
4. **Términos de búsqueda** (Estadísticas e informes → Términos de búsqueda): añadir negativas de lo irrelevante; pasar a exactas las queries que conviertan.
5. **Primer lead real**: vigilar `generate_lead` con source/medium = google/cpc en GA4.
6. **Si hay 15-20 leads**: cambiar puja a Maximizar conversiones.
7. **Si 200-300 clics sin leads**: revisar above-the-fold móvil de la landing y recorrido al form (los visitantes de PMax se iban en <10s).

## 5. Referencias

- Guía completa de la campaña: `docs/SEARCH-CAMPAIGN-SETUP.md`
- Nota de diagnóstico PMax: `docs/ADS-2026-08-29.md`
- GA4 propiedad: 473775622 (LEGASINT WEB - LANDING) · Ads customer: 4456914784
- Form: Web3Forms (`NEXT_PUBLIC_WEB3FORMS_KEY`), `trackLead('contact_form')` en `src/components/ContactForm.tsx`
