<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "electronic_payment_transaction".
 *
 * @property string $id
 * @property string $payment_id
 * @property string $flow_direction
 * @property double $amount
 * @property string $currency_id
 * @property string $effective_on
 * @property string $electronic_payment_type_id
 * @property string $transaction_id
 * @property string $identifiant
 * @property string $transaction_annulation_id
 *
 * @property Currency $currency
 * @property ElectronicPaymentType $electronicPaymentType
 * @property Payment $payment
 * @property TransactionAnnulation $transactionAnnulation
 */
class ElectronicPaymentTransaction extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'electronic_payment_transaction';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['payment_id', 'amount', 'currency_id', 'electronic_payment_type_id'], 'required'],
            [['payment_id', 'currency_id', 'electronic_payment_type_id', 'transaction_annulation_id'], 'integer'],
            [['flow_direction'], 'string'],
            [['amount'], 'number'],
            [['effective_on'], 'safe'],
            [['transaction_id', 'identifiant'], 'string', 'max' => 45]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'payment_id' => Yii::t('app', 'Payment ID'),
            'flow_direction' => Yii::t('app', 'Flow Direction'),
            'amount' => Yii::t('app', 'Amount'),
            'currency_id' => Yii::t('app', 'Currency ID'),
            'effective_on' => Yii::t('app', 'Effective On'),
            'electronic_payment_type_id' => Yii::t('app', 'Electronic Payment Type ID'),
            'transaction_id' => Yii::t('app', 'Transaction ID'),
            'identifiant' => Yii::t('app', 'Identifiant'),
            'transaction_annulation_id' => Yii::t('app', 'Transaction Annulation ID'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCurrency()
    {
        return $this->hasOne(Currency::className(), ['id' => 'currency_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getElectronicPaymentType()
    {
        return $this->hasOne(ElectronicPaymentType::className(), ['id' => 'electronic_payment_type_id']);
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
    public function getTransactionAnnulation()
    {
        return $this->hasOne(TransactionAnnulation::className(), ['id' => 'transaction_annulation_id']);
    }
}
