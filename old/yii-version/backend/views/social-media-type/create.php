<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model common\models\SocialMediaType */

$this->title = Yii::t('socialmediatype', 'Create {modelClass}', [
    'modelClass' => 'Social Media Type',
]);
$this->params['breadcrumbs'][] = ['label' => Yii::t('socialmediatype', 'Social Media Types'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="social-media-type-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
