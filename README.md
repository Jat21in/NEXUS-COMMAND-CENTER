<div align="center">

# 🕹️ Gamified Admin Arena  
**_Transforming Admin Tasks Into Epic Quests_**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Beta-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![Framer Motion](https://img.shields.io/badge/FramerMotion-5.5-black?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

🎮 Level up productivity with XP, avatars, badges, retro themes & more.  
👾 Every click earns you points — work has never felt this rewarding!

[🚀 Live Preview](https://your-live-demo-link.com) • [📚 Docs](https://your-docs-link.com) • [🐛 Report Bug](https://github.com/yourrepo/issues)

<img src="screenshots/dashboard-preview.png" alt="Gamified Admin Arena Dashboard" width="700"/>

</div>

---

## 🔮 What is Gamified Admin Arena?

**Gamified Admin Arena** is a vibrant, retro-themed admin dashboard built with **React.js** that transforms mundane admin operations into engaging gamified missions. Earn XP, level up, unlock badges, customize your avatar, and even switch to 8-bit Retro Mode for that nostalgic feel!

---

## ✨ Core Features

### Dashboard UI

- 🧭 Sidebar with XP & Level indicators  
- 📊 Modules: **Kanban**, **Calendar**, **Charts**, **Tables**  
- 🔁 Navigation via **React Router**  
- 📱 Responsive layout and smooth interactions  

---

### 🧠 Gamification Engine

- 🧮 XP Rewards for key actions:
  - ✅ Task Completion → +20 XP  
  - 📅 Calendar Check-In → +10 XP  
  - 📤 Share Reports → +15 XP  
  - 🔐 Daily Login Bonus → +5 XP  
- 📈 Progression with level thresholds  
- 💾 Data stored via `localStorage` or **Firebase**  

<img src="screenshots/xp-tracker.png" alt="XP Tracker" width="600"/>

---

### 🧍 Avatar Builder

- 👤 Choose from: 🧙 Mage, 🥷 Ninja, 🤖 Robot  
- 🧢 Add accessories (Glasses, Hats, Weapons)  
- 🧩 SVG-based layering with local saving  

```jsx
<Avatar base="ninja" accessories={["glasses", "hat"]} />


### 🏅 Achievements & Badges
- 🎯 Task Terminator: Complete 50 tasks  
- 📅 Calendar Commander: Use calendar 5 consecutive days  
- Earn & view badges in dynamic modals and user profile

### 🏆 Leaderboard
- Local Top 5 XP scorers
- Firebase support for global scoreboard

### 👾 Retro Mode
- 8-bit NES-style UI with pixel fonts & FX  
- NES.css integration with Tailwind  
- Toggle retro mode in settings

### 🎨 Theme Store
- Unlock and preview live UI themes:
  - Neon Pulse  
  - Forest Magic  
  - Cyber Dark  
- Use XP to purchase & activate themes

### 💬 UX Feedback
- 🎉 Confetti explosions on level-up  
- 🔊 SFX using Howler.js  
- 🧍 Avatar reacts to XP gain  
- ⚡ Modal popups for badge unlocks

---

## 🧰 Tech Stack

| Category        | Technology                | Purpose                                  |
|----------------|---------------------------|------------------------------------------|
| 🎨 Styling      | Tailwind CSS, NES.css     | Responsive modern + retro UI             |
| ⚛️ UI Framework | React 18                  | Component-based frontend architecture     |
| 🔁 Routing      | React Router              | Page-level navigation                    |
| 📊 Charts       | Recharts, Chart.js        | Analytics and performance visuals        |
| 📅 Calendar     | FullCalendar React        | Task scheduling and event timeline       |
| 🧠 State Mgmt   | Context API / Zustand     | Global state for XP, avatars, themes     |
| 🔊 Audio        | Howler.js                 | Audio feedback and retro SFX             |
| 📦 Storage      | localStorage / Firebase   | User persistence & XP tracking           |
| 🎞️ Animation   | Framer Motion, Lottie     | Animations for interactions & rewards    |
| 🧩 Kanban       | React Beautiful DnD       | Drag-and-drop task management            |

---

### 📋 **Contribution Guidelines**

- Follow the existing code style
- Add tests for new features
- Update documentation
- Ensure all tests pass
- Keep commits atomic and descriptive

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

<div align="center">

**Built with cosmic inspiration and stellar dedication**

Special thanks to:
- 🌟 The React team for the amazing framework
- 🎨 Tailwind CSS for beautiful styling utilities  
- 🔊 Web Audio API for immersive sound design
- 🚀 Next.js for the powerful development experience

---

<sub>Made with ❤️ and ☕ by Jatin Mittal who believe productivity should be out of this world</sub>

**[⭐ Star this repo](https://github.com/Jat21in/space-todo)** • **[🐛 Report Bug](https://github.com/Jat21in/space-todo/issues)** • **[💡 Request Feature](https://github.com/Jat21in/space-todo/issues)**

</div>
```
