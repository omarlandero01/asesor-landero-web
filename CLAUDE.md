# CLAUDE.md — asesor-landero-web

> Leer completo al inicio de cada sesión. Última actualización: 2026-09-28 (Advanced Matching en dataLayer + descubrimiento de sistema de tracking paralelo en /ppr, /seguro, /links — ver NOTAS TÉCNICAS. **Commit local sin pushear, ver bloqueo de deploy abajo**).

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

### Fix de fricción en el simulador — 28 sep 2026 (0 clics a CTA pese a leads reales)

**Diagnóstico con datos reales de Meta Ads** (campaña "Campaña Sep26 - Landing Page", ID `6979645135849`, gasto acumulado $404.93 MXN desde el 24 sep): 2,944 impresiones, 117 clics al link, 91 landing page views, **3 eventos Lead del píxel** (3 personas completaron el formulario) pero **0 clics conocidos a WhatsApp o Calendly**. Causa raíz: los dos botones CTA vivían dentro del mismo overlay que tapaba los números en pesos — nadie podía darle clic a ningún botón hasta llenar nombre + WhatsApp + correo + privacidad, y el texto del overlay ("Completa el formulario y acepta el aviso de privacidad...") sonaba a trámite legal, no a invitación.

**Decisión de Omar tras discutirlo:** mantener el blur de los números (genera curiosidad, sigue calificando al lead), pero separar el comportamiento de los dos botones:
- **Calendly siempre visible y clicable**, desde que carga la página, sin necesidad de llenar nada. Lógica de Omar: "quien quiera agendar directo, ya puede acceder a Calendly" — es autoagendable, no necesita que Omar tenga el contexto de antemano.
- **WhatsApp sigue bloqueado hasta completar el formulario** — es conversación en vivo, Omar quiere tener nombre/edad/aportación/proyección a la mano antes de contestar.
- **Correo ahora es opcional** (antes obligatorio) — sigue siendo dato de valor pero ya no bloquea el reveal.
- **WhatsApp se movió a su propio campo de ancho completo** (antes compartía fila con edad) — es el único canal de contacto obligatorio, necesitaba más peso visual. Edad ahora comparte fila con correo (los dos campos "ligeros").
- **Texto del overlay suavizado:** "Tu proyección ya está calculada. Completa tus datos y acepta el aviso de privacidad para verla — toma 30 segundos." — explica que la página sí funciona, en vez de sonar a requisito burocrático.

**Implementación técnica:**
- Nuevo contenedor `.sim-masked-zone` (dentro de `.sim-wa-box`) que envuelve SOLO el título + botón de WhatsApp + overlay — el overlay ya no cubre el box completo.
- Botón de Calendly se sacó a un bloque separado `.sim-cal-standalone`, con su propio copy ("¿Ya sabes que quieres una asesoría? Agenda directo, sin llenar nada más.") y borde punteado como separador visual.
- `simIsComplete()` — helper nuevo, extraído de la lógica que antes vivía inline en `simCheckReveal()`. Se reusa en `simOnCtaClick()`.
- `simCheckReveal()`: el botón de Calendly ya no se gatea por `complete` — su `href` se reconstruye en cada input vía `simBuildCalUrl()` (que ahora omite `name=`/`email=` del query string si están vacíos, en vez de mandarlos en blanco).
- `simOnCtaClick(canal)`: solo llama a `simSendLead()` (Sheets + evento `sim_lead_complete` + Pixel Lead) si el formulario está completo — un clic en Calendly antes de llenar todo ya NO manda un lead a medias (edad/aportación en NaN) a la hoja ni dispara un evento Lead de baja calidad. Se agregó `form_complete: true/false` al evento `sim_cta_click` del dataLayer para poder medir cuántos clics a Calendly vienen de gente que no llenó nada.
- Email opcional: `simIsComplete()` valida formato solo si el campo no está vacío (`email === '' || regex.test(email)`).

**Pendiente de observar:** con solo 3 leads históricos no hay tendencia estadística todavía — monitorear los próximos días si sube la tasa de clic a CTA (antes 0/3) y si el CPL baja del actual $134.98 MXN. Si el patrón de "gente llena el form pero no da clic en nada" persiste incluso con Calendly liberado, el siguiente sospechoso sería el copy de los botones mismos o la posición del bloque en la página.

### Segunda ronda — mismo día (28 sep 2026): CTA directo en el hero + fix de edad obligatoria

- **Bug corregido: `simIsComplete()` no exigía edad válida.** El botón de WhatsApp podía desbloquearse con nombre + WhatsApp + privacidad aunque la persona nunca hubiera llenado la edad — y sin edad el simulador nunca corre (`simAutoCalc` no calcula nada), así que el mensaje de WhatsApp se hubiera mandado con capital/pensión en blanco ("—"). Detectado por Omar, no por QA. Ahora `simIsComplete()` exige `edad` numérica entre 18 y 64, igual que el límite ya validado en el campo.
- **CTA directo en el hero:** link secundario `#heroCalLink` debajo del botón principal "🧮 Simula tu retiro ahora", copy "¿Ya sabes que quieres una asesoría? Agenda directo, sin simular →", va a Calendly sin pasar por el simulador. Decisión: peso visual menor que el botón principal (texto subrayado, no botón sólido) para no competirle protagonismo — el simulador sigue siendo el CTA primario de la página. Sin nombre/correo en el passthrough (el form nunca se tocó en este punto), solo UTMs. Evento `sim_cta_click` con `cta_source: 'hero'` vs `cta_source: 'simulador'` (agregado también al Calendly/WhatsApp de dentro del simulador) para poder comparar en GTM/Sheets cuántos leads vienen de cada camino.

### Tercera ronda — mismo día (28 sep 2026): verificación en vivo + 2 hallazgos de Omar

Omar reportó por WhatsApp/chat que no veía los cambios ("ni el botón de Calendly, ni ninguna leyenda"). Verificado en vivo (browser real, mobile viewport) contra producción: **todo lo de las rondas 1 y 2 sí está funcionando** — CTA del hero visible, Calendly con link válido desde el inicio, WhatsApp bloqueado hasta completar el form (incluida edad), botón de Calendly dentro del simulador visible tras llenar edad+aportación. La confusión de Omar: el bloque de resultados (`#simResInner`, donde viven el overlay/los botones de dentro del simulador) sigue `display:none` hasta que se ingresa edad+aportación — mientras tanto solo se ve el placeholder ("Ingresa tu edad y aportación..."). Eso es el diseño original de antes de esta sesión, no algo que se haya roto — pero **sí reveló un gap real**: nada le explicaba al usuario, antes de tocar el simulador, que los resultados van a ir apareciendo progresivamente. Se agregó una segunda línea al placeholder (`.sim-ph-note`): "A partir de ahí vas a ver tu gráfica en tiempo real. Solo faltará completar tus datos de contacto y aceptar el aviso de privacidad para desbloquear las cifras exactas."

**Bug real encontrado por Omar, confirmado y corregido:** el disclaimer legal al fondo de la sección del simulador ("⚠️ Proyecciones exclusivamente ilustrativas...") estaba en `color:rgba(255,255,255,.3)` (blanco al 30%) — invisible sobre el fondo blanco de `/retiro-ads`. Ese estilo se heredó tal cual de `/retiro` (fondo navy oscuro, donde blanco translúcido sí se ve) al construir la v1 de esta página y nunca se corrigió al pasar a paleta clara. Cambiado a `var(--sim-dim)` (#94a3b8, gris legible sobre blanco). **Pendiente revisar si el mismo problema existe en otros textos copiados de `/retiro` hacia `/retiro-ads` o `/gmm`** — no se hizo una auditoría completa de contraste esta sesión, solo se corrigió el caso reportado.

### Cuarta ronda — 2 oct 2026: reorganización "formulario primero" + instrumentación de scroll

**Diagnóstico actualizado con datos frescos de la API de Meta (no CSV):** campaña "Campaña Sep26 - Landing Page" (ID `6979645135849`), acumulado desde el 24 sep: 4,017 impresiones, 153 link clicks, 120 landing page views, 6 Leads, $643.10 MXN gastados, CPL $107.18. Mejora real respecto al checkpoint del 28 sep (3 leads, CPL $134.98) tras los fixes de esa fecha, aunque la muestra (6 leads) sigue siendo demasiado chica para confianza estadística.

**Hipótesis de Omar:** el formulario queda muy abajo en el primer scroll (hero largo con descripción + 4 bullets antes de llegar al simulador), y en tráfico frío de Meta Ads la gente abandona si no ve de inmediato qué hacer. Problema real al intentar validarlo: Meta no da profundidad de scroll, y no había ningún evento que marcara "llegó a ver el simulador" por separado de "completó el formulario" — sin eso, 120 landing views → 6 leads no dice *dónde* se pierde el resto.

**Dos acciones ejecutadas en la misma sesión:**

1. **Instrumentación de scroll (antes de tocar el diseño, para poder medir el efecto después):** nuevo `IntersectionObserver` sobre `#simulador` en el JS de `/retiro-ads` — dispara `sim_section_viewed` al dataLayer una sola vez por sesión, cuando el simulador entra al menos 20% en pantalla. **Pendiente de Omar, no se puede hacer desde aquí:** este evento no tiene ningún destino todavía (no hay GA4 instalado en el proyecto). Para poder verlo reflejado en algún reporte, hay que replicar en GTM el mismo patrón que ya existe para `sim_lead_complete` → "Meta Pixel - Lead": crear un trigger de Evento personalizado que escuche `sim_section_viewed`, y una etiqueta nueva de Meta Pixel con un evento custom (ej. `ViewedSimulator`, nunca reusar `Lead` ni `ViewContent` para esto, contaminaría la optimización de las campañas). Una vez configurado, se podrá ver en Meta Events Manager cuántas personas de las que entran a la landing sí llegan a ver el simulador — ese es el dato que faltaba para confirmar o descartar la hipótesis de fricción.

2. **Reorganización "formulario primero":** el hero se redujo al mínimo — eyebrow + H1 ("Empieza tu Plan Personal de Retiro hoy") + una sola línea con la leyenda de proyección (10% anual, S&P 500) + el link directo a Calendly del hero (`#heroCalLink`, sin tocar). Se quitaron de ahí: el párrafo largo de descripción, los 4 bullets, el botón "Simula tu retiro ahora" (ya no hace falta, el simulador queda inmediatamente debajo) y la línea de cédula CNSF completa. El simulador (`#simulador`) ya no repite título/subtítulo propio (se quitó el `<h2>¿Cuánto tendrás a los 65 años?</h2>` y su eyebrow, quedaban redundantes con el nuevo H1 del hero) — va directo al `.sim-grid` (formulario + resultados). Todo lo que se quitó del hero (descripción larga + 4 bullets) se movió a una sección nueva, `#detalle`, ubicada **después** del simulador y antes de la franja de confianza (`#masinfo`) — queda disponible para quien sí quiere leer el detalle antes de decidir, pero ya no bloquea el camino al formulario. CSS nuevo: `.hero-sub-short` (reemplaza `.hero-sub` en el hero reducido), `#detalle`/`#detalle h2`/`.detalle-sub` (estilos de la sección movida, reusa `.hero-bullets` ya existente).

**Pendiente de observar:** monitorear si sube el % de landing page views → leads con esta estructura, y en cuanto Omar configure el trigger de GTM del punto 1, cruzar ambos datos (views → simulador visto → lead) para saber si de verdad la fricción estaba en el scroll o en otro punto del embudo.

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
| Agregar `fbc`/`fbp` (cookies del navegador) al payload de `api/meta-events.js` en `/ppr` y `/seguro` — Meta las sugirió vía la herramienta "Parameter Builder" (28 sep 2026) para subir su EMQ bajo (Ver contenido 3.0/10, Cliente potencial 6.1/10). **No implementar todavía**: ninguna de las dos páginas está en campaña activa hoy (solo `/retiro-ads` y `/gmm` jalan tráfico pagado, y esas ya capturan `fbc`/`fbp` automático vía el píxel nativo de GTM). Retomar solo si se vuelve a pautar `/ppr` o `/seguro`. | 🟢 Baja (condicional) |

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
- **Advanced Matching agregado al dataLayer (28 sep 2026):** la etiqueta nativa "Meta Pixel" de GTM (auto-instalada hace ~1 semana vía integración de Meta, tag `FB_CONVERSIONS_API-1238045745074227-Web-Tag-Pixel_Template`) lee una variable `eventModel.user_data` que nunca se poblaba — causa raíz del score bajo de EMQ en "Ver contenido" (3.0/10) y margen de mejora en "Cliente potencial" (6.1/10). Se agregó una función `buildUserData(nombre, email, wa)` en `/retiro`, `/retiro-ads` y `/gmm` que arma `{email, phone_number, address:{first_name,last_name}}` (mismo esquema que usa GA4/Google Ads Enhanced Conversions — valores normalizados en minúsculas, sin hashear: el pixel/tag de Meta hashea del lado del navegador) y se manda dentro del `dataLayer.push` de `sim_lead_complete`/`gmm_lead_complete`. No se pre-hasheó porque no se confirmó con 100% certeza si esta etiqueta específica hashea client-side o espera SHA-256 ya calculado — **revisar el Event Match Quality de Meta unos días después del deploy**; si no mejora, ese es el primer sospechoso.
- **Sistema de tracking paralelo descubierto en `/ppr`, `/seguro`, `/links` (28 sep 2026) — NO documentado antes en este archivo:** estas 3 páginas NO usan el patrón GTM dataLayer de `/retiro`/`/retiro-ads`/`/gmm`. Tienen su propio sistema: `fbq('track', ...)` hardcodeado en el HTML (viola la regla de "todo tracking pasa por GTM" de arriba) + una función `sendMetaEvent()` que también llama a un endpoint serverless real, `api/meta-events.js` (Vercel Function, existe en el repo, hashea con SHA-256 y manda a la Graph API de Meta correctamente — no es código muerto). El problema real: en los 3 call-sites `sendMetaEvent(...)` se llamaba con `userData: {}` siempre vacío, y en `/ppr` nunca se disparaba el evento `Lead` (solo `ViewContent` al cargar y `Contact` al dar clic en WhatsApp). Se corrigió parcialmente esta sesión: `/ppr` y `/seguro` ahora arman `window.__capiUserData = {email, phone, firstName, lastName}` en el momento de capturar el lead (`calcular()` / `sendLead()`) y lo mandan tanto en el evento `Lead` (nuevo en `/ppr`) como en el evento `Contact` del botón de WhatsApp. **`/links` no se tocó** (no captura PII, no aplica). **Decisión tomada (28 sep 2026):** se quitó el `fbq('track', ...)` hardcodeado de `/ppr` y `/seguro` — confirmado que GTM (`GTM-TLMKJNZ4`) sí está instalado en ambas páginas y la etiqueta nativa "Meta Pixel" de GTM dispara en `DOM_Ready` (cubre PageView en todas las páginas sin excepción). El evento `Lead` de estas 2 páginas ahora depende 100% del CAPI server-side (`api/meta-events.js`, ya corregido para mandar `userData` real). Queda alineado con la regla del proyecto: todo tracking pasa por GTM o por el servidor, nada de píxel hardcodeado en el HTML.
- **`META_CAPI_TOKEN` verificado (28 sep 2026):** confirmado por Omar en el dashboard de Vercel — existe, configurado para Production y Preview (agregado 2 jun 2026). `api/meta-events.js` tiene lo que necesita para funcionar. Ambos pendientes de esta sesión (fbq hardcodeado + token CAPI) quedaron cerrados.
- **Bloqueo de deploy (28 sep 2026):** el commit `c1e9e8c` con los 3 cambios de Advanced Matching (+ los de `/ppr`/`/seguro` de arriba, en un commit posterior) está hecho en local pero **no se pudo pushear a GitHub** — sin credenciales de git configuradas en el entorno de esta sesión (`fatal: could not read Username for 'https://github.com'`). El deploy en Vercel es 100% vía integración de GitHub (push a `main` → deploy automático a producción), así que sin push no hay deploy. El workaround usado en incidentes anteriores (API de Vercel `create_deployment` con contenido inline) no funcionó esta sesión — la herramienta rechazó el payload por un problema de la propia integración MCP, no del código. **Acción pendiente para Omar:** desde su propia terminal (con credenciales de git ya configuradas), correr `git pull` seguido de `git push origin main` dentro de la carpeta del repo para publicar estos cambios — o generar un token nuevo de GitHub (ver nota de abajo) y decirle a Claude que lo use.
