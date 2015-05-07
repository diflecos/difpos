<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "civilstatus".
 *
 * @property string $id
 * @property string $name
 */
class CivilStatus extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'civilstatus';
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
            'id' => Yii::t('civilstatus', 'ID'),
            'name' => Yii::t('civilstatus', 'Name'),
        ];
    }
}
