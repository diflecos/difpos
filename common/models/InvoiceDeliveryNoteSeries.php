<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "invoice_delivery_note_series".
 *
 * @property string $id
 * @property string $type
 * @property string $name
 * @property string $desc
 * @property string $series_code
 *
 * @property Order[] $orders
 */
class InvoiceDeliveryNoteSeries extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'invoice_delivery_note_series';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['type', 'name', 'series_code'], 'required'],
            [['type'], 'string'],
            [['name'], 'string', 'max' => 45],
            [['desc'], 'string', 'max' => 255],
            [['series_code'], 'string', 'max' => 10],
            [['name'], 'unique'],
            [['series_code'], 'unique']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'type' => Yii::t('app', 'Type'),
            'name' => Yii::t('app', 'Name'),
            'desc' => Yii::t('app', 'Desc'),
            'series_code' => Yii::t('app', 'Series Code'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getOrders()
    {
        return $this->hasMany(Order::className(), ['invoice_series_id' => 'id']);
    }
}
