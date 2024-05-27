<?php

namespace Database\Seeders;

use App\Models\Purchase;
use Illuminate\Database\Seeder;

class PurchaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Purchase::factory()->count(10)->create()->each(function ($purchase) {
            // 関連するIdeaのpurchasedをtrueに設定
            $idea = $purchase->idea;
            $idea->purchased = true;
            $idea->save();
        });
    }
}
