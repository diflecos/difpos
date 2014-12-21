<?php

use yii\helpers\Url;
use yii\helpers\Html;
use yii\widgets\DetailView;
use yii\bootstrap\Modal;

/* @var $this yii\web\View */
/* @var $model common\models\Phone */

?>
<div class="phone-view row">
	<span class="col-md-4 text-right"><?= $model->name ?>: </span>
	<span ><strong><?= $model->prefix." - ".$model->number ?></strong></span>
	<a href="#" data-toggle="modal" data-target="#modal-phone-update-<?= $model->id ?>"><span class="glyphicon glyphicon-pencil"></span></a>
	<a href="<?= Url::to(['phone/delete', 'id' => $model->id]) ?>"><span class="glyphicon glyphicon-remove"></span></a>
	
	<?php
	Modal::begin([
		'id' => 'modal-phone-update-'.$model->id,
		'header' => '<h4>Update Phone</h4>'
	]);
	
	echo $this->render('//phone/update', ['model' => $model, 'person_id' => $person_id]);

	Modal::end();  
    ?>	
</div>
