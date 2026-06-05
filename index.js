import express from "express";
import cors from "cors";
import { exercises } from "./exercises.js";

const app = express();
app.use(cors());
app.use(express.json());

// -------------------------------
// FILTRO ESERCIZI
// -------------------------------
function filterExercises(input) {
  return exercises.filter(ex => {
    // Filtra attrezzatura
    const equipmentOK =
      input.equipment === "home"
        ? ex.equipment !== "bilanciere" && ex.equipment !== "macchina"
        : true;

    // Filtra livello
    const levelOK =
      input.experience === "beginner"
        ? ex.level === "principiante"
        : input.experience === "intermediate"
        ? ex.level !== "avanzato"
        : true;

    return equipmentOK && levelOK;
  });
}

// -------------------------------
// PICK ESERCIZI PER GRUPPO
// -------------------------------
function pick(available, muscle, n = 3) {
  return available
    .filter(ex => ex.muscle === muscle)
    .sort(() => Math.random() - 0.5)
    .slice(0, n)
    .map(ex => ({
      name: ex.name,
      sets: 3,
      reps: "8-12",
      rest: "90s"
    }));
}

// -------------------------------
// GENERATORE PROGRAMMA
// -------------------------------
function generateProgram(input) {
  const days = input.days_per_week;

  // SPLIT AUTOMATICA
  let split = [];

  if (days === 2) {
    split = ["upper", "lower"];
  } else if (days === 3) {
    split = ["full", "upper", "lower"];
  } else if (days === 4) {
    split = ["upper", "lower", "upper", "lower"];
  } else if (days === 5) {
    split = ["push", "pull", "legs", "upper", "lower"];
  } else if (days >= 6) {
    split = ["push", "pull", "legs", "push", "pull", "legs"];
  }

  // ESERCIZI DISPONIBILI
  const available = filterExercises(input);

  // COSTRUZIONE SESSIONI
  const sessions = split.map((day, i) => {
    let ex = [];

    if (day === "upper") {
      ex = [
        ...pick(available, "petto", 2),
        ...pick(available, "schiena", 2),
        ...pick(available, "spalle", 1),
        ...pick(available, "bicipiti", 1),
        ...pick(available, "tricipiti", 1)
      ];
    }

    if (day === "lower") {
      ex = [
        ...pick(available, "gambe", 3),
        ...pick(available, "glutei", 2),
        ...pick(available, "polpacci", 1)
      ];
    }

    if (day === "push") {
      ex = [
        ...pick(available, "petto", 2),
        ...pick(available, "spalle", 2),
        ...pick(available, "tricipiti", 2)
      ];
    }

    if (day === "pull") {
      ex = [
        ...pick(available, "schiena", 3),
        ...pick(available, "bicipiti", 2),
        ...pick(available, "avambracci", 1)
      ];
    }

    if (day === "legs") {
      ex = [
        ...pick(available, "gambe", 3),
        ...pick(available, "glutei", 2),
        ...pick(available, "polpacci", 1)
      ];
    }

    if (day === "full") {
      ex = [
        ...pick(available, "petto", 1),
        ...pick(available, "schiena", 1),
        ...pick(available, "gambe", 2),
        ...pick(available, "spalle", 1),
        ...pick(available, "addome", 1)
      ];
    }

    return {
      name: `Day ${i + 1} - ${day.toUpperCase()}`,
      exercises: ex
    };
  });

  return {
    user: input.name,
    goal: input.goal,
    level: input.experience,
    days,
    split,
    sessions
  };
}

// -------------------------------
// ENDPOINT API
// -------------------------------
app.post("/generate-workout-plan", (req, res) => {
  try {
    console.log("Dati ricevuti:", req.body);

    const input = {
      name: req.body.name || "Utente",
      goal: req.body.goal,
      experience: req.body.experience,
      equipment: req.body.equipment,
      days_per_week: req.body.days_per_week
    };

    const program = generateProgram(input);
    res.json(program);

  } catch (err) {
    console.error("Errore backend:", err);
    res.status(500).json({ error: "Errore interno del server" });
  }
});

// -------------------------------
// AVVIO SERVER
// -------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend attivo sulla porta ${PORT}`);
});
