<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel common\models\OrderSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = Yii::t('order', 'Orders');
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="order-index">

    <h1><?= Html::encode($this->title) ?></h1>
    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <p>
        <?= Html::a(Yii::t('order', 'Create {modelClass}', [
    'modelClass' => 'Order',
]), ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'id',
            'session_id',
            'type',
            'invoice_nbr',
            'public_id',
            // 'datetime',
            // 'channel',
            // 'payed',
            // 'price_before_tax',
            // 'tax_amount',
            // 'price',
            // 'discount',
            // 'payment_id',
            // 'reserved_until',
            // 'cancellation_id',
            // 'customer_intervenant_id',
            // 'supplier_intervenant_id',

            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]); ?>

</div>
