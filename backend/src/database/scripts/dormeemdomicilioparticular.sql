CREATE TABLE dormeemdomicilioparticular(
	id SERIAL PRIMARY KEY,
	codigo VARCHAR,
	descricao VARCHAR
)

INSERT INTO dormeemdomicilioparticular (
codigo,
descricao
) VALUES
('0','Sim'),
('1','Não')