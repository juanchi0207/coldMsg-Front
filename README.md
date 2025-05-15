- [Descripción](#descripción)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Variables de Entorno](#variables-de-entorno)
- [Cómo Correr en Desarrollo](#cómo-correr-en-desarrollo)
- [Generar Build y Correr en Producción](#generar-build-y-correr-en-producción)
- [Cómo Funciona](#cómo-funciona)
- [Ejemplo de Uso](#ejemplo-de-uso)}
- [Correr todo con Docker](#correr-todo-con-docker)
- [Correr todo con Docker Compose](#correr-todo-con-docker-compose)

## Descripción

Cold Message Generator – Frontend es la parte cliente de una aplicación que genera mensajes de acercamiento (cold messages) personalizados. Está construido con React, TypeScript y Tailwind CSS, y consume una API REST para procesar los datos de entrada (perfiles de LinkedIn, idioma, problema y solución) y devolver mensajes generados por IA.

Características principales:

* Interfaz limpia y responsive, adaptada a dispositivos móviles y escritorio.
* Soporte de modo oscuro/claro con persistencia de preferencia.
* Validaciones en tiempo real para URLs de LinkedIn.
* Feedback visual en formularios y notificaciones con react-hot-toast.
* Estructura modular de componentes, facilitando mantenimiento y extensibilidad.

## Tecnologías Utilizadas

* **React**: Biblioteca para construir interfaces de usuario declarativas.
* **TypeScript**: Superset de JavaScript para tipado estático.
* **Vite**: Herramienta de desarrollo y bundling ultrarrápido.
* **Tailwind CSS**: Framework de utilidades CSS para estilos ágiles y responsive.
* **react-hot-toast**: Librería para notificaciones toast.
* **Heroicons**: Conjunto de iconos SVG para React.
* **lucide-react**: Iconos adicionales para el toggle de modo oscuro.
* **Headless UI**: Componentes UI accesibles sin estilos predeterminados.
* **ESLint & Prettier**: Linter y formateador de código para mantener calidad y consistencia.
* **Jest & React Testing Library**: Para pruebas unitarias de componentes.

## Estructura del Proyecto

Estructura de archivos y carpetas principal del frontend:

```plaintext
├ src/
│  ├ api/                # Conexión al backend
│  ├ components/         # Componentes React reutilizables
│  ├ App.tsx             # Componente raíz de la aplicación
│  ├ main.tsx            # Punto de entrada y renderizado
│  ├ index.css           # Estilos globales (Tailwind imports)
│  └ types/              # Definiciones de tipos TypeScript
├ .env                   # Variables de entorno de desarrollo
├ tailwind.config.js     # Configuración de Tailwind CSS
├ tsconfig.json          # Configuración de TypeScript
└ package.json           # Dependencias y scripts de npm
```

## Variables de Entorno

* **`VITE_API_URL`**: URL base de la API de generación de mensajes. Ejemplo: `https://api.midominio.com`.

Crea un archivo `.env.development` o `.env.production` en la raíz del proyecto con el siguiente contenido:

```bash
VITE_API_URL="http://localhost:3000" ##DEV
VITE_API_URL="http://localhost:8080" ##PROD
```

## Cómo Correr en Desarrollo

1. Instala dependencias:

   ```bash
   npm install  # o yarn install
   ```
2. Configura las variables de entorno en `.env.development`.
3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```
4. Abre en tu navegador: `http://localhost:5173`.


## Generar Build y Correr en Producción
1. Configura las variables de entorno en `.env.production`.
2. Genera la build optimizada:

   ```bash
   npm run build
   ```
3. Sirve los archivos estáticos:

   ```bash
   npm run preview
   ```

   Esto levantará un servidor local que sirve los archivos de producción.


## Cómo Funciona

Al completar el formulario con:

* **Tu perfil LinkedIn**
* **Perfil LinkedIn destinatario**
* **Idioma**
* **Problema**
* **Solución**

y hacer clic en **Generar mensajes**, el flujo es:

1. Se envía una petición `POST` a la API (`${VITE_API_URL}/generate`) con el payload.
2. La API devuelve un arreglo de mensajes generados.
3. Los mensajes se renderizan en la sección de resultados.
4. Puedes copiar cada mensaje al portapapeles, mostrando una notificación "Copiado!".
5. La UI adapta colores y validaciones en tiempo real.


## Correr todo con Docker

1. Cloná el proyecto y asegurate de tener Docker instalado.
2. Creá una red para que los servicios se comuniquen:

```bash
docker network create coldmsg-net
```
```bash
docker pull ghcr.io/juanchi0207/coldmsg-back:dev (o main)
docker pull ghcr.io/juanchi0207/coldmsg-front:dev (o main)
```
```bash
docker run -d --name coldmsg-front --network coldmsg-net -p 80:80 ghcr.io/juanchi0207/coldmsg-front:dev
docker run -d --name coldmsg-back --network coldmsg-net -p 8080:8080 ghcr.io/juanchi0207/coldmsg-back:dev

```

## Correr todo con Docker Compose

Si preferís usar Docker Compose para simplificar el levantado de servicios:

1. Usá el siguiente `docker-compose.yml`:

```yaml
version: '3.8'

services:
  backend:
    image: ghcr.io/juanchi0207/coldmsg-back:main   # cambia “main” por “dev” si quieres la versión dev
    container_name: coldmsg-back
    restart: unless-stopped
    ports:
      - '8080:8080'
    networks:
      - coldmsg-net

  frontend:
    image: ghcr.io/juanchi0207/coldmsg-front:main  # idem, usa “dev” si corresponde
    container_name: coldmsg-front
    restart: unless-stopped
    ports:
      - '80:80'
    networks:
      - coldmsg-net

networks:
  coldmsg-net:
    driver: bridge
```

2. Levantá los servicios con:

```bash
docker-compose up -d
```


[Volver al índice](#descripción)


