<?php

use yii\helpers\Url;
use yii\helpers\Html;
use yii\widgets\DetailView;
use yii\bootstrap\Modal;
use diflecos\innovation\Utils;

/* @var $this yii\web\View */
/* @var $model common\models\Person */
?>
<div class="person-view tab-pane active">
	<a href="#" class="btn btn-success pull-right" data-toggle="modal" data-target="#modal-person-update">Update</a>
	<?php
	Modal::begin([
		'id' => 'modal-person-update',
		'header' => '<h4>Update Person</h4>'
	]);
	
	echo $this->render('//person/update', ['model' => $model]);

	Modal::end();  
    ?>
	<h3>Personal Data</h3>
	<div class="row">
		<span class="col-md-4 text-right">Name: </span><span class="col-md-8"><strong><?= $model->name ?></strong></span>
	</div>
	<div class="row">
		<span class="col-md-4 text-right">Family name: </span><span class="col-md-8"><strong><?= $model->surname ?></strong></span>
	</div>
	<div class="row">
		<span class="col-md-4 text-right">Nick: </span><span class="col-md-8"><strong><?= $model->nick ?></strong></span>
	</div>
	<div class="row">
		<span class="col-md-4 text-right">Identification number: </span><span class="col-md-8"><strong><?= $model->id_card ?></strong></span>
	</div>											
	<div class="row">
		<span class="col-md-4 text-right">Birthdate: </span><span class="col-md-8"><strong>
			<?php 
				$birthdate=Yii::$app->formatter->asDate($model->birthdate, 'dd/MM/yyyy');
				$age=Utils::age($model->birthdate);
				$birthday_count=Utils::birthday_count($model->birthdate);
				echo "$birthdate (age: $age years old)"; 
				if($birthday_count==0)
					echo ". BIRTHDAY!!!";
				if($birthday_count>0 && $birthday_count <=10)
					echo ". Birthday in $birthday_count days";
				if($birthday_count<0 && $birthday_count >=-3)
					echo ". Birthday was ".abs($birthday_count)." days ago";
			?>			
		</strong></span>
	</div>
	<div class="row">
		<span class="col-md-4 text-right">Gender: </span><span class="col-md-8"><strong><?= $model->gender->name ?></strong></span>
	</div>
	<div class="row">
		<span class="col-md-4 text-right">Civil status: </span><span class="col-md-8"><strong><?= $model->civilstatus->name ?></strong></span>
	</div>			
</div>

