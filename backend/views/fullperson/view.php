<?php

use yii\helpers\Url;
use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model common\models\Person */
$person=$model;
?>
<div class="person-view row">
	<div class="col-md-12">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h2><?= $model->name." ".$model->surname." (".$model->nick.")" ?></h2>
			</div>
			<div class="panel-body">
				<img class="pull-left" src="http://dummyimage.com/400x400/eeeeee/aaaaaa.jpg"/>
						
				<div class="pull-right">
					<ul class="nav nav-tabs" role="tablist">
						<li class="active"><a href="#personal-info" role="tab" data-toggle="tab">Personal Info</a></li>
						<li><a href="#users" role="tab" data-toggle="tab">Users</a></li>
						<li><a href="#employee" role="tab" data-toggle="tab">Employee</a></li>
						<li><a href="#customer" role="tab" data-toggle="tab">Customer</a></li>
						<li><a href="#contact" role="tab" data-toggle="tab">Contact</a></li>
						<li><a href="#social" role="tab" data-toggle="tab">Social</a></li>
						<li><a href="#comments" role="tab" data-toggle="tab">Comments</a></li>
					</ul>
					<div class="tab-content">
						<div class="tab-pane active" id="personal-info">
							<?php echo yii\base\View::render("/person/view",["model" => $person]); ?>
						</div>
						<div class="tab-pane" id="users">
						</div>
						<div class="tab-pane" id="employee">
						</div>
						<div class="tab-pane" id="customer">
						</div>
						<div class="tab-pane" id="contact">
							<button class="btn btn-success pull-right">Add new</button>
							<h3>Phone</h3>
							<?php
								foreach($person->phones as $phone) {
									echo yii\base\View::render("/phone/view",["model" => $phone]);
								}
							?>
							<button class="btn btn-success pull-right">Add new</button>
							<h3>Email</h3>
							<?php
								foreach($person->emails as $email) {
									echo yii\base\View::render("/email/view",["model" => $email]);
								}
							?>
							<button class="btn btn-success pull-right">Add new</button>
							<h3>Address</h3>
							<?php
								foreach($person->addresses as $address) {
									echo yii\base\View::render("/address/view",["model" => $address]);
								}
							?>
						</div>
						<div class="tab-pane" id="social">
							<button class="btn btn-success pull-right">Add new</button>
							<h3>Social</h3>								
							<?php
								foreach($person->socialMedia as $socialmedia) {
									echo yii\base\View::render("/social-media/view",["model" => $socialmedia]);
								}
							?>
						</div>
						<div class="tab-pane" id="comments">
							<button class="btn btn-success pull-right">Add new</button>
							<h3>Comments</h3>								
						</div>
					</div>
				</div>
			</div>
			<div class="panel-footer text-right">
				<div class="btn-group">
					<a class="btn btn-success btn-lg" href="pos_bootstrap_fullperson.html">Continue</a>
					<a class="btn btn-danger btn-lg" href="pos_bootstrap_base.html">Cancel</a>
				</div>						
			</div>
		</div>					
	</div>
</div>
