<?php

use yii\helpers\Url;
use yii\helpers\Html;
use yii\widgets\DetailView;
use yii\bootstrap\Modal;

/* @var $this yii\web\View */
/* @var $model common\models\SocialMedia */
?>
<div class="social-media-view row">
	<span class="col-md-3 text-right"><?= $model->name ?>: </span>
	<span class="col-md-8"><strong><?= $model->socialMediaType->name.": ".$model->data ?></strong></span>
	<a href="#" data-toggle="modal" data-target="#modal-social-media-update-<?= $model->id ?>"><span class="glyphicon glyphicon-pencil"></span></a>
	<a href="<?= Url::to(['social-media/delete', 'id' => $model->id]) ?>"><span class="glyphicon glyphicon-remove"></span></a>
	
	<?php
	Modal::begin([
		'id' => 'modal-social-media-update-'.$model->id,
		'header' => '<h4>Update Social Media</h4>'
	]);
	
	echo $this->render('//social-media/update', ['model' => $model, 'person_id' => $person_id]);

	Modal::end();  
    ?>
</div>					
