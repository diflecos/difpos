<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel common\models\SessionSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = Yii::t('session', 'Sessions');
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="session-index">

    <h1><?= Html::encode($this->title) ?></h1>
    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <p>
        <?= Html::a(Yii::t('session', 'Create {modelClass}', [
    'modelClass' => 'Session',
]), ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
			[ 'attribute' => 'init', 'format' => ['datetime', 'd/M/Y H:m'] ],
			[ 'attribute' => 'end', 'format' => ['datetime', 'd/M/Y H:m'] ],
            'user.username',
            'status',
            'verification_ok',
            'ip',
            'agent',
            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]); ?>

</div>
