<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "credit_card_transaction".
 *
 * @property string $id
 * @property string $payment_id
 * @property string $flow_direction
 * @property double $amount
 * @property string $currency_id
 * @property string $effective_on
 * @property string $transaction_nbr
 * @property string $credit_card_id
 * @property string $transaction_annulation_id
 *
 * @property CreditCard $creditCard
 * @property Currency $currency
 * @property Payment $payment
 * @property TransactionAnnulation $transactionAnnulation
 */
class CreditCardTransaction extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'credit_card_transaction';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['payment_id', 'amount', 'currency_id', 'credit_card_id'], 'required'],
            [['payment_id', 'currency_id', 'credit_card_id', 'transaction_annulation_id'], 'integer'],
            [['flow_direction'], 'string'],
            [['amount'], 'number'],
            [['effective_on'], 'safe'],
            [['transaction_nbr'], 'string', 'max' => 45]
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
            'transaction_nbr' => Yii::t('app', 'Transaction Nbr'),
            'credit_card_id' => Yii::t('app', 'Credit Card ID'),
            'transaction_annulation_id' => Yii::t('app', 'Transaction Annulation ID'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCreditCard()
    {
        return $this->hasOne(CreditCard::className(), ['id' => 'credit_card_id']);
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
