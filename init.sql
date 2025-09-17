CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    login TEXT NOT NULL,
    senha TEXT NOT NULL,
    cpf TEXT NOT NULL,
    saldo NUMERIC(10,2) NOT NULL
);

INSERT INTO usuarios (nome, login, senha, cpf, saldo) VALUES
('José XP', 'josexp', 'invest123', '123.456.789-00', 15234.77),
('Maria Souza', 'msouza', 'senha123', '987.654.321-00', 7800.00),
('Ana Clara', 'ana.clara', 'minhasenha', '321.654.987-00', 2300.50);
