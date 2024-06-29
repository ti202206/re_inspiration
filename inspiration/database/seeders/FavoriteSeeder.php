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
        $users = User::all();
        $ideas = Idea::all();

        $favoriteCount = 0;
        $maxFavorites = 10;

        while ($favoriteCount < $maxFavorites) {
            foreach ($users as $user) {
                if ($favoriteCount >= $maxFavorites) {
                    break;
                }

                $randomIdea = $ideas->random();

                // アイデアの所有者と異なるユーザーを選ぶ
                if ($randomIdea->user_id != $user->id) {
                    $exists = Favorite::where('user_id', $user->id)->where('idea_id', $randomIdea->id)->exists();

                    if (!$exists) {
                        Favorite::create([
                            'user_id' => $user->id,
                            'idea_id' => $randomIdea->id,
                            'is_favorite' => true
                        ]);
                        $favoriteCount++;
                    }
                }
            }
        }
    }
}
