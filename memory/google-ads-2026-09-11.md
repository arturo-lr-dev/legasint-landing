# Memory — Google Ads Legasint (sesión 11 sept 2026)

> Revisión de la campaña "Search - Leads B2B" tras ~2 semanas activa. 0 leads. Se pausa el grupo "Automatizaciones IA".

## 1. Situación y resultado

- Campaña **Search - Leads B2B** activa desde 29-ago, 8 €/día, solo Search.
- **0 leads reales** hasta el 11-sept. Usuario lo confirma; GA4 MCP daba 403 (credenciales ADC caducadas — ver AGENTS.md §1 para el relogin con cliente OAuth propio).
- Snapshot de grupos de anuncios (UI, 11-sept):
  | Grupo | Estado | Clics | Coste | Conv. |
  |---|---|---|---|---|
  | Automatizaciones IA | **En pausa (11-sept)** | 27 | 33,55 € | 0 |
  | Software a medida | Apto | 13 | 16,82 € | 0 |
  | CTO externo | Apto | 2 | 2,41 € | 0 |
  | **Total campaña** | | **42** | **52,78 €** | **0** |
- **Automatizaciones IA acaparaba el 64% de los clics y del gasto** con 0 conversiones → por eso se pausó.

## 2. Informe de términos de búsqueda (27 ago – 8 sept) — el porqué

- Solo 9 clics con término visible (8 imp., 11,08 €): el resto cae en el bucket oculto "otros términos" de Google (~30 clics no reportados). No hay discrepancia real con los 42 clics totales.
- **Todos los clics visibles venían de "Automatizaciones IA"** y eran basura de concordancia amplia:
  - Marcas ajenas: `substrate ai` (2 clics), `abinitio`, `cegid peoplenet`, `iactiva labs`, `ust global clients`, `manus ai`
  - Palabras sueltas genéricas: `gestión`, `srm`
  - Único clic de "CTO externo": `it consulting kpmg` (marca ajena también)
- Impresiones sin clic igual de malas: `indra`, `minsait`, `ntt data`, `kyndryl`, `seidor barcelona`, `sngular`, `salesforce`, `sap`, `snowflake`, `celonis madrid`, `docuware`, consultas informacionales (`que significa erp en una empresa`, `definir automatización`, `licencia sap precio`...).
- **Lección**: la concordancia amplia en este nicho empareja con marcas de consultoras/software y búsquedas informacionales. El grupo Automatizaciones IA tenía keywords demasiado genéricas ("automatizacion", "ia"...). Frase/exacta + negativas de marcas son imprescindibles.

## 3. PostHog (proyecto 260549) — qué hacían los visitantes de pago

Últimos 7 días (5–11 sept): 93 visitantes (-26% semana anterior), **Paid Search = 45 (48% del tráfico)**.

- Grabaciones de las 20 sesiones de pago más largas (todas `gad_campaignid=24191874374` = Search - Leads B2B):
  - La mayoría se van en **10–40 s** sin clicar nada; las 2 sesiones largas (6–7 min) eran pestañas inactivas al ~90%.
  - **0 clics en CTAs de contacto en toda la semana.** Los pocos clics eran menú ("Inicio", "Servicios") o "Rechazar" (cookies).
  - 0 rageclicks, 0 errores de consola → no es un problema técnico de la web, es tráfico sin intención.
- Países: ES 62%, US 19%, CN 8%... → ~25% tráfico fuera de España (poco útil para B2B en español).
- Landings de entrada: `/software-a-medida` (26), `/automatizacion-ia` (23), `/` (19).
- Métricas rotas en este proyecto PostHog: bounce rate y `$is_bounce` devuelven siempre 0 — no fiarse de ellos; usar grabaciones.
- UTMs no llegan a PostHog (todo `(none)`); la atribución se ve por `gad_source`/`gclid` en la URL de entrada.

## 4. Acciones tomadas / pendientes

- ✅ **11-sept: usuario pausó el grupo "Automatizaciones IA"** (verificado en UI: estado "En pausa"). Prueba de 1 semana solo con "Software a medida" y "CTO externo".
- ⏳ Revisar ~18-sept: términos de búsqueda de los grupos restantes, leads, y si el gasto baja de forma proporcional.
- ⏳ Pasar TODAS las keywords a frase/exacta (los 3 grupos; el informe demuestra que quedan keywords en amplia) y verificar geografía = España "Presencia".
- ⏳ Auth GA4 MCP rota (403) — relogin ADC antes de la próxima revisión para cruzar `generate_lead`.

## 5. Lista de keywords NEGATIVAS propuesta (11-sept)

> Añadir a **nivel de campaña** "Search - Leads B2B". Palabra suelta = negativa amplia; varias palabras = negativa de frase `"..."`. Extraída del informe de términos 27-ago → 8-sept.

**A. Marcas de consultoras / empresas tech (gente buscando OTRA empresa):**
```
indra
minsait
ntt data
nttdata
kyndryl
seidor
sngular
kpmg
nunsys
ust global
solvo
sumsols
tactio
neo consulting
iactiva
abalia
akui
alia technologies
aliando
apralize
auria
bahía software
bivelio
centribal
cobalt
creao
dataloc
delone
evolk
gestcoop
glofy
gminds
kodarvia
leantech
legato
lokkin
maisa
naxia
nervia
optiwai
panggea
pitagorines
principal33
primero ai
scentia
serdatia
smartops
genai sapiens
```

**B. Productos de software ajenos (buscan herramienta, no consultora):**
```
sap
salesforce
snowflake
docuware
celonis
celigo
asprova
a3erp
cegid
peoplenet
abinitio
substrate
manus
joule
chatgpt
chat gpt
```
⚠️ NO poner `erp` como negativa — Legasint ofrece "ERP a medida". Bloquear solo `"licencia sap"`, `"sap hcm"`, etc. vía marcas de arriba.

**C. Informacionales / estudiantes / tutoriales:**
```
"que es"
"que significa"
"quiere decir"
definicion
definir
ejemplos
elementos
"para que sirve"
blog
pdf
curso
cursos
tutorial
"best practices"
"using python"
```

**D. Empleo / gratis (preventivas, clásicas en B2B):**
```
empleo
"ofertas de trabajo"
trabajar
curriculum
salario
sueldo
freelance
gratis
```
⚠️ `gratis` y `freelance` son preventivas; revisar si cortan algún término bueno en el próximo informe.

**E. Geografía no objetivo (si la segmentación sigue en "Presencia o interés"):**
```
colombia
colombianas
chile
mexico
argentina
```
