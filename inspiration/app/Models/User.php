<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * 可変項目の定義
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'profile_image_path',
        'bio'
    ];

    /**
     *シリアル化時に隠す属性
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * キャストする属性
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

        // プロフィール画像のURLを返すアクセサ
        public function getProfileImageUrlAttribute()
        {
            return $this->profile_image 
                ? asset('storage/' . $this->profile_image) 
                : asset('images/default-user-icon.png'); // デフォルトのアイコンパス
        }

           // ユーザーが持つアイディア
    public function ideas()
    {
        return $this->hasMany(Idea::class);
    }
}
