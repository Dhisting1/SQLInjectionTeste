import React, { useState } from "react";
import type { ILoginService, LoginResponse } from "../services/LoginService";

interface Props {
  loginService: ILoginService;
  onResponse: (res: LoginResponse) => void;
}

const LoginForm: React.FC<Props> = ({ loginService, onResponse }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username.trim()) {
      onResponse({ success: false, message: "Username não pode estar vazio" });
      return;
    }
    try {
      const data = await loginService.login(username, password);
      onResponse(data);
    } catch {
      onResponse({ success: false, message: "Erro de conexão" });
    }
  };

  return (
    <div style={{ width: 320 }}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ margin: 5, padding: 5 }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: 5, padding: 5 }}
      />
      <button onClick={handleLogin} style={{ margin: 5, padding: 10 }}>
        Entrar
      </button>
    </div>
  );
};

export default LoginForm;
