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
        return[
            'user_id'=>User::inRandomOrder()->first()->id,
            'idea_id'=>Idea::inRandomOrder()->first()->id,
            'is_favorite'=>$this->faker->boolean,
        ];
    }
}
