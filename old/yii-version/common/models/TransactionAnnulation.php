<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "transaction_annulation".
 *
 * @property string $id
 * @property string $session_id
 * @property string $reason
 * @property string $datetime
 *
 * @property CashTransaction[] $cashTransactions
 * @property CheckTransaction[] $checkTransactions
 * @property CouponTransaction[] $couponTransactions
 * @property CreditCardTransaction[] $creditCardTransactions
 * @property DirectDebitTransaction[] $directDebitTransactions
 * @property ElectronicPaymentTransaction[] $electronicPaymentTransactions
 * @property Session $session
 */
class TransactionAnnulation extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'transaction_annulation';
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
            [['reason'], 'string', 'max' => 45]
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
    public function getCashTransactions()
    {
        return $this->hasMany(CashTransaction::className(), ['transaction_annulation_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCheckTransactions()
    {
        return $this->hasMany(CheckTransaction::className(), ['transaction_annulation_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCouponTransactions()
    {
        return $this->hasMany(CouponTransaction::className(), ['transaction_annulation_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCreditCardTransactions()
    {
        return $this->hasMany(CreditCardTransaction::className(), ['transaction_annulation_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getDirectDebitTransactions()
    {
        return $this->hasMany(DirectDebitTransaction::className(), ['transaction_annulation_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getElectronicPaymentTransactions()
    {
        return $this->hasMany(ElectronicPaymentTransaction::className(), ['transaction_annulation_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSession()
    {
        return $this->hasOne(Session::className(), ['id' => 'session_id']);
    }
}
