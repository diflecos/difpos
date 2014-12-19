<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "special_offer".
 *
 * @property string $id
 * @property string $name
 * @property string $description
 * @property string $type
 * @property string $applies_to
 * @property integer $active
 * @property string $valid_from
 * @property string $valid_to
 * @property string $store_id
 * @property string $category_id
 * @property string $product_id
 * @property string $product_variant_id
 * @property integer $exclusive_offer
 *
 * @property Discount[] $discounts
 * @property OrderItem[] $orderItems
 * @property Category $category
 * @property VolumeDiscountRange[] $volumeDiscountRanges
 */
class SpecialOffer extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'special_offer';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name', 'type', 'applies_to', 'valid_from', 'valid_to'], 'required'],
            [['type', 'applies_to'], 'string'],
            [['active', 'store_id', 'category_id', 'product_id', 'product_variant_id', 'exclusive_offer'], 'integer'],
            [['valid_from', 'valid_to'], 'safe'],
            [['name'], 'string', 'max' => 45],
            [['description'], 'string', 'max' => 255],
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
            'description' => Yii::t('app', 'Description'),
            'type' => Yii::t('app', 'Type'),
            'applies_to' => Yii::t('app', 'Applies To'),
            'active' => Yii::t('app', 'Active'),
            'valid_from' => Yii::t('app', 'Valid From'),
            'valid_to' => Yii::t('app', 'Valid To'),
            'store_id' => Yii::t('app', 'Store ID'),
            'category_id' => Yii::t('app', 'Category ID'),
            'product_id' => Yii::t('app', 'Product ID'),
            'product_variant_id' => Yii::t('app', 'Product Variant ID'),
            'exclusive_offer' => Yii::t('app', 'Exclusive Offer'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getDiscounts()
    {
        return $this->hasMany(Discount::className(), ['special_offer_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getOrderItems()
    {
        return $this->hasMany(OrderItem::className(), ['special_offer_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCategory()
    {
        return $this->hasOne(Category::className(), ['id' => 'category_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getVolumeDiscountRanges()
    {
        return $this->hasMany(VolumeDiscountRange::className(), ['special_offer_id' => 'id']);
    }
}
