
# 🚀 Universal Media Downloader

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)
![License](https://img.shields.io/badge/license-MIT-purple.svg)

> **Live Demo:** [Test the application here!](https://universal-downloader-1jbu.onrender.com)

A robust, full-stack web application that allows users to download media (Video and Audio) from major social platforms like YouTube, Instagram, Facebook, and Twitter. Built with a Node.js backend and a responsive, modern Bootstrap 5 frontend.

---

## 📖 Table of Contents
1. Introduction
2. Core Concepts Explained
3. How It Works (Architecture)
4. Tech Stack & Tools
5. Local Installation & Setup
6. API Endpoints
7. Disclaimer
8. Author

---

## 🌟 Introduction
Building a reliable media downloader is a complex challenge that involves bypassing bot-detection, parsing dynamic web pages, and handling heavy media streams. This project provides a clean UI where users can paste a supported URL, automatically fetch the video thumbnail and metadata, and select their desired output format (ranging from Audio-only MP3s to 1080p multiplexed MP4s).

---

## 🧠 Core Concepts Explained

### 1. Web Scraping & API Reverse Engineering
Web scraping is the automated process of extracting data from websites. Modern platforms use obfuscated JavaScript and dynamic data loading, making traditional scraping difficult.

This project relies on yt-dlp which reverse-engineers hidden APIs to extract media stream URLs.

### 2. Stream Separation (DASH/HLS)
High quality videos often separate audio and video streams.

The backend downloads best video and audio separately.

### 3. Multiplexing (Muxing) with FFmpeg
FFmpeg merges audio and video into a single MP4 or MP3 file.

---

## ⚙️ How It Works (Architecture)

1. User pastes link
2. Server fetches metadata
3. User selects format
4. yt-dlp downloads streams
5. ffmpeg merges
6. File sent to user

---

## 🛠️ Tech Stack

Frontend:
- HTML
- CSS
- Bootstrap
- JavaScript

Backend:
- Node.js
- Express.js
- yt-dlp
- ffmpeg

---

## 💻 Setup

```bash
git clone https://github.com/YOUR-USERNAME/universal-downloader.git
cd universal-downloader
npm install
node server.js
```

Open:
http://localhost:3000

---

## 📡 API

POST /info

POST /download

---

## ⚠️ Disclaimer
Educational purpose only.

---

## 👨‍💻 Author

Arpit Verma
