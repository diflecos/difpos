<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "order_item".
 *
 * @property string $id
 * @property string $order_id
 * @property string $type
 * @property string $name
 * @property string $shortdesc
 * @property double $price
 * @property string $currency_id
 * @property double $tax_percentage
 * @property string $special_offer_id
 * @property string $pack_id
 * @property string $service_catalog_id
 *
 * @property Item[] $items
 * @property Currency $currency
 * @property Pack $pack
 * @property SpecialOffer $specialOffer
 * @property OrderItemReturn[] $orderItemReturns
 */
class OrderItem extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'order_item';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['order_id', 'type', 'currency_id', 'tax_percentage', 'service_catalog_id'], 'required'],
            [['order_id', 'currency_id', 'special_offer_id', 'pack_id', 'service_catalog_id'], 'integer'],
            [['type'], 'string'],
            [['price', 'tax_percentage'], 'number'],
            [['name', 'shortdesc'], 'string', 'max' => 45]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'order_id' => Yii::t('app', 'Order ID'),
            'type' => Yii::t('app', 'Type'),
            'name' => Yii::t('app', 'Name'),
            'shortdesc' => Yii::t('app', 'Shortdesc'),
            'price' => Yii::t('app', 'Price'),
            'currency_id' => Yii::t('app', 'Currency ID'),
            'tax_percentage' => Yii::t('app', 'Tax Percentage'),
            'special_offer_id' => Yii::t('app', 'Special Offer ID'),
            'pack_id' => Yii::t('app', 'Pack ID'),
            'service_catalog_id' => Yii::t('app', 'Service Catalog ID'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getItems()
    {
        return $this->hasMany(Item::className(), ['order_item_id' => 'id']);
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
    public function getPack()
    {
        return $this->hasOne(Pack::className(), ['id' => 'pack_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSpecialOffer()
    {
        return $this->hasOne(SpecialOffer::className(), ['id' => 'special_offer_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getOrderItemReturns()
    {
        return $this->hasMany(OrderItemReturn::className(), ['order_item_id' => 'id']);
    }
}
