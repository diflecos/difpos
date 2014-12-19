<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "socialmedia".
 *
 * @property string $id
 * @property string $name
 * @property string $social_media_type_id
 * @property string $data
 *
 * @property PersonHasSocialMedia[] $personHasSocialMedia
 * @property Person[] $people
 * @property Socialmediatype $socialMediaType
 */
class SocialMedia extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'socialmedia';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name', 'social_media_type_id', 'data'], 'required'],
            [['social_media_type_id'], 'integer'],
            [['name', 'data'], 'string', 'max' => 45]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('socialmedia', 'ID'),
            'name' => Yii::t('socialmedia', 'Name'),
            'social_media_type_id' => Yii::t('socialmedia', 'Social Media Type ID'),
            'data' => Yii::t('socialmedia', 'Data'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPersonHasSocialMedia()
    {
        return $this->hasMany(PersonHasSocialMedia::className(), ['social_media_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPeople()
    {
        return $this->hasMany(Person::className(), ['id' => 'person_id'])->viaTable('person_has_social_media', ['social_media_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSocialMediaType()
    {
        return $this->hasOne(Socialmediatype::className(), ['id' => 'social_media_type_id']);
    }
}
