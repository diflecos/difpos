<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model common\models\Person */

$this->title = Yii::t('person', 'Create {modelClass}', [
    'modelClass' => 'Person',
]);
$this->params['breadcrumbs'][] = ['label' => Yii::t('person', 'People'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="person-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
