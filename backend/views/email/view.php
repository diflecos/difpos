<?php

use yii\helpers\Url;
use yii\helpers\Html;
use yii\widgets\DetailView;
use yii\bootstrap\Modal;

/* @var $this yii\web\View */
/* @var $model common\models\Email */
?>
<div class="email-view row">
	<span class="col-md-4 text-right"><?= $model->name ?>: </span>
	<span ><strong><?= $model->email ?></strong></span>
	<a href="#" data-toggle="modal" data-target="#modal-email-update"><span class="glyphicon glyphicon-pencil"></span></a>
	<a href="<?= Url::to(['email/delete', 'id' => $model->id]) ?>"><span class="glyphicon glyphicon-remove"></span></a>
	
	<?php
	Modal::begin([
		'id' => 'modal-email-update',
		'header' => '<h4>Update Email</h4>'
	]);
	
	echo $this->render('//email/update', ['model' => $model]);

	Modal::end();  
    ?>	
</div>
