import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ----------------------
// DATABASE ESERCIZI
// ----------------------
const exercises = [
  // UPPER
  { name: "Panca piana bilanciere", muscle_group: "petto", split: "UPPER", level: "intermedio", equipment: "bilanciere" },
  { name: "Panca inclinata manubri", muscle_group: "petto", split: "UPPER", level: "principiante", equipment: "manubri" },
  { name: "Chest press macchina", muscle_group: "petto", split: "UPPER", level: "principiante", equipment: "macchina" },
  { name: "Lat machine avanti", muscle_group: "dorso", split: "UPPER", level: "principiante", equipment: "macchina" },
  { name: "Rematore manubrio", muscle_group: "dorso", split: "UPPER", level: "intermedio", equipment: "manubri" },
  { name: "Alzate laterali manubri", muscle_group: "spalle", split: "UPPER", level: "principiante", equipment: "manubri" },
  { name: "Shoulder press macchina", muscle_group: "spalle", split: "UPPER", level: "principiante", equipment: "macchina" },

  // LOWER
  { name: "Leg press", muscle_group: "gambe", split: "LOWER", level: "principiante", equipment: "macchina" },
  { name: "Affondi manubri", muscle_group: "gambe", split: "LOWER", level: "principiante", equipment: "manubri" },
  { name: "Stacchi rumeni manubri", muscle_group: "posteriori", split: "LOWER", level: "intermedio", equipment: "manubri" },
  { name: "Calf raise macchina", muscle_group: "polpacci", split: "LOWER", level: "principiante", equipment: "macchina" },

  // FULL BODY
  { name: "Push-up", muscle_group: "petto", split: "FULL", level: "principiante", equipment: "corpo_libero" },
  { name: "Squat a corpo libero", muscle_group: "gambe", split: "FULL", level: "principiante", equipment: "corpo_libero" },
  { name: "Plank", muscle_group: "addome", split: "FULL", level: "principiante", equipment: "corpo_libero" },
  { name: "Crunch", muscle_group: "addome", split: "FULL", level: "principiante", equipment: "corpo_libero" },

  // CARDIO
  { name: "Tapis roulant (camminata veloce)", muscle_group: "cardio", split: "FULL", level: "principiante", equipment: "macchina" },
  { name: "Cyclette", muscle_group: "cardio", split: "FULL", level: "principiante", equipment: "macchina" },
  { name: "Ellittica", muscle_group: "cardio", split: "FULL", level: "principiante", equipment: "macchina" },
  { name: "Jumping jacks", muscle_group: "cardio", split: "FULL", level: "principiante", equipment: "corpo_libero" },
  { name: "Burpees", muscle_group: "cardio", split: "FULL", level: "intermedio", equipment: "corpo_libero" }
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
    // livello
    if (input.experience === "beginner" && ex.level === "avanzato") return false;

    // attrezzatura
    if (input.equipment === "home") {
      if (ex.equipment === "bilanciere" || ex.equipment === "macchina") return false;
    }

    // preferenza
    if (input.exercise_pref !== "" && input.exercise_pref !== "tutto") {
      if (ex.equipment !== input.exercise_pref) return false;
    }

    // infortuni
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
  const days = input.days_per_week;
  const split = getSplitForDays(days);
  const filtered = filterExercises(input);

  const sessions = split.map((sp, index) => {
    let dayExercises = filtered.filter(e => e.split === sp);

    // fallback 1: usa FULL BODY
    if (dayExercises.length === 0) {
      dayExercises = filtered.filter(e => e.split === "FULL");
    }

    // fallback 2: usa tutto il database
    if (dayExercises.length === 0) {
      dayExercises = [...exercises];
    }

    // scegli 5 esercizi base
    let chosen = pickRandom(dayExercises, 5).map(ex => ({
      name: ex.name,
      sets: 3,
      reps: "8-12"
    }));

    // se meno di 5, duplica con valori validi
    while (chosen.length < 5) {
      const base = dayExercises[Math.floor(Math.random() * dayExercises.length)];
      chosen.push({
        name: base.name,
        sets: 3,
        reps: "10-15"
      });
    }

    // DIMAGRIMENTO → aggiungi cardio
    if (input.goal === "fat_loss") {
      const cardio = filtered.filter(e => e.muscle_group === "cardio");

      if (cardio.length > 0) {
        const treadmill = cardio.find(e => e.name.toLowerCase().includes("tapis"));
        const cardioExercise = treadmill || pickRandom(cardio, 1)[0];

        chosen.push({
          name: cardioExercise.name,
          sets: 1,
          reps: "10-15 min"
        });
      }

      // addome se manca
      const hasCore = chosen.some(e =>
        e.name.toLowerCase().includes("crunch") ||
        e.name.toLowerCase().includes("plank")
      );

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

      // massimo 6 esercizi
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
  const input = req.body;
  const sessions = generateProgram(input);

  res.json({
    user: input.name,
    goal: input.goal,
    level: input.experience,
    days: input.days_per_week,
    sessions
  });
});

// ----------------------
// SERVER
// ----------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Backend attivo sulla porta " + PORT));
