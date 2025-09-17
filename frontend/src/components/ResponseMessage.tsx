import React from "react";
import type { LoginResponse } from "../services/LoginService";

interface Props {
  response: LoginResponse | null;
}

const ResponseMessage: React.FC<Props> = ({ response }) => {
  if (!response) return null;
  return (
    <div style={{ marginTop: 20 }}>
      <h3>Resposta:</h3>
      <p>{response.message}</p>
      {response.success && response.user && (
        <p>Usuário logado: {response.user.username}</p>
      )}
    </div>
  );
};

export default ResponseMessage;
