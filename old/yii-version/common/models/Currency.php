<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "currency".
 *
 * @property string $id
 * @property string $name
 * @property string $abbr
 * @property string $symbol
 *
 * @property BillCoinType[] $billCoinTypes
 * @property CashTransaction[] $cashTransactions
 * @property CheckTransaction[] $checkTransactions
 * @property Coupon[] $coupons
 * @property CouponTransaction[] $couponTransactions
 * @property CreditCardTransaction[] $creditCardTransactions
 * @property DirectDebitTransaction[] $directDebitTransactions
 * @property ElectronicPaymentTransaction[] $electronicPaymentTransactions
 * @property OrderItem[] $orderItems
 */
class Currency extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'currency';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name', 'abbr', 'symbol'], 'required'],
            [['name'], 'string', 'max' => 45],
            [['abbr'], 'string', 'max' => 12],
            [['symbol'], 'string', 'max' => 3],
            [['name'], 'unique']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'name' => Yii::t('app', 'Name'),
            'abbr' => Yii::t('app', 'Abbr'),
            'symbol' => Yii::t('app', 'Symbol'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getBillCoinTypes()
    {
        return $this->hasMany(BillCoinType::className(), ['currency_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCashTransactions()
    {
        return $this->hasMany(CashTransaction::className(), ['currency_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCheckTransactions()
    {
        return $this->hasMany(CheckTransaction::className(), ['currency_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCoupons()
    {
        return $this->hasMany(Coupon::className(), ['currency_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCouponTransactions()
    {
        return $this->hasMany(CouponTransaction::className(), ['currency_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCreditCardTransactions()
    {
        return $this->hasMany(CreditCardTransaction::className(), ['currency_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getDirectDebitTransactions()
    {
        return $this->hasMany(DirectDebitTransaction::className(), ['currency_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getElectronicPaymentTransactions()
    {
        return $this->hasMany(ElectronicPaymentTransaction::className(), ['currency_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getOrderItems()
    {
        return $this->hasMany(OrderItem::className(), ['currency_id' => 'id']);
    }
}
