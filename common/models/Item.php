<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "item".
 *
 * @property string $id
 * @property double $tax_amount
 * @property double $discount_amount
 * @property string $order_item_id
 * @property string $pack_component_id
 * @property string $category_id
 *
 * @property Category $category
 * @property OrderItem $orderItem
 * @property PackComponent $packComponent
 */
class Item extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'item';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['tax_amount'], 'required'],
            [['tax_amount', 'discount_amount'], 'number'],
            [['order_item_id', 'pack_component_id', 'category_id'], 'integer']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'tax_amount' => Yii::t('app', 'Tax Amount'),
            'discount_amount' => Yii::t('app', 'Discount Amount'),
            'order_item_id' => Yii::t('app', 'Order Item ID'),
            'pack_component_id' => Yii::t('app', 'Pack Component ID'),
            'category_id' => Yii::t('app', 'Category ID'),
        ];
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
    public function getOrderItem()
    {
        return $this->hasOne(OrderItem::className(), ['id' => 'order_item_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPackComponent()
    {
        return $this->hasOne(PackComponent::className(), ['id' => 'pack_component_id']);
    }
}
