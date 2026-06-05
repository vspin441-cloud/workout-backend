const exercises = [

  // ----------------------
  // 100 ESERCIZI ORIGINALI
  // ----------------------

  { name: "Panca piana bilanciere", muscle_group: "petto", level: "intermedio", equipment: "bilanciere" },
  { name: "Panca inclinata manubri", muscle_group: "petto", level: "principiante", equipment: "manubri" },
  { name: "Chest press macchina", muscle_group: "petto", level: "principiante", equipment: "macchina" },
  { name: "Lat machine avanti", muscle_group: "dorso", level: "principiante", equipment: "macchina" },
  { name: "Rematore manubrio", muscle_group: "dorso", level: "intermedio", equipment: "manubri" },
  { name: "Rematore bilanciere", muscle_group: "dorso", level: "avanzato", equipment: "bilanciere" },
  { name: "Alzate laterali manubri", muscle_group: "spalle", level: "principiante", equipment: "manubri" },
  { name: "Military press bilanciere", muscle_group: "spalle", level: "intermedio", equipment: "bilanciere" },
  { name: "Shoulder press macchina", muscle_group: "spalle", level: "principiante", equipment: "macchina" },
  { name: "Curl manubri", muscle_group: "bicipiti", level: "principiante", equipment: "manubri" },
  { name: "Curl bilanciere", muscle_group: "bicipiti", level: "intermedio", equipment: "bilanciere" },
  { name: "Pushdown cavo", muscle_group: "tricipiti", level: "principiante", equipment: "macchina" },
  { name: "French press manubri", muscle_group: "tricipiti", level: "intermedio", equipment: "manubri" },

  { name: "Squat bilanciere", muscle_group: "gambe", level: "intermedio", equipment: "bilanciere" },
  { name: "Leg press", muscle_group: "gambe", level: "principiante", equipment: "macchina" },
  { name: "Affondi manubri", muscle_group: "gambe", level: "principiante", equipment: "manubri" },
  { name: "Stacchi rumeni manubri", muscle_group: "posteriori", level: "intermedio", equipment: "manubri" },
  { name: "Leg curl macchina", muscle_group: "posteriori", level: "principiante", equipment: "macchina" },
  { name: "Calf raise macchina", muscle_group: "polpacci", level: "principiante", equipment: "macchina" },

  { name: "Push-up", muscle_group: "petto", level: "principiante", equipment: "corpo_libero" },
  { name: "Dip alle parallele", muscle_group: "tricipiti", level: "intermedio", equipment: "corpo_libero" },
  { name: "Trazioni alla sbarra", muscle_group: "dorso", level: "intermedio", equipment: "corpo_libero" },
  { name: "Squat a corpo libero", muscle_group: "gambe", level: "principiante", equipment: "corpo_libero" },
  { name: "Plank", muscle_group: "addome", level: "principiante", equipment: "corpo_libero" },
  { name: "Crunch", muscle_group: "addome", level: "principiante", equipment: "corpo_libero" },

  { name: "Shoulder press manubri", muscle_group: "spalle", level: "intermedio", equipment: "manubri" },
  { name: "Alzate laterali manubri", muscle_group: "spalle", level: "principiante", equipment: "manubri" },
  { name: "Pushdown cavo", muscle_group: "tricipiti", level: "principiante", equipment: "macchina" },

  { name: "Lat machine avanti", muscle_group: "dorso", level: "principiante", equipment: "macchina" },
  { name: "Rematore manubrio", muscle_group: "dorso", level: "intermedio", equipment: "manubri" },
  { name: "Curl manubri", muscle_group: "bicipiti", level: "principiante", equipment: "manubri" },

  { name: "Leg press", muscle_group: "gambe", level: "principiante", equipment: "macchina" },
  { name: "Affondi manubri", muscle_group: "gambe", level: "principiante", equipment: "manubri" },

  // CARDIO
  { name: "Tapis roulant (camminata veloce)", muscle_group: "cardio", level: "principiante", equipment: "macchina" },
  { name: "Cyclette", muscle_group: "cardio", level: "principiante", equipment: "macchina" },
  { name: "Ellittica", muscle_group: "cardio", level: "principiante", equipment: "macchina" },
  { name: "Jumping jacks", muscle_group: "cardio", level: "principiante", equipment: "corpo_libero" },
  { name: "Burpees", muscle_group: "cardio", level: "intermedio", equipment: "corpo_libero" },

  // ----------------------
  // 100 NUOVI ESERCIZI
  // ----------------------

  // PETTO
  { name: "Panca declinata bilanciere", muscle_group: "petto", level: "intermedio", equipment: "bilanciere" },
  { name: "Panca declinata manubri", muscle_group: "petto", level: "principiante", equipment: "manubri" },
  { name: "Chest press inclinata macchina", muscle_group: "petto", level: "principiante", equipment: "macchina" },
  { name: "Croci ai cavi alti", muscle_group: "petto", level: "intermedio", equipment: "macchina" },
  { name: "Croci ai cavi bassi", muscle_group: "petto", level: "intermedio", equipment: "macchina" },
  { name: "Croci manubri panca piana", muscle_group: "petto", level: "principiante", equipment: "manubri" },
  { name: "Croci manubri panca inclinata", muscle_group: "petto", level: "principiante", equipment: "manubri" },
  { name: "Chest dip", muscle_group: "petto", level: "intermedio", equipment: "corpo_libero" },
  { name: "Push-up inclinati", muscle_group: "petto", level: "principiante", equipment: "corpo_libero" },
  { name: "Push-up declinati", muscle_group: "petto", level: "intermedio", equipment: "corpo_libero" },
  { name: "Pec deck", muscle_group: "petto", level: "principiante", equipment: "macchina" },
  { name: "Svend press manubri", muscle_group: "petto", level: "intermedio", equipment: "manubri" },

  // DORSO
  { name: "Lat machine presa inversa", muscle_group: "dorso", level: "principiante", equipment: "macchina" },
  { name: "Lat machine presa stretta", muscle_group: "dorso", level: "principiante", equipment: "macchina" },
  { name: "Pulldown ai cavi", muscle_group: "dorso", level: "intermedio", equipment: "macchina" },
  { name: "Pullover ai cavi", muscle_group: "dorso", level: "intermedio", equipment: "macchina" },
  { name: "Pullover manubrio", muscle_group: "dorso", level: "principiante", equipment: "manubri" },
  { name: "Rematore T-bar", muscle_group: "dorso", level: "intermedio", equipment: "bilanciere" },
  { name: "Rematore cavo seduto", muscle_group: "dorso", level: "principiante", equipment: "macchina" },
  { name: "Rematore manubri su panca inclinata", muscle_group: "dorso", level: "intermedio", equipment: "manubri" },
  { name: "Pull-up presa larga", muscle_group: "dorso", level: "avanzato", equipment: "corpo_libero" },
  { name: "Pull-up presa stretta", muscle_group: "dorso", level: "intermedio", equipment: "corpo_libero" },
  { name: "Australian pull-up", muscle_group: "dorso", level: "principiante", equipment: "corpo_libero" },
  { name: "Shrug manubri", muscle_group: "dorso", level: "principiante", equipment: "manubri" },

  // SPALLE
  { name: "Arnold press", muscle_group: "spalle", level: "intermedio", equipment: "manubri" },
  { name: "Alzate frontali manubri", muscle_group: "spalle", level: "principiante", equipment: "manubri" },
  { name: "Alzate frontali bilanciere", muscle_group: "spalle", level: "intermedio", equipment: "bilanciere" },
  { name: "Alzate laterali ai cavi", muscle_group: "spalle", level: "intermedio", equipment: "macchina" },
  { name: "Shoulder press bilanciere seduto", muscle_group: "spalle", level: "intermedio", equipment: "bilanciere" },
  { name: "Shoulder press manubri seduto", muscle_group: "spalle", level: "principiante", equipment: "manubri" },
  { name: "Reverse fly manubri", muscle_group: "spalle", level: "principiante", equipment: "manubri" },
  { name: "Reverse fly ai cavi", muscle_group: "spalle", level: "intermedio", equipment: "macchina" },
  { name: "Face pull", muscle_group: "spalle", level: "principiante", equipment: "macchina" },
  { name: "Military press manubri", muscle_group: "spalle", level: "intermedio", equipment: "manubri" },

  // BICIPITI
  { name: "Curl alternato manubri", muscle_group: "bicipiti", level: "principiante", equipment: "manubri" },
  { name: "Curl concentrato", muscle_group: "bicipiti", level: "principiante", equipment: "manubri" },
  { name: "Curl ai cavi", muscle_group: "bicipiti", level: "intermedio", equipment: "macchina" },
  { name: "Curl martello", muscle_group: "bicipiti", level: "principiante", equipment: "manubri" },
  { name: "Curl bilanciere EZ", muscle_group: "bicipiti", level: "intermedio", equipment: "bilanciere" },
  { name: "Curl spider", muscle_group: "bicipiti", level: "intermedio", equipment: "manubri" },
  { name: "Curl su panca inclinata", muscle_group: "bicipiti", level: "intermedio", equipment: "manubri" },
  { name: "Curl cavo basso", muscle_group: "bicipiti", level: "principiante", equipment: "macchina" },
  { name: "Curl presa inversa bilanciere", muscle_group: "bicipiti", level: "intermedio", equipment: "bilanciere" },
  { name: "21s biceps", muscle_group: "bicipiti", level: "intermedio", equipment: "bilanciere" },

  // TRICIPITI
  { name: "Estensioni manubrio sopra la testa", muscle_group: "tricipiti", level: "principiante", equipment: "manubri" },
  { name: "Estensioni bilanciere sopra la testa", muscle_group: "tricipiti", level: "intermedio", equipment: "bilanciere" },
  { name: "French press bilanciere EZ", muscle_group: "tricipiti", level: "intermedio", equipment: "bilanciere" },
  { name: "Pushdown corda", muscle_group: "tricipiti", level: "principiante", equipment: "macchina" },
  { name: "Pushdown barra", muscle_group: "tricipiti", level: "principiante", equipment: "macchina" },
  { name: "Kickback manubri", muscle_group: "tricipiti", level: "principiante", equipment: "manubri" },
  { name: "Dip su panca", muscle_group: "tricipiti", level: "principiante", equipment: "corpo_libero" },
  { name: "Dip alle parallele strette", muscle_group: "tricipiti", level: "intermedio", equipment: "corpo_libero" },
  { name: "Estensioni ai cavi unilaterali", muscle_group: "tricipiti", level: "intermedio", equipment: "macchina" },
  { name: "Close grip bench press", muscle_group: "tricipiti", level: "intermedio", equipment: "bilanciere" },

  // GAMBE (inizio)
  { name: "Squat bilanciere", muscle_group: "gambe", level: "intermedio", equipment: "bilanciere" },
  { name: "Front squat bilanciere", muscle_group: "gambe", level: "intermedio", equipment: "bilanciere" },
  { name: "Goblet squat", muscle_group: "gambe", level: "principiante", equipment: "manubri" },
  { name: "Hack squat macchina", muscle_group: "gambe", level: "principiante", equipment: "macchina" },
  { name: "Leg extension", muscle_group: "gambe", level: "principiante", equipment: "macchina" },
  { name: "Leg curl sdraiato", muscle_group: "posteriori", level: "principiante", equipment: "macchina" },
  { name: "Leg curl seduto", muscle_group: "posteriori", level: "principiante", equipment: "macchina" },
  { name: "Hip thrust bilanciere", muscle_group: "posteriori", level: "intermedio", equipment: "bilanciere" },

    // GAMBE (continua)
  { name: "Hip thrust manubri", muscle_group: "posteriori", level: "principiante", equipment: "manubri" },
  { name: "Glute bridge", muscle_group: "posteriori", level: "principiante", equipment: "corpo_libero" },
  { name: "Step-up manubri", muscle_group: "gambe", level: "principiante", equipment: "manubri" },
  { name: "Affondi bulgari manubri", muscle_group: "gambe", level: "intermedio", equipment: "manubri" },
  { name: "Affondi indietro bilanciere", muscle_group: "gambe", level: "intermedio", equipment: "bilanciere" },
  { name: "Sumo squat manubri", muscle_group: "gambe", level: "principiante", equipment: "manubri" },
  { name: "Sumo deadlift bilanciere", muscle_group: "posteriori", level: "intermedio", equipment: "bilanciere" },
  { name: "Good morning bilanciere", muscle_group: "posteriori", level: "intermedio", equipment: "bilanciere" },
  { name: "Calf raise in piedi", muscle_group: "polpacci", level: "principiante", equipment: "corpo_libero" },
  { name: "Calf raise manubri", muscle_group: "polpacci", level: "principiante", equipment: "manubri" },
  { name: "Calf raise seduto", muscle_group: "polpacci", level: "principiante", equipment: "macchina" },
  { name: "Leg press inclinata", muscle_group: "gambe", level: "intermedio", equipment: "macchina" },

  // ADDOME
  { name: "Crunch inverso", muscle_group: "addome", level: "principiante", equipment: "corpo_libero" },
  { name: "Crunch bicicletta", muscle_group: "addome", level: "principiante", equipment: "corpo_libero" },
  { name: "Russian twist", muscle_group: "addome", level: "principiante", equipment: "corpo_libero" },
  { name: "Leg raise", muscle_group: "addome", level: "intermedio", equipment: "corpo_libero" },
  { name: "Hanging leg raise", muscle_group: "addome", level: "avanzato", equipment: "corpo_libero" },
  { name: "Side plank", muscle_group: "addome", level: "principiante", equipment: "corpo_libero" },
  { name: "Mountain climbers", muscle_group: "addome", level: "principiante", equipment: "corpo_libero" },
  { name: "V-up", muscle_group: "addome", level: "intermedio", equipment: "corpo_libero" },
  { name: "Toe touches", muscle_group: "addome", level: "principiante", equipment: "corpo_libero" },
  { name: "Plank to push-up", muscle_group: "addome", level: "intermedio", equipment: "corpo_libero" },

  // CARDIO EXTRA
  { name: "Vogatore", muscle_group: "cardio", level: "intermedio", equipment: "macchina" },
  { name: "HIIT 20'' ON / 40'' OFF", muscle_group: "cardio", level: "intermedio", equipment: "corpo_libero" },
  { name: "Sprint 30 secondi", muscle_group: "cardio", level: "avanzato", equipment: "corpo_libero" },
  { name: "Corsa sul posto", muscle_group: "cardio", level: "principiante", equipment: "corpo_libero" },
  { name: "Salto con la corda", muscle_group: "cardio", level: "intermedio", equipment: "corpo_libero" },
  { name: "Box jump", muscle_group: "cardio", level: "intermedio", equipment: "corpo_libero" }

]; // CHIUSURA ARRAY

export default exercises; // CHIUSURA FILE
