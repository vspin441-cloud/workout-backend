// index.js - Backend workout generator

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ----------------------
// DATABASE ESERCIZI BASE
// ----------------------
const exercises = [
  // UPPER
  { name: "Panca piana bilanciere", muscle_group: "petto", split: "UPPER", level: "intermedio", equipment: "bilanciere" },
  { name: "Panca inclinata manubri", muscle_group: "petto", split: "UPPER", level: "principiante", equipment: "manubri" },
  { name: "Chest press macchina", muscle_group: "petto", split: "UPPER", level: "principiante", equipment: "macchina" },
  { name: "Lat machine avanti", muscle_group: "dorso", split: "UPPER", level: "principiante", equipment: "macchina" },
  { name: "Rematore manubrio", muscle_group: "dorso", split: "UPPER", level: "intermedio", equipment: "manubri" },
  { name: "Rematore bilanciere", muscle_group: "dorso", split: "UPPER", level: "avanzato", equipment: "bilanciere" },
  { name: "Alzate laterali manubri", muscle_group: "spalle", split: "UPPER", level: "principiante", equipment: "manubri" },
  { name: "Military press bilanciere", muscle_group: "spalle", split: "UPPER", level: "intermedio", equipment: "bilanciere" },
  { name: "Shoulder press macchina", muscle_group: "spalle", split: "UPPER", level: "principiante", equipment: "macchina" },
  { name: "Curl manubri", muscle_group: "bicipiti", split: "UPPER", level: "principiante", equipment: "manubri" },
  { name: "Curl bilanciere", muscle_group: "bicipiti", split: "UPPER", level: "intermedio", equipment: "bilanciere" },
  { name: "Pushdown cavo", muscle_group: "tricipiti", split: "UPPER", level: "principiante", equipment: "macchina" },
  { name: "French press manubri", muscle_group: "tricipiti", split: "UPPER", level: "intermedio", equipment: "manubri" },

  // LOWER
  { name: "Squat bilanciere", muscle_group: "gambe", split: "LOWER", level: "intermedio", equipment: "bilanciere" },
  { name: "Leg press", muscle_group: "gambe", split: "LOWER", level: "principiante", equipment: "macchina" },
  { name: "Affondi manubri", muscle_group: "gambe", split: "LOWER", level: "principiante", equipment: "manubri" },
  { name: "Stacchi rumeni manubri", muscle_group: "posteriori", split: "LOWER", level: "intermedio", equipment: "manubri" },
  { name: "Leg curl macchina", muscle_group: "posteriori", split: "LOWER", level: "principiante", equipment: "macchina" },
  { name: "Calf raise macchina", muscle_group: "polpacci", split: "LOWER", level: "principiante", equipment: "macchina" },

  // FULL / CORPO LIBERO
  { name: "Push-up", muscle_group: "petto", split: "FULL", level: "principiante", equipment: "corpo_libero" },
  { name: "Dip alle parallele", muscle_group: "tricipiti", split: "FULL", level: "intermedio", equipment: "corpo_libero" },
  { name: "Trazioni alla sbarra", muscle_group: "dorso", split: "FULL", level: "intermedio", equipment: "corpo_libero" },
  { name: "Squat a corpo libero", muscle_group: "gambe", split: "FULL", level: "principiante", equipment: "corpo_libero" },
  { name: "Plank", muscle_group: "addome", split: "FULL", level: "principiante", equipment: "corpo_libero" },
  { name: "Crunch", muscle_group: "addome", split: "FULL", level: "principiante", equipment: "corpo_libero" },

  // PUSH
  { name: "Panca piana bilanciere", muscle_group: "petto", split: "PUSH", level: "intermedio", equipment: "bilanciere" },
  { name: "Panca inclinata manubri", muscle_group: "petto", split: "PUSH", level: "principiante", equipment: "manubri" },
  { name: "Shoulder press manubri", muscle_group: "spalle", split: "PUSH", level: "intermedio", equipment: "manubri" },
  { name: "Alzate laterali manubri", muscle_group: "spalle", split: "PUSH", level: "principiante", equipment: "manubri" },
  { name: "Pushdown cavo", muscle_group: "tricipiti", split: "PUSH", level: "principiante", equipment: "macchina" },

  // PULL
  { name: "Lat machine avanti", muscle_group: "dorso", split: "PULL", level: "principiante", equipment: "macchina" },
  { name: "Rematore manubrio", muscle_group: "dorso", split: "PULL", level: "intermedio", equipment: "manubri" },
  { name: "Rematore bilanciere", muscle_group: "dorso", split: "PULL", level: "avanzato", equipment: "bilanciere" },
  { name: "Curl manubri", muscle_group: "bicipiti", split: "PULL", level: "principiante", equipment: "manubri" },
  { name: "Curl bilanciere", muscle_group: "bicipiti", split: "PULL", level: "intermedio", equipment: "bilanciere" },

  // LEGS
  { name: "Squat bilanciere", muscle_group: "gambe", split: "LEGS", level: "intermedio", equipment: "bilanciere" },
  { name: "Leg press", muscle_group: "gambe", split: "LEGS", level: "principiante", equipment: "macchina" },
  { name: "Affondi manubri", muscle_group: "gambe", split: "LEGS", level: "principiante", equipment: "manubri" },
  { name: "Stacchi rumeni manubri", muscle_group: "posteriori", split: "LEGS", level: "intermedio", equipment: "manubri" },
  { name: "Leg curl macchina", muscle_group: "posteriori", split: "LEGS", level: "principiante", equipment: "macchina" },
  { name: "Calf raise macchina", muscle_group: "polpacci", split: "LEGS", level: "principiante", equipment: "macchina" }
];

// ----------------------
// UTILS
// ----------------------
function pickRandom(arr, n) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(n, shuffled.length));
}

// Filtra esercizi in base al questionario
function filterExercises(input) {
  return exercises.filter(ex => {
    // 1) livello
    if (input.experience === "beginner" && ex.level === "avanzato") return false;
    if (input.experience === "intermediate" && ex.level === "avanzato") return false;

    // 2) attrezzatura
    if (input.equipment === "home") {
      if (ex.equipment === "bilanciere" || ex.equipment === "macchina") return false;
    }

    // 3) preferenza esercizi
    if (input.exercise_pref === "macchine" && ex.equipment !== "macchina") return false;
    if (input.exercise_pref === "bilancieri" && ex.equipment !== "bilanciere") return false;
    if (input.exercise_pref === "manubri" && ex.equipment !== "manubri") return false;
    if (input.exercise_pref === "corpo_libero" && ex.equipment !== "corpo_libero") return false;

    // 4) infortuni
    const name = ex.name.toLowerCase();
    const inj = (input.injuries || "").toLowerCase();

    if (inj.includes("schiena")) {
      if (["deadlift", "stacchi", "good morning", "iperestensioni"].some(w => name.includes(w))) return false;
    }
    if (inj.includes("spalla")) {
      if (["military", "alzate", "shoulder", "arnold"].some(w => name.includes(w))) return false;
    }
    if (inj.includes("ginocchio")) {
      if (["squat", "affondi", "leg press", "step-up"].some(w => name.includes(w))) return false;
    }

    return true;
  });
}

// Determina split in base ai giorni
function getSplitForDays(days) {
  if (days === 2) return ["FULL", "FULL"];
  if (days === 3) return ["PUSH", "PULL", "LEGS"];
  if (days === 4) return ["UPPER", "LOWER", "UPPER", "LOWER"];
  if (days === 5) return ["PUSH", "PULL", "LEGS", "UPPER", "FULL"];
  return ["PUSH", "PULL", "LEGS", "UPPER", "LOWER", "FULL"]; // 6
}

function splitReadableName(split) {
  const map = {
    UPPER: "Upper Body",
    LOWER: "Lower Body",
    PUSH: "Push Day",
    PULL: "Pull Day",
    LEGS: "Leg Day",
    FULL: "Full Body"
  };
  return map[split] || split;
}

// ----------------------
// GENERAZIONE PROGRAMMA
// ----------------------
function generateProgram(input) {
  const days = input.days_per_week || 3;
  const split = getSplitForDays(days);
  const filtered = filterExercises(input);

  const sessions = split.map((sp, index) => {
    const dayExercises = filtered.filter(e => e.split === sp);

    // base: 5 esercizi per giorno
    let chosen = pickRandom(dayExercises, 5).map(ex => ({
      name: ex.name,
      sets: 3,
      reps: "8-12"
    }));

    // modifica in base all'obiettivo
    if (input.goal === "massa") {
      chosen = chosen.map(e => ({ ...e, sets: 4, reps: "8-10" }));
    } else if (input.goal === "strength") {
      chosen = chosen.map(e => ({ ...e, sets: 5, reps: "4-6" }));
    } else if (input.goal === "fat_loss") {
      chosen = chosen.map(e => ({ ...e, sets: 3, reps: "12-15" }));
      // aggiungo addome se manca
      const hasCore = chosen.some(e => e.name.toLowerCase().includes("crunch") || e.name.toLowerCase().includes("plank"));
      if (!hasCore) {
        const core = filtered.filter(e => e.muscle_group === "addome");
        if (core.length > 0) {
          chosen.push({
            name: pickRandom(core, 1)[0].name,
            sets: 3,
            reps: "15-20"
          });
        }
      }
    }

    return {
      name: `Day ${index + 1} - ${splitReadableName(sp)}`,
      split: sp,
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

    const response = {
      user: input.name || "Utente",
      goal: input.goal || "Non specificato",
      level: input.experience || "Non specificato",
      days: input.days_per_week || 3,
      sessions
    };

    res.json(response);
  } catch (err) {
    console.error("Errore generazione scheda:", err);
    res.status(500).json({ error: "Errore nella generazione della scheda" });
  }
});

// ----------------------
// AVVIO SERVER
// ----------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Workout backend in ascolto sulla porta ${PORT}`);
});
