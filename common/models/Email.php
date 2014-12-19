<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "email".
 *
 * @property string $id
 * @property string $name
 * @property string $email
 *
 * @property PersonHasEmail[] $personHasEmails
 * @property Person[] $people
 */
class Email extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'email';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name', 'email'], 'required'],
            [['name', 'email'], 'string', 'max' => 45],
            [['email'], 'unique']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('email', 'ID'),
            'name' => Yii::t('email', 'Name'),
            'email' => Yii::t('email', 'Email'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPersonHasEmails()
    {
        return $this->hasMany(PersonHasEmail::className(), ['email_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPeople()
    {
        return $this->hasMany(Person::className(), ['id' => 'person_id'])->viaTable('person_has_email', ['email_id' => 'id']);
    }
}
