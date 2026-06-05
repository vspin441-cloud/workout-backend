const exercises = [

  // PETTO
  { name: "Chest Press Manubri Neutra", muscle_group: "petto", level: "intermedio", equipment: "manubri" },
  { name: "Panca Piana Manubri Stretta", muscle_group: "petto", level: "intermedio", equipment: "manubri" },
  { name: "Push-Up Diamond", muscle_group: "petto", level: "avanzato", equipment: "corpo_libero" },
  { name: "Push-Up Archer", muscle_group: "petto", level: "avanzato", equipment: "corpo_libero" },
  { name: "Push-Up Spiderman", muscle_group: "petto", level: "intermedio", equipment: "corpo_libero" },
  { name: "Chest Fly ai Cavi", muscle_group: "petto", level: "intermedio", equipment: "macchina" },
  { name: "Chest Press Unilaterale", muscle_group: "petto", level: "intermedio", equipment: "macchina" },
  { name: "Push-Up Lento 5 Secondi", muscle_group: "petto", level: "principiante", equipment: "corpo_libero" },
  { name: "Push-Up con Battito", muscle_group: "petto", level: "avanzato", equipment: "corpo_libero" },
  { name: "Panca Piana Elastici", muscle_group: "petto", level: "principiante", equipment: "corpo_libero" },

  // DORSO
  { name: "Rematore Elastici", muscle_group: "dorso", level: "principiante", equipment: "corpo_libero" },
  { name: "Rematore Unilaterale Cavo", muscle_group: "dorso", level: "intermedio", equipment: "macchina" },
  { name: "Lat Machine Dietro", muscle_group: "dorso", level: "intermedio", equipment: "macchina" },
  { name: "Pull-Up Isometrico", muscle_group: "dorso", level: "avanzato", equipment: "corpo_libero" },
  { name: "Pull-Up Negativi", muscle_group: "dorso", level: "intermedio", equipment: "corpo_libero" },
  { name: "Rematore Presa Stretta", muscle_group: "dorso", level: "intermedio", equipment: "manubri" },
  { name: "Rematore Bilanciere Presa Inversa", muscle_group: "dorso", level: "avanzato", equipment: "bilanciere" },
  { name: "Pullover Elastici", muscle_group: "dorso", level: "principiante", equipment: "corpo_libero" },
  { name: "Trazioni Orizzontali", muscle_group: "dorso", level: "principiante", equipment: "corpo_libero" },
  { name: "Rematore Panca Inclinata", muscle_group: "dorso", level: "intermedio", equipment: "manubri" },

  // SPALLE
  { name: "Alzate Laterali Elastici", muscle_group: "spalle", level: "principiante", equipment: "corpo_libero" },
  { name: "Shoulder Press Elastici", muscle_group: "spalle", level: "principiante", equipment: "corpo_libero" },
  { name: "Alzate 90° Manubri", muscle_group: "spalle", level: "intermedio", equipment: "manubri" },
  { name: "Press Arnold Unilaterale", muscle_group: "spalle", level: "intermedio", equipment: "manubri" },
  { name: "Military Press Elastici", muscle_group: "spalle", level: "principiante", equipment: "corpo_libero" },
  { name: "Face Pull Elastici", muscle_group: "spalle", level: "principiante", equipment: "corpo_libero" },
  { name: "Shoulder Press Kettlebell", muscle_group: "spalle", level: "intermedio", equipment: "manubri" },
  { name: "Alzate Frontali Disco", muscle_group: "spalle", level: "principiante", equipment: "corpo_libero" },
  { name: "Pike Push-Up", muscle_group: "spalle", level: "avanzato", equipment: "corpo_libero" },
  { name: "Handstand Hold al Muro", muscle_group: "spalle", level: "avanzato", equipment: "corpo_libero" },

  // BICIPITI
  { name: "Curl Elastici", muscle_group: "bicipiti", level: "principiante", equipment: "corpo_libero" },
  { name: "Curl Manubri Presa Stretta", muscle_group: "bicipiti", level: "intermedio", equipment: "manubri" },
  { name: "Curl Hammer Alternato", muscle_group: "bicipiti", level: "intermedio", equipment: "manubri" },
  { name: "Curl Concentrato Elastici", muscle_group: "bicipiti", level: "principiante", equipment: "corpo_libero" },
  { name: "Curl Zottman", muscle_group: "bicipiti", level: "intermedio", equipment: "manubri" },
  { name: "Curl 21 Elastici", muscle_group: "bicipiti", level: "intermedio", equipment: "corpo_libero" },
  { name: "Curl Manubri Lenti 5 Secondi", muscle_group: "bicipiti", level: "principiante", equipment: "manubri" },
  { name: "Curl Bilanciere Largo", muscle_group: "bicipiti", level: "avanzato", equipment: "bilanciere" },
  { name: "Curl Spider Elastici", muscle_group: "bicipiti", level: "principiante", equipment: "corpo_libero" },
  { name: "Curl Manubri Seduto", muscle_group: "bicipiti", level: "principiante", equipment: "manubri" },

  // TRICIPITI
  { name: "Estensioni Elastici Sopra Testa", muscle_group: "tricipiti", level: "principiante", equipment: "corpo_libero" },
  { name: "Pushdown Elastici", muscle_group: "tricipiti", level: "principiante", equipment: "corpo_libero" },
  { name: "Kickback Elastici", muscle_group: "tricipiti", level: "principiante", equipment: "corpo_libero" },
  { name: "Dip Sedia", muscle_group: "tricipiti", level: "principiante", equipment: "corpo_libero" },
  { name: "Dip Lento 5 Secondi", muscle_group: "tricipiti", level: "intermedio", equipment: "corpo_libero" },
  { name: "Estensioni Manubrio Unilaterale", muscle_group: "tricipiti", level: "intermedio", equipment: "manubri" },
  { name: "French Press Elastici", muscle_group: "tricipiti", level: "principiante", equipment: "corpo_libero" },
  { name: "Close Push-Up", muscle_group: "tricipiti", level: "intermedio", equipment: "corpo_libero" },
  { name: "Dip Parallele Lento", muscle_group: "tricipiti", level: "avanzato", equipment: "corpo_libero" },
  { name: "Pushdown Corda Unilaterale", muscle_group: "tricipiti", level: "intermedio", equipment: "macchina" },

  // GAMBE
  { name: "Squat Elastici", muscle_group: "gambe", level: "principiante", equipment: "corpo_libero" },
  { name: "Affondi Laterali", muscle_group: "gambe", level: "principiante", equipment: "corpo_libero" },
  { name: "Affondi Camminati", muscle_group: "gambe", level: "intermedio", equipment: "corpo_libero" },
  { name: "Step-Up Alto", muscle_group: "gambe", level: "intermedio", equipment: "corpo_libero" },
  { name: "Squat Pistol Assistito", muscle_group: "gambe", level: "avanzato", equipment: "corpo_libero" },
  { name: "Wall Sit", muscle_group: "gambe", level: "principiante", equipment: "corpo_libero" },
  { name: "Squat Sumo Elastici", muscle_group: "gambe", level: "principiante", equipment: "corpo_libero" },
  { name: "Affondi Indietro Elastici", muscle_group: "gambe", level: "principiante", equipment: "corpo_libero" },
  { name: "Squat Jump", muscle_group: "gambe", level: "intermedio", equipment: "corpo_libero" },
  { name: "Affondi Pulsati", muscle_group: "gambe", level: "intermedio", equipment: "corpo_libero" },

  // POSTERIORI
  { name: "Hip Thrust Elastici", muscle_group: "posteriori", level: "principiante", equipment: "corpo_libero" },
  { name: "Glute Bridge Unilaterale", muscle_group: "posteriori", level: "intermedio", equipment: "corpo_libero" },
  { name: "Kickback Elastici", muscle_group: "posteriori", level: "principiante", equipment: "corpo_libero" },
  { name: "Good Morning Elastici", muscle_group: "posteriori", level: "principiante", equipment: "corpo_libero" },
  { name: "Stacco Rumeno Elastici", muscle_group: "posteriori", level: "principiante", equipment: "corpo_libero" },
  { name: "Hip Thrust Unilaterale", muscle_group: "posteriori", level: "intermedio", equipment: "corpo_libero" },
  { name: "Glute Bridge Pulsato", muscle_group: "posteriori", level: "principiante", equipment: "corpo_libero" },
  { name: "Leg Curl Elastici", muscle_group: "posteriori", level: "principiante", equipment: "corpo_libero" },
  { name: "Kickback Manubrio", muscle_group: "posteriori", level: "intermedio", equipment: "manubri" },
  { name: "Stacco Gambe Tese Elastici", muscle_group: "posteriori", level: "principiante", equipment: "corpo_libero" },

  // POLPACCI
  { name: "Calf Raise Elastici", muscle_group: "polpacci", level: "principiante", equipment: "corpo_libero" },
  { name: "Calf Raise Unilaterale", muscle_group: "polpacci", level: "intermedio", equipment: "corpo_libero" },
  { name: "Calf Raise Seduto Elastici", muscle_group: "polpacci", level: "principiante", equipment: "corpo_libero" },
  { name: "Calf Raise Lento 5 Secondi", muscle_group: "polpacci", level: "intermedio", equipment: "corpo_libero" },
  { name: "Calf Raise Punte Aperte", muscle_group: "polpacci", level: "principiante", equipment: "corpo_libero" },

  // ADDOME
  { name: "Crunch Obliqui", muscle_group: "addome", level: "principiante", equipment: "corpo_libero" },
  { name: "Crunch Gambe Alte", muscle_group: "addome", level: "principiante", equipment: "corpo_libero" },
  { name: "Plank Laterale", muscle_group: "addome", level: "principiante", equipment: "corpo_libero" },
  { name: "Plank Camminato", muscle_group: "addome", level: "intermedio", equipment: "corpo_libero" },
  { name: "Sit-Up Lento", muscle_group: "addome", level: "intermedio", equipment: "corpo_libero" },

  // CARDIO
  { name: "High Knees", muscle_group: "cardio", level: "principiante", equipment: "corpo_libero" },
  { name: "Burpees Modificati", muscle_group: "cardio", level: "principiante", equipment: "corpo_libero" },
  { name: "Mountain Climbers Lenti", muscle_group: "cardio", level: "principiante", equipment: "corpo_libero" },
  { name: "Salto Laterale", muscle_group: "cardio", level: "principiante", equipment: "corpo_libero" },
  { name: "Sprint sul Posto", muscle_group: "cardio", level: "intermedio", equipment: "corpo_libero" }

];

export default exercises;
