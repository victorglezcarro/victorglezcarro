# Portfolio de Víctor González Carro

Portfolio personal en español con experiencia, proyectos, formación, tecnologías y contacto. Desarrollado con React, TypeScript y Vite, con animaciones de Motion, una escena de Three.js y tipografías alojadas en el propio sitio.

## Desarrollo

Usa Node.js 24 LTS (incluido en `.nvmrc`) y pnpm 11. También es compatible Node.js 22 desde la versión 22.13. La versión de pnpm está fijada en `package.json` (`packageManager`); con Corepack activado (`corepack enable`) se utiliza automáticamente.

```sh
nvm use
pnpm install
pnpm dev
```

Vite muestra la dirección local al arrancar, normalmente `http://localhost:5173`.

| Comando | Función |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo con recarga automática. |
| `pnpm typecheck` | Comprobación de TypeScript. |
| `pnpm lint` | Revisión estática de código, sin avisos permitidos. |
| `pnpm build` | Comprobación de tipos y generación de `dist/`. |
| `pnpm preview` | Vista previa local de la compilación de producción. |
| `pnpm test:e2e` | Pruebas end-to-end con Playwright en escritorio y móvil (usa Google Chrome y arranca el servidor de desarrollo). |

## Actualizar el contenido

El contenido profesional está centralizado en [`src/data/portfolio.ts`](src/data/portfolio.ts): perfil, experiencia, proyectos, formación, tecnologías e idiomas. Las entradas tienen tipos TypeScript y un identificador estable. Los proyectos pueden omitir `href` cuando no disponen de un enlace público.

Cada proyecto se ilustra con un componente SVG de [`src/components/ProjectArtwork/`](src/components/ProjectArtwork/), registrado por su `id` en `ProjectArtwork.tsx`. Describe la ilustración en `imageAlt` y enlaza la experiencia correspondiente con `experienceId` para mostrar «Mi contribución» en el detalle. Con un número impar de proyectos, el primero ocupa todo el ancho en escritorio.

Para actualizar el currículum descargable, sustituye [`public/CV_Victor_Gonzalez_Carro.pdf`](public/CV_Victor_Gonzalez_Carro.pdf). Si cambia su nombre, actualiza también `profile.cv`. Las imágenes importadas desde `src/assets/` las procesa Vite; los archivos de `public/` se copian directamente a la raíz de `dist/`.

## Formulario de contacto

El envío utiliza EmailJS y necesita un servicio, una plantilla y una clave pública de esa cuenta. Para configurar un entorno local nuevo:

```sh
cp .env.example .env.local
```

Completa estos valores en `.env.local`:

```dotenv
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

Reinicia Vite después de cambiarlos. En producción, define las mismas variables en el proveedor de alojamiento antes de compilar. Vite incorpora las variables `VITE_*` al cliente: utiliza únicamente los identificadores y la clave pública de EmailJS, nunca claves privadas.

La plantilla de EmailJS debe dirigir el mensaje a `{{to_email}}` y utilizar `{{reply_to}}` como dirección de respuesta. También recibe `{{to_name}}`, `{{from_name}}`, `{{from_email}}` y `{{message}}`. El destinatario procede del perfil del portfolio; el correo introducido por el visitante se utiliza para responderle. Revisa los dominios permitidos de tu servicio EmailJS al cambiar el dominio de despliegue.

## Compilar y publicar

```sh
pnpm lint
pnpm build
pnpm preview
```

Publica el contenido de `dist/` en un alojamiento estático. La configuración actual sirve el portfolio en la raíz del dominio. Para alojarlo en un subdirectorio, revisa `base` en `vite.config.ts` y las rutas absolutas de los archivos públicos. El servidor `preview` permite revisar el resultado localmente; no es un servidor de producción.

## Dependencias

Las versiones exactas se conservan en `pnpm-lock.yaml`; utiliza `pnpm install --frozen-lockfile` para reproducir la instalación, por ejemplo en integración continua. pnpm solo ejecuta los scripts de instalación de las dependencias aprobadas en `pnpm-workspace.yaml`; ahora mismo solo `@swc/core`, el compilador nativo que usa el plugin de React para Vite. Si una dependencia nueva lo necesita, apruébala con `pnpm approve-builds`.

TypeScript se mantiene en la versión 6.0 compatible con `typescript-eslint`. Motion y Three.js cubren los efectos del sitio sin los paquetes de física y renderizado React del prototipo anterior.

Referencias de mantenimiento: [Vite](https://vite.dev/guide/migration), [compatibilidad de typescript-eslint](https://typescript-eslint.io/users/dependency-versions/) y [migraciones de Motion](https://motion.dev/docs/react-upgrade-guide).
