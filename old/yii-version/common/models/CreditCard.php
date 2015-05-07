<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "credit_card".
 *
 * @property string $id
 * @property string $nbr
 * @property string $cvv
 * @property string $identifiant
 * @property string $validity_date
 * @property string $credit_card_type_id
 *
 * @property CreditCardType $creditCardType
 * @property CreditCardTransaction[] $creditCardTransactions
 */
class CreditCard extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'credit_card';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['validity_date'], 'safe'],
            [['credit_card_type_id'], 'required'],
            [['credit_card_type_id'], 'integer'],
            [['nbr', 'cvv', 'identifiant'], 'string', 'max' => 45]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'nbr' => Yii::t('app', 'Nbr'),
            'cvv' => Yii::t('app', 'Cvv'),
            'identifiant' => Yii::t('app', 'Identifiant'),
            'validity_date' => Yii::t('app', 'Validity Date'),
            'credit_card_type_id' => Yii::t('app', 'Credit Card Type ID'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCreditCardType()
    {
        return $this->hasOne(CreditCardType::className(), ['id' => 'credit_card_type_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCreditCardTransactions()
    {
        return $this->hasMany(CreditCardTransaction::className(), ['credit_card_id' => 'id']);
    }
}
