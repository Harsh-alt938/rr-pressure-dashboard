
<div align="center">

<img src="assets/rr-logo.png" alt="Rajasthan Royals Logo" width="150">

# Under Pressure

### Who delivers when the game is on the line?

**SupeRR Selector Season 2 · Round 1 · Pressure Performance Model**

HTML5 · CSS3 · JavaScript

</div>

---

## 🏏 The Idea in One Minute

Every cricket fan has an opinion about who is "clutch". Very few of those opinions survive a look at the data.

This project replaces reputation with evidence. Instead of calling a moment "pressure" because the required run rate looks scary, it measures how much a single delivery can still change the result.

Every ball in **738 men's IPL and T20I matches (176,504 deliveries, 2022 onwards)** gets a pressure score. The top ~21% become high-pressure balls, and each batter and bowler is judged on the win probability they added or saved on exactly those balls.

The result is a ranked top 10 for batters and bowlers, plus an interactive dashboard to explore every number behind it.

---

## 📊 Headline Results

### Top 10 Pressure Batters

| Rank | Batter | Rating |
|:---:|---|---:|
| 1 | Tim David | 2.65 |
| 2 | Abhishek Sharma | 1.65 |
| 3 | Vaibhav Sooryavanshi | 1.62 |
| 4 | Fakhar Zaman | 1.50 |
| 5 | Phil Salt | 1.47 |
| 6 | Cameron Green | 1.40 |
| 7 | Virat Kohli | 1.35 |
| 8 | Yashasvi Jaiswal | 1.32 |
| 9 | Heinrich Klaasen | 1.30 |
| 10 | Jos Buttler | 1.09 |

### Top 10 Pressure Bowlers

| Rank | Bowler | Rating |
|:---:|---|---:|
| 1 | Kuldeep Yadav | 2.04 |
| 2 | Krunal Pandya | 1.98 |
| 3 | Sunil Narine | 1.94 |
| 4 | Lockie Ferguson | 1.63 |
| 5 | Rashid Khan | 1.40 |
| 6 | Axar Patel | 1.34 |
| 7 | Josh Hazlewood | 1.31 |
| 8 | Ravichandran Ashwin | 1.28 |
| 9 | Jasprit Bumrah | 1.18 |
| 10 | Kagiso Rabada | 1.02 |

### Key Findings

- **Tim David** is the clearest call in the pool: strike rate rises from 171 to 195 under pressure, and he stays in the top 10 in 84% of re-samples.
- Spin and control dominate the bowling list. Kuldeep, Krunal and Narine all concede fewer runs per over under pressure than in normal play.
- Positions 2 to 10 are statistically close. The model says so openly and shows each player's rank range instead of pretending the order is precise.

---

## 🧠 How Pressure Is Defined

### 1. Win-Probability Model

Two gradient-boosted models (one per innings) estimate the batting side's chance of winning from the live match state.

Cross-validated by match:

- Log-loss: 0.638 and 0.408
- Baseline: 0.693 for a coin flip

### 2. Leverage Index (LI)

For every legal ball, the seven possible outcomes are simulated, win probability is re-scored, and the weighted absolute swing becomes the ball's LI.

The average ball equals 1.0.

### 3. High Pressure = LI ≥ 1.5

- 20.8% of deliveries are high pressure.
- 67% of high-pressure deliveries occur in chases.

### Does It Work?

Dot-ball rate climbs from 33.5% in the calmest band to 38.6% in the 2–3 band, and pressure balls come from far closer games (0.16 from 50/50 versus 0.24).

---

## 🏆 How Players Are Rated

**Rating = 0.8 × z(Pressure Impact) + 0.2 × z(Consistency)**

### Pressure Impact (80%)

Win Probability Added over high-pressure balls, per 100 balls, shrunk toward zero so a hot streak cannot outrank a long record.

### Consistency (20%)

The share of pressure innings or spells with positive impact.

### Guardrail

Clutch Lift (pressure versus normal performance) tested as noise, so it only filters out clear underperformers.

### Fair Comparison

- Batters need 90+ pressure balls and 15 innings.
- Bowlers need 72+ balls and 15 spells.
- Associate, A-team, rain-affected and no-result games are excluded.
- IPL and T20I are modelled together with a competition flag.

---

## 🔬 Reliability, Stated Honestly

| Test | Finding |
|---|---|
| Bootstrap (300 match re-samples) | Narine 89%, David 84%, Kuldeep 80% most secure |
| Split-half correlation | 0.21 batters, 0.29 bowlers (about 0.34 and 0.45 after Spearman-Brown) |
| Sensitivity (LI 1.2 or 60/40 weights) | 9 of 10 names stay in both lists |
| Extreme threshold (LI 2.0) | Only 5 batters and 3 bowlers survive, so it is not trusted |

### Limitations

Not modelled: ball-level opposition quality, pitch and dew, fielding, batting position and venue.

**2027 auction eligibility must be confirmed.**

---

## 📈 Dashboard Features

- Batters and Bowlers toggle with live search and sorting
- Player popups with normal-versus-pressure numbers
- Rating and strike-rate / economy comparison charts
- Rajasthan Royals auction-fit section
- Fully responsive, keyboard accessible, reduced-motion friendly
- No frameworks, no build step, no dependencies

---

## 📂 Project Structure

```text
rr-pressure-dashboard/
│
├── index.html          # Page structure and content
│
├── css/
│   └── style.css       # Rajasthan Royals pink and navy theme
│
├── js/
│   ├── data.js         # Every number in the report (edit data here)
│   └── app.js          # Tabs, search, sort, charts, popups
│
├── assets/
│   └── rr-logo.png     # Team crest
│
└── README.md
```

---

## 🚀 Run It Locally

### Clone the Repository

```bash
git clone https://github.com/Harsh-alt938/rr-pressure-dashboard.git
```

### Navigate to the Project Directory

```bash
cd rr-pressure-dashboard
```

### Launch the Dashboard

Open `index.html` in your browser, or use VS Code Live Server.

---

## ⚙️ Reproduce the Model

Filter to full-member and IPL teams and remove rain-affected and no-result matches.

Compute the match state before every ball, then fit one HistGradientBoostingClassifier per innings:

- Depth: 4
- Iterations: 150
- Learning rate: 0.05
- Minimum leaf: 400
- L2 regularization: 5

Calculate LI scaled to a mean of 1, tag LI ≥ 1.5 as pressure, sum WPA per player, shrink, add consistency, and z-score.

The full write-up is in the methodology report submitted with this project.

---

## 👨‍💻 Author

**Harsh**

Final-year Electronics & Communication Engineering student, Jamshedpur

Built for the Rajasthan Royals SupeRR Selector Season 2 challenge.

---

<div align="center">

### 💗 Pressure is not a feeling. It is a number, and now you can see it.

**SupeRR Selector Season 2 · Round 1**

</div>
