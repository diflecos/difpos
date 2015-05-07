<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel common\models\SocialMediaSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = Yii::t('socialmedia', 'Social Media');
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="social-media-index">

    <h1><?= Html::encode($this->title) ?></h1>
    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <p>
        <?= Html::a(Yii::t('socialmedia', 'Create {modelClass}', [
    'modelClass' => 'Social Media',
]), ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'id',
            'name',
            'social_media_type_id',
            'data',

            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]); ?>

</div>
