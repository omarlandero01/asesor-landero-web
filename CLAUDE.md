# CLAUDE.md — asesor-landero-web

> Leer completo al inicio de cada sesión. Última actualización: 2026-09-23 (nueva página /gmm — landing de captura de leads para Seguro de Gastos Médicos Mayores).

---

## INSTRUCCIONES DE TRABAJO

- Tienes libertad total para hacer cambios, commits y deploys a Vercel sin pedir confirmación en cada paso.
- Al finalizar cada tarea, reporta qué hiciste, qué archivos modificaste y el estado del deploy.
- Trabajamos en español.
- Si algo puede romper el sitio en producción, avísame antes de ejecutar.
- **Al terminar cada tarea o sesión:** actualiza este CLAUDE.md automáticamente — mueve lo completado a "Implementado ✅", actualiza el backlog, y agrega cualquier clase CSS, ID o regla técnica nueva que se haya descubierto. Esto es obligatorio, no opcional.

---

## CONTEXTO DEL PROYECTO

**Propietario:** Omar Landero — asesor de seguros independiente y asesor financiero en México.  
**Repositorio:** `omarlandero01/asesor-landero-web`  
**Dominio:** asesorlandero.com.mx  
**Deploy:** Vercel (automático desde GitHub push)  
**Stack:** HTML puro + CSS + JS vanilla. Sin build system, sin node_modules, sin frameworks.

---

## ESTRUCTURA DEL SITIO

| Ruta | Propósito | Estado |
|---|---|---|
| `/` | Home principal | Funcional ✅ |
| `/ppr` | Simulador PPR móvil (leads de Meta) | Completo y funcional ✅ |
| `/retiro` | Landing PPR desktop con simulador embedded | Completo v2 ✅ |
| `/retiro-ads` | Landing corta para tráfico frío de Meta Ads (hero sin foto + simulador, paleta blanco/navy, sin mención Allianz) | v2 en producción ✅ (24 sep 2026) |
| `/seguro` | Landing cotizador seguros de vida (NO gastos médicos) | Funcional ✅ |
| `/gmm` | Landing de captura de leads — Seguro de Gastos Médicos Mayores (sin cotizador, solo agenda asesoría) | Completo y en producción ✅ (sep 2026) |
| `/links` | Link in bio Instagram | Existe, optimización pendiente |

---

## REGLAS CRÍTICAS — NO MODIFICAR NUNCA

1. **CTAs "Agendar asesoría"** en el home (`index.html`): deben apuntar a:
   ```
   https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1Vu4MKCXBbIo51tARMhJ4nhzVncuzU4DjJlNn6DTJvWFxg5aB-U8oslhJaKpjazlj1Sgu9kCpe
   ```
   **NO** usar meet.hubspot.com (ese link no existe).

2. **Testimonios y Blog en home:** tienen `display: none`. No activar hasta que haya contenido real.

3. **WhatsApp:** +52 9933205649

4. **`/retiro` nav pill y hero buttons:** apuntan a `#simulador`. No cambiar a `/ppr-sim` ni a otra ruta.

5. **Meta Pixel y tracking:** gestionados EXCLUSIVAMENTE vía GTM (`GTM-TLMKJNZ4`). NO agregar píxeles, fbq, o scripts de analytics hardcodeados en las páginas. Todo tracking pasa por GTM.

6. **`/retiro` y `/retiro-ads` usan Calendly** (`https://calendly.com/asesorlandero/ppr`) para agendar, NO el link de Google Calendar Appointments de la regla 1 — ese es exclusivo del home. No confundir ni unificar los dos.

7. **`/gmm` tiene su propio Calendly** (`https://calendly.com/asesorlandero/gmmi`), distinto del de PPR — es un evento separado para asesoría de Gastos Médicos Mayores. No unificar con el Calendly de `/retiro`/`/retiro-ads`, y no confundir `/gmm` con `/seguro` (cotizador de seguro de **vida**, no de gastos médicos).

---

## PRODUCTOS

**Principal:** Optimax Plus — Allianz México (PPR). Aportación mínima $2,000 MXN/mes. CNSF cédula V409234.  
**Otros:** Seguro de vida, seguro de vida con ahorro, seguro de gastos médicos mayores (GMM).

---

## ESTADO HOME — index.html ✅

### Cambios implementados

- Foto hero: `images/omar-hero.png` — izquierda, señala hacia el texto
- Foto bio: `images/omar-bio.png` — sección El Asesor
- Fotos: PNGs con fondo transparente (generados con rembg + PIL getbbox crop)
- Headline: "Tu dinero puede hacer más de lo que crees."
- Subheadline: "Te ayudo a entender cómo — sin letra chica, sin presión."
- Firma: "Omar Landero · Asesor Financiero · Allianz México"
- Botón primario (filled): "Simular mi retiro →"
- Botón secundario (outline): "Agendar asesoría gratuita →"
- Heading bio: "Entiende antes de decidir."
- Esquema de fondos: `#1f3056` hero → `#F5F7FA` bio → `#ffffff` problema → `#F5F7FA` herramientas → `#1f3056` CTA final
- Ícono "Asesoría 100% gratuita": checkmark oscuro (visible sobre fondo blanco)
- Logo Allianz: `images/logo-allianz.jpg` en `height:64px` ✅
- Texto tarjeta Allianz: "Respaldo Allianz México / Una de las aseguradoras más sólidas del mundo..."
- Testimonios y blog: `display: none`
- CSS hero foto: `.hero__photo-wrap` flex align-end, `.hero__photo` height 520px, object-fit contain
- CSS bio foto: `.omar__photo-wrap` flex align-end con `::after` sombra elíptica, `.omar__photo` height 400px

---

## ESTADO /retiro — retiro/index.html ✅ (v2 — 2026-06-09)

### Secciones en orden

1. **`#hero`** — grid-2 desktop, botones apuntan a `#simulador`
2. **`#afore`** — brecha AFORE vs PPR, callout navy (ya no amarillo)
3. **`#calculadora`** — **NUEVO** calculadora de capital necesario: `capital = pension × 12 × 20`, input pension → resultado en tiempo real con `oninput="actualizarCalc()"`
4. **`#solucion`** — 6 sol-cards sobre fondo navy
5. **`#fiscal`** — Art. 151 LISR (navy/gold) vs Art. 93 LISR (green)
6. **`#portafolios`** — 19 portafolios categorías
7. **`#simulador`** — **NUEVO** simulador desktop embedded 2 columnas: form (izq) + results con chart (der)
8. **footer**

### Paleta v2 (cambios respecto a v1)

- `.tag` default: `background: rgba(27,42,74,.1); color: var(--navy)` (antes: gold)
- `.tag--light`: `background: rgba(255,255,255,.15); color: rgba(255,255,255,.9)` — para uso en secciones oscuras
- `.gold` class: `color: var(--navy)` (antes: color gold)
- `.afore-callout`: `background: #f0f4ff; border: 1.5px solid var(--navy)` (antes: amarillo)
- `.sol-highlight`: `color: var(--white)` (antes: gold) — sobre fondo navy
- `.sol-icon`: `background: rgba(255,255,255,.1)` (antes: gold-dim)
- `.btn-sim`: `background: var(--white); color: var(--navy)` (antes: gold)
- `.nav-pill`: `background: var(--white); color: var(--navy)` (antes: gold)

### Simulador desktop (#simulador) — CSS scoped

- Sección usa CSS variables propias prefijadas `--sim-*` (ej. `--sim-bg`, `--sim-surf`, `--sim-gold`)
- Grid: `.sim-grid { grid-template-columns: 460px 1fr; gap: 40px; }`
- Form: `.sim-panel` en `--sim-surf`
- Results: `.sim-res-panel` — muestra placeholder hasta que hay cálculo
- Funciones JS: `simCalcular()`, `simSimular()`, `simGetBono()`, `simRenderChart()`, `simValidate()`
- Chart: `id="simChart"`, instancia `simChartInst`
- WA link: `id="simWaLink"` — personalizado con nombre y pensión tras calcular
- Lead capture: usa mismo `SIM_SHEETS` URL que `/ppr`

### Calculadora (#calculadora) — JS

- Función: `actualizarCalc()` — oninput en `id="calcPension"`
- Fórmula: `capital = pension × 12 × 20`
- IDs: `calcCapital`, `calcCapital2`, `calcPensionFmt`, `calcSub`, `calcPlaceholder`, `calcResult`

### Fixes y mejoras — sep 2026 (campaña landing page para Meta Ads)

- **Agendamiento cambiado a Calendly:** constante `CALENDLY_BASE = 'https://calendly.com/asesorlandero/ppr'` reemplaza el link viejo de Google Calendar Appointments (`CAL_BASE`) en el simulador. El link de Google Calendar de REGLAS CRÍTICAS es exclusivo del home.
- **Captura de UTM:** función `simGetUtmParams()` lee `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `fbclid` de `window.location.search` → objeto `SIM_UTM`. Se usa en el passthrough del link de Calendly (`simBuildCalUrl()`) y en el payload que se manda a `SIM_SHEETS`.
- **Lead capture al completar el formulario, no solo al dar clic en el CTA:** `simSendLead()` se dispara dentro de `simCheckReveal()` en cuanto el formulario queda completo — antes solo se mandaba si la persona hacía clic en WhatsApp o Calendly, y se perdían leads de gente que llenaba todo pero no daba clic en ningún CTA.
- **Eventos al dataLayer (para GTM):** `simSendLead()` empuja `{event: 'sim_lead_complete', lead_source, lead_value}`; `simOnCtaClick(canal)` (recibe `'whatsapp'` o `'calendly'`) empuja `{event: 'sim_cta_click', cta_channel}`.
- **Checkbox de privacidad reubicado:** ya no está al fondo del panel de resultados (después de la gráfica). Ahora vive al final de `.sim-form-card`, justo después de la nota de portafolios/S&P 500, con el mismo patrón visual `.sim-check-row` del toggle de inflación. Corrección de UX móvil — antes no era intuitivo que había que aceptarlo para destrabar los resultados.

---

## ESTADO /retiro-ads — retiro-ads/index.html ✅ (v2 simplificada, 24 sep 2026)

Landing corta para tráfico frío de Meta Ads (campaña "Reels Sep26 - Landing Page"). **v2 aprobada por Omar el 24 sep 2026** — reemplaza a la v1 (con foto y bloque de brecha AFORE).

### Estructura v2
1. Nav navy — logo + pill "Simular mi retiro →"
2. `#hero` — fondo **blanco**, sin foto. Eyebrow "Plan Personal de Retiro · Regulado por la CNSF"; H1 "Empieza tu Plan Personal de Retiro hoy"; subtítulo "Un Plan Personal de Retiro diseñado 100% a tu medida: aportaciones deducibles de impuestos, invertidas en instrumentos elegidos según tu perfil, capacidad de ahorro y horizonte de inversión."; 4 bullets: Desde $2,000 MXN al mes · S&P 500 o NASDAQ con historial superior a la inflación · 100% deducible de impuestos (Art. 151 LISR) · Tú defines el ingreso con el que te retiras. Cada `<li>` envuelve su contenido en `<span>` (el `li` es flex; sin el span, los `<strong>` se partían en columnas).
3. `#simulador` — mismo JS que `/retiro` (tasa 10%, reveal progresivo, doble CTA WhatsApp + Calendly, UTM, `sim_lead_complete`). **Paleta clara:** `--sim-bg #FFFFFF`, `--sim-surf #F5F7FA`, `--sim-accent #21307C`, `--sim-text #1B2A4A`, `--sim-muted #6B7A99`, `--sim-bdr #DDE3EE`; verdes de texto `#1a9e4b` (contraste sobre blanco); botón Calendly navy `#1B2A4A`; botón WhatsApp `#25D366`.
4. `#masinfo` — franja de confianza + link a `/retiro`
5. Footer

**Sin foto, sin bloque de brecha AFORE, sin mención de Allianz ni OptiMaxx** (eyebrow del simulador = "Simulador de Plan Personal de Retiro"; bono = "Bono de fidelidad"; disclaimer = "metodología oficial de la aseguradora").

- `fuente: 'retiro-ads'` en el payload de `SIM_SHEETS`
- Mismas constantes que `/retiro`: `CALENDLY_BASE`, `SIM_WA`, `SIM_SHEETS`, `ANNUAL_RATE = 0.10`, GTM `GTM-TLMKJNZ4`

---

## ESTADO /gmm — gmm/index.html ✅ (nueva, sep 2026)

Landing nueva, separada de `/seguro` (que es cotizador de seguro de **vida**, no de GMM). Propósito único: capturar leads para agendar asesoría de Seguro de Gastos Médicos Mayores — sin cotizador embebido (código postal/ciudad para cotizar en firme se resuelve en la llamada, no en la web).

### Estructura
1. Nav — logo + pill "Agendar asesoría →" a `#formulario`
2. `#hero` — headline + subheadline + CTA
3. `#beneficios` — grid de 4 bullets de cobertura
4. `#formulario` — nombre, WhatsApp, correo, fecha de nacimiento (opcional), checkbox de privacidad → destraba doble CTA (WhatsApp + Calendly)
5. `#trust` — franja de confianza (CNSF, red de hospitales, asesoría sin costo)
6. Footer

### Copy final
- **Headline:** "Nadie decide cuándo enfermar. Sí puedes decidir cómo enfrentarlo." (elegido por Omar explícitamente por ser general — no encierra el mensaje a un perfil económico específico como "empresario"; sirve igual para profesionista que para dueño de negocio)
- **Subheadline:** "Un Seguro de Gastos Médicos Mayores no es un gasto más: es lo que separa un imprevisto de salud de una crisis financiera."
- **4 bullets de beneficios** (extraídos de material de coberturas de Allianz, sin nombrar la aseguradora — ver regla de cumplimiento de logo/marca más abajo): hospitalización/cirugías dentro y fuera del hospital, segunda opinión médica + telemedicina 24/7, ambulancia aérea/terrestre + asistencia en viajes, **beneficio por maternidad** (agregado a pedido explícito de Omar — lo identifica como uno de los argumentos que más convierte, en particular con audiencia femenina).
- Se descartó mencionar "regulado por la CNSF" en el hero/subheadline por decisión de Omar: no aporta valor persuasivo para su audiencia: si se usa, va solo en la franja de confianza inferior, nunca como gancho principal.

### Datos técnicos
- **Paleta:** fondo blanco, texto navy `#1B2A4A`, acento verde `#1F7A38` (del logo) + verde WhatsApp `#25D366` para el botón de WA — distinto del azul accent de `/ppr`/`/retiro`.
- **Logo:** `images/logo-navy-verde.png` (imagotipo azul marino y verde de Omar, tomado de su carpeta de Drive de logotipos).
- **Formulario → doble CTA:** al completar nombre + WhatsApp (10 dígitos) + correo válido + privacidad aceptada, se revelan dos botones de igual peso — WhatsApp (mensaje prellenado con los datos capturados) y Calendly (evento propio de GMM, ver regla crítica 7).
- **WhatsApp:** usa el formato estándar `https://wa.me/<número>?text=` (constante `GMM_WA = '529933205649'`) — **mismo número** que `/ppr`/`/retiro` (SIM_WA). Se descartó el link corto `wa.me/message/WQK3NQOCB76ZE1` de WhatsApp Business: ese formato no acepta override de `?text=`, y en pruebas reales (23 sep 2026, Omar desde su celular) abría una pantalla de "elegir contacto" en vez de ir directo al chat — funcionaba para Omar solo porque ya tenía el número guardado, pero se rompía para cualquier prospecto nuevo sin el contacto guardado. Corregido a `wa.me/<número>?text=`, el mismo patrón ya validado en el resto del sitio.
- **Calendly:** `https://calendly.com/asesorlandero/gmmi` (constante `GMM_CAL_BASE`) con passthrough de `?name=&email=` + UTMs.
- **Captura de leads:** función `gSendLead()` dispara en cuanto el formulario queda completo (mismo patrón que `/retiro`/`/retiro-ads`), vía `fetch` a Apps Script Web App propio (`GMM_SHEETS_URL`) — **hoja de Sheets separada** de la de PPR (`SIM_SHEETS`), porque los campos no coinciden (sin edad/aportación/portafolio). Hoja: ["Leads GMM — Asesor Landero"](https://docs.google.com/spreadsheets/d/1v40LylIsglccDWEno4w-M0esA_aNW38Q4o5z4Tq4Ow0/edit), columnas: Fecha, Nombre Completo, Telefono, Email, Fecha Nacimiento, fuente (`gmm-lead`), utm_source, utm_medium, utm_campaign, utm_content, utm_term, fbclid.
- **Eventos al dataLayer (GTM):** `gmm_lead_complete` (al completar formulario) y `gmm_cta_click` con `cta_channel: 'whatsapp'|'calendly'` (al dar clic en cualquiera de los dos botones) — mismo patrón que `sim_lead_complete`/`sim_cta_click` de PPR, pero **sin** conectar todavía un evento Lead de Meta Pixel para este dataLayer event (pendiente si Omar decide pautar `/gmm` en Meta Ads — se replicaría el patrón ya verificado de PPR, ver Notas Técnicas).

### Nota de verificación del Google Sheet de PPR (confirmado sep 2026)
El Google Sheets de PPR que Omar usa para revisar leads manualmente (`docs.google.com/spreadsheets/d/1YcaO9loLBrSLFQ3cKvjS-0PYMo-s7Vzbw-HyD-gfIH0`) **sí es el mismo** al que escribe el webhook `SIM_SHEETS` usado por `/ppr`, `/retiro` y `/retiro-ads` — confirmado inspeccionando el contenido real de la hoja (columnas y filas de prueba de sesiones anteriores coinciden). No tiene columna `fuente` visible en el encabezado aunque el payload sí la manda — posible pérdida en el Apps Script, no verificado a fondo (no bloqueante, dato queda documentado por si se retoma).

---

## ESTADO /ppr — ppr/index.html ✅ (v2 — 2026-06-09)

- Sin redirect desktop (redirect `/ppr` → `/retiro` fue eliminado intencionalmente)
- **Paleta:** accent blue `#4A7CF7` — dorado eliminado completamente
- **Tasa:** fija 10% anual — selector de portafolios eliminado (simplificado)
- **Métricas:** valores positivos en verde, chart verde, barra bottom verde
- **WA link:** personalizado con nombre y pensión proyectada tras calcular

---

## BACKLOG

| Tarea | Prioridad |
|---|---|
| Navbar global consistente en todas las páginas (home, retiro, ppr) | 🟡 Media |
| SEO: robots.txt, meta tags por página | 🟡 Media |
| /testimonios con formulario de reseñas | 🟢 Baja |
| /links optimización visual | 🟢 Baja |

---

## NOTAS TÉCNICAS

- **Imágenes del home:** en carpeta `images/` (subcarpeta en raíz del repo)
- **Logo blanco:** `ISOLOGO_BLANCO.png` en raíz
- **Token GitHub:** puede estar expirado. Generar nuevo en github.com/settings/tokens → classic → scope `repo`
- **GTM:** contenedor `GTM-TLMKJNZ4` instalado en todas las páginas (`index.html`, `retiro/`, `retiro-ads/`, `ppr/`, `links/`). Todo el tracking (Meta Pixel, conversiones) pasa por aquí.
- **Evento Meta Pixel Lead (sep 2026):** trigger de Evento personalizado en GTM escucha `sim_lead_complete` en el dataLayer → dispara etiqueta HTML personalizada "Meta Pixel - Lead" (`fbq('init', '1238045745074227'); fbq('track', 'Lead');`). Dataset activo y verificado: `1238045745074227` (creado may 2026). Existe un segundo dataset `1285044970202759` (creado ago 2026, último disparo 14 sep 2026) de propósito no confirmado — pendiente que Omar diga si sigue en uso o se puede dar de baja.
- **SEO:** `sitemap.xml` en raíz, verificación Google Search Console en `googledb889b23738069ac.html`
- **Tasas Allianz (actualizar mensualmente):**
  - UDIS: `UDIS_RATE = 0.0847` (8.47%)
  - MXN conservador: `ALLIANZ_MXN_RATE = 0.0672` (6.72%)
  - USD conservador: `ALLIANZ_USD_RATE = 0.0333` (3.33% USD)
  - Última actualización: Mayo 2025
- **Chart.js:** versión 4.4.0 desde CDN jsdelivr
- **Incidente 24 sep 2026 — sitio completo en 404:** un deploy por CLI de Vercel a producción (`dpl_9oyqFNhFLBxyYf7FWq8joYyk9nhx`, sin commit de GitHub) subió SOLO `retiro-ads/index.html`, y reemplazó todo el sitio → todas las rutas en 404. Se resolvió con rollback a `dpl_9MqrMdXfmZMNug7XTyjUAFYPsHkw` (commit 406dcf4). **Regla: nunca `vercel --prod` desde una subcarpeta ni con archivos sueltos; para previews usar `vercel` sin `--prod` desde la raíz del repo, o push a una rama.** Tras un rollback, Vercel deja de promover automáticamente los push a `main` hasta que se haga "Promote"/deshacer el rollback en el dashboard.
- **CRITICAL `.replace()` bug:** Si el string de reemplazo contiene `$`, siempre usar `.replace(str, () => replacement)` para evitar interpretación de grupos.
