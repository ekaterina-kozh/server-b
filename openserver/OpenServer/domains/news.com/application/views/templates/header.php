<!DOCTYPE html>
<html>
<head>
	<title><?= $title; ?></title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css"
		  href="<?php echo base_url('css/styles.css'); ?>">

</head>
<body>

<div class="cont">
	<div class="logo">

		<img src="<?php echo base_url('pic/Слой%201.png'); ?>" class="logo-im" alt="logo">
		<div>
			<h3 class="tit-head">GreenBlog</h3>
			<p class="dis-head">краткое описание сайта</p>
		</div>
	</div>

	<div class="info">
		<div class="block">
			<img src="<?php echo base_url('pic/email.png'); ?>" class="ic" alt="email">
			<a class="lin email">info@green.by</a>
		</div>
		<div class="block">
			<img src="<?php echo base_url('pic/phone-call.png'); ?>" class="ic" alt="phone">
			<a class="without"><b class="lin">+ 375 (33) 347-15-08</b></a>
		</div>
		<div class="call"><a>ЗАКАЗАТЬ ЗВОНОК</a></div>
	</div>

</div>
<hr>
<div class="cont">
	<div class="menu">
		<a href="#" class="without">ГЛАВНАЯ</a>
		<a href="#" class="without">КАТАЛОГ</a>
		<a href="#" class="without">НОВОСТИ</a>
		<a href="#" class="without">О НАС</a>
		<a href="#" class="without">ДОСТАВКА</a>
		<a href="#" class="without">КОНТАКТЫ</a>
	</div>
</div>
<hr>
<br>
<div class="cont">
	<div class="container">
		<div class="breadcrumbs">
			<div class="nav">
				<a href="http://news/" class="without">Главная / </a>
				<a href="http://news/news" class="without">Новости / </a>
				<?php if ($a): ?>
					<a class="newit "> <?php echo $title; ?></a>
				<? endif; ?>
			</div>


		</div>

