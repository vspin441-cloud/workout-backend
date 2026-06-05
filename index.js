import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Funzione che genera la scheda
function generateProgram(input) {
  const split = chooseSplit(input.days_per_week, input.preferred_split);
  const baseVolume = getWeeklyVolume(input.level, input.goal);

  return {
    user: input.name,
    goal: input.goal,
    level: input.level,
    equipment: input.equipment,
    split,
    weeks: 4,
    sessions: [
      {
        name: "Day 1 - Upper",
        exercises: [
          { name: "Panca piana bilanciere", sets: 4, reps: "6-8", rest: "120s" },
          { name: "Rematore manubrio", sets: 3, reps: "8-10", rest: "90s" }
        ]
      },
      {
        name: "Day 2 - Lower",
        exercises: [
          { name: "Squat", sets: 4, reps: "6-8", rest: "120s" },
          { name: "Affondi manubri", sets: 3, reps: "10-12", rest: "90s" }
        ]
      }
    ]
  };
}

function chooseSplit(days, preferred) {
  if (preferred) return preferred;
  if (days <= 3) return "full_body";
  if (days === 4) return "upper_lower";
  return "push_pull_legs";
}

function getWeeklyVolume(level, goal) {
  const base = {
    beginner: 10,
    intermediate: 14,
    advanced: 18
  }[level] || 12;

  if (goal === "strength") return base - 2;
  if (goal === "fat_loss") return base - 1;
  return base;
}

// Endpoint compatibile con il questionario
app.post("/generate-workout-plan", (req, res) => {
  try {
    console.log("Dati ricevuti:", req.body);

    const input = {
      goal: req.body.goal,
      level: req.body.experience,
      equipment: req.body.equipment,
      days_per_week: req.body.days_per_week,
      preferred_split: null,
      name: req.body.name || "Utente"
    };

    const program = generateProgram(input);
    res.json(program);

  } catch (err) {
    console.error("Errore backend:", err);
    res.status(500).json({ error: "Errore interno del server" });
  }
});

// Porta dinamica per Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend attivo sulla porta ${PORT}`);
});
