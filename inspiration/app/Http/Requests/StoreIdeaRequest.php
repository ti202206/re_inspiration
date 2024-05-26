<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreIdeaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        //web.phpにて制限しているため，trueにしている
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|string|max:30',
            'overview' => 'required|string|max:90',
            'content' => 'required|string|max:255',
            'price' => 'required|integer|min:1|max:1000000',
            'purchased' => 'required|boolean',
            'category_id'=>'required|integer'
        ];
    }

    /**
     * カスタムバリデーションエラーメッセージを定義する。
     *
     * @return array
     */
    public function messages()
    {
        return [
            'title.required'=>'タイトル欄は必須です。',
            'title.max'=>'タイトル欄には30文字以下の文字列を指定してください。',
            'overview.required' => '概要欄は必須です。',
            'overview.max' => '概要欄には90文字以下の文字列を指定してください。',
            'content.required'=>'詳細欄は必須です。',
            'content.max'=>'詳細欄には255文字以下の文字列を指定してください。',
            'price.required'=>'価格欄は必須です。',
            'price.max'=>'価格欄には1,000,000円以下の価格を指定してください。',
            'category_id.required'=>'カテゴリーを選択してください。'
        ];
    }
}
