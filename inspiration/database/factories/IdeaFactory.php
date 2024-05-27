<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class IdeaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $faker = \Faker\Factory::create('ja_JP');
        return [
            'user_id'=>User::inRandomOrder()->first()->id,
            'category_id'=>Category::inRandomOrder()->first()->id,
            'title' => $faker->realText(30,3),
            'overview' => $faker->realText(90,3),
            'content' => $faker->realText(255,3),
            'price' => $faker->numberBetween(100, 10000),
            'purchased'=>false,
        ];
    }
}
