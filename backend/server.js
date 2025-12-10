import express from "express";
import cors from "cors";
import db from "./database/db.js";

const app = express();

app.use(cors());
app.use(express.json());

// Obtener todas las tareas
app.get("/tasks", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM tasks");
  res.json(rows);
});

// Crear tarea
app.post("/tasks", async (req, res) => {
  const { text } = req.body;
  const [result] = await db.query(
    "INSERT INTO tasks (text) VALUES (?)",
    [text]
  );
  res.json({ id: result.insertId, text, completed: 0 });
});

// Editar tarea
app.put("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  const { text, completed } = req.body;

  await db.query(
    "UPDATE tasks SET text = ?, completed = ? WHERE id = ?",
    [text, completed, id]
  );

  res.json({ success: true });
});

// Eliminar una tarea
app.delete("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  await db.query("DELETE FROM tasks WHERE id = ?", [id]);
  res.json({ success: true });
});

// Eliminar múltiples tareas
app.post("/tasks/delete-multiple", async (req, res) => {
  const { ids } = req.body;
  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({ error: "ids inválidos" });
  }

  const placeholders = ids.map(() => "?").join(",");
  await db.query(`DELETE FROM tasks WHERE id IN (${placeholders})`, ids);

  res.json({ success: true });
});

// PUERTO PARA RENDER
app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor corriendo en puerto " + (process.env.PORT || 3000));
});
