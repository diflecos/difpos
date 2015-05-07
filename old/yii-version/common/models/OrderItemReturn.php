<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "order_item_return".
 *
 * @property string $id
 * @property string $session_id
 * @property string $order_item_id
 * @property string $item_return_reason_id
 * @property string $comment
 * @property integer $refund
 * @property string $cancellation_id
 * @property string $payment_id
 *
 * @property Cancellation $cancellation
 * @property ItemReturnReason $itemReturnReason
 * @property Session $session
 * @property Payment $payment
 * @property OrderItem $orderItem
 */
class OrderItemReturn extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'order_item_return';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['session_id', 'order_item_id', 'item_return_reason_id', 'payment_id'], 'required'],
            [['session_id', 'order_item_id', 'item_return_reason_id', 'refund', 'cancellation_id', 'payment_id'], 'integer'],
            [['comment'], 'string', 'max' => 255]
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
            'order_item_id' => Yii::t('app', 'Order Item ID'),
            'item_return_reason_id' => Yii::t('app', 'Item Return Reason ID'),
            'comment' => Yii::t('app', 'Comment'),
            'refund' => Yii::t('app', 'Refund'),
            'cancellation_id' => Yii::t('app', 'Cancellation ID'),
            'payment_id' => Yii::t('app', 'Payment ID'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCancellation()
    {
        return $this->hasOne(Cancellation::className(), ['id' => 'cancellation_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getItemReturnReason()
    {
        return $this->hasOne(ItemReturnReason::className(), ['id' => 'item_return_reason_id']);
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
    public function getPayment()
    {
        return $this->hasOne(Payment::className(), ['id' => 'payment_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getOrderItem()
    {
        return $this->hasOne(OrderItem::className(), ['id' => 'order_item_id']);
    }
}
