<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Generatore Scheda – Step by Step</title>

  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

  <style>
    body {
      font-family: Arial, sans-serif;
      background: #111;
      padding: 20px;
      color: #fff;
    }

    .container {
      max-width: 650px;
      margin: auto;
      background: #181818;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 0 15px rgba(0,0,0,0.6);
      transition: 0.3s;
      border: 1px solid #333;
    }

    h2 {
      text-align: center;
      margin-bottom: 20px;
      color: #fff;
    }

    h2 .material-icons {
      vertical-align: middle;
      color: #e60000;
      margin-right: 5px;
    }

    .step {
      display: none;
      animation: fade 0.4s ease;
    }

    @keyframes fade {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    label {
      font-weight: bold;
      margin-top: 15px;
      display: block;
      color: #f5f5f5;
    }

    select, input {
      width: 100%;
      padding: 10px;
      margin-top: 5px;
      border-radius: 6px;
      border: 1px solid #444;
      background: #000;
      color: #fff;
    }

    .btn {
      margin-top: 25px;
      width: 100%;
      padding: 14px;
      background: #e60000;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 17px;
      cursor: pointer;
      font-weight: bold;
    }

    .btn:hover {
      background: #b30000;
    }

    .navigation {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }

    .nav-btn {
      padding: 12px 20px;
      background: #333;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
    }

    .nav-btn:hover {
      background: #555;
    }

    .hidden {
      display: none;
    }

    /* PAGINA FINALE */
    #final-page {
      display: none;
      background: #111;
      color: white;
      padding: 25px;
      border-radius: 12px;
      margin-top: 20px;
      border: 1px solid #333;
    }

    .day-table {
      margin-top: 25px;
      background: #1a1a1a;
      border-radius: 10px;
      padding: 15px;
      border-left: 4px solid #e60000;
    }

    .day-title {
      font-size: 20px;
      font-weight: bold;
      color: #e60000;
      margin-bottom: 10px;
    }

    .exercise-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }

    .exercise-table th {
      background: #222;
      padding: 10px;
      border-bottom: 1px solid #333;
      color: #e60000;
      text-align: left;
      font-size: 13px;
    }

    .exercise-table td {
      padding: 8px;
      border-bottom: 1px solid #333;
      font-size: 13px;
    }

    .weight-input {
      width: 55px;
      padding: 4px;
      background: #000;
      border: 1px solid #444;
      color: white;
      border-radius: 4px;
      text-align: center;
      font-size: 12px;
    }

    #download-btn {
      margin-top: 25px;
      background: #e60000;
      border: none;
      padding: 14px;
      width: 100%;
      font-size: 18px;
      border-radius: 8px;
      cursor: pointer;
      color: white;
      font-weight: bold;
    }

    #download-btn:hover {
      background: #b30000;
    }

    hr {
      border: 0;
      border-top: 1px solid #333;
      margin: 20px 0;
    }
  </style>
</head>

<body>

  <div class="container">

    <h2><span class="material-icons">fitness_center</span> Generatore Scheda</h2>

    <!-- STEP 1 -->
    <div class="step" id="step1">
      <label>Nome</label>
      <input id="name" placeholder="Es. Marco">

      <label>Età</label>
      <input id="age" type="number" placeholder="Es. 28">

      <label>Peso (kg)</label>
      <input id="weight" type="number" placeholder="Es. 75">

      <label>Altezza (cm)</label>
      <input id="height" type="number" placeholder="Es. 180">

      <label>Livello energia</label>
      <select id="energy">
        <option value="basso">Basso</option>
        <option value="medio">Medio</option>
        <option value="alto">Alto</option>
      </select>

      <label>Orario preferito</label>
      <select id="training_time">
        <option value="mattina">Mattina</option>
        <option value="pomeriggio">Pomeriggio</option>
        <option value="sera">Sera</option>
      </select>

      <div class="navigation">
        <span></span>
        <button class="nav-btn" onclick="nextStep(2)">Avanti →</button>
      </div>
    </div>

    <!-- STEP 2 -->
    <div class="step" id="step2">
      <label>Obiettivo principale</label>
      <select id="goal">
        <option value="massa">Massa</option>
        <option value="strength">Forza</option>
        <option value="fat_loss">Dimagrimento</option>
      </select>

      <label>Obiettivo secondario</label>
      <select id="secondary_goal">
        <option value="resistenza">Resistenza</option>
        <option value="tonificazione">Tonificazione</option>
        <option value="mobilità">Mobilità</option>
      </select>

      <label>Livello</label>
      <select id="experience">
        <option value="beginner">Principiante</option>
        <option value="intermediate">Intermedio</option>
        <option value="advanced">Avanzato</option>
      </select>

      <label>Attrezzatura</label>
      <select id="equipment">
        <option value="gym">Palestra</option>
        <option value="home">Casa</option>
      </select>

      <label>Giorni a settimana</label>
      <select id="days_per_week">
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>

      <label>Preferenza esercizi</label>
      <select id="exercise_pref">
        <option value="macchine">Macchine</option>
        <option value="bilancieri">Bilancieri</option>
        <option value="manubri">Manubri</option>
        <option value="corpo_libero">Corpo libero</option>
      </select>

      <div class="navigation">
        <button class="nav-btn" onclick="prevStep(1)">← Indietro</button>
        <button class="nav-btn" onclick="nextStep(3)">Avanti →</button>
      </div>
    </div>

    <!-- STEP 3 -->
    <div class="step" id="step3">
      <label>Infortuni o limitazioni</label>
      <input id="injuries" placeholder="Es. schiena, spalla, ginocchio…">

      <button class="btn" onclick="generatePlan()">Genera la mia scheda</button>

      <div class="navigation">
        <button class="nav-btn" onclick="prevStep(2)">← Indietro</button>
        <span></span>
      </div>
    </div>

    <!-- PAGINA FINALE -->
    <div id="final-page"></div>

  </div>

  <script>
    let currentStep = 1;
    document.getElementById("step1").style.display = "block";

    function nextStep(step) {
      document.getElementById("step" + currentStep).style.display = "none";
      currentStep = step;
      document.getElementById("step" + currentStep).style.display = "block";
    }

    function prevStep(step) {
      document.getElementById("step" + currentStep).style.display = "none";
      currentStep = step;
      document.getElementById("step" + currentStep).style.display = "block";
    }

    async function generatePlan() {
      const data = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        weight: document.getElementById("weight").value,
        height: document.getElementById("height").value,
        energy: document.getElementById("energy").value,
        training_time: document.getElementById("training_time").value,
        goal: document.getElementById("goal").value,
        secondary_goal: document.getElementById("secondary_goal").value,
        experience: document.getElementById("experience").value,
        equipment: document.getElementById("equipment").value,
        days_per_week: parseInt(document.getElementById("days_per_week").value),
        exercise_pref: document.getElementById("exercise_pref").value,
        injuries: document.getElementById("injuries").value
      };

      const finalPage = document.getElementById("final-page");
      finalPage.style.display = "block";
      finalPage.innerHTML = "⏳ Generazione in corso...";

      try {
        const response = await fetch("https://workout-backend-9sas.onrender.com/generate-workout-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.error) {
          finalPage.innerHTML = "Errore nella generazione della scheda.";
          return;
        }

        finalPage.innerHTML = `
          <h2 style="color:#e60000; text-align:center;">🔥 Scheda di ${result.user}</h2>
          <p><strong>Obiettivo:</strong> ${result.goal}</p>
          <p><strong>Livello:</strong> ${result.level}</p>
          <p><strong>Giorni a settimana:</strong> ${result.days}</p>
          <hr>

          ${result.sessions.map((s, index) => `
            <div class="day-table">
              <div class="day-title">Day ${index + 1} — ${s.name}</div>

              <table class="exercise-table">
                <thead>
                  <tr>
                    <th>Esercizio</th>
                    <th>Serie</th>
                    <th>Reps</th>
                    <th>W1</th>
                    <th>W2</th>
                    <th>W3</th>
                    <th>W4</th>
                  </tr>
                </thead>
                <tbody>
                  ${s.exercises.map(ex => `
                    <tr>
                      <td>${ex.name}</td>
                      <td>${ex.sets}</td>
                      <td>${ex.reps}</td>
                      <td><input class="weight-input" placeholder="kg"></td>
                      <td><input class="weight-input" placeholder="kg"></td>
                      <td><input class="weight-input" placeholder="kg"></td>
                      <td><input class="weight-input" placeholder="kg"></td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          `).join("")}

          <button id="download-btn" onclick="window.print()">Scarica PDF</button>
        `;

        document.getElementById("step1").style.display = "none";
        document.getElementById("step2").style.display = "none";
        document.getElementById("step3").style.display = "none";

      } catch (err) {
        console.error(err);
        finalPage.innerHTML = "Errore nella generazione della scheda.";
      }
    }
  </script>

</body>
</html>
