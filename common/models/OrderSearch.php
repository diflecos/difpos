<?php

namespace common\models;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use common\models\Order;

/**
 * OrderSearch represents the model behind the search form about `common\models\Order`.
 */
class OrderSearch extends Order
{
    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id', 'session_id', 'payed', 'payment_id', 'cancellation_id', 'customer_intervenant_id', 'supplier_intervenant_id'], 'integer'],
            [['type', 'invoice_nbr', 'public_id', 'datetime', 'channel', 'reserved_until'], 'safe'],
            [['price_before_tax', 'tax_amount', 'price', 'discount'], 'number'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = Order::find();

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        if (!($this->load($params) && $this->validate())) {
            return $dataProvider;
        }

        $query->andFilterWhere([
            'id' => $this->id,
            'session_id' => $this->session_id,
            'datetime' => $this->datetime,
            'payed' => $this->payed,
            'price_before_tax' => $this->price_before_tax,
            'tax_amount' => $this->tax_amount,
            'price' => $this->price,
            'discount' => $this->discount,
            'payment_id' => $this->payment_id,
            'reserved_until' => $this->reserved_until,
            'cancellation_id' => $this->cancellation_id,
            'customer_intervenant_id' => $this->customer_intervenant_id,
            'supplier_intervenant_id' => $this->supplier_intervenant_id,
        ]);

        $query->andFilterWhere(['like', 'type', $this->type])
            ->andFilterWhere(['like', 'invoice_nbr', $this->invoice_nbr])
            ->andFilterWhere(['like', 'public_id', $this->public_id])
            ->andFilterWhere(['like', 'channel', $this->channel]);

        return $dataProvider;
    }
}
