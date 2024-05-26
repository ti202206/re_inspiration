<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            'マッチング',
            '掲示板',
            'SNS',
            'シェアリング',
            'ECサイト',
            '情報配信',
            'その他',
        ];

        foreach ($categories as $category) {
            Category::create(['name'=>$category]);
        }
    }
}
