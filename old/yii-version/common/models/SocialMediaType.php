<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "socialmediatype".
 *
 * @property string $id
 * @property string $name
 *
 * @property Socialmedia[] $socialmedia
 */
class SocialMediaType extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'socialmediatype';
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
            'id' => Yii::t('socialmediatype', 'ID'),
            'name' => Yii::t('socialmediatype', 'Name'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSocialmedia()
    {
        return $this->hasMany(Socialmedia::className(), ['social_media_type_id' => 'id']);
    }
}
