<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "cash_amount_bd".
 *
 * @property string $id
 * @property string $cash_amount_id
 * @property string $bill_coin_type_id
 * @property string $quantity
 *
 * @property BillCoinType $billCoinType
 * @property CashCount $cashAmount
 */
class CashAmountBd extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'cash_amount_bd';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['cash_amount_id', 'bill_coin_type_id', 'quantity'], 'required'],
            [['cash_amount_id', 'bill_coin_type_id', 'quantity'], 'integer']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'cash_amount_id' => Yii::t('app', 'Cash Amount ID'),
            'bill_coin_type_id' => Yii::t('app', 'Bill Coin Type ID'),
            'quantity' => Yii::t('app', 'Quantity'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getBillCoinType()
    {
        return $this->hasOne(BillCoinType::className(), ['id' => 'bill_coin_type_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCashAmount()
    {
        return $this->hasOne(CashCount::className(), ['id' => 'cash_amount_id']);
    }
}
