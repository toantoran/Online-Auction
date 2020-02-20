CREATE DATABASE  IF NOT EXISTS `onlineauction` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `onlineauction`;
-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: onlineauction
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `cateID` int(11) NOT NULL AUTO_INCREMENT,
  `cateName` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `cateIcon` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`cateID`),
  UNIQUE KEY `cateName_UNIQUE` (`cateName`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Thời trang','tshirt'),(2,'Máy tính, Điện thoại','mobile-alt'),(3,'Xe','motorcycle'),(4,'Làm đẹp, sức khỏe','heartbeat'),(5,'Hàng tiêu dùng','pizza-slice'),(6,'Đồ gia dụng','couch'),(7,'Sách, Văn phòng phẩm','book');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_sub`
--

DROP TABLE IF EXISTS `category_sub`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_sub` (
  `cateID` int(11) NOT NULL,
  `subcateID` int(11) NOT NULL,
  `subcateName` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `productsCount` int(11) DEFAULT '0',
  PRIMARY KEY (`cateID`,`subcateID`),
  UNIQUE KEY `subcateName_UNIQUE` (`subcateName`),
  CONSTRAINT `category_sub_ibfk_1` FOREIGN KEY (`cateID`) REFERENCES `category` (`cateID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_sub`
--

LOCK TABLES `category_sub` WRITE;
/*!40000 ALTER TABLE `category_sub` DISABLE KEYS */;
INSERT INTO `category_sub` VALUES (1,1,'Thời trang nam',0),(1,2,'Thời trang nữ',0),(1,3,'Thời trang cho bé',0),(1,4,'Giày, Dép',0),(1,5,'Phụ kiện thời trang',0),(2,1,'Điện thoại di dộng',0),(2,2,'Laptop',0),(2,3,'PC',0),(2,4,'Máy tính bảng',0),(2,5,'Phụ kiện điện thoại',0),(2,6,'Phụ kiện máy tính',0),(3,1,'Xe máy',0),(3,2,'Xe đạp',0),(3,3,'Xe điện',0),(4,1,'Mỹ phẩm',0),(4,2,'Dụng cụ trang điểm',0),(4,3,'Dụng cụ y tế',0),(4,4,'Thực phẩm chức năng',0),(5,1,'Bánh kẹo',0),(5,2,'Đồ uống',0),(5,3,'Thực phẩm',0),(5,4,'Đồ hộp',0),(6,1,'Đồ dùng nhà bếp',0),(6,2,'Đồ dùng phòng ngủ',0),(6,3,'Nội thất khác',0),(7,1,'Sách ngoại văn',0),(7,2,'Sách tiếng Việt',0),(7,3,'Sách thiếu nhi',0),(7,4,'Truyện tranh',0),(7,5,'Văn phòng phẩm',0);
/*!40000 ALTER TABLE `category_sub` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_ban_bid`
--

DROP TABLE IF EXISTS `product_ban_bid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_ban_bid` (
  `productID` varchar(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `bidderID` int(11) NOT NULL,
  PRIMARY KEY (`productID`,`bidderID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_ban_bid`
--

LOCK TABLES `product_ban_bid` WRITE;
/*!40000 ALTER TABLE `product_ban_bid` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_ban_bid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_bid`
--

DROP TABLE IF EXISTS `product_bid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_bid` (
  `bidID` int(11) NOT NULL AUTO_INCREMENT,
  `productID` varchar(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `bidderID` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `priceHold` int(11) NOT NULL,
  `bidTime` datetime NOT NULL,
  `isHolder` tinyint(1) NOT NULL DEFAULT '0',
  `isCancel` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`bidID`),
  KEY `product_bid_ibfk_1` (`productID`),
  KEY `product_bid_ibfk_3` (`bidderID`),
  CONSTRAINT `product_bid_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `product_single` (`productID`),
  CONSTRAINT `product_bid_ibfk_2` FOREIGN KEY (`bidderID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_bid`
--

LOCK TABLES `product_bid` WRITE;
/*!40000 ALTER TABLE `product_bid` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_bid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_description`
--

DROP TABLE IF EXISTS `product_description`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_description` (
  `productID` varchar(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `descContents` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `descDate` datetime NOT NULL,
  PRIMARY KEY (`productID`,`descDate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_description`
--

LOCK TABLES `product_description` WRITE;
/*!40000 ALTER TABLE `product_description` DISABLE KEYS */;
INSERT INTO `product_description` VALUES ('246bda90-5401-11ea-9336-5dd7a25471bf','<div class=\"productDataBlock\">\r\n<div class=\"contData\">\r\n<p><span id=\"ContentPlaceHolder1_lbDescription\">- 2 bộ điều khiển với 1 s&uacute;ng chơi game<br />- Đầu ra AV với c&aacute;p<br />- Bao gồm bộ đổi nguồn<br />- Đứng dọc<br />- Ổ cắm cho loại Cassette (kh&ocirc;ng bao gồm cassette tr&ograve; chơi)</span></p>\r\n</div>\r\n</div>','2020-02-20 23:52:18'),('dda87780-5400-11ea-9336-5dd7a25471bf','<p>- B&agrave;n ph&iacute;m treo c&oacute; độ phản hồi cao v&agrave; chống nước với đ&egrave;n nền cầu vồng<br />- Được l&agrave;m từ chất liệu cao cấp, bền, kiểu d&aacute;ng đẹp &amp; tiện dụng<br />- C&oacute; c&ocirc;ng tắc đ&egrave;n nền v&agrave; ph&iacute;m mờ<br />- Double-Shot Injection tạo th&ecirc;m kh&ocirc;ng gian cho đ&egrave;n LED khi bật<br />- C&ocirc;ng tắc v&ograve;m cao su<br />- 12 Ph&iacute;m n&oacute;ng đa phương tiện v&agrave; 26 ph&iacute;m chống b&oacute;ng ma gi&uacute;p tăng trải nghiệm chơi tr&ograve; chơi<br />- B&agrave;n ph&iacute;m c&oacute; thể chịu được tới 50 triệu lần nhấn ph&iacute;m<br />- Chip chơi game t&iacute;ch hợp đưa tr&ograve; chơi l&ecirc;n một tầm cao mới<br />- Tương th&iacute;ch với cả hệ điều h&agrave;nh WINDOWS v&agrave; MAC<br />- K&iacute;ch thước: 13,5 x 2 x 44 cm<br />- Bảo h&agrave;nh 1 năm từ nh&agrave; sản xuất</p>','2020-02-20 23:50:36');
/*!40000 ALTER TABLE `product_description` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_img`
--

DROP TABLE IF EXISTS `product_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_img` (
  `productID` varchar(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `imgID` int(11) NOT NULL AUTO_INCREMENT,
  `imgSrc` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `isMain` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`imgID`),
  KEY `product_img_ibfk_1` (`productID`),
  CONSTRAINT `product_img_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `product_single` (`productID`)
) ENGINE=InnoDB AUTO_INCREMENT=280 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_img`
--

LOCK TABLES `product_img` WRITE;
/*!40000 ALTER TABLE `product_img` DISABLE KEYS */;
INSERT INTO `product_img` VALUES ('e6719230-53ff-11ea-a181-b3bfcc57665f',243,'1582216951587-43-984-1_720.jpg',1),('e6719230-53ff-11ea-a181-b3bfcc57665f',244,'1582216951589-43-984-01_720.jpg',0),('e6719230-53ff-11ea-a181-b3bfcc57665f',245,'1582216951591-43-984-02_720.jpg',0),('e6719230-53ff-11ea-a181-b3bfcc57665f',246,'1582216951592-43-984-03_720.jpg',0),('00879480-5400-11ea-a181-b3bfcc57665f',247,'1582216998798-40-521-01_720.jpg',1),('00879480-5400-11ea-a181-b3bfcc57665f',248,'1582216998800-40-521-02_720.jpg',0),('00879480-5400-11ea-a181-b3bfcc57665f',249,'1582216998801-40-521-03_720.jpg',0),('00879480-5400-11ea-a181-b3bfcc57665f',250,'1582216998802-40-521-4_720.jpg',0),('835c0300-5400-11ea-9336-5dd7a25471bf',251,'1582217268541-45-930-01_720.jpg',1),('835c0300-5400-11ea-9336-5dd7a25471bf',252,'1582217268547-45-930-02_720.jpg',0),('835c0300-5400-11ea-9336-5dd7a25471bf',253,'1582217268552-45-930-03_720.jpg',0),('835c0300-5400-11ea-9336-5dd7a25471bf',254,'1582217268554-45-930-04_720.jpg',0),('bca785d0-5400-11ea-9336-5dd7a25471bf',255,'1582217325590-45-935_0111_720.jpg',1),('bca785d0-5400-11ea-9336-5dd7a25471bf',256,'1582217325595-45-935_02_720.jpg',0),('bca785d0-5400-11ea-9336-5dd7a25471bf',257,'1582217325596-45-935_03_720.jpg',0),('bca785d0-5400-11ea-9336-5dd7a25471bf',258,'1582217325596-45-935_04_720.jpg',0),('dda87780-5400-11ea-9336-5dd7a25471bf',259,'1582217435597-42-239V1-0_720.jpg',1),('dda87780-5400-11ea-9336-5dd7a25471bf',260,'1582217435599-42-239add_720.jpg',0),('dda87780-5400-11ea-9336-5dd7a25471bf',261,'1582217435601-42-239add3_720.jpg',0),('dda87780-5400-11ea-9336-5dd7a25471bf',262,'1582217435604-42-239add4_720.jpg',0),('246bda90-5401-11ea-9336-5dd7a25471bf',263,'1582217538187-05-349-main-01_720.jpg',1),('246bda90-5401-11ea-9336-5dd7a25471bf',264,'1582217538189-05-349-2-0_720.jpg',0),('246bda90-5401-11ea-9336-5dd7a25471bf',265,'1582217538190-05-349-3-0_720.jpg',0),('246bda90-5401-11ea-9336-5dd7a25471bf',266,'1582217538190-05-349-4-0_720.jpg',0),('5c4f68f0-5401-11ea-9336-5dd7a25471bf',267,'1582217629068-05-552-001_720.jpg',1),('5c4f68f0-5401-11ea-9336-5dd7a25471bf',268,'1582217629069-05-552-002_720.jpg',0),('5c4f68f0-5401-11ea-9336-5dd7a25471bf',269,'1582217629070-05-552-2_720.jpg',0),('5c4f68f0-5401-11ea-9336-5dd7a25471bf',270,'1582217629072-05-552-003_720.jpg',0),('91ab3b00-5401-11ea-9336-5dd7a25471bf',271,'1582217672061-04-431-1_720.jpg',1),('91ab3b00-5401-11ea-9336-5dd7a25471bf',272,'1582217672063-04-431-2_720.jpg',0),('91ab3b00-5401-11ea-9336-5dd7a25471bf',273,'1582217672064-04-431-3_720.jpg',0),('91ab3b00-5401-11ea-9336-5dd7a25471bf',274,'1582217672066-04-431-4_720.jpg',0),('ac41df00-5401-11ea-9336-5dd7a25471bf',275,'1582217754792-16-617-1_720.jpg',1),('ac41df00-5401-11ea-9336-5dd7a25471bf',276,'1582217754793-16-617-1_720.jph.jpg',0),('ac41df00-5401-11ea-9336-5dd7a25471bf',277,'1582217754795-16-617-3_720.jpg',0),('ac41df00-5401-11ea-9336-5dd7a25471bf',278,'1582217754796-16-617-4_720.jpg',0),('ac41df00-5401-11ea-9336-5dd7a25471bf',279,'1582217754797-16-617-5_720.jpg',0);
/*!40000 ALTER TABLE `product_img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_single`
--

DROP TABLE IF EXISTS `product_single`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_single` (
  `productID` varchar(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `productName` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `cateID` int(11) DEFAULT NULL,
  `subcateID` int(11) DEFAULT NULL,
  `seller` int(11) DEFAULT NULL,
  `beginDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `autoExtend` tinyint(1) DEFAULT '0',
  `beginPrice` int(11) NOT NULL,
  `immePrice` int(11) DEFAULT NULL,
  `stepPrice` int(11) DEFAULT '100',
  `minPrice` int(11) DEFAULT NULL,
  `bidCount` int(11) DEFAULT '0',
  `currentPrice` int(11) DEFAULT NULL,
  `brand` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `pFrom` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `isSendMailEndBid` tinyint(1) DEFAULT '0',
  `minPoint` int(1) DEFAULT '80',
  PRIMARY KEY (`productID`),
  KEY `product_single_ibfk_2_idx` (`cateID`,`subcateID`),
  KEY `product_single_ibfk_1` (`seller`),
  FULLTEXT KEY `productName` (`productName`),
  CONSTRAINT `product_single_ibfk_1` FOREIGN KEY (`seller`) REFERENCES `users` (`userID`),
  CONSTRAINT `product_single_ibfk_2` FOREIGN KEY (`cateID`, `subcateID`) REFERENCES `category_sub` (`cateID`, `subcateID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_single`
--

LOCK TABLES `product_single` WRITE;
/*!40000 ALTER TABLE `product_single` DISABLE KEYS */;
INSERT INTO `product_single` VALUES ('00879480-5400-11ea-a181-b3bfcc57665f','Đế giữ điện thoại đa năng: Trắng nhũ / trắng / đen / hồng',2,5,21,'2020-02-20 23:43:19','2020-02-27 23:43:19',0,200000,0,20000,NULL,0,200000,'','',0,0),('246bda90-5401-11ea-9336-5dd7a25471bf','Bảng điều khiển trò chơi Cassette với Gaming Gun',2,6,21,'2020-02-20 23:52:18','2020-02-27 23:52:18',0,1500000,0,50000,NULL,0,1500000,'Cassette','Trung Quốc',0,80),('5c4f68f0-5401-11ea-9336-5dd7a25471bf','Gaming Headset',2,6,21,'2020-02-20 23:53:49','2020-02-27 23:53:49',0,200000,0,20000,NULL,0,200000,'','Trung Quốc',0,80),('835c0300-5400-11ea-9336-5dd7a25471bf','Giày trẻ em MIRIMOKO',1,3,21,'2020-02-20 23:47:49','2020-02-27 23:47:49',0,100000,0,10000,NULL,0,100000,'MIRIMOKO','Việt Nam',0,0),('91ab3b00-5401-11ea-9336-5dd7a25471bf','Ba lô EVE',1,5,21,'2020-02-20 23:54:32','2020-02-27 23:54:32',0,100000,0,20000,NULL,0,100000,'','',0,0),('ac41df00-5401-11ea-9336-5dd7a25471bf','Giá đỡ điện thoại',2,5,21,'2020-02-20 23:55:55','2020-02-27 23:55:55',0,50000,0,5000,NULL,0,50000,'','',0,0),('bca785d0-5400-11ea-9336-5dd7a25471bf','Áo mưa',1,5,21,'2020-02-20 23:48:46','2020-02-27 23:48:46',0,100000,0,10000,NULL,0,100000,'','Việt Nam',0,0),('dda87780-5400-11ea-9336-5dd7a25471bf','Bàn phím chơi game NUBWO MUTANT',2,6,21,'2020-02-20 23:50:36','2020-02-27 23:50:36',0,1500000,0,100000,NULL,0,1500000,'NUBWO ','Trung Quốc',0,50),('e6719230-53ff-11ea-a181-b3bfcc57665f','Túi du lịch NEAT: Xanh Navy/ Đỏ',1,5,21,'2020-02-20 23:42:32','2020-02-27 23:42:32',0,100000,0,10000,NULL,0,100000,'','',0,0);
/*!40000 ALTER TABLE `product_single` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_evaluation`
--

DROP TABLE IF EXISTS `user_evaluation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_evaluation` (
  `sender` int(11) NOT NULL,
  `receiver` int(11) NOT NULL,
  `productID` varchar(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `isGood` tinyint(1) DEFAULT '0',
  `isBad` tinyint(1) DEFAULT '0',
  `time` datetime DEFAULT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_bin,
  `isRefuse` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`sender`,`receiver`,`productID`),
  KEY `user_evaluation_ibfk_2_idx` (`receiver`),
  CONSTRAINT `user_evaluation_ibfk_1` FOREIGN KEY (`sender`) REFERENCES `users` (`userID`),
  CONSTRAINT `user_evaluation_ibfk_2` FOREIGN KEY (`receiver`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_evaluation`
--

LOCK TABLES `user_evaluation` WRITE;
/*!40000 ALTER TABLE `user_evaluation` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_evaluation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `tel` varchar(11) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `birthDay` datetime DEFAULT NULL,
  `point` int(11) DEFAULT '0',
  `isSeller` tinyint(1) DEFAULT '0',
  `isAdmin` tinyint(1) DEFAULT '0',
  `sellRegis` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`userID`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (21,'Kuro Kenshi','kurokenshiz@gmail.com','$2a$10$.BnNM8C19AjnIYls52Hu.ekFZd8Kf/4x6NXH6ghQGLlITHUE9rLNW',NULL,'Ho Chi Minh',NULL,0,1,0,0),(22,'Admin','bidhub.qtv@gmail.com','$2a$10$X1Gs66T0pU3hzKE/KrcaXe5DdrHfham1REHuFHwBoFfIDVFU8Bhx6',NULL,'Ho Chi Minh',NULL,0,0,1,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wish_list`
--

DROP TABLE IF EXISTS `wish_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wish_list` (
  `productID` varchar(36) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `userID` int(11) NOT NULL,
  PRIMARY KEY (`productID`,`userID`),
  KEY `userID` (`userID`),
  CONSTRAINT `wish_list_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  CONSTRAINT `wish_list_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `product_single` (`productID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wish_list`
--

LOCK TABLES `wish_list` WRITE;
/*!40000 ALTER TABLE `wish_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `wish_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'onlineauction'
--

--
-- Dumping routines for database 'onlineauction'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-20 23:59:25
