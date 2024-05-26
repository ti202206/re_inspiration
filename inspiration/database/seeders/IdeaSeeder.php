<?php

namespace Database\Seeders;

use App\Models\Idea;
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
        Idea::factory()->count(10)->create([
            'user_id'=>function(){
                return rand(1,3);
            },
            'category_id'=>function(){
                return rand(1,7);
            }
        ]);
    }
}
