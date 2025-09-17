import React, { useState } from "react";
import LoginService from "./services/LoginService";

interface LoginResponse {
  success: boolean;
  message: string;
  user?: { id: number; username: string; password: string };
}

const App: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState<LoginResponse | null>(null);

  const handleLogin = async () => {
    // Garante envio correto de strings mesmo se estiverem vazias
    const loginPayload = {
      username: username || "",
      password: password || "",
    };

    try {
      const res = await LoginService.login(loginPayload);
      setResponse(res);
    } catch {
      setResponse({ success: false, message: "Erro de conexão" });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Demo de SQL Injection - Login Vulnerável</h1>
      <p>
        <strong>Credenciais válidas:</strong> admin/secret ou user/pass
      </p>
      <p>
        <strong>Payload para testar Injection:</strong> Username:{" "}
        <code>' OR '1'='1</code> (' OR '1'='1 Como senha)
      </p>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ margin: "5px", padding: "5px" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: "5px", padding: "5px" }}
      />
      <br />
      <button onClick={handleLogin} style={{ margin: "5px", padding: "10px" }}>
        Login
      </button>

      {response && (
        <div style={{ marginTop: "20px" }}>
          <h3>Resposta:</h3>
          <p>{response.message}</p>
          {response.success && response.user && (
            <p>Usuário logado: {response.user.username}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
