-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 22, 2023 at 03:07 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tournament`
--
CREATE DATABASE IF NOT EXISTS `tournament` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `tournament`;

-- --------------------------------------------------------

--
-- Table structure for table `colaborator`
--

DROP TABLE IF EXISTS `colaborator`;
CREATE TABLE `colaborator` (
  `id` int(11) NOT NULL,
  `tournament_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `colaborator`
--

INSERT INTO `colaborator` (`id`, `tournament_id`, `user_id`) VALUES
(1, 1, 2),
(2, 1, 3),
(3, 3, 1),
(4, 3, 1),
(5, 3, 1),
(6, 3, 1),
(7, 3, 1),
(8, 31, 2);

-- --------------------------------------------------------

--
-- Table structure for table `coordinator`
--

DROP TABLE IF EXISTS `coordinator`;
CREATE TABLE `coordinator` (
  `id` int(11) NOT NULL,
  `tournament_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `coordinator`
--

INSERT INTO `coordinator` (`id`, `tournament_id`, `user_id`) VALUES
(1, 31, 2),
(2, 4, 2);

-- --------------------------------------------------------

--
-- Table structure for table `format_tour`
--

DROP TABLE IF EXISTS `format_tour`;
CREATE TABLE `format_tour` (
  `id` int(11) NOT NULL,
  `tournament_id` int(11) NOT NULL,
  `description` longtext DEFAULT NULL,
  `structure` longtext DEFAULT NULL,
  `rules` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `format_tour`
--

INSERT INTO `format_tour` (`id`, `tournament_id`, `description`, `structure`, `rules`) VALUES
(1, 0, '', '', ''),
(2, 0, '', '', ''),
(3, 0, '', '', ''),
(4, 0, '', '', ''),
(5, 1, 'asd', 'asd', 'asd'),
(6, 30, 'ini format 1', 'struktur 1', 'rules 1'),
(7, 31, 'INI DESKRIPSI', 'INI STRUKTUR', 'MBOHWES');

-- --------------------------------------------------------

--
-- Table structure for table `participant`
--

DROP TABLE IF EXISTS `participant`;
CREATE TABLE `participant` (
  `id` int(11) NOT NULL,
  `tournament_id` int(11) NOT NULL,
  `player_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
CREATE TABLE `player` (
  `id` int(11) NOT NULL,
  `tournament_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `player`
--

INSERT INTO `player` (`id`, `tournament_id`, `name`, `email`) VALUES
(1, 0, 'asd', 'asd@asd.com'),
(2, 0, 'asd', 'asd@asd.com'),
(4, 0, 'asd', 'asd@asd.com'),
(5, 0, 'asd', 'asd@asd.com'),
(7, 31, 'juan', 'admin@fgg.com'),
(8, 31, 'alex chandra', 'admin@dwwdd.com');

-- --------------------------------------------------------

--
-- Table structure for table `role_tour`
--

DROP TABLE IF EXISTS `role_tour`;
CREATE TABLE `role_tour` (
  `id` int(11) NOT NULL,
  `tournament_id` int(11) NOT NULL,
  `description` longtext NOT NULL,
  `responsibilities` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role_tour`
--

INSERT INTO `role_tour` (`id`, `tournament_id`, `description`, `responsibilities`) VALUES
(1, 31, 'sawscasc', 'cascasas');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `tournament_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `tournament_id`, `date`, `time`) VALUES
(1, 0, '2023-12-12', '10:00:00'),
(2, 0, '2023-12-12', '10:00:00'),
(3, 0, '2023-12-12', '10:00:00'),
(4, 0, '2023-12-12', '10:00:00'),
(5, 0, '2023-12-12', '10:00:00'),
(6, 1, '2023-12-12', '10:00:00'),
(7, 4, '2012-12-11', '11:00:00'),
(8, 10, '2012-12-11', '11:00:00'),
(9, 4, '2023-12-16', '12:25:00');

-- --------------------------------------------------------

--
-- Table structure for table `tournament`
--

DROP TABLE IF EXISTS `tournament`;
CREATE TABLE `tournament` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `venues` text NOT NULL,
  `rules` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tournament`
--

INSERT INTO `tournament` (`id`, `name`, `date`, `time`, `venues`, `rules`) VALUES
(4, 'qwe', '2023-12-12', '10:00:00', 'qwe', 'asd'),
(5, 'futsal', '2023-12-20', '14:00:00', 'baruk', 'apa saja'),
(6, 'asd', '1999-01-26', '14:00:00', 'baruk', 'apa saja'),
(7, 'asd', '1999-01-26', '14:00:00', 'baruk', 'apa saja'),
(8, 'asd', '1999-01-26', '14:00:00', 'baruk', 'apa saja'),
(9, 'asd', '1999-01-26', '14:00:00', 'baruk', 'apa saja'),
(30, 'asd', '1999-01-26', '14:00:00', 'baruk', 'apa saja'),
(31, 'test 1', '1999-01-26', '14:00:00', 'baruk', 'apa saja');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `username`, `dob`, `email`, `password`) VALUES
(1, 'qwe', 'qwe', '2023-12-12', 'asd@asd.com', 'qwe'),
(2, 'melinda', 'melinda', '1999-01-26', 'melinda@gmail.com', 'melinda'),
(3, 'asd', 'melindaa', '1999-01-26', 'melinda@gmail.coma', 'melinda');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `colaborator`
--
ALTER TABLE `colaborator`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coordinator`
--
ALTER TABLE `coordinator`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `format_tour`
--
ALTER TABLE `format_tour`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `participant`
--
ALTER TABLE `participant`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `player`
--
ALTER TABLE `player`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role_tour`
--
ALTER TABLE `role_tour`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tournament`
--
ALTER TABLE `tournament`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `colaborator`
--
ALTER TABLE `colaborator`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `coordinator`
--
ALTER TABLE `coordinator`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `format_tour`
--
ALTER TABLE `format_tour`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `participant`
--
ALTER TABLE `participant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `player`
--
ALTER TABLE `player`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `role_tour`
--
ALTER TABLE `role_tour`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tournament`
--
ALTER TABLE `tournament`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
