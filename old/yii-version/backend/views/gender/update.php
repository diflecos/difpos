<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model common\models\Gender */

$this->title = Yii::t('gender', 'Update {modelClass}: ', [
    'modelClass' => 'Gender',
]) . ' ' . $model->name;
$this->params['breadcrumbs'][] = ['label' => Yii::t('gender', 'Genders'), 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->name, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = Yii::t('gender', 'Update');
?>
<div class="gender-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>