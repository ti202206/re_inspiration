<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePurchaseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // purchase モデルインスタンスを取得
        $purchase = $this->route('purchase');

        // 現在のユーザーIDが購入者IDと一致する場合は true を返す
        return $purchase->buyer_id === auth()->id();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //reviewとratingはセット入力
            'review'=>'required_with:rating|string|max:255',
            'rating'=>'required_with:review|integer|between:1,5'
        ];
    }
}
