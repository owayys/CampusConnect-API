/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chatrooms` (
  `chat_id` int NOT NULL AUTO_INCREMENT,
  `name` tinytext NOT NULL,
  `description` tinytext NOT NULL,
  `icon` char(60) NOT NULL,
  PRIMARY KEY (`chat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `chat_id` int NOT NULL,
  `s_id` int NOT NULL,
  PRIMARY KEY (`chat_id`,`s_id`),
  KEY `s_id` (`s_id`),
  CONSTRAINT `members_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `chatrooms` (`chat_id`),
  CONSTRAINT `members_ibfk_2` FOREIGN KEY (`s_id`) REFERENCES `students` (`s_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `chat_id` int NOT NULL,
  `s_id` int NOT NULL,
  `content` tinytext NOT NULL,
  `sent` datetime NOT NULL,
  PRIMARY KEY (`message_id`),
  KEY `chat_id` (`chat_id`),
  KEY `s_id` (`s_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `chatrooms` (`chat_id`),
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`s_id`) REFERENCES `students` (`s_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `societies` (
  `soc_id` varchar(255) NOT NULL,
  `password` char(60) NOT NULL,
  `info` mediumtext,
  `icon` char(20) DEFAULT NULL,
  PRIMARY KEY (`soc_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `s_id` int NOT NULL,
  `s_name` char(60) DEFAULT NULL,
  `password` char(60) NOT NULL,
  `school` char(10) DEFAULT NULL,
  `graduation_year` year DEFAULT NULL,
  `icon` char(20) DEFAULT NULL,
  `bio` tinytext,
  PRIMARY KEY (`s_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
