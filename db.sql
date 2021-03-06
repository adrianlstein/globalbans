-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hose : localhost:3306
-- Généré le : mer. 12 août 2020 à 00:22
-- Version du serveur :  10.1.44-MariaDB-0ubuntu0.18.04.1
-- Version de PHP : 7.3.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base of the : `antiraid_db`
--

-- --------------------------------------------------------

--
-- Structure create the table `user_blacklist`
--

CREATE TABLE `user_blacklist` (
  `id` int(11) NOT NULL,
  `user_id` varchar(25) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `banning_guild` varchar(255) NOT NULL,
  `banning_guild_id` varchar(255) NOT NULL,
  `banned_by` varchar(255) NOT NULL,
  `banned_by_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure create the table `user_watchlist`
--

CREATE TABLE `user_watchlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(25) NOT NULL,
  `evidence` varchar(255) NOT NULL,
  `warning_guild` varchar(255) NOT NULL,
  `warning_guild_id` varchar(255) NOT NULL,
  `warned_by` varchar(255) NOT NULL,
  `warned_by_id` varchar(255) NOT NULL, 
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Structure create the table `user_watchlist`
--

CREATE TABLE `user_staff` (
  `id` int(11) NOT NULL,
  `user_id` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Index for unloadeding tables
--

--
-- Index pour la table `user_blacklist`
--


--
-- Index pour la table `user_staff`
--

ALTER TABLE `user_blacklist`
  ADD PRIMARY KEY (`id`);

--
--
-- Index for the table `user_staff`
--
ALTER TABLE `user_staff`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour for unloading
--

--
-- AUTO_INCREMENT for the table`user_blacklist`
--
ALTER TABLE `user_watchlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for the table`user_staff`
--

--
-- AUTO_INCREMENT for the table`user_blacklist`
--
ALTER TABLE `user_blacklist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for the table`user_staff`
--
ALTER TABLE `user_staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
