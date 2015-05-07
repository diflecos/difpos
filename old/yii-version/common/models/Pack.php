<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "pack".
 *
 * @property string $id
 * @property string $store_id
 * @property string $price_strategy
 * @property double $price_impact
 * @property integer $impact_before_tax
 * @property double $fixed_price
 * @property string $name
 * @property string $desc
 * @property string $comment
 * @property string $conditions
 *
 * @property OrderItem[] $orderItems
 * @property PackComponent[] $packComponents
 */
class Pack extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'pack';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['store_id', 'impact_before_tax'], 'integer'],
            [['price_strategy', 'price_impact', 'name'], 'required'],
            [['price_strategy'], 'string'],
            [['price_impact', 'fixed_price'], 'number'],
            [['name'], 'string', 'max' => 45],
            [['desc', 'comment', 'conditions'], 'string', 'max' => 255]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'store_id' => Yii::t('app', 'Store ID'),
            'price_strategy' => Yii::t('app', 'Price Strategy'),
            'price_impact' => Yii::t('app', 'Price Impact'),
            'impact_before_tax' => Yii::t('app', 'Impact Before Tax'),
            'fixed_price' => Yii::t('app', 'Fixed Price'),
            'name' => Yii::t('app', 'Name'),
            'desc' => Yii::t('app', 'Desc'),
            'comment' => Yii::t('app', 'Comment'),
            'conditions' => Yii::t('app', 'Conditions'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getOrderItems()
    {
        return $this->hasMany(OrderItem::className(), ['pack_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPackComponents()
    {
        return $this->hasMany(PackComponent::className(), ['pack_id' => 'id']);
    }
}
