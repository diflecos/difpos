<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model common\models\SocialMedia */

$this->title = Yii::t('socialmedia', 'Create {modelClass}', [
    'modelClass' => 'Social Media',
]);
$this->params['breadcrumbs'][] = ['label' => Yii::t('socialmedia', 'Social Media'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="social-media-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
