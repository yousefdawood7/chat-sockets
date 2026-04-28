<h1 align="center">💬 Chat Sockets</h1>

<p align="center">
	<img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
	<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
	<img alt="Express" src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
	<img alt="Socket.IO" src="https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white" />
	<img alt="Parcel" src="https://img.shields.io/badge/Parcel-F7EA00?style=for-the-badge&logo=parcel&logoColor=black" />
	<img alt="pnpm" src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white" />
	<img alt="AWS EC2" src="https://img.shields.io/badge/AWS_EC2-FF9900?style=for-the-badge&logo=amazon-ec2&logoColor=white" />
</p>

<p align="center">
  A minimal, real-time chat demo powered by <strong>Socket.IO</strong>, <strong>TypeScript</strong>, and a lightweight <strong>Parcel</strong> client.
  <br />
  The API is deployed on <strong>AWS EC2</strong> and the client is served via a custom domain.
  <br /><br />
  <a href="https://chat-sockets.yousefdawood.me"><strong>🌐 Live Demo</strong></a>
  &nbsp;·&nbsp;
  <a href="https://api.chat-sockets.yousefdawood.me"><strong>🔌 API</strong></a>
</p>

---

## ✨ Features

- ⚡ **Real-time messaging** via WebSockets (Socket.IO)
- 🖊️ **Typing indicators** — see when the other side is typing
- 🏗️ **Monorepo layout** — clean separation between `client/` and `server/`
- 🛠️ **TypeScript server** with `tsx` for dev and `esbuild` for production bundles
- 📦 **Parcel client** — zero-config bundler for the frontend
- ☁️ **Cloud-hosted API** on AWS EC2 at `api.chat-sockets.yousefdawood.me`

---

## 🗂️ Repository Layout

```
chat-sockets/
├── client/           # Static frontend (Parcel + socket.io-client)
│   ├── index.html
│   ├── style.css
│   └── scripts/
└── server/           # TypeScript Express + Socket.IO API
    ├── server.ts     # Entry point — HTTP server & Socket.IO setup
    ├── app.ts        # Express app & routes
    └── esbuild.config.ts
```

---

## ☁️ Deployment

| Component        | Host           | URL                                        |
| ---------------- | -------------- | ------------------------------------------ |
| **API / Server** | AWS EC2        | `https://api.chat-sockets.yousefdawood.me` |
| **Client**       | Static hosting | `https://chat-sockets.yousefdawood.me`     |

The backend runs as a Node.js process on an **AWS EC2** instance. The custom subdomain `api.chat-sockets.yousefdawood.me` is pointed to the EC2 instance's public IP via DNS, with a reverse proxy (e.g., Nginx) handling SSL termination and forwarding traffic to the Node.js server.

**Production environment variables on EC2 (`server/.env`):**

```env
PORT=3000
CLIENT_APP_URL=https://chat-sockets.yousefdawood.me
```

---

## 🚀 Getting Started (Local Development)

### Prerequisites

- **Node.js** 18+
- **pnpm** (recommended — `npm i -g pnpm`)

### 1. Clone the repo

```bash
git clone https://github.com/yousefdawood7/chat-sockets.git
cd chat-sockets
```

### 2. Start the server

```bash
cd server
pnpm install
pnpm run dev
```

> Starts the TypeScript server with file-watching via `tsx --watch`.
> Listens on `PORT` (default: `3000`) and allows CORS from `CLIENT_APP_URL` (default: `http://localhost:1234`).

### 3. Start the client

Open a **second terminal**:

```bash
cd client
pnpm install
pnpm start
```

> Parcel dev server starts at `http://localhost:1234`. Open it in your browser to connect.

### Environment Variables

Create a `.env` inside `server/` to override defaults:

```env
PORT=3000
CLIENT_APP_URL=http://localhost:1234
```

---

## 🏭 Production Build

### Server

```bash
cd server
pnpm install
pnpm run build   # Bundles via esbuild → dist/
pnpm run start   # node dist/server.js
```

### Client

```bash
cd client
pnpm install
pnpm run build   # Outputs to dist/
```

Serve the `client/dist/` directory from any static host (Nginx, Vercel, S3, etc.).

---

## 📡 Socket Events

| Event           | Direction        | Description                                            |
| --------------- | ---------------- | ------------------------------------------------------ |
| `send`          | Client → Server  | User sends a message                                   |
| `server-send`   | Server → Clients | Server broadcasts the message to all connected clients |
| `typing`        | Client → Server  | User started / stopped typing                          |
| `server-typing` | Server → Clients | Server relays typing state to all other clients        |

---

## 🔍 Key Files

| File                                                   | Purpose                                   |
| ------------------------------------------------------ | ----------------------------------------- |
| [`server/server.ts`](server/server.ts)                 | HTTP server entry point & Socket.IO setup |
| [`server/app.ts`](server/app.ts)                       | Express app, CORS, and routes             |
| [`server/esbuild.config.ts`](server/esbuild.config.ts) | Production build configuration            |
| [`client/index.html`](client/index.html)               | Frontend entry point                      |
| [`client/scripts/socket.js`](client/scripts/socket.js) | Client-side Socket.IO helpers             |

---

## 🛠️ Tech Stack

| Layer            | Technology  |
| ---------------- | ----------- |
| Runtime          | Node.js 18+ |
| Language         | TypeScript  |
| Server framework | Express 5   |
| Real-time        | Socket.IO 4 |
| Client bundler   | Parcel      |
| Build tool       | esbuild     |
| Package manager  | pnpm        |
| Cloud            | AWS EC2     |

---

<p align="center">Made with ❤️ by <a href="https://github.com/yousefdawood7">Yousef Dawood</a></p>
