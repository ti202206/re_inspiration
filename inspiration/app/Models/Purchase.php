<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'idea_id',
        'buyer_id',
        'rating',
        'review',
        'reviewed_at',
    ];

    public $timestamps = true;

    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function idea()
    {
        return $this->belongsTo(Idea::class);
    }
}
