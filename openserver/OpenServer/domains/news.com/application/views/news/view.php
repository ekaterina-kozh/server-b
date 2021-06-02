<div class="news">
	<img src="<?= $photo ?>" alt="photo" style="float: left">
	<div><h4 class="title"><?php echo $title; ?></h4>
	<p class="date"><?=date("d/m/y",strtotime($date))?></p>
	<p class="description"><?php echo $description; ?></p>
<p class="description"><?php echo $text; ?></p>
	</div>
<br>
<br>

</div>
<h4 class="title"><br><hr><br>
	Возможно вас заинтересует</h4><br>
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
	<br>
<?php endforeach ?>


</div>

