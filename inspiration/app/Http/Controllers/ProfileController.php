<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * プロフィール画像の更新
     */
    public function updateProfileImage(Request $request)
    {
        $request->validate([
            'profile_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $user = Auth::user();

        // 古い画像を削除
        if ($user->profile_image_path) {
            Storage::disk('public')->delete($user->profile_image_path);
        }

        // 新しい画像を保存
        $path = $request->file('profile_image')->store('profile_images', 'public');

        // ユーザーレコードを更新
        $user->update(['profile_image_path' => $path]);

        return response()->json(['message' => 'プロフィール画像が更新されました', 'path' => $path]);
    }


    // 認証されたユーザー情報の取得
    public function getUser(Request $request)
    {
        $user = $request->user();
        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'profile_image_url' => $user->profile_image_url,
            'profile_image_url' => $user->profile_image_path
            ? asset('storage/' . $user->profile_image_path)
            : asset('images/default-user-icon.png'),
        ]);
    }
}
