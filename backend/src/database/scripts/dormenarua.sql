CREATE TABLE dormenarua(
	id SERIAL PRIMARY KEY,
	codigo VARCHAR,
	descricao VARCHAR
)

INSERT INTO dormenarua (
codigo,
descricao
) VALUES
('0','Sim'),
('1','Não')