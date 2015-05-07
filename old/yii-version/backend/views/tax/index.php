<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel common\models\TaxSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = Yii::t('tax', 'Taxes');
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="tax-index">

    <h1><?= Html::encode($this->title) ?></h1>
    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <p>
        <?= Html::a(Yii::t('tax', 'Create {modelClass}', [
    'modelClass' => 'Tax',
]), ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'id',
            'name',
            'percentage',

            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]); ?>

</div>
