<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "session".
 *
 * @property string $id
 * @property string $user_id
 * @property string $status
 * @property string $init
 * @property string $end
 * @property integer $verification_ok
 * @property string $ip
 * @property string $agent
 *
 * @property Cancellation[] $cancellations
 * @property CashCount[] $cashCounts
 * @property CashInout[] $cashInouts
 * @property Order[] $orders
 * @property OrderItemReturn[] $orderItemReturns
 * @property User $user
 * @property SessionComment[] $sessionComments
 * @property TransactionAnnulation[] $transactionAnnulations
 */
class Session extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'session';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['user_id', 'init'], 'required'],
            [['user_id', 'verification_ok'], 'integer'],
            [['status'], 'string'],
            [['init', 'end'], 'safe'],
            [['ip', 'agent'], 'string', 'max' => 45]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('session', 'ID'),
            'user_id' => Yii::t('session', 'User ID'),
            'status' => Yii::t('session', 'Status'),
            'init' => Yii::t('session', 'Init'),
            'end' => Yii::t('session', 'End'),
            'verification_ok' => Yii::t('session', 'Verification Ok'),
            'ip' => Yii::t('session', 'Ip'),
            'agent' => Yii::t('session', 'Agent'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCancellations()
    {
        return $this->hasMany(Cancellation::className(), ['session_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCashCounts()
    {
        return $this->hasMany(CashCount::className(), ['session_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCashInouts()
    {
        return $this->hasMany(CashInout::className(), ['session_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getOrders()
    {
        return $this->hasMany(Order::className(), ['session_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getOrderItemReturns()
    {
        return $this->hasMany(OrderItemReturn::className(), ['session_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::className(), ['id' => 'user_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSessionComments()
    {
        return $this->hasMany(SessionComment::className(), ['session_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTransactionAnnulations()
    {
        return $this->hasMany(TransactionAnnulation::className(), ['session_id' => 'id']);
    }
}
