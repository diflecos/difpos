<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model common\models\SocialMedia */
?>
<div class="social-media-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
		'person_id' => $person_id,
    ]) ?>

</div>