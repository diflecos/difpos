<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model common\models\Tax */

$this->title = Yii::t('tax', 'Create {modelClass}', [
    'modelClass' => 'Tax',
]);
$this->params['breadcrumbs'][] = ['label' => Yii::t('tax', 'Taxes'), 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="tax-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
