<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Generatore Scheda Allenamento</title>

  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f5f5f5;
      padding: 20px;
    }
    .container {
      max-width: 500px;
      margin: auto;
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    label {
      font-weight: bold;
      margin-top: 15px;
      display: block;
    }
    select, input {
      width: 100%;
      padding: 10px;
      margin-top: 5px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
    button {
      margin-top: 20px;
      width: 100%;
      padding: 12px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
    }
    button:hover {
      background: #0056b3;
    }
    #result {
      margin-top: 30px;
      padding: 20px;
      background: #e9ffe9;
      border-left: 4px solid #28a745;
      display: none;
    }
  </style>
</head>

<body>
  <div class="container">
    <h2>Genera la tua scheda</h2>

    <label>Obiettivo</label>
    <select id="goal">
      <option value="massa">Aumentare massa</option>
      <option value="strength">Forza</option>
      <option value="fat_loss">Dimagrimento</option>
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
    </select>

    <button onclick="generatePlan()">Genera la mia scheda</button>

    <div id="result"></div>
  </div>

  <script>
    async function generatePlan() {
      const data = {
        goal: document.getElementById("goal").value,
        experience: document.getElementById("experience").value,
        equipment: document.getElementById("equipment").value,
        days_per_week: parseInt(document.getElementById("days_per_week").value)
      };

      const resultBox = document.getElementById("result");
      resultBox.style.display = "block";
      resultBox.innerHTML = "Generazione in corso...";

      try {
        const response = await fetch("https://workout-backend-9sas.onrender.com/generate-workout-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.error) {
          resultBox.innerHTML = "Errore nella generazione della scheda.";
          return;
        }

        resultBox.innerHTML = `
          <h3>Scheda generata</h3>
          <p><strong>Split:</strong> ${result.split}</p>
          <p><strong>Livello:</strong> ${result.level}</p>
          <p><strong>Obiettivo:</strong> ${result.goal}</p>
          <h4>Sessioni:</h4>
          ${result.sessions.map(s => `
            <div>
              <strong>${s.name}</strong>
              <ul>
                ${s.exercises.map(e => `<li>${e.name} — ${e.sets}x${e.reps}</li>`).join("")}
              </ul>
            </div>
          `).join("")}
        `;
      } catch (err) {
        resultBox.innerHTML = "Errore nella generazione della scheda.";
      }
    }
  </script>
</body>
</html>
