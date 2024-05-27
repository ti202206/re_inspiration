<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name'=>'user1',
            'email'=>'test@example.com',
            'password'=>Hash::make('12345678'),
        ]);
        User::create([
            'name'=>'user2',
            'email'=>'test@info.com',
            'password'=>Hash::make('12345678'),
        ]);
        User::create([
            'name'=>'user3',
            'email'=>'test@info2.com',
            'password'=>Hash::make('12345678'),
        ]);
    }
}
