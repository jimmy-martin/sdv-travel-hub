# ✈️ Travel Hub – API + Logs

Projet complet permettant de gérer des offres de voyages avec :

- Une **API REST** en Node.js (Hono + TypeScript)
- Une **base MongoDB** pour stocker les offres
- Une **base Redis** pour la publication (Pub/Sub)
- Un **serveur de logs** abonné à Redis (`offers:new`)

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

### 2. Remplir les variables d'environnement

Copier le fichier .env.example et le renommer en .env

```bash
cp .env.example .env
```

Remplir les variables d'environnement avec vos informations

### 3. Lancer avec Docker

```bash
docker-compose up -d
```

Cela lance :

| Service      | Port     | Description                  |
|--------------|----------|------------------------------|
| API          | `3000`   | L'API principale REST        |
| Logs Server  | `4000`   | Historique Redis Pub/Sub     |
| MongoDB      | `27017`  | Base de données              |
| Redis        | `6379`   | Cache / Pub/Sub              |
| Frontend     | `4000`   | Interface web                |

---

### 4. Donnée

#### 4.1. Sur MongoDB, créer la base de donnée et la collection offers

Il faut crééer la base de donnée `sdv-travel-hub` et la collection `offers` (via MongoDB Compass par exemple)

#### 4.2. Ajouter des données MongoDB

Importer le fichier json qui se trouve dans /docs/offers.json (via MongoDB Compass par exemple)

### 4.3. Créer les indexs

Se rendre au sein du container docker et lancer la commande:

```bash
npm run create-indexes 
```

Ou directement depuis le host:

```bash
docker exec <nom_du_container_api> npm run create-indexes 
```

### 4.4. Ajouter des données sur Neo4j

Copier-coller le contenu du fichier qui se trouve dans /docs/neo4j_script.cypher et l'exécuter via une interface graphique Neo4j ou autre


### 5. Postman (optionnel)

Importer le fichier qui se trouve dans /docs/NoSQL SDV.postman_collection.json dans Postman afin de tester les endpoints

## 🧪 Scripts utiles

```bash
npm run dev         # Démarre l'API (port 3000)
npm run dev:logs    # Démarre le serveur de logs (port 4000)
npm run create-indexes  # Créer les indexs
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

## 📚 Correction

- Toutes les requêtes utilisées (MongoDB, Redis, Neo4j) se trouvent dans les services (`/src/services`)
