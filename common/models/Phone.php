<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "phone".
 *
 * @property string $id
 * @property string $name
 * @property string $prefix
 * @property string $number
 *
 * @property PersonHasPhone[] $personHasPhones
 * @property Person[] $people
 */
class Phone extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'phone';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['number'], 'required'],
            [['name', 'prefix', 'number'], 'string', 'max' => 45]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('phone', 'ID'),
            'name' => Yii::t('phone', 'Name'),
            'prefix' => Yii::t('phone', 'Prefix'),
            'number' => Yii::t('phone', 'Number'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPersonHasPhones()
    {
        return $this->hasMany(PersonHasPhone::className(), ['phone_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPeople()
    {
        return $this->hasMany(Person::className(), ['id' => 'person_id'])->viaTable('person_has_phone', ['phone_id' => 'id']);
    }
}
