-- ============================================================================
--  ATIVIDADE PRÁTICA 02 - "Banco de Dados dos Heróis e Vilões Multiversais"
--  Conteúdo: Segurança + Otimização (MySQL 8.0)
--  Disciplina: Conectar Banco de Dados com P.O.O.
--  Professora: Ana Beatriz Lucena Lira
-- ----------------------------------------------------------------------------
--  Nome Completo: Arthur Pereira Silva
--  Matrícula: 2513080006
-- ============================================================================


-- ============================================================================
-- PARTE 1: CRIAÇÃO DO BANCO E DA TABELA (DDL)
-- ============================================================================

DROP DATABASE IF EXISTS multiverso;
CREATE DATABASE multiverso
USE multiverso;

CREATE TABLE personagem (
    idpersonagem  INT          AUTO_INCREMENT PRIMARY KEY,
    nome          VARCHAR(120) NOT NULL,
    universo      VARCHAR(50)  NOT NULL,          -- Marvel, DC, Star Wars, Anime, Bleach...
    nivel_poder   INT          NOT NULL CHECK (nivel_poder BETWEEN 0 AND 9999),
    tipo          VARCHAR(40)  NOT NULL,          -- Herói, Vilão, Anti-herói, Entidade Cósmica, Robô
    classe        VARCHAR(40),                    -- Mago, Guerreiro, Metamorfo, Mutante...
    email_contato VARCHAR(150),
    data_criacao  DATE         NOT NULL DEFAULT (CURRENT_DATE)
);


-- ============================================================================
-- PARTE 2: INSERÇÃO DE DADOS (DML) -- 600 registros fictícios
-- ----------------------------------------------------------------------------
-- Os dados foram gerados num arquivo CSV (multiverso_personagens.csv).
--
-- >>> OPÇÃO A - importar direto do CSV (forma pedida na atividade) <<<
-- Para usar, o servidor e o cliente precisam estar com local_infile ligado:
--     SET GLOBAL local_infile = 1;   -- (executar uma vez como root)
-- e no MySQL Workbench abrir a conexão com a opção "OPT_LOCAL_INFILE=1".
-- Depois ajuste o caminho do arquivo e rode:
--
-- LOAD DATA LOCAL INFILE 'C:/caminho/ate/multiverso_personagens.csv'
--     INTO TABLE personagem
--     FIELDS TERMINATED BY ',' ENCLOSED BY '"'
--     LINES TERMINATED BY '\r\n'   -- o CSV usa quebra de linha do Windows (CRLF)
--     IGNORE 1 ROWS
--     (nome, universo, nivel_poder, tipo, classe, email_contato, data_criacao);
--
-- >>> OPÇÃO B - rodar os INSERTs abaixo (já funciona, sem configurar nada) <<<
-- (foram gerados a partir do mesmo CSV; basta executar o script inteiro)
-- ============================================================================

INSERT INTO personagem (nome, universo, nivel_poder, tipo, classe, email_contato, data_criacao) VALUES
('Ragnor Moonbreaker','Anime',7253,'Anti-herói','Assassino','ragnor.moonbreaker.1@anime.multiverso','2019-10-23'),
('Kira Ironfang','Star Wars',9316,'Robô','Mago','kira.ironfang.2@starwars.multiverso','2021-11-02'),
('Ulric Wraithborn','Bleach',1625,'Vilão','Mutante','ulric.wraithborn.3@bleach.multiverso','2017-12-19'),
('Ixar Nightshade','Bleach',1330,'Vilão','Mutante','ixar.nightshade.4@bleach.multiverso','2016-12-12'),
('Vesh Bloodroot','Dragon Ball',1229,'Vilão','Mago','vesh.bloodroot.5@dragonball.multiverso','2019-08-01'),
('Eira Starweaver','Anime',9729,'Entidade Cósmica','Atirador','eira.starweaver.6@anime.multiverso','2015-05-14'),
('Zel Sunforge','DC',4720,'Anti-herói','Tanque','zel.sunforge.7@dc.multiverso','2015-10-19'),
('Thane Bloodroot','Bleach',3824,'Anti-herói','Assassino','thane.bloodroot.8@bleach.multiverso','2022-06-01'),
('Lumen Stormrider','One Piece',3241,'Entidade Cósmica','Guerreiro','lumen.stormrider.9@onepiece.multiverso','2021-02-08'),
('Kron Ravenscar','DC',2441,'Anti-herói','Metamorfo','kron.ravenscar.10@dc.multiverso','2015-10-20'),
('Pyra Thunderhowl','DC',2718,'Vilão','Assassino','pyra.thunderhowl.11@marvel.multiverso','2023-05-26'),
('Kron Emberfall','One Piece',9325,'Anti-herói','Tanque','kron.emberfall.12@onepiece.multiverso','2016-05-24'),
('Nyx Grimsoul','Anime',4982,'Entidade Cósmica','Atirador','nyx.grimsoul.13@anime.multiverso','2020-08-11'),
('Rixa Ironfang','Dragon Ball',8090,'Entidade Cósmica','Guerreiro','rixa.ironfang.14@dragonball.multiverso','2021-09-15'),
('Pyra Ashveil','Marvel',7078,'Anti-herói','Assassino','pyra.ashveil.15@marvel.multiverso','2017-10-22'),
('Kael Moonbreaker','Marvel',1496,'Vilão','Assassino','kael.moonbreaker.16@marvel.multiverso','2021-08-01'),
('Asha Thunderhowl','Marvel',4415,'Robô','Mago','asha.thunderhowl.17@marvel.multiverso','2023-07-23'),
('Aetha Ironfang','One Piece',2870,'Entidade Cósmica','Suporte','aetha.ironfang.18@onepiece.multiverso','2022-04-22'),
('Asha Grimsoul','Anime',4557,'Vilão','Assassino','asha.grimsoul.19@anime.multiverso','2019-11-21'),
('Ixar Darkwater','Bleach',8056,'Herói','Tanque','ixar.darkwater.20@bleach.multiverso','2018-11-26'),
('Tavi Duskbane','Anime',5460,'Anti-herói','Guerreiro','tavi.duskbane.21@anime.multiverso','2024-08-14'),
('Bran Frostmaw','DC',5403,'Entidade Cósmica','Tanque','bran.frostmaw.22@dc.multiverso','2018-03-26'),
('Ragnor Ashveil','Bleach',6561,'Robô','Mago','ragnor.ashveil.23@bleach.multiverso','2020-02-06'),
('Kron Goldspire','Marvel',5153,'Anti-herói','Espadachim','kron.goldspire.24@marvel.multiverso','2016-04-19'),
('Mira Doomheart','One Piece',6622,'Robô','Mago','mira.doomheart.25@onepiece.multiverso','2022-05-17'),
('Zel Bloodroot','One Piece',8889,'Entidade Cósmica','Psíquico','zel.bloodroot.26@onepiece.multiverso','2015-08-11'),
('Onyx Emberfall','DC',8494,'Anti-herói','Assassino','onyx.emberfall.27@dc.multiverso','2023-06-26'),
('Vael Stormrider','Anime',7242,'Herói','Mutante','vael.stormrider.28@anime.multiverso','2017-12-29'),
('Orin Bloodroot','Dragon Ball',2146,'Anti-herói','Tanque','orin.bloodroot.29@dragonball.multiverso','2024-11-16'),
('Vael Sunforge','Bleach',7941,'Herói','Mago','vael.sunforge.30@bleach.multiverso','2022-01-24'),
('Eira Duskbane','Dragon Ball',3920,'Vilão','Atirador','eira.duskbane.31@dragonball.multiverso','2021-03-06'),
('Dante Skyrender','Marvel',9048,'Entidade Cósmica','Guerreiro','dante.skyrender.32@marvel.multiverso','2017-07-09'),
('Mira Emberfall','One Piece',1858,'Entidade Cósmica','Guerreiro','mira.emberfall.33@onepiece.multiverso','2022-04-07'),
('Sora Ravenscar','One Piece',2522,'Entidade Cósmica','Atirador','sora.ravenscar.34@onepiece.multiverso','2020-09-15'),
('Rune Brightblade','Bleach',4479,'Entidade Cósmica','Tanque','rune.brightblade.35@bleach.multiverso','2020-04-18'),
('Drax Darkwater','DC',7483,'Robô','Metamorfo','drax.darkwater.36@dc.multiverso','2019-04-21'),
('Goro Hollowmark','DC',9820,'Robô','Metamorfo','goro.hollowmark.37@dc.multiverso','2024-09-09'),
('Mira Voidborn','Marvel',4526,'Entidade Cósmica','Espadachim','mira.voidborn.38@marvel.multiverso','2023-11-01'),
('Selka Doomheart','Dragon Ball',4377,'Herói','Atirador','selka.doomheart.39@dragonball.multiverso','2023-02-21'),
('Korv Doomheart','Star Wars',9616,'Robô','Tanque','korv.doomheart.40@starwars.multiverso','2024-09-14'),
('Korv Bloodroot','DC',7316,'Robô','Tanque','korv.bloodroot.41@dc.multiverso','2018-11-14'),
('Aetha Thunderhowl','Star Wars',9042,'Robô','Psíquico','aetha.thunderhowl.42@starwars.multiverso','2020-02-09'),
('Galen Grimsoul','Star Wars',3090,'Vilão','Assassino','galen.grimsoul.43@starwars.multiverso','2019-04-18'),
('Galen Frostmaw','DC',6730,'Herói','Espadachim','galen.frostmaw.44@dc.multiverso','2023-05-09'),
('Korv Voidborn','Anime',6246,'Entidade Cósmica','Metamorfo','korv.voidborn.45@anime.multiverso','2020-07-21'),
('Kira Stonewall','Marvel',2068,'Robô','Assassino','kira.stonewall.46@marvel.multiverso','2018-09-21'),
('Tavi Voidborn','One Piece',1644,'Entidade Cósmica','Guerreiro','tavi.voidborn.47@onepiece.multiverso','2020-11-24'),
('Rixa Moonbreaker','Anime',251,'Vilão','Psíquico','rixa.moonbreaker.48@anime.multiverso','2024-10-07'),
('Nyx Moonbreaker','Bleach',2529,'Herói','Tanque','nyx.moonbreaker.49@bleach.multiverso','2023-10-07'),
('Goro Ashveil','Star Wars',5546,'Robô','Psíquico','goro.ashveil.50@starwars.multiverso','2022-04-15');

INSERT INTO personagem (nome, universo, nivel_poder, tipo, classe, email_contato, data_criacao) VALUES
('Talos Stonewall','Marvel',5383,'Robô','Psíquico','talos.stonewall.51@marvel.multiverso','2018-07-21'),
('Rune Doomheart','Bleach',7994,'Robô','Mago','rune.doomheart.52@bleach.multiverso','2021-12-04'),
('Kael Goldspire','Marvel',3846,'Anti-herói','Mutante','kael.goldspire.53@marvel.multiverso','2023-05-17'),
('Zorath Thunderhowl','Marvel',7110,'Herói','Guerreiro','zorath.thunderhowl.54@marvel.multiverso','2019-12-23'),
('Vael Duskbane','DC',4906,'Herói','Mago','vael.duskbane.55@dc.multiverso','2018-08-21'),
('Borin Ashveil','One Piece',919,'Anti-herói','Espadachim','borin.ashveil.56@onepiece.multiverso','2019-03-16'),
('Eira Frostmaw','Anime',2385,'Vilão','Suporte','eira.frostmaw.57@anime.multiverso','2019-08-15'),
('Mei Stonewall','Dragon Ball',2950,'Vilão','Metamorfo','mei.stonewall.58@dragonball.multiverso','2015-11-20'),
('Galen Darkwater','Dragon Ball',6267,'Robô','Mutante','galen.darkwater.59@dragonball.multiverso','2020-07-31'),
('Vael Ashveil','Dragon Ball',2344,'Vilão','Tanque','vael.ashveil.60@dragonball.multiverso','2022-02-25'),
('Onyx Wraithborn','Star Wars',7529,'Anti-herói','Mago','onyx.wraithborn.61@starwars.multiverso','2025-01-29'),
('Dante Starweaver','One Piece',7622,'Anti-herói','Suporte','dante.starweaver.62@onepiece.multiverso','2016-10-09'),
('Talos Sunforge','Marvel',7237,'Anti-herói','Assassino','talos.sunforge.63@marvel.multiverso','2018-05-10'),
('Ulric Flameheart','Bleach',6951,'Anti-herói','Tanque','ulric.flameheart.64@bleach.multiverso','2024-06-24'),
('Ragnor Starweaver','Star Wars',3263,'Entidade Cósmica','Tanque','ragnor.starweaver.65@starwars.multiverso','2016-03-12'),
('Galen Skyrender','DC',6248,'Robô','Espadachim','galen.skyrender.66@dc.multiverso','2021-06-12'),
('Ulric Doomheart','Star Wars',4837,'Herói','Psíquico','ulric.doomheart.67@starwars.multiverso','2018-01-29'),
('Asha Skyrender','Marvel',9272,'Herói','Assassino','asha.skyrender.68@marvel.multiverso','2023-05-11'),
('Ragnor Hollowmark','Anime',4689,'Vilão','Assassino','ragnor.hollowmark.69@anime.multiverso','2023-12-29'),
('Sora Darkwater','Star Wars',3588,'Vilão','Assassino','sora.darkwater.70@starwars.multiverso','2017-10-23'),
('Kron Voidborn','Bleach',2240,'Herói','Mago','kron.voidborn.71@bleach.multiverso','2018-06-19'),
('Talos Ashveil','One Piece',7222,'Herói','Assassino','talos.ashveil.72@onepiece.multiverso','2019-02-03'),
('Korv Emberfall','Bleach',2153,'Herói','Atirador','korv.emberfall.73@bleach.multiverso','2018-08-31'),
('Pyra Ironfang','Bleach',6807,'Vilão','Mutante','pyra.ironfang.74@bleach.multiverso','2016-06-25'),
('Ragnor Ravenscar','One Piece',8837,'Anti-herói','Suporte','ragnor.ravenscar.75@onepiece.multiverso','2020-08-17'),
('Ragnor Brightblade','Star Wars',2695,'Anti-herói','Tanque','ragnor.brightblade.76@starwars.multiverso','2024-01-17'),
('Rune Stormrider','Star Wars',5549,'Herói','Tanque','rune.stormrider.77@starwars.multiverso','2015-11-05'),
('Tavi Sunforge','DC',3696,'Entidade Cósmica','Suporte','tavi.sunforge.78@dc.multiverso','2019-02-07'),
('Hana Ashveil','Marvel',6464,'Herói','Atirador','hana.ashveil.79@marvel.multiverso','2021-01-06'),
('Borin Stonewall','Marvel',7451,'Anti-herói','Atirador','borin.stonewall.80@marvel.multiverso','2021-07-22'),
('Lumen Skyrender','Anime',6086,'Herói','Mutante','lumen.skyrender.81@anime.multiverso','2020-04-15'),
('Tavi Ashveil','Marvel',9198,'Anti-herói','Assassino','tavi.ashveil.82@marvel.multiverso','2017-06-25'),
('Pyra Hollowmark','Bleach',1035,'Entidade Cósmica','Atirador','pyra.hollowmark.83@bleach.multiverso','2022-04-13'),
('Pyra Emberfall','Anime',1911,'Vilão','Mago','pyra.emberfall.84@anime.multiverso','2015-06-02'),
('Kira Ashveil','Star Wars',8071,'Herói','Guerreiro','kira.ashveil.85@starwars.multiverso','2017-08-19'),
('Sael Grimsoul','Dragon Ball',2222,'Entidade Cósmica','Tanque','sael.grimsoul.86@dragonball.multiverso','2019-02-28'),
('Zorath Brightblade','Bleach',8850,'Entidade Cósmica','Assassino','zorath.brightblade.87@bleach.multiverso','2023-04-29'),
('Tavi Starweaver','Bleach',2531,'Entidade Cósmica','Guerreiro','tavi.starweaver.88@bleach.multiverso','2024-05-07'),
('Pyra Moonbreaker','Anime',6686,'Anti-herói','Mago','pyra.moonbreaker.89@anime.multiverso','2022-09-28'),
('Kron Wraithborn','Star Wars',3559,'Entidade Cósmica','Tanque','kron.wraithborn.90@starwars.multiverso','2017-08-25'),
('Ixar Stormrider','One Piece',5942,'Herói','Espadachim','ixar.stormrider.91@onepiece.multiverso','2021-02-08'),
('Sael Emberfall','Bleach',5876,'Herói','Psíquico','sael.emberfall.92@bleach.multiverso','2018-02-04'),
('Orin Voidborn','DC',2001,'Entidade Cósmica','Guerreiro','orin.voidborn.93@dc.multiverso','2022-06-07'),
('Zel Voidborn','DC',9783,'Herói','Mago','zel.voidborn.94@dc.multiverso','2023-10-28'),
('Asha Sunforge','Star Wars',3990,'Vilão','Assassino','asha.sunforge.95@starwars.multiverso','2017-04-20'),
('Selka Ravenscar','Marvel',9080,'Vilão','Assassino','selka.ravenscar.96@marvel.multiverso','2017-06-03'),
('Talos Skyrender','One Piece',3817,'Anti-herói','Metamorfo','talos.skyrender.97@onepiece.multiverso','2023-11-05'),
('Galen Doomheart','Dragon Ball',46,'Anti-herói','Metamorfo','galen.doomheart.98@dragonball.multiverso','2016-06-16'),
('Kira Brightblade','Dragon Ball',4106,'Vilão','Guerreiro','kira.brightblade.99@dragonball.multiverso','2022-05-31'),
('Rixa Thunderhowl','One Piece',422,'Vilão','Mago','rixa.thunderhowl.100@onepiece.multiverso','2019-01-07');

INSERT INTO personagem (nome, universo, nivel_poder, tipo, classe, email_contato, data_criacao) VALUES
('Vesh Flameheart','One Piece',3898,'Robô','Espadachim','vesh.flameheart.101@onepiece.multiverso','2015-03-06'),
('Rixa Doomheart','DC',4347,'Herói','Metamorfo','rixa.doomheart.102@dc.multiverso','2023-04-27'),
('Vesh Ravenscar','Anime',8619,'Herói','Guerreiro','vesh.ravenscar.103@anime.multiverso','2020-05-04'),
('Zorath Stormrider','Anime',5931,'Robô','Assassino','zorath.stormrider.104@anime.multiverso','2016-03-22'),
('Aetha Stonewall','Anime',8254,'Vilão','Assassino','aetha.stonewall.105@anime.multiverso','2015-06-27'),
('Kael Voidborn','Bleach',8543,'Anti-herói','Tanque','kael.voidborn.106@bleach.multiverso','2022-03-20'),
('Dante Moonbreaker','Marvel',996,'Entidade Cósmica','Psíquico','dante.moonbreaker.107@marvel.multiverso','2019-10-13'),
('Vesh Stormrider','Bleach',1768,'Entidade Cósmica','Tanque','vesh.stormrider.108@bleach.multiverso','2015-10-29'),
('Sael Thunderhowl','Marvel',5277,'Robô','Metamorfo','sael.thunderhowl.109@marvel.multiverso','2015-09-27'),
('Drax Brightblade','DC',4505,'Robô','Assassino','drax.brightblade.110@dc.multiverso','2021-02-24'),
('Ulric Skyrender','Bleach',5327,'Entidade Cósmica','Assassino','ulric.skyrender.111@bleach.multiverso','2020-12-13'),
('Aetha Hollowmark','Star Wars',7433,'Robô','Assassino','aetha.hollowmark.112@starwars.multiverso','2019-10-29'),
('Zorath Frostmaw','Marvel',1874,'Robô','Mutante','zorath.frostmaw.113@marvel.multiverso','2019-10-28'),
('Orin Goldspire','Anime',3743,'Entidade Cósmica','Espadachim','orin.goldspire.114@anime.multiverso','2024-04-12'),
('Aetha Ravenscar','Anime',6532,'Entidade Cósmica','Guerreiro','aetha.ravenscar.115@anime.multiverso','2018-07-04'),
('Ragnor Duskbane','Anime',5120,'Anti-herói','Espadachim','ragnor.duskbane.116@anime.multiverso','2016-09-17'),
('Onyx Skyrender','Bleach',7770,'Herói','Guerreiro','onyx.skyrender.117@bleach.multiverso','2024-04-29'),
('Vesh Thunderhowl','Marvel',1527,'Entidade Cósmica','Guerreiro','vesh.thunderhowl.118@marvel.multiverso','2023-05-08'),
('Ragnor Frostmaw','Bleach',6105,'Vilão','Suporte','ragnor.frostmaw.119@bleach.multiverso','2015-09-03'),
('Hana Stormrider','Dragon Ball',9201,'Robô','Espadachim','hana.stormrider.120@dragonball.multiverso','2022-07-07'),
('Dante Bloodroot','Marvel',6730,'Anti-herói','Psíquico','dante.bloodroot.121@marvel.multiverso','2024-09-25'),
('Selka Starweaver','Bleach',842,'Anti-herói','Assassino','selka.starweaver.122@bleach.multiverso','2018-07-03'),
('Vael Ironfang','Star Wars',1697,'Robô','Suporte','vael.ironfang.123@starwars.multiverso','2017-05-21'),
('Goro Emberfall','DC',7900,'Vilão','Guerreiro','goro.emberfall.124@dc.multiverso','2018-12-05'),
('Drax Ravenscar','One Piece',9113,'Anti-herói','Guerreiro','drax.ravenscar.125@onepiece.multiverso','2023-07-21'),
('Sora Grimsoul','Star Wars',9406,'Vilão','Psíquico','sora.grimsoul.126@starwars.multiverso','2024-06-23'),
('Vire Ravenscar','Dragon Ball',9121,'Herói','Assassino','vire.ravenscar.127@dragonball.multiverso','2022-05-18'),
('Talos Ravenscar','One Piece',4381,'Herói','Metamorfo','talos.ravenscar.128@onepiece.multiverso','2018-01-24'),
('Korv Flameheart','Bleach',5062,'Anti-herói','Espadachim','korv.flameheart.129@bleach.multiverso','2015-01-26'),
('Pyra Grimsoul','DC',2347,'Robô','Psíquico','pyra.grimsoul.130@dc.multiverso','2015-10-13'),
('Kron Ashveil','DC',502,'Herói','Suporte','kron.ashveil.131@dc.multiverso','2017-05-31'),
('Dante Ashveil','Anime',6878,'Entidade Cósmica','Espadachim','dante.ashveil.132@anime.multiverso','2016-10-06'),
('Kron Starweaver','Star Wars',5105,'Anti-herói','Assassino','kron.starweaver.133@starwars.multiverso','2021-09-08'),
('Korv Starweaver','Marvel',861,'Vilão','Metamorfo','korv.starweaver.134@marvel.multiverso','2023-06-18'),
('Vesh Goldspire','Dragon Ball',815,'Herói','Atirador','vesh.goldspire.135@dragonball.multiverso','2019-12-20'),
('Kira Flameheart','Bleach',6947,'Entidade Cósmica','Assassino','kira.flameheart.136@bleach.multiverso','2019-12-16'),
('Sael Stormrider','Anime',4475,'Vilão','Suporte','sael.stormrider.137@anime.multiverso','2016-04-11'),
('Nova Ashveil','Star Wars',7043,'Herói','Atirador','nova.ashveil.138@starwars.multiverso','2022-08-09'),
('Ixar Frostmaw','Bleach',9717,'Entidade Cósmica','Suporte','ixar.frostmaw.139@bleach.multiverso','2022-06-25'),
('Onyx Ravenscar','Star Wars',744,'Vilão','Psíquico','onyx.ravenscar.140@starwars.multiverso','2021-09-20'),
('Kira Sunforge','Marvel',125,'Vilão','Atirador','kira.sunforge.141@marvel.multiverso','2017-05-15'),
('Rixa Hollowmark','One Piece',2248,'Anti-herói','Atirador','rixa.hollowmark.142@onepiece.multiverso','2018-09-05'),
('Bran Thunderhowl','Marvel',126,'Entidade Cósmica','Psíquico','bran.thunderhowl.143@marvel.multiverso','2016-12-20'),
('Eira Hollowmark','DC',6229,'Robô','Mutante','eira.hollowmark.144@dc.multiverso','2020-08-11'),
('Tavi Stonewall','Dragon Ball',5802,'Herói','Psíquico','tavi.stonewall.145@dragonball.multiverso','2024-08-30'),
('Drax Skyrender','Bleach',693,'Entidade Cósmica','Mago','drax.skyrender.146@bleach.multiverso','2020-02-27'),
('Lyra Thunderhowl','Marvel',5129,'Robô','Psíquico','lyra.thunderhowl.147@marvel.multiverso','2021-06-06'),
('Sael Brightblade','Anime',6843,'Anti-herói','Guerreiro','sael.brightblade.148@anime.multiverso','2019-07-18'),
('Vael Moonbreaker','Marvel',5321,'Vilão','Assassino','vael.moonbreaker.149@marvel.multiverso','2020-02-28'),
('Asha Ironfang','One Piece',5928,'Herói','Psíquico','asha.ironfang.150@onepiece.multiverso','2024-06-21');

INSERT INTO personagem (nome, universo, nivel_poder, tipo, classe, email_contato, data_criacao) VALUES
('Zel Hollowmark','Marvel',3986,'Entidade Cósmica','Assassino','zel.hollowmark.151@marvel.multiverso','2019-06-29'),
('Ixar Wraithborn','Dragon Ball',1288,'Entidade Cósmica','Atirador','ixar.wraithborn.152@dragonball.multiverso','2023-05-13'),
('Vorn Frostmaw','Star Wars',3630,'Anti-herói','Metamorfo','vorn.frostmaw.153@starwars.multiverso','2015-11-09'),
('Rune Darkwater','Dragon Ball',1868,'Robô','Suporte','rune.darkwater.154@dragonball.multiverso','2017-03-05'),
('Goro Skyrender','One Piece',5724,'Anti-herói','Metamorfo','goro.skyrender.155@onepiece.multiverso','2017-08-25'),
('Vael Ravenscar','Marvel',2399,'Anti-herói','Mutante','vael.ravenscar.156@marvel.multiverso','2016-12-11'),
('Dante Thunderhowl','Dragon Ball',2504,'Herói','Metamorfo','dante.thunderhowl.157@dragonball.multiverso','2023-09-01'),
('Drax Moonbreaker','Bleach',8095,'Entidade Cósmica','Assassino','drax.moonbreaker.158@bleach.multiverso','2023-07-10'),
('Eira Emberfall','Dragon Ball',7354,'Robô','Assassino','eira.emberfall.159@dragonball.multiverso','2018-08-16'),
('Vire Skyrender','One Piece',5179,'Vilão','Tanque','vire.skyrender.160@onepiece.multiverso','2015-10-07'),
('Vire Doomheart','Anime',7245,'Anti-herói','Atirador','vire.doomheart.161@anime.multiverso','2021-08-19'),
('Vael Thunderhowl','Marvel',5766,'Robô','Guerreiro','vael.thunderhowl.162@marvel.multiverso','2018-06-25'),
('Ixar Stonewall','Anime',7404,'Herói','Mago','ixar.stonewall.163@anime.multiverso','2019-02-19'),
('Zorath Ironfang','One Piece',4703,'Herói','Guerreiro','zorath.ironfang.164@onepiece.multiverso','2021-11-24'),
('Mei Frostmaw','Dragon Ball',8307,'Entidade Cósmica','Tanque','mei.frostmaw.165@dragonball.multiverso','2021-07-05'),
('Sora Skyrender','Dragon Ball',672,'Entidade Cósmica','Assassino','sora.skyrender.166@dragonball.multiverso','2022-04-23'),
('Aetha Voidborn','DC',5267,'Robô','Tanque','aetha.voidborn.167@dc.multiverso','2020-08-15'),
('Orin Duskbane','DC',1013,'Entidade Cósmica','Guerreiro','orin.duskbane.168@dc.multiverso','2024-02-04'),
('Mira Ironfang','One Piece',5626,'Herói','Suporte','mira.ironfang.169@onepiece.multiverso','2022-03-31'),
('Kira Wraithborn','DC',641,'Vilão','Tanque','kira.wraithborn.170@dc.multiverso','2019-12-05'),
('Zel Brightblade','Dragon Ball',8564,'Robô','Metamorfo','zel.brightblade.171@dragonball.multiverso','2019-01-30'),
('Selka Nightshade','Star Wars',4634,'Entidade Cósmica','Psíquico','selka.nightshade.172@starwars.multiverso','2023-09-08'),
('Kira Nightshade','Star Wars',9795,'Herói','Espadachim','kira.nightshade.173@starwars.multiverso','2015-09-27'),
('Ixar Flameheart','Star Wars',1548,'Robô','Psíquico','ixar.flameheart.174@starwars.multiverso','2018-03-09'),
('Selka Brightblade','Star Wars',9874,'Vilão','Espadachim','selka.brightblade.175@starwars.multiverso','2015-11-30'),
('Onyx Stonewall','Dragon Ball',2317,'Anti-herói','Atirador','onyx.stonewall.176@dragonball.multiverso','2022-05-11'),
('Drax Grimsoul','Bleach',6421,'Vilão','Assassino','drax.grimsoul.177@bleach.multiverso','2022-12-13'),
('Goro Stonewall','Marvel',5072,'Robô','Psíquico','goro.stonewall.178@marvel.multiverso','2022-03-20'),
('Ragnor Skyrender','One Piece',5381,'Vilão','Suporte','ragnor.skyrender.179@onepiece.multiverso','2016-01-18'),
('Goro Frostmaw','Bleach',6937,'Robô','Espadachim','goro.frostmaw.180@bleach.multiverso','2015-03-16'),
('Korv Darkwater','Star Wars',5060,'Vilão','Mutante','korv.darkwater.181@starwars.multiverso','2018-10-31'),
('Pyra Duskbane','One Piece',7967,'Vilão','Mutante','pyra.duskbane.182@onepiece.multiverso','2016-07-17'),
('Galen Emberfall','DC',1264,'Anti-herói','Guerreiro','galen.emberfall.183@dc.multiverso','2020-09-10'),
('Pyra Flameheart','One Piece',8843,'Robô','Mago','pyra.flameheart.184@onepiece.multiverso','2022-06-04'),
('Bran Voidborn','Star Wars',2147,'Robô','Psíquico','bran.voidborn.185@starwars.multiverso','2016-09-23'),
('Ixar Skyrender','DC',2962,'Robô','Metamorfo','ixar.skyrender.186@dc.multiverso','2023-02-01'),
('Goro Goldspire','Anime',715,'Entidade Cósmica','Espadachim','goro.goldspire.187@anime.multiverso','2022-08-02'),
('Kron Brightblade','Bleach',3891,'Entidade Cósmica','Assassino','kron.brightblade.188@bleach.multiverso','2018-03-13'),
('Zorath Doomheart','One Piece',7355,'Vilão','Suporte','zorath.doomheart.189@onepiece.multiverso','2017-09-06'),
('Kron Duskbane','Star Wars',7684,'Vilão','Espadachim','kron.duskbane.190@starwars.multiverso','2022-08-10'),
('Thane Brightblade','Dragon Ball',7218,'Entidade Cósmica','Atirador','thane.brightblade.191@dragonball.multiverso','2023-09-23'),
('Rixa Starweaver','Anime',8239,'Robô','Psíquico','rixa.starweaver.192@anime.multiverso','2016-10-25'),
('Mira Ravenscar','One Piece',3271,'Robô','Metamorfo','mira.ravenscar.193@onepiece.multiverso','2024-10-15'),
('Dante Goldspire','Star Wars',854,'Entidade Cósmica','Espadachim','dante.goldspire.194@starwars.multiverso','2021-03-21'),
('Rixa Nightshade','Marvel',8452,'Herói','Atirador','rixa.nightshade.195@marvel.multiverso','2015-12-10'),
('Kael Doomheart','One Piece',2626,'Anti-herói','Tanque','kael.doomheart.196@onepiece.multiverso','2025-02-25'),
('Korv Thunderhowl','Dragon Ball',2414,'Entidade Cósmica','Guerreiro','korv.thunderhowl.197@dragonball.multiverso','2025-03-18'),
('Ixar Starweaver','DC',7391,'Anti-herói','Mago','ixar.starweaver.198@dc.multiverso','2019-08-27'),
('Nova Brightblade','Marvel',6495,'Robô','Espadachim','nova.brightblade.199@marvel.multiverso','2017-08-23'),
('Eira Voidborn','Anime',1337,'Anti-herói','Mutante','eira.voidborn.200@anime.multiverso','2015-04-26');

INSERT INTO personagem (nome, universo, nivel_poder, tipo, classe, email_contato, data_criacao) VALUES
('Ulric Ravenscar','Star Wars',1623,'Anti-herói','Metamorfo','ulric.ravenscar.201@starwars.multiverso','2016-07-17'),
('Nyx Sunforge','Marvel',4700,'Entidade Cósmica','Metamorfo','nyx.sunforge.202@marvel.multiverso','2023-07-06'),
('Thane Sunforge','Bleach',7685,'Entidade Cósmica','Assassino','thane.sunforge.203@bleach.multiverso','2015-01-22'),
('Kael Wraithborn','Marvel',311,'Anti-herói','Mutante','kael.wraithborn.204@marvel.multiverso','2024-05-13'),
('Sael Ironfang','DC',8991,'Robô','Suporte','sael.ironfang.205@dc.multiverso','2019-09-30'),
('Hana Flameheart','Marvel',4720,'Vilão','Atirador','hana.flameheart.206@marvel.multiverso','2016-05-14'),
('Sora Stormrider','Marvel',3906,'Entidade Cósmica','Assassino','sora.stormrider.207@marvel.multiverso','2020-02-16'),
('Kael Ravenscar','Marvel',1816,'Entidade Cósmica','Assassino','kael.ravenscar.208@marvel.multiverso','2021-01-04'),
('Vorn Goldspire','Marvel',8443,'Robô','Mutante','vorn.goldspire.209@marvel.multiverso','2023-01-22'),
('Ragnor Stonewall','DC',4772,'Entidade Cósmica','Mago','ragnor.stonewall.210@dc.multiverso','2021-11-23'),
('Kael Brightblade','Star Wars',3941,'Robô','Psíquico','kael.brightblade.211@starwars.multiverso','2017-02-06'),
('Aetha Doomheart','Bleach',1402,'Robô','Espadachim','aetha.doomheart.212@bleach.multiverso','2015-10-05'),
('Kael Skyrender','Dragon Ball',8914,'Robô','Suporte','kael.skyrender.213@dragonball.multiverso','2021-03-19'),
('Mira Moonbreaker','Marvel',6397,'Entidade Cósmica','Mago','mira.moonbreaker.214@marvel.multiverso','2022-02-16'),
('Lumen Thunderhowl','Anime',6116,'Anti-herói','Mago','lumen.thunderhowl.215@anime.multiverso','2019-01-02'),
('Dante Frostmaw','One Piece',1106,'Anti-herói','Mutante','dante.frostmaw.216@onepiece.multiverso','2023-03-22'),
('Eira Stormrider','Bleach',1698,'Robô','Espadachim','eira.stormrider.217@bleach.multiverso','2016-06-30'),
('Sael Stonewall','Marvel',5772,'Robô','Espadachim','sael.stonewall.218@marvel.multiverso','2024-02-15'),
('Lumen Darkwater','Bleach',2868,'Entidade Cósmica','Tanque','lumen.darkwater.219@bleach.multiverso','2022-01-31'),
('Rune Flameheart','DC',2209,'Herói','Tanque','rune.flameheart.220@dc.multiverso','2015-06-01'),
('Bran Bloodroot','Star Wars',3302,'Herói','Mutante','bran.bloodroot.221@starwars.multiverso','2024-12-07'),
('Goro Thunderhowl','Marvel',5170,'Anti-herói','Suporte','goro.thunderhowl.222@marvel.multiverso','2019-06-20'),
('Asha Doomheart','One Piece',8897,'Entidade Cósmica','Atirador','asha.doomheart.223@onepiece.multiverso','2015-05-30'),
('Rixa Brightblade','One Piece',3131,'Anti-herói','Espadachim','rixa.brightblade.224@onepiece.multiverso','2024-09-01'),
('Thane Ironfang','One Piece',783,'Anti-herói','Atirador','thane.ironfang.225@onepiece.multiverso','2016-05-24'),
('Dante Wraithborn','One Piece',6029,'Entidade Cósmica','Psíquico','dante.wraithborn.226@onepiece.multiverso','2023-05-03'),
('Mira Goldspire','Anime',6334,'Anti-herói','Metamorfo','mira.goldspire.227@anime.multiverso','2020-07-25'),
('Lumen Doomheart','Bleach',8151,'Anti-herói','Suporte','lumen.doomheart.228@bleach.multiverso','2017-12-28'),
('Sael Wraithborn','One Piece',1353,'Entidade Cósmica','Guerreiro','sael.wraithborn.229@onepiece.multiverso','2019-10-30'),
('Mei Darkwater','Dragon Ball',2956,'Robô','Atirador','mei.darkwater.230@dragonball.multiverso','2018-08-08'),
('Talos Doomheart','Marvel',1311,'Anti-herói','Atirador','talos.doomheart.231@marvel.multiverso','2018-06-09'),
('Zorath Hollowmark','Anime',9873,'Entidade Cósmica','Metamorfo','zorath.hollowmark.232@anime.multiverso','2022-09-26'),
('Borin Goldspire','Anime',5759,'Entidade Cósmica','Mago','borin.goldspire.233@anime.multiverso','2023-02-25'),
('Lumen Frostmaw','One Piece',5776,'Robô','Psíquico','lumen.frostmaw.234@onepiece.multiverso','2018-01-29'),
('Sael Bloodroot','Bleach',939,'Herói','Psíquico','sael.bloodroot.235@bleach.multiverso','2019-01-28'),
('Nyx Voidborn','Dragon Ball',2621,'Herói','Metamorfo','nyx.voidborn.236@dragonball.multiverso','2024-07-08'),
('Goro Flameheart','Dragon Ball',7179,'Herói','Metamorfo','goro.flameheart.237@dragonball.multiverso','2015-10-03'),
('Selka Stormrider','DC',6001,'Anti-herói','Psíquico','selka.stormrider.238@dc.multiverso','2021-05-12'),
('Sora Emberfall','Marvel',9913,'Vilão','Tanque','sora.emberfall.239@marvel.multiverso','2019-02-28'),
('Dante Nightshade','Star Wars',7273,'Herói','Assassino','dante.nightshade.240@starwars.multiverso','2016-07-17'),
('Talos Moonbreaker','Dragon Ball',6012,'Entidade Cósmica','Espadachim','talos.moonbreaker.241@dragonball.multiverso','2022-04-14'),
('Onyx Frostmaw','Star Wars',4089,'Herói','Mago','onyx.frostmaw.242@starwars.multiverso','2023-04-02'),
('Vael Doomheart','DC',8176,'Robô','Psíquico','vael.doomheart.243@dc.multiverso','2025-03-30'),
('Zel Moonbreaker','Dragon Ball',1929,'Anti-herói','Atirador','zel.moonbreaker.244@dragonball.multiverso','2022-11-23'),
('Vire Bloodroot','Anime',3515,'Robô','Atirador','vire.bloodroot.245@anime.multiverso','2022-10-13'),
('Orin Ashveil','Anime',3279,'Herói','Metamorfo','orin.ashveil.246@anime.multiverso','2024-07-25'),
('Lyra Stonewall','Marvel',7406,'Vilão','Tanque','lyra.stonewall.247@marvel.multiverso','2015-12-26'),
('Borin Emberfall','One Piece',5236,'Anti-herói','Guerreiro','borin.emberfall.248@onepiece.multiverso','2021-03-02'),
('Goro Darkwater','Dragon Ball',4757,'Anti-herói','Metamorfo','goro.darkwater.249@dragonball.multiverso','2022-12-25'),
('Ragnor Wraithborn','Bleach',2852,'Anti-herói','Suporte','ragnor.wraithborn.250@bleach.multiverso','2017-07-07');

INSERT INTO personagem (nome, universo, nivel_poder, tipo, classe, email_contato, data_criacao) VALUES
('Sael Frostmaw','Marvel',3292,'Vilão','Mutante','sael.frostmaw.251@marvel.multiverso','2023-11-12'),
('Ulric Voidborn','Anime',430,'Anti-herói','Suporte','ulric.voidborn.252@anime.multiverso','2021-06-02'),
('Ragnor Doomheart','Star Wars',7657,'Robô','Metamorfo','ragnor.doomheart.253@starwars.multiverso','2021-11-11'),
('Lumen Duskbane','Marvel',1077,'Anti-herói','Psíquico','lumen.duskbane.254@marvel.multiverso','2023-01-15'),
('Lumen Voidborn','Bleach',7842,'Robô','Psíquico','lumen.voidborn.255@bleach.multiverso','2023-08-17'),
('Borin Stormrider','Anime',9419,'Herói','Metamorfo','borin.stormrider.256@anime.multiverso','2018-07-22'),
('Pyra Brightblade','Bleach',1215,'Entidade Cósmica','Tanque','pyra.brightblade.257@bleach.multiverso','2022-08-17'),
('Aetha Sunforge','Dragon Ball',5644,'Vilão','Suporte','aetha.sunforge.258@dragonball.multiverso','2022-03-05'),
('Dante Ravenscar','Dragon Ball',2981,'Vilão','Psíquico','dante.ravenscar.259@dragonball.multiverso','2020-08-21'),
('Asha Brightblade','One Piece',907,'Herói','Suporte','asha.brightblade.260@onepiece.multiverso','2016-09-18'),
('Nyx Flameheart','Star Wars',2697,'Vilão','Espadachim','nyx.flameheart.261@starwars.multiverso','2022-12-15'),
('Nyx Frostmaw','DC',5669,'Robô','Atirador','nyx.frostmaw.262@dc.multiverso','2024-06-26'),
('Kron Thunderhowl','Marvel',4105,'Vilão','Suporte','kron.thunderhowl.263@marvel.multiverso','2018-01-29'),
('Ulric Stonewall','DC',4961,'Robô','Suporte','ulric.stonewall.264@dc.multiverso','2016-01-18'),
('Nova Bloodroot','Dragon Ball',2762,'Robô','Assassino','nova.bloodroot.265@dragonball.multiverso','2016-09-23'),
('Thane Stonewall','DC',9914,'Anti-herói','Assassino','thane.stonewall.266@dc.multiverso','2015-06-18'),
('Ragnor Darkwater','One Piece',464,'Herói','Mago','ragnor.darkwater.267@onepiece.multiverso','2022-03-12'),
('Rixa Frostmaw','One Piece',9449,'Anti-herói','Mutante','rixa.frostmaw.268@onepiece.multiverso','2023-08-08'),
('Mei Sunforge','Dragon Ball',6825,'Robô','Mago','mei.sunforge.269@dragonball.multiverso','2020-08-01'),
('Sora Ironfang','Bleach',8938,'Anti-herói','Atirador','sora.ironfang.270@bleach.multiverso','2020-06-01'),
('Kael Hollowmark','DC',6653,'Anti-herói','Tanque','kael.hollowmark.271@dc.multiverso','2015-10-26'),
('Eira Grimsoul','Bleach',981,'Vilão','Tanque','eira.grimsoul.272@bleach.multiverso','2019-08-30'),
('Tavi Stormrider','Anime',7609,'Vilão','Espadachim','tavi.stormrider.273@anime.multiverso','2021-10-20'),
('Korv Sunforge','DC',5121,'Anti-herói','Espadachim','korv.sunforge.274@dc.multiverso','2019-06-22'),
('Zorath Grimsoul','DC',6070,'Robô','Suporte','zorath.grimsoul.275@dc.multiverso','2016-03-10'),
('Aetha Skyrender','Star Wars',3960,'Entidade Cósmica','Guerreiro','aetha.skyrender.276@starwars.multiverso','2017-12-31'),
('Sora Wraithborn','Anime',4061,'Vilão','Guerreiro','sora.wraithborn.277@anime.multiverso','2015-07-27'),
('Borin Ravenscar','Star Wars',6293,'Robô','Psíquico','borin.ravenscar.278@starwars.multiverso','2017-10-13'),
('Sora Flameheart','One Piece',2616,'Anti-herói','Assassino','sora.flameheart.279@onepiece.multiverso','2023-02-01'),
('Rixa Bloodroot','Star Wars',3110,'Vilão','Tanque','rixa.bloodroot.280@starwars.multiverso','2020-10-09'),
('Zel Duskbane','Anime',8171,'Anti-herói','Tanque','zel.duskbane.281@anime.multiverso','2015-04-05'),
('Zel Flameheart','Marvel',6442,'Robô','Tanque','zel.flameheart.282@marvel.multiverso','2017-09-13'),
('Lumen Brightblade','DC',9557,'Anti-herói','Mago','lumen.brightblade.283@dc.multiverso','2015-07-27'),
('Drax Starweaver','Star Wars',8108,'Robô','Tanque','drax.starweaver.284@starwars.multiverso','2018-03-16'),
('Kron Flameheart','Dragon Ball',133,'Herói','Psíquico','kron.flameheart.285@dragonball.multiverso','2016-07-02'),
('Galen Ironfang','Star Wars',5992,'Entidade Cósmica','Espadachim','galen.ironfang.286@starwars.multiverso','2015-07-05'),
('Rixa Stormrider','Anime',838,'Robô','Suporte','rixa.stormrider.287@anime.multiverso','2017-03-08'),
('Galen Moonbreaker','Star Wars',9064,'Anti-herói','Guerreiro','galen.moonbreaker.288@starwars.multiverso','2019-05-02'),
('Zorath Wraithborn','Dragon Ball',7378,'Robô','Atirador','zorath.wraithborn.289@dragonball.multiverso','2024-04-03'),
('Ulric Grimsoul','Dragon Ball',1946,'Vilão','Guerreiro','ulric.grimsoul.290@dragonball.multiverso','2019-06-02'),
('Goro Brightblade','Star Wars',5555,'Robô','Espadachim','goro.brightblade.291@starwars.multiverso','2023-06-20'),
('Vesh Wraithborn','DC',3261,'Robô','Suporte','vesh.wraithborn.292@dc.multiverso','2019-07-03'),
('Vorn Bloodroot','Dragon Ball',659,'Herói','Mago','vorn.bloodroot.293@dragonball.multiverso','2016-07-15'),
('Rune Duskbane','Bleach',5456,'Entidade Cósmica','Suporte','rune.duskbane.294@bleach.multiverso','2020-02-15'),
('Lumen Ashveil','DC',9932,'Robô','Metamorfo','lumen.ashveil.295@dc.multiverso','2018-09-05'),
('Zorath Ashveil','Dragon Ball',5218,'Vilão','Psíquico','zorath.ashveil.296@dragonball.multiverso','2021-11-30'),
('Ulric Ironfang','Bleach',4902,'Robô','Espadachim','ulric.ironfang.297@bleach.multiverso','2020-09-08'),
('Vorn Skyrender','One Piece',8351,'Robô','Tanque','vorn.skyrender.298@onepiece.multiverso','2022-12-12'),
('Korv Stormrider','Dragon Ball',4911,'Entidade Cósmica','Mago','korv.stormrider.299@dragonball.multiverso','2019-02-17'),
('Zel Emberfall','Star Wars',1795,'Entidade Cósmica','Assassino','zel.emberfall.300@starwars.multiverso','2018-06-14');

INSERT INTO personagem (nome, universo, nivel_poder, tipo, classe, email_contato, data_criacao) VALUES
('Dante Sunforge','One Piece',436,'Robô','Tanque','dante.sunforge.301@onepiece.multiverso','2017-12-23'),
('Goro Ravenscar','Bleach',9477,'Robô','Mutante','goro.ravenscar.302@bleach.multiverso','2023-02-02'),
('Vorn Starweaver','Marvel',9560,'Entidade Cósmica','Metamorfo','vorn.starweaver.303@marvel.multiverso','2020-11-17'),
('Vorn Darkwater','Bleach',6229,'Vilão','Mutante','vorn.darkwater.304@bleach.multiverso','2015-05-10'),
('Nova Ravenscar','Dragon Ball',1800,'Vilão','Mago','nova.ravenscar.305@dragonball.multiverso','2019-12-12'),
('Vael Hollowmark','Star Wars',6861,'Vilão','Psíquico','vael.hollowmark.306@starwars.multiverso','2022-09-29'),
('Zel Grimsoul','DC',6723,'Robô','Assassino','zel.grimsoul.307@dc.multiverso','2025-04-28'),
('Vire Wraithborn','Anime',1020,'Vilão','Suporte','vire.wraithborn.308@anime.multiverso','2017-04-29'),
('Thane Duskbane','Dragon Ball',5325,'Entidade Cósmica','Suporte','thane.duskbane.309@dragonball.multiverso','2019-03-24'),
('Galen Duskbane','Star Wars',2837,'Entidade Cósmica','Suporte','galen.duskbane.310@starwars.multiverso','2018-11-03'),
('Nyx Goldspire','Dragon Ball',5804,'Anti-herói','Assassino','nyx.goldspire.311@dragonball.multiverso','2020-06-06'),
('Ixar Thunderhowl','DC',4038,'Anti-herói','Suporte','ixar.thunderhowl.312@dc.multiverso','2018-05-07'),
('Selka Goldspire','DC',4876,'Anti-herói','Mutante','selka.goldspire.313@dc.multiverso','2022-09-28'),
('Aetha Moonbreaker','Bleach',8011,'Anti-herói','Tanque','aetha.moonbreaker.314@bleach.multiverso','2018-11-29'),
('Borin Flameheart','Dragon Ball',4480,'Anti-herói','Guerreiro','borin.flameheart.315@dragonball.multiverso','2021-06-06'),
('Galen Bloodroot','Bleach',8899,'Entidade Cósmica','Psíquico','galen.bloodroot.316@bleach.multiverso','2024-03-06'),
('Mei Doomheart','Star Wars',2399,'Anti-herói','Mago','mei.doomheart.317@starwars.multiverso','2018-03-24'),
('Mira Skyrender','Bleach',1294,'Anti-herói','Tanque','mira.skyrender.318@bleach.multiverso','2022-05-10'),
('Sora Frostmaw','Star Wars',7849,'Vilão','Mutante','sora.frostmaw.319@starwars.multiverso','2024-04-14'),
('Korv Wraithborn','Dragon Ball',4442,'Robô','Atirador','korv.wraithborn.320@dragonball.multiverso','2016-07-16'),
('Ixar Hollowmark','Marvel',9614,'Vilão','Mutante','ixar.hollowmark.321@marvel.multiverso','2015-07-27'),
('Bran Doomheart','Bleach',8700,'Vilão','Mutante','bran.doomheart.322@bleach.multiverso','2015-08-04'),
('Vire Duskbane','Marvel',6771,'Anti-herói','Tanque','vire.duskbane.323@marvel.multiverso','2016-02-16'),
('Talos Duskbane','Bleach',2252,'Herói','Suporte','talos.duskbane.324@bleach.multiverso','2016-10-08'),
('Borin Voidborn','Anime',7793,'Entidade Cósmica','Mutante','borin.voidborn.325@anime.multiverso','2023-06-24'),
('Vael Flameheart','Star Wars',5262,'Anti-herói','Mago','vael.flameheart.326@starwars.multiverso','2025-03-07'),
('Goro Grimsoul','One Piece',1465,'Robô','Mutante','goro.grimsoul.327@onepiece.multiverso','2020-12-31'),
('Tavi Darkwater','Bleach',611,'Vilão','Psíquico','tavi.darkwater.328@bleach.multiverso','2024-11-22'),
('Mira Starweaver','One Piece',2880,'Herói','Psíquico','mira.starweaver.329@onepiece.multiverso','2023-11-02'),
('Asha Emberfall','Anime',3052,'Anti-herói','Mago','asha.emberfall.330@anime.multiverso','2015-02-07'),
('Sora Voidborn','Star Wars',9305,'Robô','Guerreiro','sora.voidborn.331@starwars.multiverso','2025-05-30'),
('Vorn Brightblade','Star Wars',4662,'Entidade Cósmica','Suporte','vorn.brightblade.332@starwars.multiverso','2020-11-17'),
('Kira Goldspire','Anime',2198,'Robô','Tanque','kira.goldspire.333@anime.multiverso','2018-01-22'),
('Nova Thunderhowl','DC',1845,'Anti-herói','Metamorfo','nova.thunderhowl.334@dc.multiverso','2023-03-14'),
('Bran Darkwater','Anime',4215,'Vilão','Mago','bran.darkwater.335@anime.multiverso','2023-04-06'),
('Ixar Sunforge','Star Wars',4833,'Robô','Mutante','ixar.sunforge.336@starwars.multiverso','2016-12-19'),
('Aetha Starweaver','Dragon Ball',6643,'Entidade Cósmica','Suporte','aetha.starweaver.337@dragonball.multiverso','2018-09-05'),
('Hana Sunforge','Marvel',6567,'Herói','Metamorfo','hana.sunforge.338@marvel.multiverso','2016-07-29'),
('Eira Skyrender','Anime',5301,'Vilão','Mago','eira.skyrender.339@anime.multiverso','2017-12-04'),
('Sael Ashveil','Anime',3858,'Entidade Cósmica','Atirador','sael.ashveil.340@anime.multiverso','2018-09-12'),
('Zorath Ravenscar','Star Wars',9543,'Robô','Mago','zorath.ravenscar.341@starwars.multiverso','2017-12-07'),
('Kron Stormrider','Bleach',5890,'Vilão','Mago','kron.stormrider.342@bleach.multiverso','2022-06-28'),
('Zel Goldspire','Marvel',7625,'Anti-herói','Metamorfo','zel.goldspire.343@marvel.multiverso','2019-07-19'),
('Vorn Doomheart','Bleach',8233,'Anti-herói','Guerreiro','vorn.doomheart.344@bleach.multiverso','2022-03-01'),
('Kael Stonewall','Star Wars',6021,'Robô','Mutante','kael.stonewall.345@starwars.multiverso','2017-06-16'),
('Orin Grimsoul','DC',7834,'Vilão','Tanque','orin.grimsoul.346@dc.multiverso','2023-05-21'),
('Galen Stonewall','Dragon Ball',6121,'Entidade Cósmica','Suporte','galen.stonewall.347@dragonball.multiverso','2025-03-27'),
('Lyra Doomheart','Anime',8806,'Vilão','Mutante','lyra.doomheart.348@anime.multiverso','2022-08-18'),
('Lyra Bloodroot','One Piece',9761,'Herói','Suporte','lyra.bloodroot.349@onepiece.multiverso','2020-01-04'),
('Sora Thunderhowl','Dragon Ball',5927,'Herói','Assassino','sora.thunderhowl.350@dragonball.multiverso','2016-04-04');

INSERT INTO personagem (nome, universo, nivel_poder, tipo, classe, email_contato, data_criacao) VALUES
('Tavi Flameheart','Marvel',8972,'Robô','Mutante','tavi.flameheart.351@marvel.multiverso','2021-06-03'),
('Vorn Stormrider','Dragon Ball',2455,'Vilão','Espadachim','vorn.stormrider.352@dragonball.multiverso','2024-07-31'),
('Zorath Stonewall','Dragon Ball',7239,'Herói','Mutante','zorath.stonewall.353@dragonball.multiverso','2023-01-15'),
('Ragnor Nightshade','Dragon Ball',8008,'Herói','Suporte','ragnor.nightshade.354@dragonball.multiverso','2019-12-30'),
('Kron Doomheart','One Piece',911,'Entidade Cósmica','Metamorfo','kron.doomheart.355@onepiece.multiverso','2020-10-03'),
('Kron Darkwater','Anime',7484,'Robô','Mago','kron.darkwater.356@anime.multiverso','2021-04-07'),
('Vael Nightshade','Anime',5049,'Herói','Psíquico','vael.nightshade.357@anime.multiverso','2017-11-08'),
('Nyx Stonewall','One Piece',49,'Vilão','Assassino','nyx.stonewall.358@onepiece.multiverso','2015-10-27'),
('Selka Voidborn','Marvel',6941,'Anti-herói','Guerreiro','selka.voidborn.359@marvel.multiverso','2021-01-25'),
('Zorath Bloodroot','Marvel',1130,'Entidade Cósmica','Mago','zorath.bloodroot.360@marvel.multiverso','2018-03-21'),
('Nova Moonbreaker','Anime',2948,'Vilão','Psíquico','nova.moonbreaker.361@anime.multiverso','2019-03-14'),
('Drax Thunderhowl','Anime',7348,'Entidade Cósmica','Psíquico','drax.thunderhowl.362@anime.multiverso','2015-11-25'),
('Goro Doomheart','Bleach',8835,'Vilão','Espadachim','goro.doomheart.363@bleach.multiverso','2016-04-30'),
('Mei Goldspire','DC',8802,'Entidade Cósmica','Suporte','mei.goldspire.364@dc.multiverso','2016-06-05'),
('Asha Duskbane','Bleach',3648,'Herói','Mago','asha.duskbane.365@bleach.multiverso','2018-05-07'),
('Vesh Frostmaw','Anime',8920,'Entidade Cósmica','Suporte','vesh.frostmaw.366@anime.multiverso','2019-04-03'),
('Tavi Wraithborn','One Piece',3762,'Vilão','Tanque','tavi.wraithborn.367@onepiece.multiverso','2018-11-18'),
('Talos Hollowmark','DC',4516,'Vilão','Guerreiro','talos.hollowmark.368@dc.multiverso','2015-05-12'),
('Sael Hollowmark','One Piece',6868,'Robô','Mago','sael.hollowmark.369@onepiece.multiverso','2017-09-12'),
('Selka Skyrender','DC',1102,'Herói','Assassino','selka.skyrender.370@dc.multiverso','2015-05-18'),
('Kron Stonewall','Anime',9794,'Herói','Mutante','kron.stonewall.371@anime.multiverso','2023-04-22'),
('Dante Flameheart','Marvel',6590,'Entidade Cósmica','Mutante','dante.flameheart.372@marvel.multiverso','2021-01-19'),
('Sael Ravenscar','DC',924,'Vilão','Suporte','sael.ravenscar.373@dc.multiverso','2018-03-30'),
('Thane Stormrider','DC',9438,'Anti-herói','Assassino','thane.stormrider.374@dc.multiverso','2021-09-15'),
('Lyra Sunforge','One Piece',5253,'Vilão','Atirador','lyra.sunforge.375@onepiece.multiverso','2024-10-29'),
('Hana Brightblade','DC',8540,'Vilão','Psíquico','hana.brightblade.376@dc.multiverso','2018-05-15'),
('Selka Sunforge','Star Wars',998,'Robô','Assassino','selka.sunforge.377@starwars.multiverso','2024-11-12'),
('Mei Starweaver','Bleach',2869,'Entidade Cósmica','Suporte','mei.starweaver.378@bleach.multiverso','2020-07-23'),
('Borin Moonbreaker','Marvel',5642,'Entidade Cósmica','Suporte','borin.moonbreaker.379@marvel.multiverso','2018-07-29'),
('Eira Ashveil','Bleach',6821,'Entidade Cósmica','Metamorfo','eira.ashveil.380@bleach.multiverso','2018-05-13'),
('Selka Hollowmark','Anime',3012,'Robô','Tanque','selka.hollowmark.381@anime.multiverso','2017-09-14'),
('Tavi Brightblade','One Piece',3692,'Anti-herói','Metamorfo','tavi.brightblade.382@onepiece.multiverso','2024-01-14'),
('Korv Grimsoul','Anime',944,'Robô','Psíquico','korv.grimsoul.383@anime.multiverso','2019-09-03'),
('Vire Frostmaw','Dragon Ball',8683,'Vilão','Psíquico','vire.frostmaw.384@dragonball.multiverso','2017-09-21'),
('Lumen Stonewall','Star Wars',3331,'Anti-herói','Guerreiro','lumen.stonewall.385@starwars.multiverso','2025-05-05'),
('Nova Sunforge','Anime',6079,'Herói','Suporte','nova.sunforge.386@anime.multiverso','2023-02-15'),
('Rune Ravenscar','One Piece',3120,'Herói','Atirador','rune.ravenscar.387@onepiece.multiverso','2019-03-25'),
('Orin Sunforge','Bleach',9911,'Robô','Mago','orin.sunforge.388@bleach.multiverso','2024-10-18'),
('Thane Darkwater','Marvel',3082,'Robô','Suporte','thane.darkwater.389@marvel.multiverso','2017-06-07'),
('Orin Doomheart','Anime',3422,'Anti-herói','Atirador','orin.doomheart.390@anime.multiverso','2025-03-12'),
('Nova Darkwater','Marvel',3470,'Vilão','Guerreiro','nova.darkwater.391@marvel.multiverso','2023-05-18'),
('Rixa Sunforge','One Piece',7846,'Vilão','Assassino','rixa.sunforge.392@onepiece.multiverso','2022-11-22'),
('Thane Skyrender','DC',6498,'Vilão','Suporte','thane.skyrender.393@dc.multiverso','2018-08-10'),
('Vesh Skyrender','One Piece',4637,'Entidade Cósmica','Tanque','vesh.skyrender.394@onepiece.multiverso','2020-12-25'),
('Eira Thunderhowl','Bleach',5886,'Anti-herói','Atirador','eira.thunderhowl.395@bleach.multiverso','2019-01-13'),
('Ulric Hollowmark','Dragon Ball',8147,'Entidade Cósmica','Guerreiro','ulric.hollowmark.396@dragonball.multiverso','2024-01-02'),
('Mei Ravenscar','Bleach',7692,'Anti-herói','Mutante','mei.ravenscar.397@bleach.multiverso','2019-02-27'),
('Rixa Emberfall','Star Wars',6781,'Herói','Assassino','rixa.emberfall.398@starwars.multiverso','2024-09-09'),
('Hana Bloodroot','DC',2390,'Herói','Atirador','hana.bloodroot.399@dc.multiverso','2021-03-16'),
('Nyx Bloodroot','Dragon Ball',9488,'Entidade Cósmica','Atirador','nyx.bloodroot.400@dragonball.multiverso','2016-09-16');

INSERT INTO personagem (nome, universo, nivel_poder, tipo, classe, email_contato, data_criacao) VALUES
('Selka Frostmaw','DC',5404,'Vilão','Psíquico','selka.frostmaw.401@dc.multiverso','2021-05-22'),
('Vael Grimsoul','One Piece',4026,'Entidade Cósmica','Suporte','vael.grimsoul.402@onepiece.multiverso','2022-05-05'),
('Mira Ashveil','Bleach',5530,'Anti-herói','Tanque','mira.ashveil.403@bleach.multiverso','2023-02-11'),
('Vesh Nightshade','Bleach',8037,'Entidade Cósmica','Metamorfo','vesh.nightshade.404@bleach.multiverso','2023-03-21'),
('Ulric Starweaver','One Piece',5770,'Vilão','Metamorfo','ulric.starweaver.405@onepiece.multiverso','2023-01-29'),
('Nova Stonewall','Dragon Ball',8000,'Vilão','Suporte','nova.stonewall.406@dragonball.multiverso','2022-03-13'),
('Orin Hollowmark','Marvel',8584,'Herói','Guerreiro','orin.hollowmark.407@marvel.multiverso','2024-03-04'),
('Vesh Brightblade','Bleach',794,'Herói','Psíquico','vesh.brightblade.408@bleach.multiverso','2016-07-17'),
('Orin Stormrider','One Piece',3791,'Herói','Metamorfo','orin.stormrider.409@onepiece.multiverso','2015-02-07'),
('Onyx Stormrider','DC',8285,'Entidade Cósmica','Espadachim','onyx.stormrider.410@dc.multiverso','2015-09-05'),
('Ragnor Goldspire','Dragon Ball',7916,'Entidade Cósmica','Mago','ragnor.goldspire.411@dragonball.multiverso','2015-01-28'),
('Asha Stonewall','Dragon Ball',9038,'Entidade Cósmica','Mago','asha.stonewall.412@dragonball.multiverso','2015-03-10'),
('Vesh Grimsoul','Dragon Ball',4501,'Robô','Atirador','vesh.grimsoul.413@dragonball.multiverso','2015-03-12'),
('Asha Ashveil','Dragon Ball',7054,'Vilão','Guerreiro','asha.ashveil.414@dragonball.multiverso','2025-04-18'),
('Sael Voidborn','Marvel',8591,'Vilão','Mutante','sael.voidborn.415@marvel.multiverso','2017-02-25'),
('Lumen Emberfall','Dragon Ball',8625,'Anti-herói','Espadachim','lumen.emberfall.416@dragonball.multiverso','2017-12-30'),
('Rixa Skyrender','One Piece',6502,'Herói','Espadachim','rixa.skyrender.417@onepiece.multiverso','2019-07-22'),
('Borin Sunforge','Anime',9256,'Vilão','Mutante','borin.sunforge.418@anime.multiverso','2018-05-13'),
('Bran Moonbreaker','Bleach',1320,'Herói','Guerreiro','bran.moonbreaker.419@bleach.multiverso','2019-07-19'),
('Borin Ironfang','Anime',6179,'Robô','Tanque','borin.ironfang.420@anime.multiverso','2015-08-18'),
('Rune Starweaver','Bleach',154,'Vilão','Guerreiro','rune.starweaver.421@bleach.multiverso','2020-08-09'),
('Bran Stormrider','One Piece',7109,'Anti-herói','Assassino','bran.stormrider.422@onepiece.multiverso','2024-08-15'),
('Thane Frostmaw','Marvel',8653,'Herói','Mutante','thane.frostmaw.423@marvel.multiverso','2017-05-15'),
('Kael Flameheart','One Piece',9286,'Entidade Cósmica','Atirador','kael.flameheart.424@onepiece.multiverso','2015-07-10'),
('Thane Goldspire','Marvel',4593,'Robô','Assassino','thane.goldspire.425@marvel.multiverso','2022-05-19'),
('Lyra Voidborn','Marvel',2938,'Anti-herói','Mago','lyra.voidborn.426@marvel.multiverso','2017-04-28'),
('Aetha Grimsoul','Dragon Ball',2362,'Entidade Cósmica','Guerreiro','aetha.grimsoul.427@dragonball.multiverso','2018-05-10'),
('Eira Doomheart','DC',9239,'Vilão','Assassino','eira.doomheart.428@dc.multiverso','2024-05-11'),
('Kira Darkwater','One Piece',6375,'Robô','Espadachim','kira.darkwater.429@onepiece.multiverso','2019-04-22'),
('Nyx Duskbane','One Piece',2292,'Herói','Suporte','nyx.duskbane.430@onepiece.multiverso','2023-05-12'),
('Aetha Flameheart','Star Wars',879,'Herói','Psíquico','aetha.flameheart.431@starwars.multiverso','2017-08-08'),
('Vire Nightshade','One Piece',1245,'Anti-herói','Assassino','vire.nightshade.432@onepiece.multiverso','2023-08-16'),
('Selka Moonbreaker','Dragon Ball',9758,'Entidade Cósmica','Espadachim','selka.moonbreaker.433@dragonball.multiverso','2015-05-02'),
('Sora Goldspire','Bleach',4478,'Entidade Cósmica','Tanque','sora.goldspire.434@bleach.multiverso','2017-07-23'),
('Vire Darkwater','Star Wars',9060,'Entidade Cósmica','Psíquico','vire.darkwater.435@starwars.multiverso','2017-01-30'),
('Ragnor Emberfall','Bleach',9598,'Entidade Cósmica','Guerreiro','ragnor.emberfall.436@bleach.multiverso','2023-08-29'),
('Ixar Doomheart','Dragon Ball',4839,'Vilão','Guerreiro','ixar.doomheart.437@dragonball.multiverso','2015-12-03'),
('Rune Moonbreaker','Star Wars',2526,'Entidade Cósmica','Metamorfo','rune.moonbreaker.438@starwars.multiverso','2023-04-18'),
('Vael Voidborn','Anime',5188,'Anti-herói','Guerreiro','vael.voidborn.439@anime.multiverso','2016-01-10'),
('Bran Duskbane','Marvel',5050,'Entidade Cósmica','Espadachim','bran.duskbane.440@marvel.multiverso','2023-07-16'),
('Ulric Brightblade','Star Wars',1674,'Vilão','Guerreiro','ulric.brightblade.441@starwars.multiverso','2017-02-06'),
('Aetha Frostmaw','Anime',7353,'Robô','Suporte','aetha.frostmaw.442@anime.multiverso','2020-09-29'),
('Asha Voidborn','Anime',1692,'Herói','Guerreiro','asha.voidborn.443@anime.multiverso','2018-12-20'),
('Goro Wraithborn','Dragon Ball',1524,'Robô','Assassino','goro.wraithborn.444@dragonball.multiverso','2023-10-19'),
('Korv Skyrender','Star Wars',6311,'Herói','Atirador','korv.skyrender.445@starwars.multiverso','2019-08-22'),
('Kael Thunderhowl','Anime',1387,'Robô','Mutante','kael.thunderhowl.446@anime.multiverso','2021-05-31'),
('Ixar Emberfall','Dragon Ball',2778,'Entidade Cósmica','Metamorfo','ixar.emberfall.447@dragonball.multiverso','2016-07-22'),
('Hana Moonbreaker','Star Wars',4933,'Anti-herói','Tanque','hana.moonbreaker.448@starwars.multiverso','2016-08-20'),
('Dante Stonewall','Marvel',2739,'Entidade Cósmica','Atirador','dante.stonewall.449@marvel.multiverso','2019-09-21'),
('Ulric Goldspire','Star Wars',7933,'Herói','Espadachim','ulric.goldspire.450@starwars.multiverso','2017-10-27');

INSERT INTO personagem (nome, universo, nivel_poder, tipo, classe, email_contato, data_criacao) VALUES
('Orin Brightblade','DC',8123,'Robô','Assassino','orin.brightblade.451@dc.multiverso','2017-03-11'),
('Nyx Skyrender','Anime',1752,'Vilão','Atirador','nyx.skyrender.452@anime.multiverso','2015-01-28'),
('Kron Moonbreaker','Anime',5443,'Robô','Psíquico','kron.moonbreaker.453@anime.multiverso','2024-01-07'),
('Orin Moonbreaker','One Piece',5399,'Entidade Cósmica','Espadachim','orin.moonbreaker.454@onepiece.multiverso','2019-10-30'),
('Orin Ironfang','One Piece',9738,'Vilão','Atirador','orin.ironfang.455@onepiece.multiverso','2018-08-06'),
('Sora Sunforge','Dragon Ball',3290,'Entidade Cósmica','Espadachim','sora.sunforge.456@dragonball.multiverso','2016-12-28'),
('Zorath Sunforge','Anime',5228,'Anti-herói','Tanque','zorath.sunforge.457@anime.multiverso','2021-06-16'),
('Vael Frostmaw','One Piece',3971,'Anti-herói','Psíquico','vael.frostmaw.458@onepiece.multiverso','2018-02-22'),
('Hana Ironfang','One Piece',6437,'Anti-herói','Guerreiro','hana.ironfang.459@onepiece.multiverso','2021-04-28'),
('Asha Hollowmark','DC',9703,'Robô','Metamorfo','asha.hollowmark.460@dc.multiverso','2022-08-24'),
('Eira Darkwater','One Piece',9012,'Herói','Tanque','eira.darkwater.461@onepiece.multiverso','2022-12-11'),
('Lyra Ironfang','DC',7183,'Anti-herói','Guerreiro','lyra.ironfang.462@dc.multiverso','2024-03-08'),
('Vesh Voidborn','One Piece',6703,'Entidade Cósmica','Metamorfo','vesh.voidborn.463@onepiece.multiverso','2022-02-07'),
('Goro Sunforge','Star Wars',3965,'Anti-herói','Metamorfo','goro.sunforge.464@starwars.multiverso','2023-01-08'),
('Nova Wraithborn','Anime',6176,'Herói','Tanque','nova.wraithborn.465@anime.multiverso','2021-09-15'),
('Lyra Skyrender','Anime',9539,'Entidade Cósmica','Suporte','lyra.skyrender.466@anime.multiverso','2020-09-06'),
('Pyra Skyrender','One Piece',6853,'Robô','Mago','pyra.skyrender.467@onepiece.multiverso','2023-11-13'),
('Sora Stonewall','Star Wars',8796,'Robô','Guerreiro','sora.stonewall.468@starwars.multiverso','2016-03-23'),
('Bran Flameheart','One Piece',4067,'Anti-herói','Metamorfo','bran.flameheart.469@onepiece.multiverso','2022-04-04'),
('Rune Sunforge','Dragon Ball',725,'Robô','Psíquico','rune.sunforge.470@dragonball.multiverso','2023-06-10'),
('Ragnor Sunforge','Star Wars',7052,'Herói','Mago','ragnor.sunforge.471@starwars.multiverso','2016-02-08'),
('Nova Grimsoul','Star Wars',3637,'Robô','Suporte','nova.grimsoul.472@starwars.multiverso','2021-04-04'),
('Tavi Frostmaw','Dragon Ball',9424,'Vilão','Tanque','tavi.frostmaw.473@dragonball.multiverso','2019-03-13'),
('Dante Hollowmark','Anime',7586,'Robô','Suporte','dante.hollowmark.474@anime.multiverso','2016-09-09'),
('Mei Voidborn','Star Wars',402,'Entidade Cósmica','Guerreiro','mei.voidborn.475@starwars.multiverso','2018-04-25'),
('Lyra Wraithborn','Anime',1406,'Herói','Metamorfo','lyra.wraithborn.476@anime.multiverso','2018-11-27'),
('Nova Starweaver','Star Wars',5620,'Entidade Cósmica','Mutante','nova.starweaver.477@starwars.multiverso','2020-11-04'),
('Kira Grimsoul','Anime',5706,'Entidade Cósmica','Guerreiro','kira.grimsoul.478@anime.multiverso','2019-11-30'),
('Ulric Darkwater','Bleach',7412,'Anti-herói','Guerreiro','ulric.darkwater.479@bleach.multiverso','2018-05-14'),
('Kira Thunderhowl','Marvel',1885,'Herói','Espadachim','kira.thunderhowl.480@marvel.multiverso','2022-04-08'),
('Eira Nightshade','Marvel',2692,'Vilão','Suporte','eira.nightshade.481@marvel.multiverso','2016-12-15'),
('Bran Skyrender','Dragon Ball',2623,'Anti-herói','Suporte','bran.skyrender.482@dragonball.multiverso','2019-10-13'),
('Vesh Stonewall','Anime',3798,'Entidade Cósmica','Metamorfo','vesh.stonewall.483@anime.multiverso','2017-02-02'),
('Sora Bloodroot','Bleach',7080,'Entidade Cósmica','Mago','sora.bloodroot.484@bleach.multiverso','2023-04-09'),
('Sael Darkwater','Dragon Ball',3232,'Entidade Cósmica','Assassino','sael.darkwater.485@dragonball.multiverso','2019-10-26'),
('Vorn Moonbreaker','Anime',72,'Vilão','Mutante','vorn.moonbreaker.486@anime.multiverso','2018-02-14'),
('Tavi Grimsoul','One Piece',1025,'Robô','Guerreiro','tavi.grimsoul.487@onepiece.multiverso','2023-12-19'),
('Vael Stonewall','One Piece',8796,'Vilão','Espadachim','vael.stonewall.488@onepiece.multiverso','2018-08-28'),
('Lumen Moonbreaker','DC',7496,'Herói','Atirador','lumen.moonbreaker.489@dc.multiverso','2022-07-10'),
('Thane Nightshade','One Piece',8019,'Robô','Espadachim','thane.nightshade.490@onepiece.multiverso','2021-09-11'),
('Vesh Starweaver','Anime',6431,'Robô','Guerreiro','vesh.starweaver.491@anime.multiverso','2018-11-26'),
('Asha Darkwater','Star Wars',7501,'Robô','Metamorfo','asha.darkwater.492@starwars.multiverso','2024-02-16'),
('Eira Goldspire','Bleach',4873,'Robô','Assassino','eira.goldspire.493@bleach.multiverso','2015-12-14'),
('Thane Doomheart','Bleach',2194,'Anti-herói','Guerreiro','thane.doomheart.494@bleach.multiverso','2017-09-04'),
('Sora Moonbreaker','Star Wars',1916,'Vilão','Espadachim','sora.moonbreaker.495@starwars.multiverso','2022-10-11'),
('Asha Wraithborn','DC',8369,'Entidade Cósmica','Psíquico','asha.wraithborn.496@dc.multiverso','2021-09-08'),
('Thane Starweaver','DC',9417,'Entidade Cósmica','Psíquico','thane.starweaver.497@dc.multiverso','2017-01-30'),
('Lumen Wraithborn','Anime',8804,'Vilão','Suporte','lumen.wraithborn.498@anime.multiverso','2016-11-14'),
('Drax Bloodroot','Anime',4732,'Vilão','Metamorfo','drax.bloodroot.499@anime.multiverso','2018-07-12'),
('Kael Darkwater','One Piece',7389,'Robô','Mago','kael.darkwater.500@onepiece.multiverso','2024-09-15');

INSERT INTO personagem (nome, universo, nivel_poder, tipo, classe, email_contato, data_criacao) VALUES
('Eira Bloodroot','Star Wars',157,'Entidade Cósmica','Metamorfo','eira.bloodroot.501@starwars.multiverso','2017-03-10'),
('Kira Bloodroot','One Piece',6290,'Robô','Suporte','kira.bloodroot.502@onepiece.multiverso','2022-04-28'),
('Drax Goldspire','Anime',6703,'Entidade Cósmica','Psíquico','drax.goldspire.503@anime.multiverso','2022-12-18'),
('Dante Grimsoul','One Piece',7272,'Entidade Cósmica','Metamorfo','dante.grimsoul.504@onepiece.multiverso','2015-12-05'),
('Dante Voidborn','Dragon Ball',505,'Vilão','Atirador','dante.voidborn.505@dragonball.multiverso','2015-05-14'),
('Vael Bloodroot','Star Wars',3683,'Robô','Atirador','vael.bloodroot.506@starwars.multiverso','2016-11-19'),
('Mei Bloodroot','One Piece',7492,'Robô','Tanque','mei.bloodroot.507@onepiece.multiverso','2021-03-01'),
('Kira Hollowmark','Dragon Ball',1854,'Robô','Guerreiro','kira.hollowmark.508@dragonball.multiverso','2018-01-02'),
('Vorn Voidborn','One Piece',8898,'Anti-herói','Suporte','vorn.voidborn.509@onepiece.multiverso','2024-03-23'),
('Orin Skyrender','One Piece',681,'Entidade Cósmica','Suporte','orin.skyrender.510@onepiece.multiverso','2017-06-14'),
('Bran Brightblade','Anime',1677,'Vilão','Atirador','bran.brightblade.511@anime.multiverso','2024-10-23'),
('Asha Stormrider','Marvel',7368,'Anti-herói','Espadachim','asha.stormrider.512@marvel.multiverso','2024-09-01'),
('Rune Wraithborn','One Piece',1425,'Entidade Cósmica','Guerreiro','rune.wraithborn.513@onepiece.multiverso','2023-09-12'),
('Zel Stormrider','One Piece',3882,'Vilão','Assassino','zel.stormrider.514@onepiece.multiverso','2022-09-23'),
('Lyra Frostmaw','Star Wars',9998,'Entidade Cósmica','Metamorfo','lyra.frostmaw.515@starwars.multiverso','2021-11-28'),
('Bran Nightshade','DC',3385,'Vilão','Mago','bran.nightshade.516@dc.multiverso','2021-05-24'),
('Hana Starweaver','Star Wars',8720,'Anti-herói','Assassino','hana.starweaver.517@starwars.multiverso','2021-01-15'),
('Lumen Starweaver','DC',5302,'Anti-herói','Atirador','lumen.starweaver.518@dc.multiverso','2021-06-03'),
('Mei Skyrender','Star Wars',8428,'Herói','Metamorfo','mei.skyrender.519@starwars.multiverso','2023-05-31'),
('Tavi Moonbreaker','One Piece',6743,'Herói','Atirador','tavi.moonbreaker.520@onepiece.multiverso','2024-09-21'),
('Kron Nightshade','Bleach',2078,'Vilão','Mutante','kron.nightshade.521@bleach.multiverso','2016-08-22'),
('Zorath Goldspire','Bleach',5277,'Vilão','Psíquico','zorath.goldspire.522@bleach.multiverso','2020-06-27'),
('Vorn Hollowmark','DC',9460,'Anti-herói','Psíquico','vorn.hollowmark.523@dc.multiverso','2019-03-17'),
('Kira Emberfall','Anime',1237,'Herói','Psíquico','kira.emberfall.524@anime.multiverso','2020-10-12'),
('Selka Grimsoul','Bleach',4558,'Anti-herói','Tanque','selka.grimsoul.525@bleach.multiverso','2020-06-22'),
('Pyra Wraithborn','Star Wars',9534,'Herói','Guerreiro','pyra.wraithborn.526@starwars.multiverso','2023-03-13'),
('Zorath Darkwater','Anime',5869,'Herói','Suporte','zorath.darkwater.527@anime.multiverso','2019-06-18'),
('Selka Emberfall','DC',7039,'Vilão','Tanque','selka.emberfall.528@dc.multiverso','2018-01-04'),
('Ulric Ashveil','Star Wars',4646,'Anti-herói','Suporte','ulric.ashveil.529@starwars.multiverso','2021-06-25'),
('Rune Voidborn','DC',9275,'Entidade Cósmica','Espadachim','rune.voidborn.530@dc.multiverso','2025-01-10'),
('Mei Nightshade','Bleach',793,'Herói','Guerreiro','mei.nightshade.531@bleach.multiverso','2022-01-08'),
('Kira Doomheart','One Piece',7529,'Herói','Guerreiro','kira.doomheart.532@onepiece.multiverso','2024-08-13'),
('Kira Skyrender','DC',7230,'Entidade Cósmica','Mago','kira.skyrender.533@dc.multiverso','2019-10-19'),
('Rune Frostmaw','DC',2161,'Anti-herói','Metamorfo','rune.frostmaw.534@dc.multiverso','2024-10-21'),
('Borin Brightblade','Star Wars',1529,'Anti-herói','Atirador','borin.brightblade.535@starwars.multiverso','2015-12-04'),
('Vorn Ravenscar','Star Wars',2711,'Herói','Psíquico','vorn.ravenscar.536@starwars.multiverso','2022-01-06'),
('Vesh Doomheart','Star Wars',3836,'Entidade Cósmica','Guerreiro','vesh.doomheart.537@starwars.multiverso','2022-11-22'),
('Pyra Voidborn','Marvel',17,'Vilão','Tanque','pyra.voidborn.538@marvel.multiverso','2015-11-16'),
('Zorath Duskbane','DC',9726,'Vilão','Suporte','zorath.duskbane.539@dc.multiverso','2022-08-17'),
('Borin Bloodroot','Anime',152,'Herói','Espadachim','borin.bloodroot.540@anime.multiverso','2024-02-29'),
('Asha Nightshade','Marvel',6919,'Vilão','Tanque','asha.nightshade.541@marvel.multiverso','2015-10-18'),
('Tavi Skyrender','DC',6276,'Herói','Guerreiro','tavi.skyrender.542@dc.multiverso','2016-02-27'),
('Mira Brightblade','Star Wars',6022,'Anti-herói','Metamorfo','mira.brightblade.543@starwars.multiverso','2019-04-17'),
('Ulric Stormrider','One Piece',2181,'Vilão','Guerreiro','ulric.stormrider.544@onepiece.multiverso','2020-12-12'),
('Tavi Hollowmark','Dragon Ball',138,'Robô','Metamorfo','tavi.hollowmark.545@dragonball.multiverso','2019-12-08'),
('Vire Voidborn','Star Wars',3490,'Vilão','Psíquico','vire.voidborn.546@starwars.multiverso','2021-11-28'),
('Tavi Thunderhowl','Bleach',7248,'Vilão','Guerreiro','tavi.thunderhowl.547@bleach.multiverso','2025-01-20'),
('Eira Moonbreaker','Marvel',2293,'Herói','Assassino','eira.moonbreaker.548@marvel.multiverso','2023-03-10'),
('Vesh Ashveil','Anime',5759,'Entidade Cósmica','Espadachim','vesh.ashveil.549@anime.multiverso','2023-11-15'),
('Eira Stonewall','DC',4059,'Anti-herói','Guerreiro','eira.stonewall.550@dc.multiverso','2017-10-13');

INSERT INTO personagem (nome, universo, nivel_poder, tipo, classe, email_contato, data_criacao) VALUES
('Aetha Stormrider','Dragon Ball',9846,'Robô','Assassino','aetha.stormrider.551@dragonball.multiverso','2018-03-13'),
('Borin Thunderhowl','One Piece',439,'Anti-herói','Mutante','borin.thunderhowl.552@onepiece.multiverso','2020-10-21'),
('Vire Sunforge','Dragon Ball',8348,'Vilão','Psíquico','vire.sunforge.553@dragonball.multiverso','2018-04-25'),
('Lyra Ravenscar','Bleach',894,'Vilão','Tanque','lyra.ravenscar.554@bleach.multiverso','2019-04-30'),
('Lyra Flameheart','Marvel',3949,'Entidade Cósmica','Assassino','lyra.flameheart.555@marvel.multiverso','2015-10-18'),
('Tavi Ravenscar','Dragon Ball',197,'Anti-herói','Espadachim','tavi.ravenscar.556@dragonball.multiverso','2016-06-24'),
('Vorn Wraithborn','Anime',9312,'Entidade Cósmica','Espadachim','vorn.wraithborn.557@anime.multiverso','2021-02-15'),
('Lyra Hollowmark','Bleach',2830,'Entidade Cósmica','Guerreiro','lyra.hollowmark.558@bleach.multiverso','2015-03-10'),
('Aetha Goldspire','Dragon Ball',1106,'Herói','Atirador','aetha.goldspire.559@dragonball.multiverso','2017-06-02'),
('Kael Emberfall','Marvel',990,'Entidade Cósmica','Suporte','kael.emberfall.560@marvel.multiverso','2018-03-19'),
('Pyra Bloodroot','Bleach',8209,'Entidade Cósmica','Psíquico','pyra.bloodroot.561@bleach.multiverso','2022-11-14'),
('Aetha Duskbane','Anime',1350,'Robô','Suporte','aetha.duskbane.562@anime.multiverso','2021-11-28'),
('Galen Brightblade','DC',4546,'Herói','Atirador','galen.brightblade.563@dc.multiverso','2015-11-20'),
('Onyx Doomheart','Dragon Ball',3329,'Vilão','Suporte','onyx.doomheart.564@dragonball.multiverso','2018-08-31'),
('Korv Frostmaw','Anime',9608,'Herói','Atirador','korv.frostmaw.565@anime.multiverso','2022-11-01'),
('Aetha Nightshade','Anime',3909,'Herói','Mutante','aetha.nightshade.566@anime.multiverso','2015-12-20'),
('Lumen Goldspire','Anime',1900,'Entidade Cósmica','Assassino','lumen.goldspire.567@anime.multiverso','2021-10-29'),
('Ulric Sunforge','Marvel',5067,'Vilão','Guerreiro','ulric.sunforge.568@marvel.multiverso','2015-02-21'),
('Vire Emberfall','Bleach',2248,'Herói','Metamorfo','vire.emberfall.569@bleach.multiverso','2020-07-26'),
('Vesh Duskbane','Star Wars',8568,'Robô','Atirador','vesh.duskbane.570@starwars.multiverso','2016-11-14'),
('Zel Darkwater','Star Wars',2079,'Anti-herói','Guerreiro','zel.darkwater.571@starwars.multiverso','2023-08-26'),
('Mei Hollowmark','Marvel',5488,'Entidade Cósmica','Atirador','mei.hollowmark.572@marvel.multiverso','2020-11-15'),
('Thane Thunderhowl','Marvel',4308,'Robô','Guerreiro','thane.thunderhowl.573@marvel.multiverso','2020-07-25'),
('Asha Ravenscar','Anime',8368,'Anti-herói','Mago','asha.ravenscar.574@anime.multiverso','2020-08-08'),
('Rixa Flameheart','One Piece',9287,'Vilão','Espadachim','rixa.flameheart.575@onepiece.multiverso','2016-10-06'),
('Drax Nightshade','Star Wars',1685,'Robô','Guerreiro','drax.nightshade.576@starwars.multiverso','2017-07-24'),
('Lyra Starweaver','Bleach',8336,'Herói','Mago','lyra.starweaver.577@bleach.multiverso','2024-08-18'),
('Mei Stormrider','One Piece',201,'Vilão','Mago','mei.stormrider.578@onepiece.multiverso','2020-04-16'),
('Hana Doomheart','Star Wars',6274,'Vilão','Metamorfo','hana.doomheart.579@starwars.multiverso','2024-08-13'),
('Kael Frostmaw','Marvel',9058,'Entidade Cósmica','Mutante','kael.frostmaw.580@marvel.multiverso','2018-08-11'),
('Drax Ironfang','DC',6819,'Anti-herói','Atirador','drax.ironfang.581@dc.multiverso','2024-04-06'),
('Sael Duskbane','Marvel',9364,'Anti-herói','Guerreiro','sael.duskbane.582@marvel.multiverso','2020-08-18'),
('Orin Darkwater','Bleach',862,'Vilão','Mutante','orin.darkwater.583@bleach.multiverso','2024-01-08'),
('Aetha Bloodroot','Dragon Ball',752,'Entidade Cósmica','Guerreiro','aetha.bloodroot.584@dragonball.multiverso','2024-11-01'),
('Vorn Thunderhowl','Anime',4625,'Anti-herói','Espadachim','vorn.thunderhowl.585@anime.multiverso','2015-12-20'),
('Hana Grimsoul','Dragon Ball',7483,'Herói','Espadachim','hana.grimsoul.586@dragonball.multiverso','2017-04-01'),
('Asha Starweaver','Star Wars',9237,'Anti-herói','Assassino','asha.starweaver.587@starwars.multiverso','2017-09-20'),
('Nyx Brightblade','Anime',6033,'Robô','Tanque','nyx.brightblade.588@anime.multiverso','2023-08-31'),
('Vire Stormrider','One Piece',3201,'Robô','Mutante','vire.stormrider.589@onepiece.multiverso','2016-09-08'),
('Eira Wraithborn','Marvel',6718,'Herói','Mutante','eira.wraithborn.590@marvel.multiverso','2021-01-27'),
('Borin Nightshade','Star Wars',157,'Anti-herói','Mago','borin.nightshade.591@starwars.multiverso','2023-07-06'),
('Hana Goldspire','Bleach',6164,'Anti-herói','Guerreiro','hana.goldspire.592@bleach.multiverso','2017-04-20'),
('Rixa Grimsoul','Dragon Ball',3902,'Entidade Cósmica','Tanque','rixa.grimsoul.593@dragonball.multiverso','2015-09-03'),
('Mei Ironfang','DC',4584,'Herói','Mago','mei.ironfang.594@dc.multiverso','2025-05-01'),
('Onyx Moonbreaker','DC',8515,'Entidade Cósmica','Espadachim','onyx.moonbreaker.595@dc.multiverso','2020-02-21'),
('Drax Sunforge','Bleach',1391,'Robô','Guerreiro','drax.sunforge.596@bleach.multiverso','2020-09-01'),
('Zorath Moonbreaker','DC',6461,'Herói','Assassino','zorath.moonbreaker.597@dc.multiverso','2021-05-14'),
('Mei Moonbreaker','Marvel',7126,'Vilão','Mutante','mei.moonbreaker.598@marvel.multiverso','2018-04-09'),
('Hana Voidborn','Star Wars',5161,'Entidade Cósmica','Espadachim','hana.voidborn.599@starwars.multiverso','2018-07-26'),
('Mei Grimsoul','Anime',4455,'Vilão','Guerreiro','mei.grimsoul.600@anime.multiverso','2017-04-10');



-- ============================================================================
-- PARTE 3: SEGURANÇA -- USUÁRIO LIMITADO NO MYSQL  (Seção 2 da atividade)
-- ----------------------------------------------------------------------------
-- Cria o usuário app_heroi com APENAS as permissões necessárias para o
-- sistema funcionar (SELECT, INSERT, UPDATE). NÃO recebe permissão de DELETE.
-- ============================================================================

CREATE USER IF NOT EXISTS 'app_heroi'@'localhost' IDENTIFIED BY 'Multiverso@2025';

-- Permissões mínimas (repare: sem DELETE e sem DROP/ALTER)
GRANT SELECT, INSERT, UPDATE ON multiverso.* TO 'app_heroi'@'localhost';
FLUSH PRIVILEGES;

-- Conferir o que foi concedido:
SHOW GRANTS FOR 'app_heroi'@'localhost';

-- ----------------------------------------------------------------------------
-- TESTE DE SEGURANÇA (executar logado COMO app_heroi):
--     mysql -u app_heroi -p multiverso
--     DELETE FROM personagem WHERE idpersonagem = 1;
--
-- Resultado obtido (comprovando que o DELETE é bloqueado):
--     ERROR 1142 (42000): DELETE command denied to user
--     'app_heroi'@'localhost' for table 'personagem'
--
-- Já SELECT/INSERT/UPDATE funcionam normalmente para esse usuário.
-- ----------------------------------------------------------------------------


-- ============================================================================
-- PARTE 4: OTIMIZAÇÃO COM ÍNDICES + CONSULTAS COM EXPLAIN (Seções 4 e 5)
-- ----------------------------------------------------------------------------
-- Duas colunas principais escolhidas para indexar (Seção 4):
--     1) email_contato  -> busca por igualdade (alta seletividade)
--     2) nivel_poder    -> ordenação/ranking dos personagens
-- Também indexamos universo e tipo para otimizar as demais consultas da Seção 5.
--
-- Metodologia: rodar EXPLAIN ANTES, criar os índices, rodar EXPLAIN DEPOIS.
-- ============================================================================

-- ------- 4.1  EXPLAIN ANTES DOS ÍNDICES -------------------------------------
-- (resultado de cada consulta anotado logo abaixo dela)

-- Questão 1: buscar personagem por email
EXPLAIN SELECT * FROM personagem WHERE email_contato = 'ragnor.moonbreaker.1@anime.multiverso';
-- ANTES -> type: ALL | key: NULL | rows: 600 | Extra: Using where  (varredura total)

-- Questão 2: buscar todos do universo "DC"
EXPLAIN SELECT * FROM personagem WHERE universo = 'DC';
-- ANTES -> type: ALL | key: NULL | rows: 600 | Extra: Using where

-- Questão 3: buscar por tipo "Vilão"
EXPLAIN SELECT * FROM personagem WHERE tipo = 'Vilão';
-- ANTES -> type: ALL | key: NULL | rows: 600 | Extra: Using where

-- Questão 4: listar ordenando por nível de poder (Top 10 mais fortes)
EXPLAIN SELECT idpersonagem, nivel_poder FROM personagem ORDER BY nivel_poder DESC LIMIT 10;
-- ANTES -> type: ALL | key: NULL | rows: 600 | Extra: Using filesort  (ordenação na memória)


-- ------- 4.2  CRIAÇÃO DOS ÍNDICES -------------------------------------------
CREATE INDEX idx_email_contato ON personagem(email_contato);
CREATE INDEX idx_nivel_poder   ON personagem(nivel_poder);
CREATE INDEX idx_universo      ON personagem(universo);
CREATE INDEX idx_tipo          ON personagem(tipo);

-- Atualiza as estatísticas para o otimizador enxergar bem os índices
ANALYZE TABLE personagem;


-- ------- 4.3  EXPLAIN DEPOIS DOS ÍNDICES ------------------------------------

-- Questão 1: buscar personagem por email
EXPLAIN SELECT * FROM personagem WHERE email_contato = 'ragnor.moonbreaker.1@anime.multiverso';
-- DEPOIS -> type: ref | key: idx_email_contato | rows: 1     (acesso direto)

-- Questão 2: buscar todos do universo "DC"
EXPLAIN SELECT * FROM personagem WHERE universo = 'DC';
-- DEPOIS -> type: ref | key: idx_universo | rows: 77

-- Questão 3: buscar por tipo "Vilão"
EXPLAIN SELECT * FROM personagem WHERE tipo = 'Vilão';
-- DEPOIS -> type: ref | key: idx_tipo | rows: 120

-- Questão 4: listar ordenando por nível de poder (Top 10 mais fortes)
EXPLAIN SELECT idpersonagem, nivel_poder FROM personagem ORDER BY nivel_poder DESC LIMIT 10;
-- DEPOIS -> type: index | key: idx_nivel_poder | rows: 10
--           Extra: Backward index scan; Using index  (acabou o filesort!)


-- ------- 4.4  ANOTAÇÕES: O QUE MUDOU ----------------------------------------
-- * Email   : de varredura total (type=ALL, 600 linhas) para acesso direto
--             (type=ref, 1 linha). Ganho enorme em busca por igualdade.
-- * Universo: de ALL/600 para ref/77 linhas usando idx_universo.
-- * Tipo    : de ALL/600 para ref/120 linhas usando idx_tipo.
-- * Nível   : a ordenação deixou de usar "Using filesort"; agora o MySQL lê
--             direto do índice (Backward index scan), bem mais rápido.
-- Conclusão: sem índice o banco lê a tabela inteira; com índice ele vai
-- direto nos registros, reduzindo drasticamente as linhas examinadas.


-- ============================================================================
-- PARTE 5: BACKUP DO MULTIVERSO (Seção 6) -- comandos de terminal
-- ----------------------------------------------------------------------------
-- Estes comandos NÃO rodam dentro do editor SQL; são executados no terminal
-- (PowerShell no Windows). Use o caminho completo do MySQL Server 8.0.
--
-- 1) Gerar o backup (dump) do banco multiverso:
--    & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump.exe" ^
--        -u root -p --no-tablespaces --routines --triggers ^
--        --result-file="C:\caminho\Arthur_Silva_Atividade02_dump.sql" multiverso
--
--    (usar --result-file evita o problema de encoding UTF-16 do ">" no PowerShell)
--
-- 2) Criar o banco vazio de destino:
--    CREATE DATABASE multiverso_restaurado
--        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
--
-- 3) Restaurar o dump dentro dele (dentro do cliente mysql, sem redirecionamento):
--    mysql -u root -p
--    USE multiverso_restaurado;
--    SOURCE C:/caminho/Arthur_Silva_Atividade02_dump.sql;
--
-- 4) Conferir:
--    SELECT COUNT(*) FROM multiverso_restaurado.personagem;   -- deve retornar 600
-- ============================================================================
-- FIM DO SCRIPT
