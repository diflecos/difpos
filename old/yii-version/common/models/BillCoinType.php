<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "bill_coin_type".
 *
 * @property string $id
 * @property double $amount
 * @property string $currency_id
 * @property integer $bill
 * @property integer $coin
 *
 * @property Currency $currency
 * @property CashAmountBd[] $cashAmountBds
 */
class BillCoinType extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'bill_coin_type';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['amount', 'currency_id', 'bill', 'coin'], 'required'],
            [['amount'], 'number'],
            [['currency_id', 'bill', 'coin'], 'integer']
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
            'bill' => Yii::t('app', 'Bill'),
            'coin' => Yii::t('app', 'Coin'),
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
    public function getCashAmountBds()
    {
        return $this->hasMany(CashAmountBd::className(), ['bill_coin_type_id' => 'id']);
    }
}
