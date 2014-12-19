<?php

use yii\helpers\Html;
use yii\bootstrap\ActiveForm;
use yii\jui\DatePicker;

/* @var $this yii\web\View */
/* @var $model common\models\Person */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="person-form">

    <?php 
		$form = ActiveForm::begin(["layout" => "horizontal", "action" => ["person/update?id=".$model->id]]);
	?>
	
    <?= $form->field($model, 'nick')->textInput(['maxlength' => 45]) ?>

    <?= $form->field($model, 'name')->textInput(['maxlength' => 64]) ?>

    <?= $form->field($model, 'surname')->textInput(['maxlength' => 64]) ?>

	<?= $form->field($model, 'birthdate')->widget(DatePicker::className(),[
		'language' => 'es',
		'dateFormat' => 'dd/MM/yyyy',
		'clientOptions' =>[
			'showAnim'=>'fold',
			'yearRange' => 'c-45:c+0',
			'changeMonth'=> true,
			'changeYear'=> true,
			'autoSize'=>true,
			'showOn'=> "button",
			 //'buttonImage'=> "images/calendar.gif",
			'htmlOptions'=>[
				'style'=>'width:80px;',
				'font-weight'=>'x-small',
			],
		]
	]) ?> 
	
    <?= $form->field($model, 'gender_id')->textInput(['maxlength' => 10]) ?>

    <?= $form->field($model, 'civilstatus_id')->textInput(['maxlength' => 10]) ?>

    <?= $form->field($model, 'id_card')->textInput(['maxlength' => 45]) ?>

	<div class="modal-footer">
		<div class="btn-group">
			<button type="submit" class="btn btn-success btn-lg">Save</button>
			<a class="btn btn-danger btn-lg" data-dismiss="modal">Cancel</a>
		</div>		
	</div>
	
    <?php ActiveForm::end(); ?>

</div>
