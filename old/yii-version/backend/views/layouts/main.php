<?php
use backend\assets\AppAsset;
use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;

/* @var $this \yii\web\View */
/* @var $content string */

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
</head>
<body>
    <?php $this->beginBody() ?>
    <div class="wrap">
        <?php		
            NavBar::begin([
                'brandLabel' => 'My Company',
                'brandUrl' => Yii::$app->homeUrl,
                'options' => [
                    'class' => 'navbar-inverse navbar-fixed-top',
                ],
            ]);

            $menuItems = [
                ['label' => 'Home', 'url' => ['/site/index']],
                ['label' => 'Categorias', 'url' => ['/site/index']],
                ['label' => 'Descuentos', 'url' => ['/site/index']],
                ['label' => 'Personas', 'url' => ['/fullperson/index']],
				['label' => 'Usuarios', 'items' => [
					['label' => 'Usuarios', 'url' => '@frontend/web/index.php?r=tax/index'],
					['label' => 'Roles', 'url' => 'gender/index'],
					['label' => 'Permisos', 'url' => 'currency/index'],
				]],
				['label' => 'Reports', 'items' => [
					['label' => 'Ingresos por sesión', 'url' => '@frontend/web/index.php?r=tax/index'],
					['label' => 'Ingresos por operacion', 'url' => '@frontend/web/index.php?r=tax/index'],
					['label' => 'Ingresos por fecha', 'url' => 'gender/index'],
					['label' => 'Ingresos por horario', 'url' => 'gender/index'],
					['label' => 'Ingresos por categoría', 'url' => 'currency/index'],
					['label' => 'Exportar datos', 'url' => 'currency/index'],
				]],
				['label' => 'Configuration', 'items' => [
					['label' => 'Tax', 'url' => 'tax'],
					['label' => 'Gender', 'url' => 'gender'],
					['label' => 'Currency', 'url' => 'currency'],
				]],
			];
            if (Yii::$app->user->isGuest) {
                $menuItems[] = ['label' => 'Login', 'url' => ['/site/login']];
            } else {
                $menuItems[] = [
                    'label' => 'Logout (' . Yii::$app->user->identity->username . ')',
                    'url' => ['/site/logout'],
                    'linkOptions' => ['data-method' => 'post']
                ];
            }	
            echo Nav::widget([
                'options' => ['class' => 'navbar-nav navbar-right'],
                'items' => $menuItems,
            ]);
            NavBar::end();
        ?>

        <div class="container">
        <?= Breadcrumbs::widget([
            'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
        ]) ?>
        <?= $content ?>
        </div>
    </div>

    <footer class="footer">
        <div class="container">
        <p class="pull-left">&copy; My Company <?= date('Y') ?></p>
        <p class="pull-right"><?= Yii::powered() ?></p>
        </div>
    </footer>

    <?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
