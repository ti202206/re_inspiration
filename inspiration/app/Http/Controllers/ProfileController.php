<?php

namespace App\Http\Controllers;

use App\Models\Idea;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{


    /**
     * 指定したユーザーのプロフィールを表示
     */
    public function showUserProfile($userId)
    {
        $user = User::findOrFail($userId);
        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'bio' => $user->bio,
            'profile_image_url' => $user->profile_image_path
                ? asset('storage/' . $user->profile_image_path)
                : asset('images/default-user-icon.png'),
        ]);
    }


    /**
     * プロフィール情報と画像の更新
     */
    public function updateProfileImage(Request $request)
    {
        // $request->validate([
        //     'profile_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        // ]);

        // $user = Auth::user();

        // // 古い画像を削除
        // if ($user->profile_image_path) {
        //     Storage::disk('public')->delete($user->profile_image_path);
        // }

        // // 新しい画像を保存
        // $path = $request->file('profile_image')->store('profile_images', 'public');

        // // ユーザーレコードを更新
        // $user->update(['profile_image_path' => $path]);

        // return response()->json(['message' => 'プロフィール画像が更新されました', 'path' => $path]);
        $user = Auth::user();
        
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'bio' => 'nullable|string|max:255',
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // 画像バリデーションの変更
        ]);

        $user->name = $request->name;
        $user->email = $request->email;
        $user->bio = $request->bio;

        // プロフィール画像の更新
        if ($request->hasFile('profile_image')) {
            // 古い画像を削除
            if ($user->profile_image_path) {
                Storage::disk('public')->delete($user->profile_image_path);
            }

            // 新しい画像を保存
            $user->profile_image_path = $request->file('profile_image')->store('profile_images', 'public');
        }

        $user->save();

        return response()->json(['message' => 'プロフィールが更新されました。', 'user' => $user]);
    }


    // 認証されたユーザー情報の取得
    public function getUser(Request $request)
    {
        $user = $request->user();
        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'bio' => $user->bio,
            'profile_image_url' => $user->profile_image_path
            ? asset('storage/' . $user->profile_image_path)
            : asset('images/default-user-icon.png'),
            // 'profile_image_url' => $user->profile_image_url,
            // 'profile_image_url' => $user->profile_image_path
            // ? asset('storage/' . $user->profile_image_path)
            // : asset('images/default-user-icon.png'),

        ]);
    }

        /**
     * アカウント削除
     */
    public function deleteAccount(Request $request)
    {
        $user = Auth::user();

        // 未購入アイディアの削除
        // $user->ideas()->where('purchased', false)->delete();
        Idea::where('user_id', $user->id)
            ->where('purchased', false)
            ->delete();

            // 購入済みアイディアの更新
            Idea::where('user_id', $user->id)
            ->where('purchased', true)
            ->update(['user_id' => null]);
        // プロフィール画像の削除
        if ($user->profile_image_path) {
            Storage::disk('public')->delete($user->profile_image_path);
        }

        // ユーザーの削除
        $user->delete();

        return response()->json(['message' => 'アカウントが削除されました。']);
    }
}
