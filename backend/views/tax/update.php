<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model common\models\Tax */

$this->title = Yii::t('tax', 'Update {modelClass}: ', [
    'modelClass' => 'Tax',
]) . ' ' . $model->name;
$this->params['breadcrumbs'][] = ['label' => Yii::t('tax', 'Taxes'), 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->name, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = Yii::t('tax', 'Update');
?>
<div class="tax-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
