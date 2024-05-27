<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Idea extends Model
{
    use HasFactory;


    /**
     * 可変項目の定義：後ろに更新するカラムを指定する
     * 
     * @var array
     */
    protected $fillable = [
        'user_id',
        'category_id',
        'title', 'overview',
        'content',
        'price',
        'purchased'
    ];

    public function purchases()
    {
        return $this->hasMany(Purchase::class);
    }

    // 平均評価を取得
    public function getAverageRatingAttribute()
    {
        return $this->purchases()->whereNotNull('rating')->avg('rating') ?: 'No ratings yet';
    }

    // purchasedがtrueの場合，編集できない
    public function updateIdea(array $attributes)
    {
        if ($this->purchased) {
            throw new \Exception('This idea has been purchased and cannot be edited.');
        }

        return $this->update($attributes);
    }
}
