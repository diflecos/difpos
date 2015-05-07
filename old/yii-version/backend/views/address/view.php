<?php

use yii\helpers\Url;
use yii\helpers\Html;
use yii\widgets\DetailView;
use yii\bootstrap\Modal;

/* @var $this yii\web\View */
/* @var $model common\models\Address */
?>
<div class="address-view row">
	<span class="col-md-4 text-right"><?= $model->name ?>: </span>
	<span class="col-md-7"><strong><?= $model->street ?></strong></span>
	<a href="#" data-toggle="modal" data-target="#modal-address-update-<?= $model->id ?>"><span class="glyphicon glyphicon-pencil"></span></a>
	<a href="<?= Url::to(['address/delete', 'id' => $model->id]) ?>"><span class="glyphicon glyphicon-remove"></span></a>
	<span class="col-md-4 text-right"></span>
	<span><strong><?= $model->town." - ".$model->zipcode." (".$model->country->name.")"; ?></strong></span>	
	
	<?php
	Modal::begin([
		'id' => 'modal-address-update-'.$model->id,
		'header' => '<h4>Update Address</h4>'
	]);
	
	echo $this->render('//address/update', ['model' => $model, 'person_id' => $person_id]);

	Modal::end();  
    ?>	
</div>

