<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Idea;
use App\Models\User;
use Illuminate\Database\Seeder;

class IdeaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $userIds = User::pluck('id')->toArray();
        $categoryIds = Category::pluck('id')->toArray();

        Idea::factory()->count(10)->create([
            'user_id' => function() use ($userIds) {
                return $userIds[array_rand($userIds)];
            },
            'category_id' => function() use ($categoryIds) {
                return $categoryIds[array_rand($categoryIds)];
            }
        ]);
    }
}
