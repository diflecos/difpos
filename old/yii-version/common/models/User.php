<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "user".
 *
 * @property string $id
 * @property string $userprofile_id
 * @property string $username
 * @property string $userpass
 * @property string $last_login
 * @property integer $active
 *
 * @property Intervenant[] $intervenants
 * @property OldPwds[] $oldPwds
 * @property Pref[] $prefs
 * @property Session[] $sessions
 * @property SessionComment[] $sessionComments
 */
class User extends \yii\db\ActiveRecord implements \yii\web\IdentityInterface
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'user';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['userprofile_id', 'username', 'userpass'], 'required'],
            [['userprofile_id', 'active'], 'integer'],
            [['last_login'], 'safe'],
            [['username', 'userpass'], 'string', 'max' => 32]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'userprofile_id' => Yii::t('app', 'Userprofile ID'),
            'username' => Yii::t('app', 'Username'),
            'userpass' => Yii::t('app', 'Userpass'),
            'last_login' => Yii::t('app', 'Last Login'),
            'active' => Yii::t('app', 'Active'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getIntervenants()
    {
        return $this->hasMany(Intervenant::className(), ['user_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getOldPwds()
    {
        return $this->hasMany(OldPwds::className(), ['user_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPrefs()
    {
        return $this->hasMany(Pref::className(), ['user_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSessions()
    {
        return $this->hasMany(Session::className(), ['user_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSessionComments()
    {
        return $this->hasMany(SessionComment::className(), ['user_id' => 'id']);
    }

    /**
     * Finds an identity by the given ID.
     *
     * @param string|integer $id the ID to be looked for
     * @return IdentityInterface|null the identity object that matches the given ID.
     */
    public static function findByUsername($username)
    {
        return static::findOne(['username' => $username]);
    }
	
    /**
     * Finds an identity by the given ID.
     *
     * @param string|integer $id the ID to be looked for
     * @return IdentityInterface|null the identity object that matches the given ID.
     */
    public static function findIdentity($id)
    {
        return static::findOne($id);
    }

    /**
     * Finds an identity by the given token.
     *
     * @param string $token the token to be looked for
     * @return IdentityInterface|null the identity object that matches the given token.
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        return static::findOne(['access_token' => $token]);
    }

    /**
     * @return int|string current user ID
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string current user auth key
     */
    public function getAuthKey()
    {
        return Yii::$app->getSecurity()->generateRandomString();
    }

    /**
     * @param string $authKey
     * @return boolean if auth key is valid for current user
     */
    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }		

    /**
     * @param string $password
     * @return boolean if $password is equal than current user's password
     */
    public function validatePassword($password)
    {
        return $this->userpass === $password;
    }		
}
