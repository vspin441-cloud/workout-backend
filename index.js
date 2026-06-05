import express from "express";
import cors from "cors";
import exercises from "./exercises.js";

const app = express();
app.use(cors());
app.use(express.json());

// ----------------------
// UTILS
// ----------------------
function safePickRandom(arr, n) {
  if (!arr || arr.length === 0) return [];
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(n, shuffled.length));
}

function safeDuplicate(baseArr, targetCount) {
  const result = [...baseArr];

  while (result.length < targetCount) {
    const base = baseArr[Math.floor(Math.random() * baseArr.length)];
    if (!base) break;

    result.push({
      name: base.name,
      sets: 3,
      reps: "10-15"
    });
  }

  return result;
}

function filterExercises(input) {
  return exercises.filter(ex => {
    if (input.experience === "beginner" && ex.level === "avanzato") return false;

    if (input.equipment === "home") {
      if (ex.equipment === "bilanciere" || ex.equipment === "macchina") return false;
    }

    if (input.exercise_pref !== "" && input.exercise_pref !== "tutto") {
      if (ex.equipment !== input.exercise_pref) return false;
    }

    const name = ex.name.toLowerCase();
    const inj = (input.injuries || "").toLowerCase();

    if (inj.includes("schiena") && ["stacchi", "deadlift"].some(w => name.includes(w))) return false;
    if (inj.includes("spalla") && ["shoulder", "military"].some(w => name.includes(w))) return false;
    if (inj.includes("ginocchio") && ["squat", "affondi", "leg press"].some(w => name.includes(w))) return false;

    return true;
  });
}

function getSplitForDays(days) {
  if (days === 2) return ["FULL", "FULL"];
  if (days === 3) return ["PUSH", "PULL", "LEGS"];
  if (days === 4) return ["UPPER", "LOWER", "UPPER", "LOWER"];
  if (days === 5) return ["PUSH", "PULL", "LEGS", "UPPER", "FULL"];
  return ["PUSH", "PULL", "LEGS", "UPPER", "LOWER", "FULL"];
}

// ----------------------
// GENERA PROGRAMMA
// ----------------------
function generateProgram(input) {
  const days = input.days_per_week;
  const split = getSplitForDays(days);
  const filtered = filterExercises(input);

  const sessions = split.map((sp, index) => {
    let dayExercises = filtered.filter(e => e.split === sp);

    if (dayExercises.length === 0) {
      if (sp === "LEGS" || sp === "LOWER") {
        dayExercises = filtered.filter(e => ["gambe", "posteriori", "polpacci"].includes(e.muscle_group));
      }
      if (sp === "UPPER") {
        dayExercises = filtered.filter(e => ["petto", "dorso", "spalle", "bicipiti", "tricipiti"].includes(e.muscle_group));
      }
      if (sp === "PUSH") {
        dayExercises = filtered.filter(e => ["petto", "spalle", "tricipiti"].includes(e.muscle_group));
      }
      if (sp === "PULL") {
        dayExercises = filtered.filter(e => ["dorso", "bicipiti"].includes(e.muscle_group));
      }
    }

    if (dayExercises.length === 0) {
      dayExercises = filtered.filter(e => e.split === "FULL");
    }

    if (dayExercises.length === 0) {
      dayExercises = [...exercises];
    }

    let chosen = safePickRandom(dayExercises, 5).map(ex => ({
      name: ex.name,
      sets: 3,
      reps: "8-12"
    }));

    chosen = safeDuplicate(chosen, 5);

    if (input.goal === "fat_loss") {
      const cardio = filtered.filter(e => e.muscle_group === "cardio");

      if (cardio.length > 0) {
        const treadmill = cardio.find(e => e.name.toLowerCase().includes("tapis"));
        const cardioExercise = treadmill || safePickRandom(cardio, 1)[0];

        chosen.push({
          name: cardioExercise.name,
          sets: 1,
          reps: "10-15 min"
        });
      }

      const hasCore = chosen.some(e =>
        e.name.toLowerCase().includes("crunch") ||
        e.name.toLowerCase().includes("plank")
      );

      if (!hasCore) {
        const core = filtered.filter(e => e.muscle_group === "addome");
        if (core.length > 0) {
          chosen.push({
            name: safePickRandom(core, 1)[0].name,
            sets: 3,
            reps: "15-20"
          });
        }
      }

      chosen = chosen.slice(0, 6);
    }

    return {
      name: `Giorno ${index + 1}`,
      exercises: chosen
    };
  });

  return sessions;
}

// ----------------------
// ENDPOINT
// ----------------------
app.post("/generate-workout-plan", (req, res) => {
  try {
    const input = req.body;
    const sessions = generateProgram(input);

    res.json({
      user: input.name,
      goal: input.goal,
      level: input.experience,
      days: input.days_per_week,
      sessions
    });
  } catch (err) {
    console.error("ERRORE BACKEND:", err);
    res.status(500).json({ error: "Errore nella generazione della scheda" });
  }
});

// ----------------------
// SERVER
// ----------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Backend attivo sulla porta " + PORT));
