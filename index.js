import express from "express";
import cors from "cors";
import exercises from "./exercises.js";

const app = express();
app.use(cors());
app.use(express.json());

function pickRandom(arr, n) {
  if (!arr || arr.length === 0) return [];
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(n, shuffled.length));
}

const DAY_GROUPS = {
  1: ["petto", "spalle", "tricipiti"],
  2: ["dorso", "bicipiti"],
  3: ["gambe", "posteriori", "polpacci"]
};

function filterExercises(input) {
  return exercises.filter(ex => {
    if (input.experience === "beginner" && ex.level === "avanzato") return false;

    if (input.equipment === "home") {
      if (ex.equipment === "bilanciere" || ex.equipment === "macchina") return false;
    }

    if (input.exercise_pref && input.exercise_pref !== "tutto") {
      if (ex.equipment !== input.exercise_pref) return false;
    }

    return true;
  });
}

function generateProgram(input) {
  const filtered = filterExercises(input);
  const sessions = [];

  for (let day = 1; day <= 3; day++) {
    const groups = DAY_GROUPS[day];
    let dayExercises = filtered.filter(ex => groups.includes(ex.muscle_group));

    if (dayExercises.length === 0) {
      dayExercises = filtered.filter(ex => ex.muscle_group !== "cardio");
    }

    let chosen = pickRandom(dayExercises, 5).map(ex => ({
      name: ex.name,
      sets: 3,
      reps: "8-12"
    }));

    const core = filtered.filter(e => e.muscle_group === "addome");
    if (core.length > 0) {
      chosen.push({
        name: pickRandom(core, 1)[0].name,
        sets: 3,
        reps: "15-20"
      });
    }

    if (input.goal === "fat_loss") {
      const cardio = filtered.filter(e => e.muscle_group === "cardio");
      if (cardio.length > 0) {
        chosen.push({
          name: pickRandom(cardio, 1)[0].name,
          sets: 1,
          reps: "10-15 min"
        });
      }
    }

    sessions.push({
      name: `Giorno ${day}`,
      exercises: chosen
    });
  }

  return sessions;
}

app.post("/generate-workout-plan", (req, res) => {
  try {
    const input = req.body;
    const sessions = generateProgram(input);

    res.json({
      user: input.name,
      goal: input.goal,
      level: input.experience,
      days: 3,
      sessions
    });
  } catch (err) {
    console.error("ERRORE BACKEND:", err);
    res.status(500).json({ error: "Errore nella generazione della scheda" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Backend attivo sulla porta " + PORT));
