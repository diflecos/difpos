<?php
use common\models\User;
use yii\helpers\ArrayHelper;
use yii\helpers\Html;
use yii\bootstrap\ActiveForm;

/* @var $this yii\web\View */
/* @var $model common\models\Session */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="session-form">

    <?php $form = ActiveForm::begin(['layout' => 'horizontal']); ?>

	<?php
	$users = User::find()->asArray()->all();
	$usermap = ArrayHelper::map($users, 'id', 'username'); 
	?>
	
    <?= $form->field($model, 'user_id')->dropDownList($usermap) ?>

    <?= $form->field($model, 'status')->dropDownList([ 'open' => 'Open', 'closed' => 'Closed', 'zombie' => 'Zombie', ], ['prompt' => '']) ?>

    <?= $form->field($model, 'init')->textInput() ?>

    <?= $form->field($model, 'end')->textInput() ?>

    <?= $form->field($model, 'verification_ok')->textInput() ?>

    <?= $form->field($model, 'ip')->textInput(['maxlength' => 45]) ?>

    <?= $form->field($model, 'agent')->textInput(['maxlength' => 45]) ?>

    <div class="form-group">
        <?= Html::submitButton($model->isNewRecord ? Yii::t('session', 'Create') : Yii::t('session', 'Update'), ['class' => $model->isNewRecord ? 'btn btn-success' : 'btn btn-primary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
