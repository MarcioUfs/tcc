CREATE TABLE municipios (
id_uf SERIAL PRIMARY KEY NOT NULL,
uf VARCHAR,
Nome_UF VARCHAR,
Regiao_Geografica_Intermediária VARCHAR,
Nome_Regiao_Geografica_Intermediária VARCHAR,
Regiao_Geografica_Imediata VARCHAR,
Nome_Regiao_Geografica_Imediata VARCHAR,
Mesorregiao_Geografica VARCHAR,
Nome_Mesorregiao VARCHAR,
Microrregiao_Geografica VARCHAR,
Nome_Microrregiao VARCHAR,
Municipio VARCHAR,
Codigo_Municipio_Completo VARCHAR,
Nome_Municipio VARCHAR);

--INSERT DATAS

INSERT INTO municipios (
uf,
Nome_UF,
Regiao_Geografica_Intermediária,
Nome_Regiao_Geografica_Intermediária,
Regiao_Geografica_Imediata,
Nome_Regiao_Geografica_Imediata,
Mesorregiao_Geografica,
Nome_Mesorregiao,
Microrregiao_Geografica,
Nome_Microrregiao,
Municipio,
Codigo_Municipio_Completo,
Nome_Municipio 
) VALUES
('28','Sergipe','2801','Aracaju','280003','Propriá','03','Leste Sergipano','007','Propriá','00100','2800100','Amparo do São Francisco'),
('28','Sergipe','2801','Aracaju','280003','Propriá','02','Agreste Sergipano','003','Nossa Senhora das Dores','00209','2800209','Aquidabã'),
('28','Sergipe','2801','Aracaju','280001','Aracaju','03','Leste Sergipano','011','Aracaju','00308','2800308','Aracaju'),
('28','Sergipe','2801','Aracaju','280002','Estância','03','Leste Sergipano','012','Boquim','00407','2800407','Arauá'),
('28','Sergipe','2802','Itabaiana','280004','Itabaiana','02','Agreste Sergipano','004','Agreste de Itabaiana','00506','2800506','Areia Branca'),
('28','Sergipe','2801','Aracaju','280001','Aracaju','03','Leste Sergipano','011','Aracaju','00605','2800605','Barra dos Coqueiros'),
('28','Sergipe','2801','Aracaju','280002','Estância','03','Leste Sergipano','012','Boquim','00670','2800670','Boquim'),
('28','Sergipe','2801','Aracaju','280003','Propriá','03','Leste Sergipano','007','Propriá','00704','2800704','Brejo Grande'),
('28','Sergipe','2802','Itabaiana','280004','Itabaiana','02','Agreste Sergipano','004','Agreste de Itabaiana','01009','2801009','Campo do Brito'),
('28','Sergipe','2801','Aracaju','280003','Propriá','03','Leste Sergipano','007','Propriá','01108','2801108','Canhoba'),
('28','Sergipe','2802','Itabaiana','280006','Nossa Senhora da Glória','01','Sertão Sergipano','001','Sergipana do Sertão do São Francisco','01207','2801207','Canindé de São Francisco'),
('28','Sergipe','2801','Aracaju','280001','Aracaju','03','Leste Sergipano','008','Cotinguiba','01306','2801306','Capela'),
('28','Sergipe','2802','Itabaiana','280004','Itabaiana','01','Sertão Sergipano','002','Carira','01405','2801405','Carira'),
('28','Sergipe','2801','Aracaju','280001','Aracaju','03','Leste Sergipano','010','Baixo Cotinguiba','01504','2801504','Carmópolis'),
('28','Sergipe','2801','Aracaju','280003','Propriá','03','Leste Sergipano','007','Propriá','01603','2801603','Cedro de São João'),
('28','Sergipe','2801','Aracaju','280002','Estância','03','Leste Sergipano','012','Boquim','01702','2801702','Cristinápolis'),
('28','Sergipe','2801','Aracaju','280001','Aracaju','02','Agreste Sergipano','003','Nossa Senhora das Dores','01900','2801900','Cumbe'),
('28','Sergipe','2801','Aracaju','280001','Aracaju','03','Leste Sergipano','008','Cotinguiba','02007','2802007','Divina Pastora'),
('28','Sergipe','2801','Aracaju','280002','Estância','03','Leste Sergipano','013','Estância','02106','2802106','Estância'),
('28','Sergipe','2802','Itabaiana','280006','Nossa Senhora da Glória','01','Sertão Sergipano','001','Sergipana do Sertão do São Francisco','02205','2802205','Feira Nova'),
('28','Sergipe','2802','Itabaiana','280004','Itabaiana','01','Sertão Sergipano','002','Carira','02304','2802304','Frei Paulo'),
('28','Sergipe','2802','Itabaiana','280006','Nossa Senhora da Glória','01','Sertão Sergipano','001','Sergipana do Sertão do São Francisco','02403','2802403','Gararu'),
('28','Sergipe','2801','Aracaju','280001','Aracaju','03','Leste Sergipano','010','Baixo Cotinguiba','02502','2802502','General Maynard'),
('28','Sergipe','2802','Itabaiana','280006','Nossa Senhora da Glória','01','Sertão Sergipano','001','Sergipana do Sertão do São Francisco','02601','2802601','Gracho Cardoso'),
('28','Sergipe','2801','Aracaju','280003','Propriá','03','Leste Sergipano','007','Propriá','02700','2802700','Ilha das Flores'),
('28','Sergipe','2801','Aracaju','280002','Estância','03','Leste Sergipano','013','Estância','02809','2802809','Indiaroba'),
('28','Sergipe','2802','Itabaiana','280004','Itabaiana','02','Agreste Sergipano','004','Agreste de Itabaiana','02908','2802908','Itabaiana'),
('28','Sergipe','2801','Aracaju','280002','Estância','03','Leste Sergipano','012','Boquim','03005','2803005','Itabaianinha'),
('28','Sergipe','2802','Itabaiana','280006','Nossa Senhora da Glória','01','Sertão Sergipano','001','Sergipana do Sertão do São Francisco','03104','2803104','Itabi'),
('28','Sergipe','2801','Aracaju','280001','Aracaju','03','Leste Sergipano','013','Estância','03203','2803203','Itaporanga dAjuda'),
('28','Sergipe','2801','Aracaju','280001','Aracaju','03','Leste Sergipano','009','Japaratuba','03302','2803302','Japaratuba'),
('28','Sergipe','2801','Aracaju','280003','Propriá','03','Leste Sergipano','009','Japaratuba','03401','2803401','Japoatã'),
('28','Sergipe','2802','Itabaiana','280005','Lagarto','02','Agreste Sergipano','006','Agreste de Lagarto','03500','2803500','Lagarto'),
('28','Sergipe','2801','Aracaju','280001','Aracaju','03','Leste Sergipano','010','Baixo Cotinguiba','03609','2803609','Laranjeiras'),
('28','Sergipe','2802','Itabaiana','280004','Itabaiana','02','Agreste Sergipano','004','Agreste de Itabaiana','03708','2803708','Macambira'),
('28','Sergipe','2801','Aracaju','280003','Propriá','02','Agreste Sergipano','003','Nossa Senhora das Dores','03807','2803807','Malhada dos Bois'),
('28','Sergipe','2802','Itabaiana','280004','Itabaiana','02','Agreste Sergipano','004','Agreste de Itabaiana','03906','2803906','Malhador'),
('28','Sergipe','2801','Aracaju','280001','Aracaju','03','Leste Sergipano','010','Baixo Cotinguiba','04003','2804003','Maruim'),
('28','Sergipe','2802','Itabaiana','280004','Itabaiana','02','Agreste Sergipano','004','Agreste de Itabaiana','04102','2804102','Moita Bonita'),
('28','Sergipe','2802','Itabaiana','280006','Nossa Senhora da Glória','01','Sertão Sergipano','001','Sergipana do Sertão do São Francisco','04201','2804201','Monte Alegre de Sergipe'),
('28','Sergipe','2801','Aracaju','280003','Propriá','02','Agreste Sergipano','003','Nossa Senhora das Dores','04300','2804300','Muribeca'),
('28','Sergipe','2801','Aracaju','280003','Propriá','03','Leste Sergipano','007','Propriá','04409','2804409','Neópolis'),
('28','Sergipe','2802','Itabaiana','280004','Itabaiana','01','Sertão Sergipano','002','Carira','04458','2804458','Nossa Senhora Aparecida'),
('28','Sergipe','2802','Itabaiana','280006','Nossa Senhora da Glória','01','Sertão Sergipano','001','Sergipana do Sertão do São Francisco','04508','2804508','Nossa Senhora da Glória'),
('28','Sergipe','2801','Aracaju','280001','Aracaju','02','Agreste Sergipano','003','Nossa Senhora das Dores','04607','2804607','Nossa Senhora das Dores'),
('28','Sergipe','2801','Aracaju','280003','Propriá','03','Leste Sergipano','007','Propriá','04706','2804706','Nossa Senhora de Lourdes'),
('28','Sergipe','2801','Aracaju','280001','Aracaju','03','Leste Sergipano','011','Aracaju','04805','2804805','Nossa Senhora do Socorro'),
('28','Sergipe','2801','Aracaju','280003','Propriá','03','Leste Sergipano','009','Japaratuba','04904','2804904','Pacatuba'),
('28','Sergipe','2802','Itabaiana','280004','Itabaiana','01','Sertão Sergipano','002','Carira','05000','2805000','Pedra Mole'),
('28','Sergipe','2801','Aracaju','280002','Estância','03','Leste Sergipano','012','Boquim','05109','2805109','Pedrinhas'),
('28','Sergipe','2802','Itabaiana','280004','Itabaiana','01','Sertão Sergipano','002','Carira','05208','2805208','Pinhão'),
('28','Sergipe','2801','Aracaju','280001','Aracaju','03','Leste Sergipano','009','Japaratuba','05307','2805307','Pirambu'),
('28','Sergipe','2802','Itabaiana','280006','Nossa Senhora da Glória','01','Sertão Sergipano','001','Sergipana do Sertão do São Francisco','05406','2805406','Poço Redondo'),
('28','Sergipe','2802','Itabaiana','280005','Lagarto','02','Agreste Sergipano','005','Tobias Barreto','05505','2805505','Poço Verde'),
('28','Sergipe','2802','Itabaiana','280006','Nossa Senhora da Glória','01','Sertão Sergipano','001','Sergipana do Sertão do São Francisco','05604','2805604','Porto da Folha'),
('28','Sergipe','2801','Aracaju','280003','Propriá','03','Leste Sergipano','007','Propriá','05703','2805703','Propriá'),
('28','Sergipe','2802','Itabaiana','280005','Lagarto','02','Agreste Sergipano','006','Agreste de Lagarto','05802','2805802','Riachão do Dantas'),
('28','Sergipe','2801','Aracaju','280001','Aracaju','03','Leste Sergipano','010','Baixo Cotinguiba','05901','2805901','Riachuelo'),
('28','Sergipe','2802','Itabaiana','280004','Itabaiana','01','Sertão Sergipano','002','Carira','06008','2806008','Ribeirópolis'),
('28','Sergipe','2801','Aracaju','280001','Aracaju','03','Leste Sergipano','010','Baixo Cotinguiba','06107','2806107','Rosário do Catete'),
('28','Sergipe','2802','Itabaiana','280005','Lagarto','03','Leste Sergipano','012','Boquim','06206','2806206','Salgado'),
('28','Sergipe','2801','Aracaju','280002','Estância','03','Leste Sergipano','013','Estância','06305','2806305','Santa Luzia do Itanhy'),
('28','Sergipe','2801','Aracaju','280001','Aracaju','03','Leste Sergipano','008','Cotinguiba','06503','2806503','Santa Rosa de Lima'),
('28','Sergipe','2801','Aracaju','280003','Propriá','03','Leste Sergipano','007','Propriá','06404','2806404','Santana do São Francisco'),
('28','Sergipe','2801','Aracaju','280001','Aracaju','03','Leste Sergipano','010','Baixo Cotinguiba','06602','2806602','Santo Amaro das Brotas'),
('28','Sergipe','2801','Aracaju','280001','Aracaju','03','Leste Sergipano','011','Aracaju','06701','2806701','São Cristóvão'),
('28','Sergipe','2802','Itabaiana','280004','Itabaiana','02','Agreste Sergipano','004','Agreste de Itabaiana','06800','2806800','São Domingos'),
('28','Sergipe','2801','Aracaju','280003','Propriá','03','Leste Sergipano','009','Japaratuba','06909','2806909','São Francisco'),
('28','Sergipe','2802','Itabaiana','280004','Itabaiana','02','Agreste Sergipano','003','Nossa Senhora das Dores','07006','2807006','São Miguel do Aleixo'),
('28','Sergipe','2802','Itabaiana','280005','Lagarto','02','Agreste Sergipano','005','Tobias Barreto','07105','2807105','Simão Dias'),
('28','Sergipe','2801','Aracaju','280001','Aracaju','03','Leste Sergipano','008','Cotinguiba','07204','2807204','Siriri'),
('28','Sergipe','2801','Aracaju','280003','Propriá','03','Leste Sergipano','007','Propriá','07303','2807303','Telha'),
('28','Sergipe','2802','Itabaiana','280005','Lagarto','02','Agreste Sergipano','005','Tobias Barreto','07402','2807402','Tobias Barreto'),
('28','Sergipe','2801','Aracaju','280002','Estância','03','Leste Sergipano','012','Boquim','07501','2807501','Tomar do Geru'),
('28','Sergipe','2801','Aracaju','280002','Estância','03','Leste Sergipano','012','Boquim','07600','2807600','Umbaúba');