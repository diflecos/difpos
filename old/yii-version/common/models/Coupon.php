<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "coupon".
 *
 * @property string $id
 * @property string $code
 * @property double $amount
 * @property string $currency_id
 * @property integer $valid
 *
 * @property Currency $currency
 * @property CouponTransaction[] $couponTransactions
 */
class Coupon extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'coupon';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['amount'], 'number'],
            [['currency_id', 'valid'], 'required'],
            [['currency_id', 'valid'], 'integer'],
            [['code'], 'string', 'max' => 45]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'code' => Yii::t('app', 'Code'),
            'amount' => Yii::t('app', 'Amount'),
            'currency_id' => Yii::t('app', 'Currency ID'),
            'valid' => Yii::t('app', 'Valid'),
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
    public function getCouponTransactions()
    {
        return $this->hasMany(CouponTransaction::className(), ['coupon_id' => 'id']);
    }
}
