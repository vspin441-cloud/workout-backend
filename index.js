// index.js - Workout Backend

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ----------------------
// DATABASE ESERCIZI
// ----------------------
const exercises = [

  // ----------------------
  // UPPER BODY
  // ----------------------
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

  // ----------------------
  // LOWER BODY
  // ----------------------
  { name: "Squat bilanciere", muscle_group: "gambe", split: "LOWER", level: "intermedio", equipment: "bilanciere" },
  { name: "Leg press", muscle_group: "gambe", split: "LOWER", level: "principiante", equipment: "macchina" },
  { name: "Affondi manubri", muscle_group: "gambe", split: "LOWER", level: "principiante", equipment: "manubri" },
  { name: "Stacchi rumeni manubri", muscle_group: "posteriori", split: "LOWER", level: "intermedio", equipment: "manubri" },
  { name: "Leg curl macchina", muscle_group: "posteriori", split: "LOWER", level: "principiante", equipment: "macchina" },
  { name: "Calf raise macchina", muscle_group: "polpacci", split: "LOWER", level: "principiante", equipment: "macchina" },

  // ----------------------
  // FULL BODY / CORPO LIBERO
  // ----------------------
  { name: "Push-up", muscle_group: "petto", split: "FULL", level: "principiante", equipment: "corpo_libero" },
  { name: "Dip alle parallele", muscle_group: "tricipiti", split: "FULL", level: "intermedio", equipment: "corpo_libero" },
  { name: "Trazioni alla sbarra", muscle_group: "dorso", split: "FULL", level: "intermedio", equipment: "corpo_libero" },
  { name: "Squat a corpo libero", muscle_group: "gambe", split: "FULL", level: "principiante", equipment: "corpo_libero" },
  { name: "Plank", muscle_group: "addome", split: "FULL", level: "principiante", equipment: "corpo_libero" },
  { name: "Crunch", muscle_group: "addome", split: "FULL", level: "principiante", equipment: "corpo_libero" },

  // ----------------------
  // PUSH
  // ----------------------
  { name: "Shoulder press manubri", muscle_group: "spalle", split: "PUSH", level: "intermedio", equipment: "manubri" },
  { name: "Alzate laterali manubri", muscle_group: "spalle", split: "PUSH", level: "principiante", equipment: "manubri" },
  { name: "Pushdown cavo", muscle_group: "tricipiti", split: "PUSH", level: "principiante", equipment: "macchina" },

  // ----------------------
  // PULL
  // ----------------------
  { name: "Lat machine avanti", muscle_group: "dorso", split: "PULL", level: "principiante", equipment: "macchina" },
  { name: "Rematore manubrio", muscle_group: "dorso", split: "PULL", level: "intermedio", equipment: "manubri" },
  { name: "Curl manubri", muscle_group: "bicipiti", split: "PULL", level: "principiante", equipment: "manubri" },

  // ----------------------
  // LEGS
  // ----------------------
  { name: "Leg press", muscle_group: "gambe", split: "LEGS", level: "principiante", equipment: "macchina" },
  { name: "Affondi manubri", muscle_group: "gambe", split: "LEGS", level: "principiante", equipment: "manubri" },

  // ----------------------
  // CARDIO / DIMAGRIMENTO
  // ----------------------
  { name: "Tapis roulant (camminata veloce)", muscle_group: "cardio", split: "FULL", level: "principiante", equipment: "macchina" },
  { name: "Tapis roulant (corsa leggera)", muscle_group: "cardio", split: "FULL", level: "intermedio", equipment: "macchina" },
  { name: "Cyclette", muscle_group: "cardio", split: "FULL", level: "principiante", equipment: "macchina" },
  { name: "Ellittica", muscle_group: "cardio", split: "FULL", level: "principiante", equipment: "macchina" },
  { name: "Vogatore", muscle_group: "cardio", split: "FULL", level: "intermedio", equipment: "macchina" },
  { name: "Jumping jacks", muscle_group: "cardio", split: "FULL", level: "principiante", equipment: "corpo_libero" },
  { name: "Burpees", muscle_group: "cardio", split: "FULL", level: "intermedio", equipment: "corpo_libero" },
  { name: "Mountain climbers", muscle_group: "cardio", split: "FULL", level: "principiante", equipment: "corpo_libero" },
  { name: "HIIT 30'' ON / 30'' OFF", muscle_group: "cardio", split: "FULL", level: "intermedio", equipment: "corpo_libero" }
];

// ----------------------
// UTILS
// ----------------------
function pickRandom(arr, n) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(n, shuffled.length));
}

function filterExercises(input) {
  return exercises.filter(ex => {

    // LIVELLO
    if (input.experience === "beginner" && ex.level === "avanzato") return false;

    // ATTREZZATURA
    if (input.equipment === "home") {
      if (ex.equipment === "bilanciere" || ex.equipment === "macchina") return false;
    }

    // PREFERENZA
    if (input.exercise_pref !== "" && ex.equipment !== input.exercise_pref && input.exercise_pref !== "tutto") {
      return false;
    }

    // INFORTUNI
    const name = ex.name.toLowerCase();
    const inj = (input.injuries || "").toLowerCase();

    if (inj.includes("schiena") && ["stacchi", "deadlift"].some(w => name.includes(w))) return false;
    if (inj.includes("spalla") && ["military", "shoulder"].some(w => name.includes(w))) return false;
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
// GENERA PROGRAMMA
// ----------------------
function generateProgram(input) {
  const days = input.days_per_week || 3;
  const split = getSplitForDays(days);
  const filtered = filterExercises(input);

  const sessions = split.map((sp, index) => {
    const dayExercises = filtered.filter(e => e.split === sp);

    // ALMENO 5 ESERCIZI
    let chosen = pickRandom(dayExercises, 5);

    while (chosen.length < 5 && dayExercises.length > 0) {
      const base = dayExercises[Math.floor(Math.random() * dayExercises.length)];
      chosen.push({
        name: base.name,
        sets: 3,
        reps: "10-15"
      });
    }

    // DIMAGRIMENTO → AGGIUNGI CARDIO
    if (input.goal === "fat_loss") {
      const cardio = filtered.filter(e => e.muscle_group === "cardio");

      if (cardio.length > 0) {
        const treadmill = cardio.find(e => e.name.toLowerCase().includes("tapis"));
        chosen.push({
          name: treadmill ? treadmill.name : pickRandom(cardio, 1)[0].name,
          sets: 1,
          reps: "10-15 min"
        });
      }

      // Addome
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

      chosen = chosen.slice(0, 6);
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

    res.json({
      user: input.name || "Utente",
      goal: input.goal,
      level: input.experience,
      days: input.days_per_week,
      sessions
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore nella generazione della scheda" });
  }
});

// ----------------------
// AVVIO SERVER
// ----------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Backend attivo sulla porta " + PORT));
