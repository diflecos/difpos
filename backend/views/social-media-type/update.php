<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model common\models\SocialMediaType */

$this->title = Yii::t('socialmediatype', 'Update {modelClass}: ', [
    'modelClass' => 'Social Media Type',
]) . ' ' . $model->name;
$this->params['breadcrumbs'][] = ['label' => Yii::t('socialmediatype', 'Social Media Types'), 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->name, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = Yii::t('socialmediatype', 'Update');
?>
<div class="social-media-type-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
