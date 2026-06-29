# Nexora — landing page

Landing institucional construida en Next.js 16 (LTS, App Router) + Tailwind CSS + Framer Motion.
Todas las ilustraciones (dashboard, gráficos, diagramas) son SVG/CSS propios, sin imágenes externas.

## Estructura

```
src/
  app/
    layout.jsx      # layout raíz + metadata SEO
    page.jsx         # página principal, renderiza el componente
    globals.css       # Tailwind + fuente Inter
  components/
    LandingPage.jsx   # componente único con toda la landing (10 secciones)
Dockerfile            # build multi-stage para producción
next.config.js        # output: "standalone" (imagen Docker liviana)
```

## Correr en local

```bash
npm install
npm run dev
```

Abrí `http://localhost:3000`.

## Subir a tu repositorio Git

Desde esta carpeta:

```bash
git init
git add .
git commit -m "Landing Nexora — versión inicial"
git branch -M main
git remote add origin <URL_DE_TU_REPO>
git push -u origin main
```

## Deploy en Coolify

1. En Coolify, **New Resource → Application → desde tu repo Git** (GitHub/GitLab ya conectado).
2. Seleccioná el repo y la rama (`main`).
3. **Build pack**: elegí **Dockerfile** (ya está en la raíz del repo, Coolify lo detecta solo).
4. **Port**: `3000` (coincide con el `EXPOSE` del Dockerfile).
5. En **Domains**, agregá `nexora.pit.com.ar`.
   - Asegurate de que el DNS de `pit.com.ar` tenga un registro A o CNAME para el subdominio `nexora` apuntando a la IP de tu servidor Coolify.
   - Coolify gestiona el certificado SSL automáticamente (Let's Encrypt) una vez que el DNS resuelve.
6. Variables de entorno: no se necesita ninguna para esta landing (no hay backend ni API keys).
7. Deploy. El build corre las 3 etapas del Dockerfile (instala dependencias, compila Next.js, arma la imagen final liviana con `output: standalone`).

## Notas

- El componente `LandingPage.jsx` tiene `"use client"` porque usa hooks de estado y Framer Motion — es necesario para el App Router de Next.js.
- Si vas a cambiar el nombre de marca "Nexora" por el definitivo, reemplazá las 3 ocurrencias en `LandingPage.jsx` (navbar, footer) y el `title`/`description` en `layout.jsx`.
- El dominio final está hardcodeado como `https://nexora.pit.com.ar` en `metadataBase` (layout.jsx) y `openGraph.url` — si cambia, actualizar ahí.
- El proyecto usa **Next.js 16.2.9 LTS** (versión activamente soportada a junio 2026). Next.js 14 llegó a EOL en octubre 2025 con vulnerabilidades críticas de RCE en versiones previas a 14.2.35 — por eso se partió directo desde 16.
- `npm audit` reporta 2 vulnerabilidades moderadas de una dependencia transitiva de `postcss` empaquetada dentro del propio Next.js (no de nuestro `postcss` directo). No tiene corrección disponible sin downgradear Next.js a una versión antigua, así que se deja documentado y se revisa en el próximo parche de Next.js.
