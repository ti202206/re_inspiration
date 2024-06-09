<?php

namespace App\Providers;

use App\Models\Purchase;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Purchaseが保存されたときにIdeaのupdated_atを更新
        Purchase::saved(function ($purchase) {
            $purchase->idea->touch(); // 変更：関連するIdeaのupdated_atを更新
        });
    }
}
