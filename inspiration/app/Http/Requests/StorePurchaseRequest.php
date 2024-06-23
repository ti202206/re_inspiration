<?php

namespace App\Http\Requests;

use App\Models\Idea;
use Illuminate\Foundation\Http\FormRequest;

class StorePurchaseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // アイディアを取得しユーザー権限をチェック
        $idea = Idea::find($this->idea_id);

        return $idea && $idea->user_id !== auth()->id();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //ideas テーブルに存在するレコードである
            'idea_id' => 'required|exists:ideas,id'
        ];
    }
}
