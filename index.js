import express from "express";
import cors from "cors";
import exercises from "./exercises.js";

const app = express();
app.use(cors());
app.use(express.json());

// ----------------------
// UTILS
// ----------------------
function pickRandom(arr, n) {
  if (!arr || arr.length === 0) return [];
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(n, shuffled.length));
}

function ensureCount(baseArr, target) {
  const result = [...baseArr];
  while (result.length < target) {
    const random = baseArr[Math.floor(Math.random() * baseArr.length)];
    if (!random) break;
    result.push({ name: random.name, sets: 3, reps: "10-15" });
  }
  return result;
}

// ----------------------
// FILTRI
// ----------------------
function filterExercises(input) {
  return exercises.filter(ex => {
    // livello
    if (input.experience === "beginner" && ex.level === "avanzato") return false;

    // attrezzatura
    if (input.equipment === "home") {
      if (ex.equipment === "bilanciere" || ex.equipment === "macchina") return false;
    }

    // preferenza
    if (input.exercise_pref && input.exercise_pref !== "tutto") {
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

// ----------------------
// GRUPPI MUSCOLARI PER GIORNO
// ----------------------
const DAY_GROUPS = {
  1: ["petto", "spalle", "tricipiti"],
  2: ["dorso", "bicipiti"],
  3: ["gambe", "posteriori", "polpacci"]
};

// ----------------------
// GENERA PROGRAMMA
// ----------------------
function generateProgram(input) {
  const filtered = filterExercises(input);
  const sessions = [];

  for (let day = 1; day <= 3; day++) {
    const groups = DAY_GROUPS[day];

    // prendi esercizi dei gruppi del giorno
    let dayExercises = filtered.filter(ex => groups.includes(ex.muscle_group));

    // fallback se vuoto
    if (dayExercises.length === 0) {
      dayExercises = filtered.filter(ex => ex.muscle_group !== "cardio");
    }

    // scegli 5 esercizi
    let chosen = pickRandom(dayExercises, 5).map(ex => ({
      name: ex.name,
      sets: 3,
      reps: "8-12"
    }));

    // duplica se meno di 5
    chosen = ensureCount(chosen, 5);

    // aggiungi addome se manca
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

    // aggiungi cardio se dimagrimento
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

    // massimo 6 esercizi
    chosen = chosen.slice(0, 6);

    sessions.push({
      name: `Giorno ${day}`,
      exercises: chosen
    });
  }

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
      days: 3,
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
