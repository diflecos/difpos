<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "item_return_reason".
 *
 * @property string $id
 * @property string $name
 *
 * @property OrderItemReturn[] $orderItemReturns
 */
class ItemReturnReason extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'item_return_reason';
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
    public function getOrderItemReturns()
    {
        return $this->hasMany(OrderItemReturn::className(), ['item_return_reason_id' => 'id']);
    }
}
