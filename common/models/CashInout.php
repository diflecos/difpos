<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "cash_inout".
 *
 * @property string $id
 * @property string $session_id
 * @property string $cash_operation_type
 * @property double $amount
 * @property string $concept
 * @property string $comment
 * @property string $who
 * @property string $datetime
 * @property string $cancellation_id
 *
 * @property Cancellation $cancellation
 * @property Session $session
 */
class CashInout extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'cash_inout';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['session_id', 'cash_operation_type', 'amount', 'concept', 'who', 'datetime'], 'required'],
            [['session_id', 'cancellation_id'], 'integer'],
            [['cash_operation_type'], 'string'],
            [['amount'], 'number'],
            [['datetime'], 'safe'],
            [['concept', 'comment', 'who'], 'string', 'max' => 255]
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
            'cash_operation_type' => Yii::t('app', 'Cash Operation Type'),
            'amount' => Yii::t('app', 'Amount'),
            'concept' => Yii::t('app', 'Concept'),
            'comment' => Yii::t('app', 'Comment'),
            'who' => Yii::t('app', 'Who'),
            'datetime' => Yii::t('app', 'Datetime'),
            'cancellation_id' => Yii::t('app', 'Cancellation ID'),
        ];
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
