<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "person_has_social_media".
 *
 * @property string $person_id
 * @property string $social_media_id
 *
 * @property Person $person
 * @property SocialMedia $socialMedia
 */
class PersonHasSocialMedia extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'person_has_social_media';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['person_id', 'social_media_id'], 'required'],
            [['person_id', 'social_media_id'], 'integer']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'person_id' => Yii::t('app', 'Person ID'),
            'social_media_id' => Yii::t('app', 'Social Media ID'),
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
    public function getSocialMedia()
    {
        return $this->hasOne(SocialMedia::className(), ['id' => 'social_media_id']);
    }
}
