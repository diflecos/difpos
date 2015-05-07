<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "cancellation".
 *
 * @property string $id
 * @property string $session_id
 * @property string $reason
 * @property string $datetime
 *
 * @property Session $session
 * @property CashCount[] $cashCounts
 * @property CashInout[] $cashInouts
 * @property Order[] $orders
 * @property OrderItemReturn[] $orderItemReturns
 */
class Cancellation extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'cancellation';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['session_id', 'reason'], 'required'],
            [['session_id'], 'integer'],
            [['datetime'], 'safe'],
            [['reason'], 'string', 'max' => 255]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'session_id' => Yii::t('app', 'Session ID'),
            'reason' => Yii::t('app', 'Reason'),
            'datetime' => Yii::t('app', 'Datetime'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSession()
    {
        return $this->hasOne(Session::className(), ['id' => 'session_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCashCounts()
    {
        return $this->hasMany(CashCount::className(), ['cancellation_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCashInouts()
    {
        return $this->hasMany(CashInout::className(), ['cancellation_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getOrders()
    {
        return $this->hasMany(Order::className(), ['cancellation_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getOrderItemReturns()
    {
        return $this->hasMany(OrderItemReturn::className(), ['cancellation_id' => 'id']);
    }
}
