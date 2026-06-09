# CLAUDE.md — asesor-landero-web

> Leer completo al inicio de cada sesión. Última actualización: 2026-06-09 (GTM, sitemap, PPR v2, retiro simulador fixes).

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
| `/seguro` | Landing cotizador seguros | Funcional ✅ |
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
- **GTM:** contenedor `GTM-TLMKJNZ4` instalado en todas las páginas (`index.html`, `retiro/`, `ppr/`, `links/`). Todo el tracking (Meta Pixel, conversiones) pasa por aquí.
- **SEO:** `sitemap.xml` en raíz, verificación Google Search Console en `googledb889b23738069ac.html`
- **Tasas Allianz (actualizar mensualmente):**
  - UDIS: `UDIS_RATE = 0.0847` (8.47%)
  - MXN conservador: `ALLIANZ_MXN_RATE = 0.0672` (6.72%)
  - USD conservador: `ALLIANZ_USD_RATE = 0.0333` (3.33% USD)
  - Última actualización: Mayo 2025
- **Chart.js:** versión 4.4.0 desde CDN jsdelivr
- **CRITICAL `.replace()` bug:** Si el string de reemplazo contiene `$`, siempre usar `.replace(str, () => replacement)` para evitar interpretación de grupos.
