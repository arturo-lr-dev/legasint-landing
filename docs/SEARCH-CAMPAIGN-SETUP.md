# Campaña Search — Guía de creación paso a paso

> Todo listo para copiar/pegar. Estado previo: **PMax-1 pausada** y **54 categorías de apps excluidas** a nivel cuenta (29-ago-2026). Detalles en `ADS-2026-08-29.md`.

---

## 1. Crear la campaña

Botón **Crear (+) → Campaña** y rellena el asistente así:

| Campo | Valor |
|---|---|
| Objetivo | **Clientes potenciales** |
| Tipo de campaña | **Búsqueda** |
| Nombre | `Search - Leads B2B` |
| Conversiones | `generate_lead` (primaria — ya configurada) |

## 2. Configuración general

| Campo | Valor | Ojo |
|---|---|---|
| Redes | **Solo Búsqueda de Google** | ⚠️ **Desmarca** "Socios de búsqueda" y "Red de Display" |
| Ubicación | **España** | En "Opciones de ubicación" elige **"Presencia: personas en las ubicaciones segmentadas"** (no la opción por defecto que incluye "interés") |
| Idioma | **Español** | |
| Presupuesto | **8 €/día** | |
| Puja | **Clics → Maximizar clics** con **CPC máx. 1,00 €** | Cuando tengas 15-20 leads, cambia a "Maximizar conversiones" |
| URL final (tracking) | vacío | |

## 3. Grupos de anuncios y keywords

Pega tal cual (las `"comillas"` = concordancia de frase, los `[corchetes]` = exacta):

### Grupo 1: `Software a medida` — URL final: `https://legasint.com/software-a-medida` (landing PPC dedicada desde 30-ago)
```
"desarrollo software a medida"
[desarrollo software a medida]
"empresa desarrollo software"
[empresa desarrollo software]
"desarrollo aplicaciones a medida"
[desarrollo aplicaciones a medida]
"crear software a medida"
"agencia desarrollo software"
```
Ampliación (30-ago):
```
"software a medida para empresas"
[software a medida para empresas]
"desarrollo web a medida"
[desarrollo web a medida]
"programación a medida"
"desarrollo de aplicaciones web"
[desarrollo de aplicaciones web]
"agencia de desarrollo web"
"externalizar desarrollo software"
"outsourcing desarrollo software"
"presupuesto desarrollo software"
"cuánto cuesta un software a medida"
"erp a medida"
[erp a medida]
"crm a medida"
```

### Grupo 2: `CTO externo` — URL final: `https://legasint.com/cto-as-a-service` (landing PPC dedicada desde 30-ago)
```
"cto as a service"
[cto as a service]
"cto externo"
[cto externo]
"socio tecnológico"
[socio tecnológico]
"director tecnología externo"
"cto fraccional"
```
Ampliación (30-ago):
```
"consultor tecnológico"
[consultor tecnológico]
"consultoría tecnológica"
[consultoría tecnológica]
"asesor tecnológico empresa"
"externalizar departamento de tecnología"
"departamento tecnológico externo"
"cto por horas"
"auditoría técnica de software"
"auditoría de código"
```

### Grupo 3: `Automatización IA` — URL final: `https://legasint.com/automatizacion-ia` (landing PPC dedicada desde 30-ago)
```
"automatización de procesos"
[automatización de procesos]
"automatizar procesos empresa"
"consultora inteligencia artificial"
"integrar ia en empresa"
"automatización con inteligencia artificial"
"consultoría ia empresas"
```

## 4. Anuncios (1 RSA por grupo) — textos ya validados (≤30/≤90 caracteres)

### Grupo 1 — Software a medida
**Títulos:**
```
Desarrollo Software a Medida
Tu Socio Tecnológico
Pide Presupuesto Gratis
Web, APIs e Integraciones
Equipo Senior de Desarrollo
Angular, React, Node, Python
Cuéntanos tu Proyecto
Software que Escala Contigo
```
**Descripciones:**
```
Convertimos tu idea en software a medida: equipo senior y entregas ágiles.
Desarrollo web, APIs e integraciones para empresas en España. Pide tu propuesta hoy.
```

### Grupo 2 — CTO externo
**Títulos:**
```
CTO as a Service
Tu CTO Externo
Dirección Tecnológica Externa
Estrategia y Arquitectura
Primera Consulta Gratuita
Liderazgo Técnico Flexible
```
**Descripciones:**
```
Un CTO fraccional: estrategia, arquitectura y liderazgo técnico sin coste fijo.
Decisiones tecnológicas con impacto en negocio. Primera consulta gratuita.
```

### Grupo 3 — Automatización IA
**Títulos:**
```
Automatización con IA
De 40 Horas a 4 con IA
Automatiza Tareas Repetitivas
Consultora de IA para Empresas
ROI Medible en Semanas
IA Integrada en tus Flujos
```
**Descripciones:**
```
Automatizamos documentos, compliance y atención al cliente con IA. ROI medible en semanas.
Integramos IA en tus flujos de trabajo actuales. Pide una demo sin compromiso.
```

## 5. Recursos (assets) — añade tras crear la campaña

**Enlaces de sitio (sitelinks):**
| Texto | URL |
|---|---|
| Servicios | https://legasint.com/servicios |
| Software a Medida | https://legasint.com/software-a-medida |
| Automatización IA | https://legasint.com/automatizacion-ia |
| ERP a Medida | https://legasint.com/erp-a-medida |
| Contacto | https://legasint.com/contacto |

**Textos destacados (callouts):**
```
Sin compromiso
Equipo senior
Entregas ágiles
Soporte continuo
IA y automatización
Expertos AI Act y NIS2
Desarrollo a medida
CTO as a Service
```

**Fragmento estructurado** — Tipo "Servicios":
```
Desarrollo web
APIs e integraciones
Automatización IA
CTO as a Service
Compliance AI Act
ERP a medida
```

## 6. Palabras clave negativas (nivel campaña)

Tras crear: **Campañas → Audiencias, palabras clave y contenido → Palabras clave negativas → +** → selecciona la campaña y pega:
```
gratis
curso
cursos
formación
empleo
trabajo
ofertas de trabajo
salario
sueldo
freelance
qué es
que es
pdf
plantilla
descargar
ejemplo
bootcamp
```

## 7. Checklist final antes de activar

- [ ] Redes: Display y partners **desmarcados**
- [ ] Ubicación: España, opción "Presencia" solamente
- [ ] CPC máx: 1,00 €
- [ ] Conversión objetivo: `generate_lead`
- [ ] Negativas añadidas
- [ ] Sitelinks + callouts añadidos
- [ ] PMax-1 sigue pausada (evita competir contigo mismo)

## 8. Seguimiento (revisar en 7 días)

- **Términos de búsqueda** (Estadísticas e informes → Términos de búsqueda): añade negativas de lo irrelevante y convierte en exactas las queries que conviertan.
- En GA4: el tráfico `google / cpc` debería pasar de ~0 % a **>40 % de sesiones engaged**.
- Primer lead real → considera subir puja o pasar a Maximizar conversiones con CPA objetivo.
- Si algún grupo no recibe impresiones (volumen bajo), amplía a frase adicionales o quita la exacta.
