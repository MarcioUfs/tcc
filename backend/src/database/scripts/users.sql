CREATE TABLE users(
	id_user SERIAL PRIMARY KEY NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
	password VARCHAR NOT NULL,
    cpf VARCHAR NOT NULL UNIQUE,
	nome VARCHAR NOT NULL,
	admin BOOLEAN NOT NULL,
    role VARCHAR NOT NULL 
)