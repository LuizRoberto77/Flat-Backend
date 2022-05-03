-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 19-Abr-2022 às 18:12
-- Versão do servidor: 10.4.21-MariaDB
-- versão do PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `db_flat`
--

CREATE DATABASE db_flat;
USE db_flat;
-- --------------------------------------------------------

--
-- Estrutura da tabela `flat`
--

CREATE TABLE `flat` (
  `idFlat` varchar(16) NOT NULL,
  `numberFlat` int(11) NOT NULL,
  `statusFlat` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `guest`
--

CREATE TABLE `guest` (
  `idGuest` varchar(16) NOT NULL,
  `idPerson` varchar(16) NOT NULL,
  `checkin` date NOT NULL,
  `checkout` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `guest`
--

INSERT INTO `guest` (`idGuest`, `idPerson`, `checkin`, `checkout`) VALUES
('1', '2', '2022-04-15', '2022-04-18'),
('2', '4', '2022-04-01', '2022-04-02');

-- --------------------------------------------------------

--
-- Estrutura da tabela `person`
--

CREATE TABLE `person` (
  `idPerson` varchar(16) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `document` varchar(11) NOT NULL,
  `contact` varchar(14) NOT NULL,
  `note` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `person`
--

INSERT INTO `person` (`idPerson`, `Name`, `document`, `contact`, `note`) VALUES
('1', 'Marcio sousa', '13884998005', '63997952978', NULL),
('2', 'Jão Jão', '10261524020', '82985380388', 'Convidado'),
('4', 'teste', '04084092070', '61986349933', 'teste');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `flat`
--
ALTER TABLE `flat`
  ADD PRIMARY KEY (`idFlat`),
  ADD UNIQUE KEY `numberFlat` (`numberFlat`);

--
-- Índices para tabela `guest`
--
ALTER TABLE `guest`
  ADD PRIMARY KEY (`idGuest`),
  ADD KEY `GuestidPerson` (`idPerson`);

--
-- Índices para tabela `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`idPerson`),
  ADD UNIQUE KEY `document` (`document`);

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `guest`
--
ALTER TABLE `guest`
  ADD CONSTRAINT `GuestidPerson` FOREIGN KEY (`idPerson`) REFERENCES `person` (`idPerson`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
