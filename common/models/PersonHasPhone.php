<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "person_has_phone".
 *
 * @property string $person_id
 * @property string $phone_id
 *
 * @property Person $person
 * @property Phone $phone
 */
class PersonHasPhone extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'person_has_phone';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['person_id', 'phone_id'], 'required'],
            [['person_id', 'phone_id'], 'integer']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'person_id' => Yii::t('app', 'Person ID'),
            'phone_id' => Yii::t('app', 'Phone ID'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPerson()
    {
        return $this->hasOne(Person::className(), ['id' => 'person_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPhone()
    {
        return $this->hasOne(Phone::className(), ['id' => 'phone_id']);
    }
}
