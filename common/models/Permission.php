<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "permission".
 *
 * @property string $id
 * @property string $_table
 * @property integer $_insert
 * @property integer $_update
 * @property integer $_delete
 * @property integer $_select
 * @property integer $_list
 * @property string $createdby_id
 * @property string $createdon
 * @property string $lastmodby_id
 * @property string $lastmodon
 * @property string $user_profile_id
 *
 * @property UserProfile $userProfile
 */
class Permission extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'permission';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['_table', 'createdby_id', 'user_profile_id'], 'required'],
            [['_insert', '_update', '_delete', '_select', '_list', 'createdby_id', 'lastmodby_id', 'user_profile_id'], 'integer'],
            [['createdon', 'lastmodon'], 'safe'],
            [['_table'], 'string', 'max' => 45]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            '_table' => Yii::t('app', 'Table'),
            '_insert' => Yii::t('app', 'Insert'),
            '_update' => Yii::t('app', 'Update'),
            '_delete' => Yii::t('app', 'Delete'),
            '_select' => Yii::t('app', 'Select'),
            '_list' => Yii::t('app', 'List'),
            'createdby_id' => Yii::t('app', 'Createdby ID'),
            'createdon' => Yii::t('app', 'Createdon'),
            'lastmodby_id' => Yii::t('app', 'Lastmodby ID'),
            'lastmodon' => Yii::t('app', 'Lastmodon'),
            'user_profile_id' => Yii::t('app', 'User Profile ID'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUserProfile()
    {
        return $this->hasOne(UserProfile::className(), ['id' => 'user_profile_id']);
    }
}
