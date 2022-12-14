-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 07, 2022 at 04:59 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `digitalartdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `commentrating`
--

CREATE TABLE `commentrating` (
  `commentrating_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `comment_content` varchar(512) COLLATE utf8_unicode_ci NOT NULL,
  `rating_point` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `commentrating`
--

INSERT INTO `commentrating` (`commentrating_id`, `user_id`, `product_id`, `comment_content`, `rating_point`) VALUES
(1, 2, 1, 'So deep', 5);

-- --------------------------------------------------------

--
-- Table structure for table `digitalpay`
--

CREATE TABLE `digitalpay` (
  `digitalpay_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `balance` int(11) NOT NULL DEFAULT 0,
  `create_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `digitalpay`
--

INSERT INTO `digitalpay` (`digitalpay_id`, `user_id`, `balance`, `create_at`) VALUES
(1, 1, 215330000, '2022-11-28 19:52:52'),
(2, 2, 20000000, '2022-11-28 19:52:52'),
(3, 3, 100000, '2022-11-28 19:52:52'),
(4, 4, 4670000, '2022-11-28 19:52:52');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_status` varchar(24) COLLATE utf8_unicode_ci NOT NULL,
  `payment_method` varchar(48) COLLATE utf8_unicode_ci NOT NULL,
  `order_change_date` datetime NOT NULL DEFAULT current_timestamp(),
  `order_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`order_id`, `user_id`, `order_status`, `payment_method`, `order_change_date`, `order_date`) VALUES
(1, 2, '???? thanh to??n', 'V?? digital', '2022-11-28 19:52:52', '2022-11-28 19:52:52'),
(2, 4, '???? nh???n ???????c h??ng', 'V?? DigitalPay', '2022-11-29 03:38:34', '2022-11-29 03:38:34');

-- --------------------------------------------------------

--
-- Table structure for table `orderproduct`
--

CREATE TABLE `orderproduct` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `orderproduct`
--

INSERT INTO `orderproduct` (`order_id`, `product_id`) VALUES
(1, 4),
(1, 5),
(2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `product_image` varchar(512) COLLATE utf8_unicode_ci NOT NULL,
  `product_name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `price` int(11) NOT NULL,
  `status` varchar(24) COLLATE utf8_unicode_ci DEFAULT 'Ch??? duy???t',
  `addTime` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `seller_id`, `product_image`, `product_name`, `description`, `price`, `status`, `addTime`) VALUES
(1, 2, 'AI_Art.png', 'Kh??ng gian Nh?? h??t Th??nh ph??ng', '<p>B???c tranh c&oacute; t&ecirc;n Th&eacute;&acirc;tre D&apos;op&eacute;ra Spatial ???????c trao gi???i nh???t ??? h???ng m???c ngh??? thu???t s??? h&ocirc;m 29/8 t???i tri???n l&atilde;m bang Colorado (M???). ???nh: Jason Allen.</p>\n<p>&quot;B???c tranh tr&ocirc;ng gi???ng nh?? t??? m???t v??? opera kh&ocirc;ng gian v&agrave; ???????c ho&agrave;n thi???n m???t c&aacute;ch \n??i&ecirc;u luy???n. C&aacute;c h&igrave;nh ???nh mang n&eacute;t c??? ??i???n ??? m???t ?????i s???nh ki???n tr&uacute;c Baroque c&ugrave;ng \nm???t &ocirc; tr&ograve;n trong m???t c???nh quan ng???p tr&agrave;n &aacute;nh n???ng v&agrave; r???ng r???&quot;, c&acirc;y \nvi???t Matthew Gault c???a Vice nh???n x&eacute;t.</p>', 1000000, 'C??n h??ng', '2022-11-28 19:52:52'),
(2, 2, 'nguoi_yeu_hoang_hon.jpg', 'Ng?????i y??u Ho??ng H??n', '<p>M???t v&agrave;i gi???t n???ng ho&agrave;ng h&ocirc;n &uacute;a ngang b?????ng \nb&aacute;m m&igrave;nh tr&ecirc;n nh???ng c&agrave;nh c&acirc;y kh&ocirc;, ngu ng???c n&iacute;u k&eacute;o \nm???t ??i???u g&igrave; ??&oacute; trong v&ocirc; v???ng, ????? r???i &iacute;t l&acirc;u sau, n???ng t???t, n???ng t&agrave;n&hellip;\nmang c??? bu???i chi???u bu???n h&ograve;a tan v&agrave;o kh&ocirc;ng kh&iacute;. C&oacute; nh???ng khi, lang thang tr&ecirc;n ???????ng, \nb???ng d??ng ch???y th???t ch???m, c???m th???y b&igrave;nh y&ecirc;n v&ocirc; c&ugrave;ng, khi ng?????c l&ecirc;n g???p nh???ng c&aacute;nh \ndi???u r???c r??? s???c m&agrave;u thong th??? chu du kh&aacute;m ph&aacute; b???u tr???i, b&igrave;nh th???n v&agrave; nh??? nh&otilde;m.</p>', 990000, 'C??n h??ng', '2022-11-28 19:52:52'),
(3, 2, 'co_gai_nhiem_mau.jpg', 'C?? g??i nhi???m m??u', '<p>M???t c&ocirc; g&aacute;i ?????y tr???c ???n, gi&agrave;u l&ograve;ng th????ng ng?????i v&agrave; ?????ng c???m.</p>\n<p>D???u t&iacute;nh c&aacute;ch lu&ocirc;n c&aacute; t&iacute;nh v&agrave; m???nh m???. Nh??ng c&ocirc; l???i d??? m???i l&ograve;ng v&agrave; c???m ?????ng.</p>\n<p>C&ocirc; lu&ocirc;n tin v&agrave;o v??? ?????p c???a ph&eacute;p m&agrave;u ??? th??? gi???i n&agrave;y.</p>', 950000, 'C??n h??ng', '2022-11-28 19:52:52'),
(4, 2, 'nu_hon_mau_neon.jpg', 'N??? h??n m??u neon', '<p><span>N??? h&ocirc;n ?????u ??&ocirc;i l&uacute;c ?????n r???t b???t ng???, khi???n b???n ch??? bi???t ?????ng nh?? tr???i tr???ng, ta?? ch&acirc;n lu???ng cu???ng kh&ocirc;ng bi???t ph???i l&agrave;m ??ao. </span></p>\n<p><span>C??ng ??&ocirc;i l&uacute;c, n??? h&ocirc;n ????? ?????n m???t c&aacute;ch th???t t??? nhi&ecirc;n, t??? m???t ?????i t?????ng b???n c??ng th???m th????ng tr???m nh???. </span></p>\n<p><span>N&oacute;i chung l&agrave;, n??? h&ocirc;n ?????u ????? m&agrave;,d&ugrave; g???n ??????i k??? ni???m ng???t ng&agrave;o ha?? bu???n b&atilde; th&igrave; ch???c ch???n ??????n l&agrave; m???t k&iacute; ???c kh&ocirc;ng th??? qu&ecirc;n.</span></p>', 920000, 'C??n h??ng', '2022-11-28 19:52:52'),
(5, 2, 'thanh_pho_trong_mo.jpg', 'Th??nh ph??? c???a nh???ng gi???c m??', '<p><span>Khi b???n c???m th???y b??? t???c tr?????c th???c t???i cu???c s???ng th&igrave; b???n s??? l&agrave;m g&igrave;?</span></p>\n<p><span>Khi b???n c???m th???y m&igrave;nh l???c l&otilde;ng v???i nh???ng ng?????i xung quanh, b???n s???ng trong m???t th??? gi???i ??&ocirc;ng ??&uacute;c nh??ng ch???ng t&igrave;m ???????c ai b???u b???n th&igrave; b???n s??? l&agrave;m g&igrave;?</span></p>\n<p><span>C&acirc;u tr??? l???i c&oacute; ??? Th&agrave;nh ph??? c???a nh???ng gi???c m??</span></p>', 990000, 'C??n h??ng', '2022-11-28 19:52:52'),
(6, 4, '1669667317363_unplash.jpg', 'Unplash', 'Unplash', 450000, 'C??n h??ng', '2022-11-29 03:28:37'),
(7, 4, '1669667342013_Portrait.jpg', 'Portrait', '', 500000, 'Ch??? duy???t', '2022-11-29 03:29:02');

-- --------------------------------------------------------

--
-- Table structure for table `sellerpending`
--

CREATE TABLE `sellerpending` (
  `pending_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name_store` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `status` varchar(24) COLLATE utf8_unicode_ci DEFAULT 'Ch??? duy???t'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sellerpending`
--

INSERT INTO `sellerpending` (`pending_id`, `user_id`, `name_store`, `status`) VALUES
(4, 4, 'ndhue', '???? duy???t');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `transaction_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL DEFAULT 0,
  `type` varchar(24) COLLATE utf8_unicode_ci DEFAULT 'Thanh to??n',
  `transaction_content` varchar(512) COLLATE utf8_unicode_ci NOT NULL,
  `transaction_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`transaction_id`, `user_id`, `amount`, `type`, `transaction_content`, `transaction_date`) VALUES
(1, 2, 191000000, 'Thanh to??n', 'Thanh to??n ????n h??ng', '2022-11-28 19:52:52');

-- --------------------------------------------------------

--
-- Table structure for table `transactionorder`
--

CREATE TABLE `transactionorder` (
  `transaction_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `transactionorder`
--

INSERT INTO `transactionorder` (`transaction_id`, `order_id`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `email` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(256) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `fullname` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `role` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `gender` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(512) COLLATE utf8_unicode_ci DEFAULT NULL,
  `avatar` varchar(512) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'avatar-default.png',
  `joinDate` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `email`, `username`, `password`, `phone`, `fullname`, `role`, `gender`, `address`, `avatar`, `joinDate`) VALUES
(1, 'lehienas2017@gmail.com', 'trang', '$2b$10$9/sWJ5MjPGbhQdbTcWcvh.beQBbs53NIVCcdc.X/y5kzrtbRXJ.5u', '0395616763', 'Ho??ng Th??? Th??y Trang', 'Admin', 'Female', 'V????ng qu???c nh?? b??', 'avatar-default.png', '2022-11-28 19:52:51'),
(2, 'luuquangthang2k@gmail.com', 'liam', '$2b$10$9/sWJ5MjPGbhQdbTcWcvh.beQBbs53NIVCcdc.X/y5kzrtbRXJ.5u', '0379028110', 'L??u Quang Th???ng', 'Seller', 'Male', 'Qu???n b???y TPHCM', 'avatar-default.png', '2022-11-28 19:52:51'),
(3, 'thinh@gmail.com', 'thinh', '$2b$10$9/sWJ5MjPGbhQdbTcWcvh.beQBbs53NIVCcdc.X/y5kzrtbRXJ.5u', '0395616060', 'Tr???nh Th???nh', 'Customer', 'Female', 'Qu???n 7 TPHCM', 'avatar-default.png', '2022-11-28 19:52:51'),
(4, 'hue@gmail.com', 'huengo', '$2b$10$9/sWJ5MjPGbhQdbTcWcvh.beQBbs53NIVCcdc.X/y5kzrtbRXJ.5u', '0395616061', 'Ng?? Di???m Hu??', 'Seller', 'Female', 'Qu???n 7, TPHCM', 'avatar-default.png', '2022-11-28 19:52:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `commentrating`
--
ALTER TABLE `commentrating`
  ADD PRIMARY KEY (`commentrating_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `digitalpay`
--
ALTER TABLE `digitalpay`
  ADD PRIMARY KEY (`digitalpay_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `orderproduct`
--
ALTER TABLE `orderproduct`
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `seller_id` (`seller_id`);

--
-- Indexes for table `sellerpending`
--
ALTER TABLE `sellerpending`
  ADD PRIMARY KEY (`pending_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `transactionorder`
--
ALTER TABLE `transactionorder`
  ADD KEY `transaction_id` (`transaction_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `commentrating`
--
ALTER TABLE `commentrating`
  MODIFY `commentrating_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `digitalpay`
--
ALTER TABLE `digitalpay`
  MODIFY `digitalpay_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `sellerpending`
--
ALTER TABLE `sellerpending`
  MODIFY `pending_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `commentrating`
--
ALTER TABLE `commentrating`
  ADD CONSTRAINT `commentrating_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `commentrating_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `digitalpay`
--
ALTER TABLE `digitalpay`
  ADD CONSTRAINT `digitalpay_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `orderproduct`
--
ALTER TABLE `orderproduct`
  ADD CONSTRAINT `orderproduct_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orderproduct_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `sellerpending`
--
ALTER TABLE `sellerpending`
  ADD CONSTRAINT `sellerpending_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `transactionorder`
--
ALTER TABLE `transactionorder`
  ADD CONSTRAINT `transactionorder_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`transaction_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `transactionorder_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
