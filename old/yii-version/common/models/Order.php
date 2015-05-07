<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "order".
 *
 * @property string $id
 * @property string $session_id
 * @property string $type
 * @property string $invoice_series_id
 * @property string $invoice_nbr
 * @property string $public_id
 * @property string $datetime
 * @property string $channel
 * @property integer $payed
 * @property double $price_before_tax
 * @property double $tax_amount
 * @property double $price
 * @property double $discount
 * @property string $payment_id
 * @property string $reserved_until
 * @property string $delivery_id
 * @property string $cancellation_id
 * @property string $customer_intervenant_id
 * @property string $supplier_intervenant_id
 *
 * @property Cancellation $cancellation
 * @property InvoiceDeliveryNoteSeries $invoiceSeries
 * @property Payment $payment
 * @property Session $session
 */
class Order extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'order';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['session_id', 'type', 'datetime', 'channel', 'price_before_tax', 'tax_amount', 'price', 'discount', 'customer_intervenant_id', 'supplier_intervenant_id'], 'required'],
            [['session_id', 'invoice_series_id', 'payed', 'payment_id', 'delivery_id', 'cancellation_id', 'customer_intervenant_id', 'supplier_intervenant_id'], 'integer'],
            [['type', 'channel'], 'string'],
            [['datetime', 'reserved_until'], 'safe'],
            [['price_before_tax', 'tax_amount', 'price', 'discount'], 'number'],
            [['invoice_nbr', 'public_id'], 'string', 'max' => 45]
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
            'invoice_series_id' => Yii::t('app', 'Invoice Series ID'),
            'invoice_nbr' => Yii::t('app', 'Invoice Nbr'),
            'public_id' => Yii::t('app', 'Public ID'),
            'datetime' => Yii::t('app', 'Datetime'),
            'channel' => Yii::t('app', 'Channel'),
            'payed' => Yii::t('app', 'Payed'),
            'price_before_tax' => Yii::t('app', 'Price Before Tax'),
            'tax_amount' => Yii::t('app', 'Tax Amount'),
            'price' => Yii::t('app', 'Price'),
            'discount' => Yii::t('app', 'Discount'),
            'payment_id' => Yii::t('app', 'Payment ID'),
            'reserved_until' => Yii::t('app', 'Reserved Until'),
            'delivery_id' => Yii::t('app', 'Delivery ID'),
            'cancellation_id' => Yii::t('app', 'Cancellation ID'),
            'customer_intervenant_id' => Yii::t('app', 'Customer Intervenant ID'),
            'supplier_intervenant_id' => Yii::t('app', 'Supplier Intervenant ID'),
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
    public function getInvoiceSeries()
    {
        return $this->hasOne(InvoiceDeliveryNoteSeries::className(), ['id' => 'invoice_series_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getPayment()
    {
        return $this->hasOne(Payment::className(), ['id' => 'payment_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSession()
    {
        return $this->hasOne(Session::className(), ['id' => 'session_id']);
    }
}
