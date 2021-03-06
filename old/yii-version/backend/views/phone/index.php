<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel common\models\PhoneSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = Yii::t('phone', 'Phones');
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="phone-index">

    <h1><?= Html::encode($this->title) ?></h1>
    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <p>
        <?= Html::a(Yii::t('phone', 'Create {modelClass}', [
    'modelClass' => 'Phone',
]), ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'id',
            'name',
            'prefix',
            'number',

            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]); ?>

</div>
