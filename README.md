# Prueba técnica — React developer - RAONA

## Instrucciones de ejecución

- Para inicializar la aplicación utilice el script:

```bash
npm run start
```

Esto ejecutará los comandos: **npm install**, **node createEnv.js** (archivo que genera el .env basándose en el .env.example) y **npm run dev**.

## Decisiones de desarrollo y arquitectura

- El proyecto se inicializó utilizando Vite.js con SWC.
- Para la estructura de carpetas de componentes se utilizó la metodología de Atomic Design.
- Para la nomeclatura de clases se aplicó la técnica BEM.

## Dependecias instaladas (EXTRAS)

- Zod: es una librería de validación y declaración de esquemas basada en TypeScript. Esto permitió validar los datos que se obtienen del servicio web y guardar únicamente los datos a utilizar gracias al parseado que ofrece. También facilitó la creación de tipos debido a la inferencia de los esquemas.

## Cuestionario
### ¿Cómo decidió las opciones técnicas y arquitectónicas utilizadas como parte de su solución?
- **Atomic Design**: Es práctico para crear sistemas de diseño modulares y escalables. Se basa en el concepto de descomponer una interfaz de usuario en elementos más pequeños y simples y luego combinar estos elementos para construir interfaces de usuario más complejas. Al adoptar Atomic Design, se puede lograr una mayor coherencia visual, flexibilidad y reutilización de componentes en el desarrollo.
- **BEM**: Se basa en la idea de dividir el código CSS en bloques independientes, elementos y modificadores. Es recomendado en la documentación de Sass.

### ¿Hay alguna mejora que pueda hacer en su envío?
- Mejorar la perfomance de la app utilizando herramientas como Lighthouse.

### ¿Qué haría de manera diferente si se le asignara más tiempo?
- Buscaría abstraer un poco más la lógica en los componentes para evitar redundancias y generar funciones reutilizables.
- Crearía un theme para crear estilos predeterminados y mantener un sistema de diseño.
