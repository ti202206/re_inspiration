<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateIdeaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // //web.phpにて制限しているため，trueにしている
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
            'title' => 'sometimes|string|max:30',
            'overview' => 'sometimes|string|max:90',
            'content' => 'sometimes|string|max:255',
            'price' => 'sometimes|integer|min:1|max:1000000',
            'purchased' => 'sometimes|boolean',
            'category_id'=>'required|integer'
        ];
    }
}
