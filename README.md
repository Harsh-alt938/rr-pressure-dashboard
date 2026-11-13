<div align="center">

<img src="assets/rr-logo.png" alt="Rajasthan Royals Logo" width="160">

# 🏏 Under Pressure

### *Who delivers when the game is on the line?*

**SupeRR Selector Season 2 · Round 1 · Pressure Performance Model**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Dashboard-Click_to_Explore-ff2d75?style=for-the-badge)](https://harsh-alt938.github.io/rr-pressure-dashboard/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Harsh-alt938/rr-pressure-dashboard)
[![Made with HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)]()
[![Made with CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)]()
[![Made with JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)]()
[![No Dependencies](https://img.shields.io/badge/Dependencies-0-00c853?style=flat-square)]()
[![No Build Step](https://img.shields.io/badge/Build_Step-None-7b1fa2?style=flat-square)]()
[![Responsive](https://img.shields.io/badge/Responsive-Yes-00bcd4?style=flat-square)]()

</div>

---

## 📖 Table of Contents

1. [The Idea in One Minute](#-the-idea-in-one-minute)
2. [Headline Results](#-headline-results)
3. [How Pressure Is Defined](#-how-pressure-is-defined)
4. [How Players Are Rated](#-how-players-are-rated)
5. [Reliability, Stated Honestly](#-reliability-stated-honestly)
6. [Dashboard Features](#-dashboard-features)
7. [Project Structure](#-project-structure)
8. [Run It Locally](#-run-it-locally)
9. [Reproduce the Model](#️-reproduce-the-model)
10. [Design Philosophy](#-design-philosophy)
11. [Roadmap](#-roadmap)
12. [Tech Stack](#-tech-stack)
13. [Author](#-author)
14. [Acknowledgements](#-acknowledgements)

---

## 🔥 The Idea in One Minute

Every cricket fan has an opinion about who is **"clutch."**  
Very few of those opinions survive a look at the data.

This project replaces reputation with evidence. Instead of calling a moment *"pressure"* because the required run rate looks scary, it measures **how much a single delivery can still change the result.**

> 🎯 Every ball across **738 men's IPL and T20I matches** — **176,504 deliveries**, 2022 onwards — gets a pressure score.  
> The top **~21%** become high-pressure balls, and each batter and bowler is judged on the **win probability they added or saved** on exactly those balls.

The result: a ranked top 10 for batters and bowlers, plus a fully interactive dashboard to explore every number behind it.

**Why this matters:**
- 🏆 Traditional stats (average, strike rate, economy) treat the 1st over the same as the 20th
- 📉 "Required run rate" is a crude proxy for pressure — it ignores wickets, matchups, and momentum
- 🧠 This model quantifies pressure **ball-by-ball**, using a win-probability framework borrowed from professional sports analytics

---

## 📊 Headline Results

### 🏏 Top 10 Pressure Batters

| Rank | Batter | Rating |
|:---:|---|---:|
| 🥇 1 | **Tim David** | **2.65** |
| 🥈 2 | Abhishek Sharma | 1.65 |
| 🥉 3 | Vaibhav Sooryavanshi | 1.62 |
| 4 | Fakhar Zaman | 1.50 |
| 5 | Phil Salt | 1.47 |
| 6 | Cameron Green | 1.40 |
| 7 | Virat Kohli | 1.35 |
| 8 | Yashasvi Jaiswal | 1.32 |
| 9 | Heinrich Klaasen | 1.30 |
| 10 | Jos Buttler | 1.09 |

### 🎯 Top 10 Pressure Bowlers

| Rank | Bowler | Rating |
|:---:|---|---:|
| 🥇 1 | **Kuldeep Yadav** | **2.04** |
| 🥈 2 | Krunal Pandya | 1.98 |
| 🥉 3 | Sunil Narine | 1.94 |
| 4 | Lockie Ferguson | 1.63 |
| 5 | Rashid Khan | 1.40 |
| 6 | Axar Patel | 1.34 |
| 7 | Josh Hazlewood | 1.31 |
| 8 | Ravichandran Ashwin | 1.28 |
| 9 | Jasprit Bumrah | 1.18 |
| 10 | Kagiso Rabada | 1.02 |

### 💡 Key Findings

- **Tim David** is the clearest call in the pool — strike rate climbs from **171 → 195** under pressure, and he stays in the top 10 in **84% of re-samples.**
- **Spin and control dominate the bowling list.** Kuldeep, Krunal and Narine all concede fewer runs per over under pressure than in normal play.
- **Positions 2–10 are statistically close.** The model says so openly and shows each player's rank range instead of pretending the order is precise.
- **Left-field names matter.** Vaibhav Sooryavanshi and Abhishek Sharma crack the top 3 despite limited career samples — a signal worth tracking, not a verdict.
- **Reputation ≠ reality.** Several household names sit outside the top 10, while lesser-heralded players rise. That gap *is* the story.

---

## 🧠 How Pressure Is Defined

### 1️⃣ Win-Probability Model

Two gradient-boosted models (one per innings) estimate the batting side's chance of winning from the live match state.

| Metric | Innings 1 | Innings 2 |
|---|---|---|
| **Log-loss** | 0.638 | 0.408 |
| **Baseline (coin flip)** | 0.693 | 0.693 |

**Inputs include:** runs scored, wickets lost, balls remaining, target, run rate, wicket-preservation ratio, and competition flag.

### 2️⃣ Leverage Index (LI)

For every legal ball, the **seven possible outcomes** are simulated, win probability is re-scored, and the weighted absolute swing becomes the ball's LI.

> ⚖️ An average ball equals **1.0**. A ball at **LI 2.0** can swing the result twice as much as an average delivery.

**The seven outcomes simulated per ball:**
1. Dot ball
2. Single
3. Two runs
4. Four
5. Six
6. Wicket
7. Wide / extra

### 3️⃣ High Pressure = LI ≥ 1.5

- **20.8%** of deliveries qualify as high pressure
- **67%** of high-pressure deliveries occur in chases
- The remaining **33%** come from tight first-innings finishes

### ✅ Does It Work?

Yes — and the data proves it:

| Signal | Calm Band | Pressure Band (2–3) |
|---|---|---|
| **Dot-ball rate** | 33.5% | 38.6% |
| **Closeness to 50/50** | 0.24 | 0.16 |

> The closer a game is to 50/50, the more every ball matters. Pressure balls cluster around that equilibrium — exactly as the model intends.

---

## 🏆 How Players Are Rated

```text
Rating = 0.8 × z(Pressure Impact) + 0.2 × z(Consistency)
