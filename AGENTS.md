# AGENTS.md — legasint-landing

Landing de Legasint (Next.js, App Router, Tailwind, i18n es/en). Formulario de contacto: Web3Forms (`src/components/ContactForm.tsx`) → dispara `generate_lead` (GA4) + conversión Google Ads (`AW-18414116550`) solo tras envío exitoso.

## MCPs disponibles y qué consultar con cada uno

### 1. `analytics-mcp` (Google Analytics 4 — Data API)
Cuenta GA: **LEGASINT** (`accounts/341886678`)

> ⚠️ Auth (30-ago-2026): Google bloquea los scopes `analytics.readonly`/`adwords` para el client ID por defecto de gcloud. El ADC usa un **cliente OAuth propio** (Desktop, ID `197186183794-gerab15o6tj924r7ja218kthkcc9bld0`, proyecto `hermes-ceo-assistant`, JSON en `~/.config/gcloud/legasint-oauth-client-secret.json`). Si caduca: `gcloud auth application-default login --client-id-file=<json> --scopes=openid,https://www.googleapis.com/auth/userinfo.email,https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/adwords` y **reiniciar la sesión del CLI** (el servidor MCP cachea credenciales al arrancar).

| Propiedad | ID | Uso |
|---|---|---|
| **LEGASINT WEB - LANDING** | `473775622` | ⭐ La propiedad de ESTA landing. Consultar siempre esta para tráfico, `generate_lead`, campañas, engagement |
| ARTURO.WORK | `499689223` | Otra web del usuario |
| LANDING IANDING | `527474259` | Otra landing |

- Zona horaria: Europe/Madrid · Moneda: EUR
- Eventos clave: `generate_lead` (key event, form contacto), `contact_click`, `whatsapp_click`, `email_click`, `form_start`, `social_click`
- Tráfico de pago: filtrar `sessionSourceMedium` = `google / cpc` o channel group `Cross-network` (PMax) / `Paid Search`

### 2. `google-ads-mcp` (Google Ads API)
| Customer ID | Notas |
|---|---|
| `4456914784` | ⭐ Cuenta principal, vinculada a GA4 `473775622`. Campañas: `Performance Max-1` (⏸️ pausada 29-ago-2026, tráfico basura) y `Search - Leads B2B` (✅ activa desde 29-ago-2026, 8 €/día, solo Search) |
| `6804435656` | Segunda cuenta accesible, sin campañas conocidas ni vinculación GA4 |

- ⚠️ Developer token nivel **test accounts** → la API devuelve error con cuentas reales. Para datos de Ads usar la UI (navegador) o GA4. Subir a Basic en: MCC → Admin → Centro de API.
- Conversión de leads: tag `AW-18414116550` (label por defecto en `src/lib/analytics.ts`)

### 3. `posthog` (PostHog MCP)
- ⚠️ El MCP apuntaba a OTRO proyecto ("Default project" 256985, org Legasint). El proyecto DE ESTA LANDING es:
  - **Project ID `260549`** · token público `phc_zaqD2RAqgNHVnqodcXifUJgkKuQj9ujynWvgETqyZuZb` · región EU (`eu.posthog.com`)
  - La API key personal nueva está en `~/.kimi/mcp.json` (POSTHOG_AUTH_HEADER). Requiere reiniciar sesión para que el MCP la use; mientras tanto se puede consultar la API REST con `Authorization: Bearer <key>` (ver `memory/google-ads-2026-08-29.md` §5)
- Productos: session replay (grabaciones de visitantes de ads), error tracking, web analytics

## Memoria de sesiones
- Skill `load-mcp-legasint` (`~/.claude/skills/load-mcp-legasint`) — restaura `~/.kimi/mcp.json` con los MCP de Legasint, verifica auth ADC y documenta el relogin con cliente OAuth propio. Usar si se cambia a la config de otra entidad o hay 403 de scopes.
- `memory/google-ads-2026-08-29.md` — historia completa PMax→Search, errores cometidos, checklist de revisión
- `docs/SEARCH-CAMPAIGN-SETUP.md` — guía de la campaña Search (keywords, anuncios, negativas)
- `docs/ADS-2026-08-29.md` — diagnóstico PMax

## Browser automation (kimi-webbridge)
- El usuario trabaja con Google Ads en SU navegador vía WebBridge (daemon `http://127.0.0.1:10086`, skill `~/.claude/skills/kimi-webbridge`)
- Modo de trabajo acordado: el agente navega a la pantalla correcta → el usuario ejecuta las acciones → el agente verifica cuando el usuario dice "hecho"
- Google puede pedir confirmación de identidad en acciones sensibles (publicar campañas) → notificar al usuario, no se puede automatizar
