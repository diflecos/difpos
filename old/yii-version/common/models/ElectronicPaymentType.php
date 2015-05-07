<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "electronic_payment_type".
 *
 * @property string $id
 * @property string $name
 *
 * @property ElectronicPaymentTransaction[] $electronicPaymentTransactions
 */
class ElectronicPaymentType extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'electronic_payment_type';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name'], 'string', 'max' => 45]
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
    public function getElectronicPaymentTransactions()
    {
        return $this->hasMany(ElectronicPaymentTransaction::className(), ['electronic_payment_type_id' => 'id']);
    }
}
