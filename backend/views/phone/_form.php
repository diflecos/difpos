<?php

use yii\helpers\Html;
use yii\bootstrap\ActiveForm;

/* @var $this yii\web\View */
/* @var $model common\models\Phone */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="phone-form">

    <?php 
		$form = ActiveForm::begin(["layout" => "horizontal", "action" => ["phone/update?id=".$model->id]]);
	?>

    <?= $form->field($model, 'name')->textInput(['maxlength' => 45]) ?>

    <?= $form->field($model, 'prefix')->textInput(['maxlength' => 45]) ?>

    <?= $form->field($model, 'number')->textInput(['maxlength' => 45]) ?>

	<div class="modal-footer">
		<div class="btn-group">
			<button type="submit" class="btn btn-success btn-lg">Save</button>
			<a class="btn btn-danger btn-lg" data-dismiss="modal">Cancel</a>
		</div>		
	</div>

    <?php ActiveForm::end(); ?>

</div>
