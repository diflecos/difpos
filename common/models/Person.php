<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "person".
 *
 * @property string $id
 * @property string $nick
 * @property string $name
 * @property string $surname
 * @property string $birthdate
 * @property string $id_card
 * @property string $gender_id
 * @property string $civilstatus_id
 *
 * @property Intervenant[] $intervenants
 * @property Civilstatus $civilstatus
 * @property Gender $gender
 * @property PersonHasAddress[] $personHasAddresses
 * @property Address[] $addresses
 * @property PersonHasEmail[] $personHasEmails
 * @property Email[] $emails
 * @property PersonHasPhone[] $personHasPhones
 * @property Phone[] $phones
 * @property PersonHasSocialMedia[] $personHasSocialMedia
 * @property Socialmedia[] $socialMedia
 */
class Person extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'person';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name', 'surname', 'gender_id', 'civilstatus_id'], 'required'],
            [['birthdate'], 'safe'],
            [['gender_id', 'civilstatus_id'], 'integer'],
            [['nick', 'id_card'], 'string', 'max' => 45],
            [['name', 'surname'], 'string', 'max' => 64]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('person', 'ID'),
            'nick' => Yii::t('person', 'Nick'),
            'name' => Yii::t('person', 'Name'),
            'surname' => Yii::t('person', 'Surname'),
            'birthdate' => Yii::t('person', 'Birthdate'),
            'id_card' => Yii::t('person', 'Id Card'),
            'gender_id' => Yii::t('person', 'Gender ID'),
            'civilstatus_id' => Yii::t('person', 'Civilstatus ID'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getIntervenants()
    {
        return $this->hasMany(Intervenant::className(), ['person_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCivilstatus()
    {
        return $this->hasOne(Civilstatus::className(), ['id' => 'civilstatus_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getGender()
    {
        return $this->hasOne(Gender::className(), ['id' => 'gender_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPersonHasAddresses()
    {
        return $this->hasMany(PersonHasAddress::className(), ['person_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getAddresses()
    {
        return $this->hasMany(Address::className(), ['id' => 'address_id'])->viaTable('person_has_address', ['person_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPersonHasEmails()
    {
        return $this->hasMany(PersonHasEmail::className(), ['person_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getEmails()
    {
        return $this->hasMany(Email::className(), ['id' => 'email_id'])->viaTable('person_has_email', ['person_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPersonHasPhones()
    {
        return $this->hasMany(PersonHasPhone::className(), ['person_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPhones()
    {
        return $this->hasMany(Phone::className(), ['id' => 'phone_id'])->viaTable('person_has_phone', ['person_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPersonHasSocialMedia()
    {
        return $this->hasMany(PersonHasSocialMedia::className(), ['person_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSocialMedia()
    {
        return $this->hasMany(Socialmedia::className(), ['id' => 'social_media_id'])->viaTable('person_has_social_media', ['person_id' => 'id']);
    }
	
	/**
	* Transforms date's format back to mysql's
	* @return boolean
	*/ 
	public function beforeSave($insert){
		if(parent::beforeSave($insert)){	
			$dtime = new \DateTime();
			$dtime = \DateTime::createFromFormat("d/m/Y",$this->birthdate);
			$timestamp = $dtime->getTimestamp();
			$this->birthdate=date('Y-m-d',$timestamp);
			return TRUE;
		}
		else return false;
	}	
}
