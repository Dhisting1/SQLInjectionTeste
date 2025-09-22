import express from "express";
import { Pool } from "pg";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const pool = new Pool({
  user: "postgres",
  host: "postgres", // nome do serviço do Postgres no docker-compose
  database: "app_db", // Nome do banco de dados
  password: "password",
  port: 5432,
});

async function initializeDb(retries = 10, delay = 5000) {
  for (let i = 1; i <= retries; i++) {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username TEXT NOT NULL,
          password TEXT NOT NULL
        );
        INSERT INTO users (username, password) VALUES
          ('admin', 'secret'),
          ('user', 'pass')
        ON CONFLICT DO NOTHING; `); // impede a duplicação na hora de reiniciar o container
      console.log("Banco inicializado com sucesso!");
      break;
    } catch (err) {
      console.log(
        `Tentativa ${i} falhou, tentando novamente em ${delay / 1000}s...`
      );
      if (i === retries) {
        console.error("Não foi possível conectar ao banco de dados:", err);
        process.exit(1);
      }
      await new Promise((res) => setTimeout(res, delay));
    }
  }
}

/*Rota vulnerável de login*/
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // VULNERÁVEL: SQL Injection
  // const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  const query =
    "SELECT * FROM users WHERE username = '" +
    username +
    "' AND password = '" +
    password +
    "'";
  console.log("Query:", query);

  try {
    const result = await pool.query(query);
    if (result.rows.length > 0) {
      res.json({
        success: true,
        message: "Login bem-sucedido!",
        user: result.rows[0],
      });
    } else {
      res.json({ success: false, message: "Credenciais inválidas" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no banco" });
  }
});

// Rota segura de login usando query parametrizada

// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // QUERY SEGURA: parâmetros passados como array
//     const query = `SELECT * FROM users WHERE username = $1 AND password = $2`;
//     const result = await pool.query(query, [username, password]);

//     if (result.rows.length > 0) {
//       res.json({
//         success: true,
//         message: "Login bem-sucedido!",
//         user: result.rows[0],
//       });
//     } else {
//       res.json({ success: false, message: "Credenciais inválidas" });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Erro no banco" });
//   }
// });

// NÃO COMENTAR DE NOVO

initializeDb().then(() => {
  app.listen(PORT, () =>
    console.log(`Backend rodando em http://localhost:${PORT}`)
  );
});
