<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "category".
 *
 * @property string $id
 * @property string $parent_category_id
 * @property string $name
 * @property string $shortdesc
 * @property string $desc
 *
 * @property Category $parentCategory
 * @property Category[] $categories
 * @property Item[] $items
 * @property PackComponent[] $packComponents
 * @property SpecialOffer[] $specialOffers
 */
class Category extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'category';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['parent_category_id'], 'integer'],
            [['name', 'shortdesc'], 'string', 'max' => 45],
            [['desc'], 'string', 'max' => 255]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'parent_category_id' => Yii::t('app', 'Parent Category ID'),
            'name' => Yii::t('app', 'Name'),
            'shortdesc' => Yii::t('app', 'Shortdesc'),
            'desc' => Yii::t('app', 'Desc'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getParentCategory()
    {
        return $this->hasOne(Category::className(), ['id' => 'parent_category_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCategories()
    {
        return $this->hasMany(Category::className(), ['parent_category_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getItems()
    {
        return $this->hasMany(Item::className(), ['category_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPackComponents()
    {
        return $this->hasMany(PackComponent::className(), ['category_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSpecialOffers()
    {
        return $this->hasMany(SpecialOffer::className(), ['category_id' => 'id']);
    }
}
