<?php

namespace Database\Factories;

use App\Models\Idea;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PurchaseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $idea = Idea::inRandomOrder()->first();
        $buyer = User::where('id', '!=', $idea->user_id)->inRandomOrder()->first();

        return [
            'idea_id' => $idea->id,
            'buyer_id' => $buyer->id,
            'rating' => $this->faker->numberBetween(1, 5),
            'review' => $this->faker->sentence,
            'reviewed_at' => $this->faker->dateTime,
        ];
    }
}
