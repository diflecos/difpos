<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "pack_component".
 *
 * @property string $id
 * @property string $pack_id
 * @property string $store_id
 * @property string $category_id
 * @property string $product_id
 * @property string $product_variant_id
 *
 * @property Item[] $items
 * @property Category $category
 * @property Pack $pack
 */
class PackComponent extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'pack_component';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['pack_id'], 'required'],
            [['pack_id', 'store_id', 'category_id', 'product_id', 'product_variant_id'], 'integer']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'pack_id' => Yii::t('app', 'Pack ID'),
            'store_id' => Yii::t('app', 'Store ID'),
            'category_id' => Yii::t('app', 'Category ID'),
            'product_id' => Yii::t('app', 'Product ID'),
            'product_variant_id' => Yii::t('app', 'Product Variant ID'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getItems()
    {
        return $this->hasMany(Item::className(), ['pack_component_id' => 'id']);
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
    public function getPack()
    {
        return $this->hasOne(Pack::className(), ['id' => 'pack_id']);
    }
}
