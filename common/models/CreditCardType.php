<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "credit_card_type".
 *
 * @property string $id
 * @property string $name
 *
 * @property CreditCard[] $creditCards
 */
class CreditCardType extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'credit_card_type';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name'], 'required'],
            [['name'], 'string', 'max' => 45],
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
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCreditCards()
    {
        return $this->hasMany(CreditCard::className(), ['credit_card_type_id' => 'id']);
    }
}
