<?php

namespace Database\Factories;

use App\Models\Idea;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class FavoriteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        // return[
        //     'user_id'=>User::inRandomOrder()->first()->id,
        //     'idea_id'=>Idea::inRandomOrder()->first()->id,
        //     'is_favorite'=>$this->faker->boolean,
        // ];

                // アイデアをランダムに取得
                $idea = Idea::inRandomOrder()->first();

                // アイデアの所有者と異なるユーザーを取得
                $user = User::where('id', '!=', $idea->user_id)->inRandomOrder()->first();
        
                return [
                    'user_id' => $user->id,
                    'idea_id' => $idea->id,
                    'is_favorite' => true,  // 常に true に設定
                ];
    }
}
