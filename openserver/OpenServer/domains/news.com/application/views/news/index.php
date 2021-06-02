<h1>Новости</h1>
<div class="area">
	<form method="get" action="<?= 'http://news/news/index' ?>">
		<input type="search" placeholder="Поиск по записям" name="keyword"
			   value="<?php if ($this->input->get('keyword')) echo $this->input->get('keyword') ?>">

		<button type="submit"><i class="fa fa-search"></i>
			<div style="margin-left: 5px"> Найти</div>
		</button>
	</form>

	<div class="sort">
		<a class="without">Сортировать по:</a>
		<a href="http://news/news/index/date/asc" class="pr">дате по возрастанию</a>
		<a href="http://news/news/index/date/desc" class="pr">дате по убыванию</a>
		<a href="http://news/news/index/title/asc" class="pr">названию по возрастанию</a>
		<a href="http://news/news/index/title/desc" class="pr">названию по убыванию</a>
	</div>
</div>

<div class="news">

	<?php foreach ($news as $value): ?>

		<div class="new-cl"><img src="<?= $value->photo ?>" alt="photo">
		<div>
			<p class="date"><?= date("d/m/y", strtotime($value->date)) ?></p>
			<h4 class="title"><?= $value->title ?></h4>
		<p class="des"><?= $value->description ?></p>
			<a href="http://news/news/<?= $value->slug ?>" class="pr">читать полностью</a>
		</div></div>
		<title><?= $value->title ?></title>
		<meta name="description" content="<?= $value->description ?>"/>


		<br>
		<hr>
	<?php endforeach ?>
</div>

<?php if (strlen($pagination)): ?>
	<div class="pagin">
		<?php echo $pagination; ?>
	</div>

<?php endif;?>
