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
(1, 2, 'Đã thanh toán', 'Ví digital', '2022-11-28 19:52:52', '2022-11-28 19:52:52'),
(2, 4, 'Đã nhận được hàng', 'Ví DigitalPay', '2022-11-29 03:38:34', '2022-11-29 03:38:34');

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
  `status` varchar(24) COLLATE utf8_unicode_ci DEFAULT 'Chờ duyệt',
  `addTime` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `seller_id`, `product_image`, `product_name`, `description`, `price`, `status`, `addTime`) VALUES
(1, 2, 'AI_Art.png', 'Không gian Nhà hát Thính phòng', '<p>Bức tranh c&oacute; t&ecirc;n Th&eacute;&acirc;tre D&apos;op&eacute;ra Spatial được trao giải nhất ở hạng mục nghệ thuật số h&ocirc;m 29/8 tại triển l&atilde;m bang Colorado (Mỹ). Ảnh: Jason Allen.</p>\n<p>&quot;Bức tranh tr&ocirc;ng giống như từ một vở opera kh&ocirc;ng gian v&agrave; được ho&agrave;n thiện một c&aacute;ch \nđi&ecirc;u luyện. C&aacute;c h&igrave;nh ảnh mang n&eacute;t cổ điển ở một đại sảnh kiến tr&uacute;c Baroque c&ugrave;ng \nmột &ocirc; tr&ograve;n trong một cảnh quan ngập tr&agrave;n &aacute;nh nắng v&agrave; rạng rỡ&quot;, c&acirc;y \nviết Matthew Gault của Vice nhận x&eacute;t.</p>', 1000000, 'Còn hàng', '2022-11-28 19:52:52'),
(2, 2, 'nguoi_yeu_hoang_hon.jpg', 'Người yêu Hoàng Hôn', '<p>Một v&agrave;i giọt nắng ho&agrave;ng h&ocirc;n &uacute;a ngang bướng \nb&aacute;m m&igrave;nh tr&ecirc;n những c&agrave;nh c&acirc;y kh&ocirc;, ngu ngốc n&iacute;u k&eacute;o \nmột điều g&igrave; đ&oacute; trong v&ocirc; vọng, để rồi &iacute;t l&acirc;u sau, nắng tắt, nắng t&agrave;n&hellip;\nmang cả buổi chiều buồn h&ograve;a tan v&agrave;o kh&ocirc;ng kh&iacute;. C&oacute; những khi, lang thang tr&ecirc;n đường, \nbỗng dưng chạy thật chậm, cảm thấy b&igrave;nh y&ecirc;n v&ocirc; c&ugrave;ng, khi ngước l&ecirc;n gặp những c&aacute;nh \ndiều rực rỡ sắc m&agrave;u thong thả chu du kh&aacute;m ph&aacute; bầu trời, b&igrave;nh thản v&agrave; nhẹ nh&otilde;m.</p>', 990000, 'Còn hàng', '2022-11-28 19:52:52'),
(3, 2, 'co_gai_nhiem_mau.jpg', 'Cô gái nhiệm màu', '<p>Một c&ocirc; g&aacute;i đầy trắc ẩn, gi&agrave;u l&ograve;ng thương người v&agrave; đồng cảm.</p>\n<p>Dẫu t&iacute;nh c&aacute;ch lu&ocirc;n c&aacute; t&iacute;nh v&agrave; mạnh mẽ. Nhưng c&ocirc; lại dễ mủi l&ograve;ng v&agrave; cảm động.</p>\n<p>C&ocirc; lu&ocirc;n tin v&agrave;o vẻ đẹp của ph&eacute;p m&agrave;u ở thế giới n&agrave;y.</p>', 950000, 'Còn hàng', '2022-11-28 19:52:52'),
(4, 2, 'nu_hon_mau_neon.jpg', 'Nụ hôn màu neon', '<p><span>Nụ h&ocirc;n đầu đ&ocirc;i l&uacute;c đến rất bất ngờ, khiến bạn chỉ biết đứng như trời trồng, taу ch&acirc;n luống cuống kh&ocirc;ng biết phải l&agrave;m ѕao. </span></p>\n<p><span>Cũng đ&ocirc;i l&uacute;c, nụ h&ocirc;n ấу đến một c&aacute;ch thật tự nhi&ecirc;n, từ một đối tượng bạn cũng thầm thương trộm nhớ. </span></p>\n<p><span>N&oacute;i chung l&agrave;, nụ h&ocirc;n đầu ấу m&agrave;,d&ugrave; gắn ᴠới kỉ niệm ngọt ng&agrave;o haу buồn b&atilde; th&igrave; chắc chắn ᴠẫn l&agrave; một k&iacute; ức kh&ocirc;ng thể qu&ecirc;n.</span></p>', 920000, 'Còn hàng', '2022-11-28 19:52:52'),
(5, 2, 'thanh_pho_trong_mo.jpg', 'Thành phố của những giấc mơ', '<p><span>Khi bạn cảm thấy bế tắc trước thực tại cuộc sống th&igrave; bạn sẽ l&agrave;m g&igrave;?</span></p>\n<p><span>Khi bạn cảm thấy m&igrave;nh lạc l&otilde;ng với những người xung quanh, bạn sống trong một thế giới đ&ocirc;ng đ&uacute;c nhưng chẳng t&igrave;m được ai bầu bạn th&igrave; bạn sẽ l&agrave;m g&igrave;?</span></p>\n<p><span>C&acirc;u trả lời c&oacute; ở Th&agrave;nh phố của những giấc mơ</span></p>', 990000, 'Còn hàng', '2022-11-28 19:52:52'),
(6, 4, '1669667317363_unplash.jpg', 'Unplash', 'Unplash', 450000, 'Còn hàng', '2022-11-29 03:28:37'),
(7, 4, '1669667342013_Portrait.jpg', 'Portrait', '', 500000, 'Chờ duyệt', '2022-11-29 03:29:02');

-- --------------------------------------------------------

--
-- Table structure for table `sellerpending`
--

CREATE TABLE `sellerpending` (
  `pending_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name_store` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `status` varchar(24) COLLATE utf8_unicode_ci DEFAULT 'Chờ duyệt'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sellerpending`
--

INSERT INTO `sellerpending` (`pending_id`, `user_id`, `name_store`, `status`) VALUES
(4, 4, 'ndhue', 'Đã duyệt');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `transaction_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL DEFAULT 0,
  `type` varchar(24) COLLATE utf8_unicode_ci DEFAULT 'Thanh toán',
  `transaction_content` varchar(512) COLLATE utf8_unicode_ci NOT NULL,
  `transaction_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`transaction_id`, `user_id`, `amount`, `type`, `transaction_content`, `transaction_date`) VALUES
(1, 2, 191000000, 'Thanh toán', 'Thanh toán đơn hàng', '2022-11-28 19:52:52');

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
(1, 'lehienas2017@gmail.com', 'trang', '$2b$10$9/sWJ5MjPGbhQdbTcWcvh.beQBbs53NIVCcdc.X/y5kzrtbRXJ.5u', '0395616763', 'Hoàng Thị Thùy Trang', 'Admin', 'Female', 'Vương quốc nhà bè', 'avatar-default.png', '2022-11-28 19:52:51'),
(2, 'luuquangthang2k@gmail.com', 'liam', '$2b$10$9/sWJ5MjPGbhQdbTcWcvh.beQBbs53NIVCcdc.X/y5kzrtbRXJ.5u', '0379028110', 'Lưu Quang Thắng', 'Seller', 'Male', 'Quận bẩy TPHCM', 'avatar-default.png', '2022-11-28 19:52:51'),
(3, 'thinh@gmail.com', 'thinh', '$2b$10$9/sWJ5MjPGbhQdbTcWcvh.beQBbs53NIVCcdc.X/y5kzrtbRXJ.5u', '0395616060', 'Trịnh Thịnh', 'Customer', 'Female', 'Quận 7 TPHCM', 'avatar-default.png', '2022-11-28 19:52:51'),
(4, 'hue@gmail.com', 'huengo', '$2b$10$9/sWJ5MjPGbhQdbTcWcvh.beQBbs53NIVCcdc.X/y5kzrtbRXJ.5u', '0395616061', 'Ngô Diễm Huê', 'Seller', 'Female', 'Quận 7, TPHCM', 'avatar-default.png', '2022-11-28 19:52:51');

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
