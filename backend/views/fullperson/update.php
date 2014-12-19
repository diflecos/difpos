<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model common\models\Person */

$this->title = Yii::t('person', 'Update {modelClass}: ', [
    'modelClass' => 'Person',
]) . ' ' . $model->name;
$this->params['breadcrumbs'][] = ['label' => Yii::t('person', 'People'), 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->name, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = Yii::t('person', 'Update');
?>
<div class="person-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
