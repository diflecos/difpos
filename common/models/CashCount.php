<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "cash_count".
 *
 * @property string $id
 * @property string $session_id
 * @property string $type
 * @property string $datetime
 * @property string $cancellation_id
 *
 * @property CashAmountBd[] $cashAmountBds
 * @property Cancellation $cancellation
 * @property Session $session
 */
class CashCount extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'cash_count';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['session_id', 'datetime'], 'required'],
            [['session_id', 'cancellation_id'], 'integer'],
            [['type'], 'string'],
            [['datetime'], 'safe']
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'session_id' => Yii::t('app', 'Session ID'),
            'type' => Yii::t('app', 'Type'),
            'datetime' => Yii::t('app', 'Datetime'),
            'cancellation_id' => Yii::t('app', 'Cancellation ID'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCashAmountBds()
    {
        return $this->hasMany(CashAmountBd::className(), ['cash_amount_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCancellation()
    {
        return $this->hasOne(Cancellation::className(), ['id' => 'cancellation_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSession()
    {
        return $this->hasOne(Session::className(), ['id' => 'session_id']);
    }
}
