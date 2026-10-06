# Nexora

Landing institucional de PIT para su producto de auditoría y transformación digital empresarial (title: "PIT — Auditoría y transformación digital empresarial"). Paquete `nexora-landing`. "Nexora" es nombre de marca provisorio: ya no aparece en la UI (reemplazado por el logo PIT), solo en repo y dominio.
Repo PÚBLICO: no commitear nada sensible (credenciales, IPs, datos de clientes).

## Estado al 2026-10-06
- Versión inicial estática (MVP). 2 commits el 2026-06-29; sin actividad posterior.
- Último commit en `main`: `adbecf1` 2026-06-29 "Reemplazar logo placeholder por isologo real de PIT (variantes claro/oscuro)".
- Ramas vivas: solo `main`. Nada sin mergear.

## Repo y ramas
- `msantirso-dev/nexora` (público).
- Desarrollo y deploy: `main` (según README; sin verificar en Coolify).
- Ramas a borrar: ninguna.

## Stack
- Next.js 16.2.9 (`output: standalone`), React 19.2.3, JavaScript/JSX (sin TypeScript).
- Tailwind 3.4.17 (no 4), Framer Motion 11, lucide-react.
- Sin backend, sin DB, sin variables de entorno.

## Estructura
- `src/app/layout.jsx` (metadata SEO, `metadataBase` y `openGraph.url` con el dominio), `src/app/page.jsx`, `src/app/globals.css`.
- `src/components/LandingPage.jsx`: componente único (~1400 líneas, 10 secciones).
- `public/pit-logo-dark.png`, `public/pit-logo-white.png`.
- `Dockerfile` multi-stage (node:20-alpine, usuario no root `nextjs`).

## Comandos
- `npm install` · `npm run dev` (3000) · `npm run build` · `npm start` · `npm run lint`
- Tests: no hay. Migraciones: no aplica.

## Deploy (Coolify)
- Instancia: https://coolify.pit.com.ar
- Recurso: Application desde repo Git, Build Pack Dockerfile (raíz) [sin verificar].
- Rama: `main` [sin verificar]. UUID: [?] a confirmar.
- Dominio: `nexora.pit.com.ar` (registro DNS del subdominio hacia el servidor Coolify; SSL Let's Encrypt gestionado por Coolify).
- Puerto interno: 3000 (`EXPOSE 3000`).
- Health check: ninguno. Volúmenes: ninguno. Servicios dependientes: ninguno.

## Variables de entorno
- Ninguna. Si en el futuro se agrega un formulario de contacto con backend/servicio externo, las claves van solo en Coolify y los nombres en `.env.example` (repo público).

## Integraciones y dependencias compartidas
- Ninguna. Ilustraciones SVG/CSS propias. Branding PIT compartido con otros sitios (pit, mkt-pit), sin código compartido.

## Cómo trabajar y hacer push
- Escritura desde un chat/Proyecto de Claude: llamar a `add_repo` con owner `msantirso-dev`, repo `nexora`, `access: "push"`, y clonar donde indique. No pedir PAT ni pegar tokens en el chat.
- Estándar de Max: arquitectura modular (partir `LandingPage.jsx` en componentes por sección cuando se toque), commits atómicos en español `feat(modulo)` / `fix(modulo)`, nunca commitear `.env` ni credenciales, `/api/health` si se agrega backend, variables en `.env.example`, resumen final ≤5 líneas.
- Push a `main` = deploy automático en Coolify [sin verificar]. Cambios grandes de diseño o de marca: rama + PR.
- Antes de declarar algo publicado: verificar en Coolify el commit desplegado.
- Reglas del repo:
  - Repo público: revisar el diff antes de cada push (sin IPs, credenciales ni datos de clientes).
  - Si cambia el dominio o la marca: actualizar `metadataBase` y `openGraph.url` en `src/app/layout.jsx:7,15`, el dominio en Coolify y este archivo.
  - Configurar el autor git como Max (hoy los commits figuran como "Nexora Landing").

## Pendientes y problemas conocidos
Seguridad
- [ ] `npm audit`: 2 vulnerabilidades moderadas en postcss transitivo de Next (sin fix al 2026-06-29); revisar con el próximo parche de Next 16.

Deploy
- [ ] Confirmar en Coolify recurso, rama, auto-deploy y UUID.
- [ ] Agregar health check simple (p. ej. ruta estática o `/api/health`).

Orden / doc / producto
- [ ] Definir nombre de marca definitivo (README Notas); si cambia, actualizar dominio + metadata.
- [ ] Formulario/contacto real (hoy solo ancla `#contact-anchor`).
- [ ] README: quitar instrucciones de `git init` obsoletas.
- [ ] Autor git "Nexora Landing" → Max.
- [ ] Partir `LandingPage.jsx` en componentes por sección.

## Próximo paso
- Documentado: definir el nombre de marca definitivo (README, Notas).
- [REC] Después, sumar contacto real (formulario o WhatsApp/email) y health check.
