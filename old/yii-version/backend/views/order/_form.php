<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model common\models\Order */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="order-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'session_id')->textInput(['maxlength' => 10]) ?>

    <?= $form->field($model, 'type')->dropDownList([ 'purchase' => 'Purchase', 'sale' => 'Sale', 'internal' => 'Internal', ], ['prompt' => '']) ?>

    <?= $form->field($model, 'invoice_nbr')->textInput(['maxlength' => 45]) ?>

    <?= $form->field($model, 'public_id')->textInput(['maxlength' => 45]) ?>

    <?= $form->field($model, 'datetime')->textInput() ?>

    <?= $form->field($model, 'channel')->dropDownList([ 'online' => 'Online', 'pos' => 'Pos', ], ['prompt' => '']) ?>

    <?= $form->field($model, 'payed')->textInput() ?>

    <?= $form->field($model, 'price_before_tax')->textInput() ?>

    <?= $form->field($model, 'tax_amount')->textInput() ?>

    <?= $form->field($model, 'price')->textInput() ?>

    <?= $form->field($model, 'discount')->textInput() ?>

    <?= $form->field($model, 'payment_id')->textInput(['maxlength' => 10]) ?>

    <?= $form->field($model, 'reserved_until')->textInput() ?>

    <?= $form->field($model, 'cancellation_id')->textInput(['maxlength' => 10]) ?>

    <?= $form->field($model, 'customer_intervenant_id')->textInput(['maxlength' => 10]) ?>

    <?= $form->field($model, 'supplier_intervenant_id')->textInput(['maxlength' => 10]) ?>

    <div class="form-group">
        <?= Html::submitButton($model->isNewRecord ? Yii::t('order', 'Create') : Yii::t('order', 'Update'), ['class' => $model->isNewRecord ? 'btn btn-success' : 'btn btn-primary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
