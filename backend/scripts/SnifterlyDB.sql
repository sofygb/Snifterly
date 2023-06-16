USE [master]
GO
/****** Object:  Database [SnifterlyDB]    Script Date: 12/5/2023 11:16:48 ******/
CREATE DATABASE [SnifterlyDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SnifterlyDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\SnifterlyDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SnifterlyDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\SnifterlyDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [SnifterlyDB] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SnifterlyDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SnifterlyDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SnifterlyDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SnifterlyDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SnifterlyDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SnifterlyDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [SnifterlyDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [SnifterlyDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SnifterlyDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SnifterlyDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SnifterlyDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SnifterlyDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SnifterlyDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SnifterlyDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SnifterlyDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SnifterlyDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [SnifterlyDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SnifterlyDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SnifterlyDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SnifterlyDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SnifterlyDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SnifterlyDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SnifterlyDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SnifterlyDB] SET RECOVERY FULL 
GO
ALTER DATABASE [SnifterlyDB] SET  MULTI_USER 
GO
ALTER DATABASE [SnifterlyDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SnifterlyDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SnifterlyDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SnifterlyDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SnifterlyDB] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'SnifterlyDB', N'ON'
GO
ALTER DATABASE [SnifterlyDB] SET QUERY_STORE = OFF
GO
USE [SnifterlyDB]
GO
/****** Object:  User [alumno]    Script Date: 12/5/2023 11:16:48 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [alumno]
GO
/****** Object:  Table [dbo].[Jornada]    Script Date: 12/5/2023 11:16:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Jornada](
	[idJornada] [int] IDENTITY(1,1) NOT NULL,
	[fechaInicio] [datetime] NOT NULL,
	[fechaFin] [datetime] NULL,
	[idUsuario] [int] NOT NULL,
 CONSTRAINT [PK_Jornada] PRIMARY KEY CLUSTERED 
(
	[idJornada] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Medicion]    Script Date: 12/5/2023 11:16:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Medicion](
	[idMedicion] [int] IDENTITY(1,1) NOT NULL,
	[grado] [float] NOT NULL,
	[fecha] [datetime] NOT NULL,
	[idJornada] [int] NULL,
 CONSTRAINT [PK_Medicion] PRIMARY KEY CLUSTERED 
(
	[idMedicion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 12/5/2023 11:16:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[idUsuario] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
	[fechaNacimiento] [date] NOT NULL,
	[peso] [float] NOT NULL,
	[altura] [float] NOT NULL,
	[email] [varchar](50) NOT NULL,
	[contraseña] [varchar](20) NOT NULL,
	[fechaCreacion] [datetime] NOT NULL,
	[modResistencia] [float] NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[idUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Jornada] ON 

INSERT [dbo].[Jornada] ([idJornada], [fechaInicio], [fechaFin], [idUsuario]) VALUES (1, CAST(N'2023-02-21T00:00:00.000' AS DateTime), NULL, 1)
INSERT [dbo].[Jornada] ([idJornada], [fechaInicio], [fechaFin], [idUsuario]) VALUES (3, CAST(N'2020-10-09T09:15:00.000' AS DateTime), CAST(N'2020-10-09T09:50:00.000' AS DateTime), 4)
INSERT [dbo].[Jornada] ([idJornada], [fechaInicio], [fechaFin], [idUsuario]) VALUES (5, CAST(N'2023-12-05T11:30:00.000' AS DateTime), CAST(N'2023-12-06T01:25:00.000' AS DateTime), 5)
SET IDENTITY_INSERT [dbo].[Jornada] OFF
GO
SET IDENTITY_INSERT [dbo].[Medicion] ON 

INSERT [dbo].[Medicion] ([idMedicion], [grado], [fecha], [idJornada]) VALUES (1, 0.025, CAST(N'2023-02-21T01:00:00.000' AS DateTime), 1)
INSERT [dbo].[Medicion] ([idMedicion], [grado], [fecha], [idJornada]) VALUES (6, 0.041, CAST(N'2023-02-21T01:15:00.000' AS DateTime), 1)
INSERT [dbo].[Medicion] ([idMedicion], [grado], [fecha], [idJornada]) VALUES (7, 0.044, CAST(N'2023-02-21T01:20:00.000' AS DateTime), 1)
INSERT [dbo].[Medicion] ([idMedicion], [grado], [fecha], [idJornada]) VALUES (8, 0.03, CAST(N'2023-02-21T02:00:00.000' AS DateTime), 1)
INSERT [dbo].[Medicion] ([idMedicion], [grado], [fecha], [idJornada]) VALUES (9, 0.012, CAST(N'2020-10-09T09:15:00.000' AS DateTime), 3)
INSERT [dbo].[Medicion] ([idMedicion], [grado], [fecha], [idJornada]) VALUES (11, 0.028, CAST(N'2020-10-09T09:25:00.000' AS DateTime), 3)
INSERT [dbo].[Medicion] ([idMedicion], [grado], [fecha], [idJornada]) VALUES (12, 0.043, CAST(N'2020-10-09T09:45:00.000' AS DateTime), 3)
INSERT [dbo].[Medicion] ([idMedicion], [grado], [fecha], [idJornada]) VALUES (13, 0.051, CAST(N'2020-10-09T09:50:00.000' AS DateTime), 3)
INSERT [dbo].[Medicion] ([idMedicion], [grado], [fecha], [idJornada]) VALUES (14, 0.01, CAST(N'2023-12-05T11:30:00.000' AS DateTime), 5)
INSERT [dbo].[Medicion] ([idMedicion], [grado], [fecha], [idJornada]) VALUES (15, 0.037, CAST(N'2023-12-06T00:05:00.000' AS DateTime), 5)
INSERT [dbo].[Medicion] ([idMedicion], [grado], [fecha], [idJornada]) VALUES (16, 0.049, CAST(N'2023-12-06T00:15:00.000' AS DateTime), 5)
INSERT [dbo].[Medicion] ([idMedicion], [grado], [fecha], [idJornada]) VALUES (17, 0.055, CAST(N'2023-12-06T00:40:00.000' AS DateTime), 5)
INSERT [dbo].[Medicion] ([idMedicion], [grado], [fecha], [idJornada]) VALUES (18, 0.048, CAST(N'2023-12-06T01:25:00.000' AS DateTime), 5)
INSERT [dbo].[Medicion] ([idMedicion], [grado], [fecha], [idJornada]) VALUES (19, 0.031, CAST(N'2023-06-23T03:35:00.000' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[Medicion] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuario] ON 

INSERT [dbo].[Usuario] ([idUsuario], [nombre], [fechaNacimiento], [peso], [altura], [email], [contraseña], [fechaCreacion], [modResistencia]) VALUES (1, N'Matheo', CAST(N'2006-02-07' AS Date), 54, 1.79, N'sdif@gmail.com', N'Matheo', CAST(N'2023-05-12T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Usuario] ([idUsuario], [nombre], [fechaNacimiento], [peso], [altura], [email], [contraseña], [fechaCreacion], [modResistencia]) VALUES (4, N'SofiB', CAST(N'2005-11-16' AS Date), 50, 1.66, N'sofia@gmail.com', N'SofiB', CAST(N'2021-01-05T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Usuario] ([idUsuario], [nombre], [fechaNacimiento], [peso], [altura], [email], [contraseña], [fechaCreacion], [modResistencia]) VALUES (5, N'Cami', CAST(N'2006-06-29' AS Date), 46, 1.57, N'cami@gmail.com', N'Cami', CAST(N'2018-11-28T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[Usuario] ([idUsuario], [nombre], [fechaNacimiento], [peso], [altura], [email], [contraseña], [fechaCreacion], [modResistencia]) VALUES (8, N'SofiC', CAST(N'2005-09-05' AS Date), 51, 171, N'sofi@gmail.com', N'SofiC', CAST(N'2022-04-12T00:00:00.000' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[Usuario] OFF
GO
USE [master]
GO
ALTER DATABASE [SnifterlyDB] SET  READ_WRITE 
GO
