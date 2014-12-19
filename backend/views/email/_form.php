<?php

use yii\helpers\Html;
use yii\bootstrap\ActiveForm;

/* @var $this yii\web\View */
/* @var $model common\models\Email */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="email-form">

    <?php 
		$form = ActiveForm::begin(["layout" => "horizontal", "action" => ["email/update?id=".$model->id]]);
	?>

    <?= $form->field($model, 'name')->textInput(['maxlength' => 45]) ?>

    <?= $form->field($model, 'email')->textInput(['maxlength' => 45]) ?>

	<div class="modal-footer">
		<div class="btn-group">
			<button type="submit" class="btn btn-success btn-lg">Save</button>
			<a class="btn btn-danger btn-lg" data-dismiss="modal">Cancel</a>
		</div>		
	</div>

    <?php ActiveForm::end(); ?>

</div>
