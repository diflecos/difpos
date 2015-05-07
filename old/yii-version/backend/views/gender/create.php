<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model common\models\Gender */

$this->title = Yii::t('gender', 'Create {modelClass}', [
    'modelClass' => 'Gender',
]);
$this->params['breadcrumbs'][] = ['label' => Yii::t('gender', 'Genders'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="gender-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
