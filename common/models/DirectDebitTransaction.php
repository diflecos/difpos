<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "direct_debit_transaction".
 *
 * @property string $id
 * @property string $payment_id
 * @property string $flow_direction
 * @property double $amount
 * @property string $currency_id
 * @property string $effective_on
 * @property string $customer_bank_account_nbr
 * @property string $identifiant
 * @property string $concept
 * @property string $transaction_annulation_id
 * @property string $direct_debit_file_id
 *
 * @property Currency $currency
 * @property Payment $payment
 * @property TransactionAnnulation $transactionAnnulation
 */
class DirectDebitTransaction extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'direct_debit_transaction';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['payment_id', 'flow_direction', 'amount', 'currency_id', 'customer_bank_account_nbr', 'identifiant', 'concept', 'direct_debit_file_id'], 'required'],
            [['payment_id', 'currency_id', 'transaction_annulation_id', 'direct_debit_file_id'], 'integer'],
            [['flow_direction'], 'string'],
            [['amount'], 'number'],
            [['effective_on'], 'safe'],
            [['customer_bank_account_nbr', 'identifiant', 'concept'], 'string', 'max' => 45]
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
            'customer_bank_account_nbr' => Yii::t('app', 'Customer Bank Account Nbr'),
            'identifiant' => Yii::t('app', 'Identifiant'),
            'concept' => Yii::t('app', 'Concept'),
            'transaction_annulation_id' => Yii::t('app', 'Transaction Annulation ID'),
            'direct_debit_file_id' => Yii::t('app', 'Direct Debit File ID'),
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
