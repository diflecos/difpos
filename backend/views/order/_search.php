<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model common\models\OrderSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="order-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'id') ?>

    <?= $form->field($model, 'session_id') ?>

    <?= $form->field($model, 'type') ?>

    <?= $form->field($model, 'invoice_nbr') ?>

    <?= $form->field($model, 'public_id') ?>

    <?php // echo $form->field($model, 'datetime') ?>

    <?php // echo $form->field($model, 'channel') ?>

    <?php // echo $form->field($model, 'payed') ?>

    <?php // echo $form->field($model, 'price_before_tax') ?>

    <?php // echo $form->field($model, 'tax_amount') ?>

    <?php // echo $form->field($model, 'price') ?>

    <?php // echo $form->field($model, 'discount') ?>

    <?php // echo $form->field($model, 'payment_id') ?>

    <?php // echo $form->field($model, 'reserved_until') ?>

    <?php // echo $form->field($model, 'cancellation_id') ?>

    <?php // echo $form->field($model, 'customer_intervenant_id') ?>

    <?php // echo $form->field($model, 'supplier_intervenant_id') ?>

    <div class="form-group">
        <?= Html::submitButton(Yii::t('order', 'Search'), ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton(Yii::t('order', 'Reset'), ['class' => 'btn btn-default']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
