<?php

namespace Database\Seeders;

use App\Models\Favorite;
use App\Models\Idea;
use App\Models\User;
use Illuminate\Database\Seeder;

class FavoriteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Favorite::factory()->count(10)->create();
        $users = User::all();
        $ideas = Idea::all();

        // 各ユーザーに対してランダムなアイデアをお気に入りとして設定
        foreach ($users as $user) {
            for ($i = 0; $i < 5; $i++) { // 各ユーザーに対して最大5個のお気に入りを作成
                $randomIdea = $ideas->random();

                // すでにお気に入りとして登録されているか確認
                $exists = Favorite::where('user_id', $user->id)->where('idea_id', $randomIdea->id)->exists();

                if (!$exists) {
                    Favorite::create([
                        'user_id' => $user->id,
                        'idea_id' => $randomIdea->id,
                        'is_favorite' => true
                    ]);
                }
            }
        }
    }
}
