<?php header ("Content-Type:text/xml"); ?>
<?= '<?xml version="1.0" encoding="UTF-8" ?>' ?>

<urlset xmlns="">

	<?php foreach ($news as $value): ?>
		<news>
			<title><?= $value->title?></title>
			<url>/news/<?= $value->slug?></url>
			<pub_date><?= $value->date?></pub_date>
			<description><?= $value->description?></description>
			<text><?= $value->text?></text>
			<meta_title><?= $value->title?></meta_title>
			<meta_description><?= $value->description?></meta_description>
		</news>
	<?php endforeach ?>
</urlset>
