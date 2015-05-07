<?php

use yii\helpers\Html;
use yii\bootstrap\ActiveForm;

/* @var $this yii\web\View */
/* @var $model common\models\Address */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="address-form">

    <?php 
		$form = ActiveForm::begin(["layout" => "horizontal", "action" => ["address/update?id=".$model->id]]);
	?>

	<?= Html::hiddenInput("person_id", $person_id); ?>
	
    <?= $form->field($model, 'name')->textInput(['maxlength' => 45]) ?>

    <?= $form->field($model, 'street')->textInput(['maxlength' => 45]) ?>

    <?= $form->field($model, 'town')->textInput(['maxlength' => 45]) ?>

    <?= $form->field($model, 'zipcode')->textInput(['maxlength' => 45]) ?>

    <?= $form->field($model, 'country_region_id')->textInput(['maxlength' => 10]) ?>

    <?= $form->field($model, 'country_id')->textInput(['maxlength' => 10]) ?>

	<div class="modal-footer">
		<div class="btn-group">
			<button type="submit" class="btn btn-success btn-lg">Save</button>
			<a class="btn btn-danger btn-lg" data-dismiss="modal">Cancel</a>
		</div>		
	</div>

    <?php ActiveForm::end(); ?>

</div>
