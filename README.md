# 🚀 Portfolio Personnel — Gabin

Portfolio personnel développé avec React et Supabase, conçu pour présenter mes projets, compétences et expériences en développement web.

Le projet inclut également une interface d'administration permettant de gérer dynamiquement les contenus (projets et compétences).

---

## ⚡ Résumé rapide

Portfolio web développé dans une logique de structuration d’application front-end et de gestion de données via un backend as a service.

👉 Objectif : présenter mes compétences techniques dans le cadre d’une poursuite d’études en MIAGE (systèmes d’information et data).

---

## 🧰 Stack technique

- React (Vite)
- TailwindCSS
- Framer Motion (animations)
- Supabase (backend as a service)
  - Base de données PostgreSQL
  - Storage (images projets)
- React Router DOM
- React Icons

---

## 🎯 Objectif du projet

Ce portfolio a été conçu pour :

- Présenter mes projets de développement
- Centraliser mes compétences techniques
- Expérimenter une architecture fullstack moderne sans backend traditionnel
- Mettre en place une interface d’administration simple et sécurisée

---

## 🧠 Compétences mobilisées

- Structuration d’une application web
- Organisation des composants React
- Gestion des données via une base relationnelle (Supabase / PostgreSQL)
- Conception d’interface utilisateur (UX/UI)
- Gestion de projet (conception → développement → tests)

---

## 🏗️ Fonctionnalités

### 🧑‍💻 Frontend (Portfolio public)

- Page d’accueil animée
- Section projets dynamique (depuis Supabase)
- Section compétences dynamique
- Modale de détail projet
- Système multilingue (FR / EN)
- Animations avec Framer Motion
- Design responsive

---

### 🔐 Interface admin

Accessible via authentification

Fonctionnalités :

- Ajout de projets
- Suppression de projets
- Modification de projets
- Upload d’images (Supabase Storage)
- Gestion des compétences (skills dynamiques)

---

## 🗄️ Base de données (Supabase)

### Table `projects`

- id
- name
- description
- image_url
- url
- created_at

### Table `skills`

- id
- name
- type (language / framework / librarie / software)
- created_at

---

## 📌 Apports du projet

Ce projet m’a permis de renforcer :

- ma capacité à structurer une application web complète
- mon autonomie en développement
- ma compréhension des interactions entre frontend et gestion de données
- mes compétences en UX/UI et en conception d’interfaces

---

## ⚙️ Installation locale

```bash
# installer les dépendances
npm install

# lancer le projet en local
npm run dev
```
