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
        'title',
        'overview',
        'content',
        'price',
        'purchased'
    ];

        // リレーション： user
        public function user()
        {
            return $this->belongsTo(User::class,'user_id');
        }
        
    // リレーション: purchases
    public function purchases()
    {
        return $this->hasMany(Purchase::class);
    }

    // 購入数を取得
    public function getPurchaseCountAttribute()
    {
        return $this->purchases()->count();
    }


    // レビュー数を取得
    public function getReviewCountAttribute()
    {
        return $this->purchases()->whereNotNull('review')->count();
    }

    // リレーション: favorites
    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    // お気に入り数を取得
    public function getFavoriteCountAttribute()
    {
        return $this->favorites()->count();
    }

    // 平均評価を取得
    public function getAverageRatingAttribute()
    {
        $average = $this->purchases()->whereNotNull('rating')->avg('rating');
        return $average && $average >0 ? number_format($average, 1) : '-';
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
