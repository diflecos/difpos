<?php

use yii\helpers\Html;
use yii\helpers\ArrayHelper;
use yii\bootstrap\ActiveForm;

use common\models\SocialMediaType;

/* @var $this yii\web\View */
/* @var $model common\models\SocialMedia */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="social-media-form">

    <?php 
		$form = ActiveForm::begin(["layout" => "horizontal", "action" => ["social-media/update?id=".$model->id]]);
	?>
	
    <?= $form->field($model, 'name')->textInput(['maxlength' => 45]) ?>

    <?= $form->field($model, 'social_media_type_id')->dropDownList(ArrayHelper::map(SocialMediaType::find()->all(), 'id', 'name')) ?>

    <?= $form->field($model, 'data')->textInput(['maxlength' => 45]) ?>

	<div class="modal-footer">
		<div class="btn-group">
			<button type="submit" class="btn btn-success btn-lg">Save</button>
			<a class="btn btn-danger btn-lg" data-dismiss="modal">Cancel</a>
		</div>		
	</div>

    <?php ActiveForm::end(); ?>

</div>
