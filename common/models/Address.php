<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "address".
 *
 * @property string $id
 * @property string $name
 * @property string $street
 * @property string $town
 * @property string $zipcode
 * @property string $country_region_id
 * @property string $country_id
 *
 * @property Country $country
 * @property Countryregion $countryRegion
 * @property PersonHasAddress[] $personHasAddresses
 * @property Person[] $people
 */
class Address extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'address';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name', 'street', 'town', 'country_region_id', 'country_id'], 'required'],
            [['country_region_id', 'country_id'], 'integer'],
            [['name', 'street', 'town', 'zipcode'], 'string', 'max' => 45]
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('address', 'ID'),
            'name' => Yii::t('address', 'Name'),
            'street' => Yii::t('address', 'Street'),
            'town' => Yii::t('address', 'Town'),
            'zipcode' => Yii::t('address', 'Zipcode'),
            'country_region_id' => Yii::t('address', 'Country Region ID'),
            'country_id' => Yii::t('address', 'Country ID'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCountry()
    {
        return $this->hasOne(Country::className(), ['id' => 'country_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCountryRegion()
    {
        return $this->hasOne(Countryregion::className(), ['id' => 'country_region_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPersonHasAddresses()
    {
        return $this->hasMany(PersonHasAddress::className(), ['address_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPeople()
    {
        return $this->hasMany(Person::className(), ['id' => 'person_id'])->viaTable('person_has_address', ['address_id' => 'id']);
    }
}
