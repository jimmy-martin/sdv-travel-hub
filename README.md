# ✈️ Travel Hub – API + Logs

Projet complet permettant de gérer des offres de voyages avec :

- Une **API REST** en Node.js (Hono + TypeScript)
- Une **base MongoDB** pour stocker les offres
- Une **base Redis** pour la publication (Pub/Sub)
- Un **serveur de logs** abonné à Redis (`offers:new`)
- Exportation des **metrics Prometheus**

---

## 📦 Stack technique

| Composant   | Description                         |
|-------------|-------------------------------------|
| Node.js     | Serveur Hono (API + logs)           |
| TypeScript  | Code typé                           |
| MongoDB     | Stockage des offres (`offers`)      |
| Redis       | Pub/Sub pour diffusion d'offres     |
| Docker      | Conteneurisation                    |
| Prometheus  | (optionnel) Metrics via `/metrics`  |

---

## 🚀 Démarrage rapide

### 1. Cloner le repo

```bash
git clone https://github.com/ton-projet/travel-hub.git
cd travel-hub
```

### 2. Lancer avec Docker

```bash
docker-compose up --build
```

Cela lance :

| Service      | Port     | Description                  |
|--------------|----------|------------------------------|
| API          | `3000`   | L'API principale REST        |
| Logs Server  | `4000`   | Historique Redis Pub/Sub     |
| MongoDB      | `27017`  | Base de données              |
| Redis        | `6379`   | Pub/Sub                      |

---

## 📂 Structure

```bash
src/
├── api/              # Serveur principal (Hono)
│   └── index.ts
├── logs-server/      # Serveur secondaire (logs)
│   ├── index.ts
│   └── redis.ts
├── services/         # Connexions Mongo/Redis/Neo4j
```

---

## 🧪 Scripts utiles

```bash
npm run dev         # Démarre l'API (port 3000)
npm run dev:logs    # Démarre le serveur de logs (port 4000)
```

---

## 🧑‍💻 Endpoints utiles

### 📘 API principale (`http://localhost:3000`)

- `GET /offers` – liste des offres
- `GET /offers/:id` – détail + offres liées
- `POST /offers` – création d'une offre
- `GET /stats/top-destinations` – top destinations (avec cache)
- `GET /reco` – recommendations des villes proches à visiter avec scoring
- `GET /metrics` – metrics Prometheus
- `POST /login` – créer une session redis

### 🧾 Serveur de logs (`http://localhost:4000`)

- `GET /logs/offers-new` – messages publiés sur `offers:new` via Redis

---
