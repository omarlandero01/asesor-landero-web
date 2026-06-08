# CLAUDE.md — asesor-landero-web

> Leer completo al inicio de cada sesión. Última actualización: 2026-06-08 (crop fotos completado).

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
| `/` | Home principal | Rediseño en progreso |
| `/ppr` | Simulador PPR móvil (leads de Meta) | Completo y funcional ✅ |
| `/retiro` | Landing PPR desktop | Funcional ✅ |
| `/seguro` | Landing cotizador seguros | Funcional ✅ |
| `/links` | Link in bio Instagram | Existe, optimización pendiente |

---

## REGLAS CRÍTICAS — NO MODIFICAR NUNCA

1. **`/ppr` redirect desktop:** el archivo `ppr/index.html` tiene en el `<head>`:
   ```js
   if (window.innerWidth >= 1024) { window.location.replace('/retiro'); }
   ```
   Esto es **INTENCIONAL**. No remover, no modificar.

2. **CTAs "Agendar asesoría"** en el home (`index.html`): deben apuntar a:
   ```
   https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1Vu4MKCXBbIo51tARMhJ4nhzVncuzU4DjJlNn6DTJvWFxg5aB-U8oslhJaKpjazlj1Sgu9kCpe
   ```
   **NO** usar meet.hubspot.com (ese link no existe).

3. **Testimonios y Blog en home:** tienen `display: none`. No activar hasta que haya contenido real.

4. **WhatsApp:** +52 9933205649

---

## PRODUCTOS

**Principal:** Optimax Plus — Allianz México (PPR). Aportación mínima $2,000 MXN/mes. CNSF cédula V409234.  
**Otros:** Seguro de vida, seguro de vida con ahorro, seguro de gastos médicos mayores (GMM).

---

## ESTADO HOME — index.html (rediseño en progreso)

### Cambios ya implementados ✅

- Foto hero: `images/omar-hero.png` — izquierda, señala hacia el texto
- Foto bio: `images/omar-bio.png` — sección El Asesor
- Fotos: PNGs con fondo transparente (generados con rembg)
- Headline: "Tu dinero puede hacer más de lo que crees."
- Subheadline: "Te ayudo a entender cómo — sin letra chica, sin presión."
- Firma: "Omar Landero · Asesor Financiero · Allianz México"
- Botón primario (filled): "Simular mi retiro →"
- Botón secundario (outline): "Agendar asesoría gratuita →"
- Heading bio: "Entiende antes de decidir."
- Esquema de fondos: `#1f3056` hero → `#F5F7FA` bio → `#ffffff` problema → `#F5F7FA` herramientas → `#1f3056` CTA final
- Ícono "Asesoría 100% gratuita": checkmark oscuro (visible sobre fondo blanco)
- Logo Allianz: `images/logo-allianz.jpg` mostrando correctamente
- Texto tarjeta Allianz: "Respaldo Allianz México / Una de las aseguradoras más sólidas del mundo y Administradoras de Activos más grandes a nivel mundial."
- Testimonios y blog: `display: none`
- Fotos recortadas al sujeto con PIL getbbox(): `omar-hero.png` 990×961, `omar-bio.png` 727×996
- CSS hero foto: `.hero__photo-wrap` flex align-end, `.hero__photo` height 520px, object-fit contain
- CSS bio foto: `.omar__photo-wrap` flex align-end con `::after` sombra elíptica, `::before` con `display:none` (quitó círculo gris), `.omar__photo` height 400px object-fit contain

### TAREA PENDIENTE — Logo Allianz más grande (siguiente tarea)

**Problema:** El logo Allianz en la sección bio/credenciales está en `height:32px` — se ve pequeño.

**Solución:**
Buscar en `index.html` el `img` con `src="/images/logo-allianz.jpg"` y cambiar el estilo inline de `height:32px` a `height:64px`.

```html
<!-- Antes -->
<img src="/images/logo-allianz.jpg" alt="Allianz México" style="height:32px;width:auto;object-fit:contain;display:block;border-radius:4px;">

<!-- Después -->
<img src="/images/logo-allianz.jpg" alt="Allianz México" style="height:64px;width:auto;object-fit:contain;display:block;border-radius:4px;">
```

**Commit tras completar:**
```bash
git add index.html && git commit -m "ui: logo Allianz 64px en sección bio" && git push
```

---

## BACKLOG

| Tarea | Prioridad |
|---|---|
| Logo Allianz más grande en bio (`height: 64px`) — instrucciones arriba | 🔴 Alta |
| Navbar global consistente en todas las páginas | 🟡 Media |
| SEO: sitemap.xml, robots.txt, meta tags | 🟡 Media |
| /testimonios con formulario de reseñas | 🟢 Baja |
| Simulador desktop dentro de /retiro | 🟢 Baja |
| /links optimización visual | 🟢 Baja |

---

## NOTAS TÉCNICAS

- **Imágenes del home:** en carpeta `images/` (subcarpeta en raíz del repo)
- **Logo blanco:** `ISOLOGO_BLANCO.png` en raíz
- **Token GitHub:** puede estar expirado. Generar nuevo en github.com/settings/tokens → classic → scope `repo`
