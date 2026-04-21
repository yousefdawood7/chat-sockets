<h1 align="center">Chat Sockets</h1>

<p align="center">
	<img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
	<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
	<img alt="Express" src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
	<img alt="Socket.IO" src="https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white" />
	<img alt="Parcel" src="https://img.shields.io/badge/Parcel-F7EA00?style=for-the-badge&logo=parcel&logoColor=black" />
	<img alt="pnpm" src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white" />
	<img alt="esbuild" src="https://img.shields.io/badge/esbuild-000000?style=for-the-badge&logo=esbuild&logoColor=white" />
</p>

<p align="center">
    A minimal real-time chat demo using Socket.IO, TypeScript (server), and a small Parcel client.
    <br />
    <a href="https://chat-sockets.yousefdawood.me">Live Demo</a>
</p>

## Features

- Simple Socket.IO-based real-time messaging
- Typing indicator events
- Minimal, easy-to-run client and server setups

## Repo layout

- `client/` — static frontend (Parcel) using `socket.io-client`.
- `server/` — TypeScript Express + Socket.IO server with `tsx` for development and `esbuild` for production builds.

## Prerequisites

- Node.js 18+ (or compatible)
- pnpm (recommended)

## Quick start — development

Open two terminals: one for the server and one for the client.

1. Server (development)

```bash
cd server
pnpm install
pnpm run dev
```

This starts the TypeScript server with watcher (`tsx --watch server.ts`). The server listens on `PORT` (default: `3000`). The server will accept connections from `APP_URL` (default `http://localhost:1234`).

2. Client (development)

```bash
cd client
pnpm install
pnpm start
```

Parcel starts a dev server (default `http://localhost:1234`). Open the page in your browser and you'll be connected to the server.

## Environment variables

Create a `.env` file in `server/` if you want to override defaults:

```
PORT=3000
APP_URL=http://localhost:1234
```

## Build / Production

1. Build server

```bash
cd server
pnpm install
pnpm run build
pnpm run start
```

`pnpm run build` runs the `esbuild` build via the repo's `esbuild.config.ts` and outputs to `dist/`. `pnpm run start` runs `node dist/index.js`.

2. Build client

```bash
cd client
pnpm install
pnpm run build
```

Serve the client `dist` output from any static host (or configure a simple static server).

## Usage

- Open the client in multiple browser windows or devices to test real-time messaging.
- Typing events are emitted as `typing` and relayed as `server-typing` to all clients.
- Sending emits `send` and clients receive `server-send`.

## Where to look in code

- Server entry: [server.ts](server/server.ts)
- Express app and routes: [app.ts](server/app.ts)
- Client entry: [client/index.html](client/index.html)
- Client socket helpers: [client/scripts/socket.js](client/scripts/socket.js)
