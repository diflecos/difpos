<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "volume_discount_range".
 *
 * @property string $id
 * @property string $special_offer_id
 * @property string $start_nbr
 * @property string $end_nbr
 * @property string $reduction_type
 * @property double $total_price_impact
 * @property double $unit_price_impact
 * @property integer $impact_before_tax
 *
 * @property SpecialOffer $specialOffer
 */
class VolumeDiscountRange extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'volume_discount_range';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['special_offer_id', 'start_nbr', 'end_nbr', 'reduction_type'], 'required'],
            [['special_offer_id', 'start_nbr', 'end_nbr', 'impact_before_tax'], 'integer'],
            [['reduction_type'], 'string'],
            [['total_price_impact', 'unit_price_impact'], 'number']
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
            'start_nbr' => Yii::t('app', 'Start Nbr'),
            'end_nbr' => Yii::t('app', 'End Nbr'),
            'reduction_type' => Yii::t('app', 'Reduction Type'),
            'total_price_impact' => Yii::t('app', 'Total Price Impact'),
            'unit_price_impact' => Yii::t('app', 'Unit Price Impact'),
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
