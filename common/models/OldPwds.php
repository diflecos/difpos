<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "old_pwds".
 *
 * @property string $id
 * @property string $user_id
 * @property string $pwd
 *
 * @property User $user
 */
class OldPwds extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'old_pwds';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['user_id', 'pwd'], 'required'],
            [['user_id'], 'integer'],
            [['pwd'], 'string', 'max' => 45]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'user_id' => Yii::t('app', 'User ID'),
            'pwd' => Yii::t('app', 'Pwd'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::className(), ['id' => 'user_id']);
    }
}
