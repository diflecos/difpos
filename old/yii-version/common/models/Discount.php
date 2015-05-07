<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "discount".
 *
 * @property string $id
 * @property string $special_offer_id
 * @property string $reduction_type
 * @property double $price_impact
 * @property integer $impact_before_tax
 *
 * @property SpecialOffer $specialOffer
 */
class Discount extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'discount';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['special_offer_id', 'reduction_type', 'price_impact'], 'required'],
            [['special_offer_id', 'impact_before_tax'], 'integer'],
            [['reduction_type'], 'string'],
            [['price_impact'], 'number']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'special_offer_id' => Yii::t('app', 'Special Offer ID'),
            'reduction_type' => Yii::t('app', 'Reduction Type'),
            'price_impact' => Yii::t('app', 'Price Impact'),
            'impact_before_tax' => Yii::t('app', 'Impact Before Tax'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSpecialOffer()
    {
        return $this->hasOne(SpecialOffer::className(), ['id' => 'special_offer_id']);
    }
}
