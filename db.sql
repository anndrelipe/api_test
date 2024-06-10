CREATE DATABASE api_banco;
USE api_banco;

CREATE table conta (
    -> conta_id INT UNIQUE AUTO_INCREMENT PRIMARY KEY,
    -> saldo FLOAT NOT NULL);

CREATE TABLE hist_transacao (
    -> conta_id INT,
    -> forma_pagamento CHAR NOT NULL,
    -> valor FLOAT NOT NULL);
ALTER TABLE hist_transacao
    -> ADD CONSTRAINT fk_conta_id FOREIGN KEY hist_transacao(conta_id)  REFERENCES conta(conta_id);
ALTER TABLE hist_transacao
    -> MODIFY conta_id INT NOT NULL;