-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-08-2023 a las 15:35:39
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `snifterlydb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jornada`
--

CREATE TABLE `jornada` (
  `idJornada` int(11) NOT NULL,
  `fechaInicio` datetime NOT NULL,
  `fechaFin` datetime DEFAULT NULL,
  `idUsuario` int(11) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `jornada`
--

INSERT INTO `jornada` (`idJornada`, `fechaInicio`, `fechaFin`, `idUsuario`, `activo`) VALUES
(1, '2023-02-21 00:00:00', NULL, 1, 0),
(3, '2020-10-09 09:15:00', '2020-10-09 09:50:00', 4, 0),
(5, '2023-12-05 11:30:00', '2023-12-06 01:25:00', 5, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicion`
--

CREATE TABLE `medicion` (
  `idMedicion` int(11) NOT NULL,
  `grado` float NOT NULL,
  `fecha` datetime NOT NULL,
  `idJornada` int(11) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `medicion`
--

INSERT INTO `medicion` (`idMedicion`, `grado`, `fecha`, `idJornada`, `estado`) VALUES
(1, 0.025, '2023-02-21 01:00:00', 1, 0),
(6, 0.041, '2023-02-21 01:15:00', 1, 0),
(7, 0.044, '2023-02-21 01:20:00', 1, 0),
(8, 0.03, '2023-02-21 02:00:00', 1, 0),
(9, 0.012, '2020-10-09 09:15:00', 3, 0),
(11, 0.028, '2020-10-09 09:25:00', 3, 0),
(12, 0.043, '2020-10-09 09:45:00', 3, 0),
(13, 0.051, '2020-10-09 09:50:00', 3, 0),
(14, 0.01, '2023-12-05 11:30:00', 5, 0),
(15, 0.037, '2023-12-06 00:05:00', 5, 0),
(16, 0.049, '2023-12-06 00:15:00', 5, 0),
(17, 0.055, '2023-12-06 00:40:00', 5, 0),
(18, 0.048, '2023-12-06 01:25:00', 5, 0),
(19, 0.031, '2023-06-23 03:35:00', NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `peso` float NOT NULL,
  `altura` float NOT NULL,
  `email` varchar(50) NOT NULL,
  `contraseña` varchar(20) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `modResistencia` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nombre`, `fechaNacimiento`, `peso`, `altura`, `email`, `contraseña`, `fechaCreacion`, `modResistencia`) VALUES
(1, 'Matheo', '2006-02-07', 54, 1.79, 'sdif@gmail.com', 'Matheo', '2023-05-12 00:00:00', NULL),
(4, 'SofiB', '2005-11-16', 50, 1.66, 'sofia@gmail.com', 'SofiB', '2021-01-05 00:00:00', NULL),
(5, 'Cami', '2006-06-29', 46, 1.57, 'cami@gmail.com', 'Cami', '2018-11-28 00:00:00', NULL),
(8, 'SofiC', '2005-09-05', 51, 171, 'sofi@gmail.com', 'SofiC', '2022-04-12 00:00:00', NULL),
(11, '1', '2023-08-09', 49, 1.57, 'hola', 'hola', '2023-08-04 09:00:20', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `jornada`
--
ALTER TABLE `jornada`
  ADD PRIMARY KEY (`idJornada`);

--
-- Indices de la tabla `medicion`
--
ALTER TABLE `medicion`
  ADD PRIMARY KEY (`idMedicion`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `jornada`
--
ALTER TABLE `jornada`
  MODIFY `idJornada` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `medicion`
--
ALTER TABLE `medicion`
  MODIFY `idMedicion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
