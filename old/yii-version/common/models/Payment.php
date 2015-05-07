<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "payment".
 *
 * @property string $id
 * @property double $amount
 * @property string $currency_id
 * @property string $datetime
 * @property string $cancellation_payment_id
 *
 * @property CashTransaction[] $cashTransactions
 * @property CheckTransaction[] $checkTransactions
 * @property CouponTransaction[] $couponTransactions
 * @property CreditCardTransaction[] $creditCardTransactions
 * @property DirectDebitTransaction[] $directDebitTransactions
 * @property ElectronicPaymentTransaction[] $electronicPaymentTransactions
 * @property Order[] $orders
 * @property OrderItemReturn[] $orderItemReturns
 * @property Payment $cancellationPayment
 * @property Payment[] $payments
 */
class Payment extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'payment';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['amount'], 'number'],
            [['currency_id', 'cancellation_payment_id'], 'integer'],
            [['datetime'], 'required'],
            [['datetime'], 'safe']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'amount' => Yii::t('app', 'Amount'),
            'currency_id' => Yii::t('app', 'Currency ID'),
            'datetime' => Yii::t('app', 'Datetime'),
            'cancellation_payment_id' => Yii::t('app', 'Cancellation Payment ID'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCashTransactions()
    {
        return $this->hasMany(CashTransaction::className(), ['payment_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCheckTransactions()
    {
        return $this->hasMany(CheckTransaction::className(), ['payment_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCouponTransactions()
    {
        return $this->hasMany(CouponTransaction::className(), ['payment_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCreditCardTransactions()
    {
        return $this->hasMany(CreditCardTransaction::className(), ['payment_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getDirectDebitTransactions()
    {
        return $this->hasMany(DirectDebitTransaction::className(), ['payment_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getElectronicPaymentTransactions()
    {
        return $this->hasMany(ElectronicPaymentTransaction::className(), ['payment_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getOrders()
    {
        return $this->hasMany(Order::className(), ['payment_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getOrderItemReturns()
    {
        return $this->hasMany(OrderItemReturn::className(), ['payment_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCancellationPayment()
    {
        return $this->hasOne(Payment::className(), ['id' => 'cancellation_payment_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPayments()
    {
        return $this->hasMany(Payment::className(), ['cancellation_payment_id' => 'id']);
    }
}
