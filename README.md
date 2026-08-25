# Vanta 3D Studio Landing Page

An immersive studio landing page built with Next.js and Three.js. The hero presents an animated orbital sculpture alongside the Vanta studio message, with a responsive layout for desktop and mobile screens.

![Vanta 3D studio landing page](<public/Screenshot 2026-08-25 at 6.11.21 PM.png>)

## Features

- Animated Three.js orbital sculpture with a lime core, wireframe shell, rings, lighting, and stars
- Pointer movement subtly changes the sculpture's rotation
- Pause and resume control for the WebGL animation
- Responsive hero layout that stacks the scene below the copy on smaller screens
- Studio navigation, project call-to-action, and about statement sections

## Tech Stack

- [Next.js](https://nextjs.org/) 16 with the App Router
- [React](https://react.dev/) 19
- [Three.js](https://threejs.org/)
- TypeScript
- Tailwind CSS 4 through PostCSS

## Getting Started

From this directory, install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project Structure

```text
app/
	page.tsx       # Landing page and Three.js scene
	globals.css    # Layout and scene styles
	layout.tsx     # Root layout and metadata
public/          # Static assets, including the project screenshot
```

The primary page and WebGL scene live in [`app/page.tsx`](app/page.tsx). The scene is created in a client component so Three.js can use the browser's WebGL environment safely.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# ThreeBoilerplate
