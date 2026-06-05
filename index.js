import { exercises } from "./exercises.js";
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

// Endpoint principale
app.post("/generate-workout-plan", (req, res) => {
  const data = req.body;
  const program = generateProgram(data);
  res.json(program);
});

// Avvio server
app.listen(3000, () => {
  console.log("Backend attivo sulla porta 3000");
});
app.post("/generate-workout-plan", (req, res) => {
    try {
        const data = req.body;

        // Esempio di risposta (puoi personalizzarla)
        const workoutPlan = {
            goal: data.goal,
            experience: data.experience,
            equipment: data.equipment,
            days_per_week: data.days_per_week,
            message: "Scheda generata con successo!",
            plan: [
                { day: 1, workout: "Petto + Tricipiti" },
                { day: 2, workout: "Schiena + Bicipiti" },
                { day: 3, workout: "Gambe + Spalle" }
            ]
        };

        res.json(workoutPlan);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Errore interno del server" });
    }
});

