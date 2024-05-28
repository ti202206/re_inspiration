<?php

namespace Tests\Feature;

use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Idea;
use App\Models\User;

class IdeaTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $token;
    protected $otherUser;
    protected $otherUserToken;

    protected function setUp(): void
    {
        parent::setUp();

        // CSRFミドルウェアを無効にする
        $this->withoutMiddleware([
            \Illuminate\Auth\Middleware\Authenticate::class,
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class
        ]);


        // テストに必要なデータを準備
        $this->user = \App\Models\User::factory()->create([
            'id' => 1,
            'name' => 'user1',
            'email' => 'test@example.com',
            'password' => bcrypt('123456'),
        ]);

        // テストユーザーでログインして、トークンを生成
        $this->token = $this->user->createToken('test-token')->plainTextToken;

        // 別のユーザーを生成
        $this->otherUser = \App\Models\User::factory()->create([
            'id' => 2,
            'name' => 'user2',
            'email' => 'test2@example.com',
            'password' => bcrypt('123456'),
        ]);

        // 別のユーザーでログインして、トークンを生成
        $this->otherUserToken = $this->otherUser->createToken('test-token-2')->plainTextToken;

        // 生成したトークンを使用して認証
        $this->withHeader('Authorization', 'Bearer ' . $this->token);

        //カテゴリーを生成
        Category::factory()->create(['id' => 1, 'name' => 'マッチング']);
        Category::factory()->create(['id' => 2, 'name' => 'ECサイト']);
    }

    //テスト環境をリセット
    protected function tearDown(): void
    {
        parent::tearDown();
    }


    /**
     * @test
     */
    public function アイディア一覧を取得できる()
    {
        //アイディアを生成(ダミーでuser_id,category_idを設定)
        $ideas = Idea::factory()->count(1)->create([
            'user_id' => 1,
            'category_id' => 1,
        ]);

        //アイディア一覧を取得
        $response = $this->getJson('/api/ideas');

        //レスポンスが成功であることを確認
        $response->assertOk();

        //レスポンスのデータの個数の一致
        $response->assertJsonCount($ideas->count());
    }

    /**
     * @test
     */
    public function アイディアを登録できる()
    {
        //アイディアのデータ
        $data = [
            'user_id' => 1,
            'category_id' => 1,
            'title' => 'テスト投稿',
            'overview' => 'テスト概要',
            'content' => '1234567890',
            'price' => 10000,
            'purchased' => 1
        ];

        //アイディアを登録
        $response = $this->postJson('/api/ideas', $data);

        //レスポンスが作成されたことを確認
        $response->assertCreated();

        //データベースにアイディアが保存されたことを確認
        $this->assertDatabaseHas('ideas', $data);
    }

    /**
     * @test
     */
    public function タイトルが空の場合は登録できない()
    {
        //アイディアのデータ
        $data = [
            'user_id' => 1,
            'category_id' => 1,
            'title' => '',
            'overview' => 'テスト概要',
            'content' => '1234567890',
            'price' => 10000,
            'purchased' => 1
        ];

        //アイディアを登録
        $response = $this->postJson('/api/ideas', $data);

        //レスポンスが４２２であることを確認
        $response->assertStatus(422);

        //バリデーションエラーが含まれていることを確認
        $response->assertJsonValidationErrors([
            'title' => 'タイトル欄は必須です。'
        ]);

        // データベースにアイディアが保存されていないことを確認
        $this->assertDatabaseMissing('ideas', $data);
    }

    /**
     * @test
     */
    public function タイトルが31文字以上の場合は登録できない()
    {
        //アイディアのデータ
        $data = [
            'user_id' => 1,
            'category_id' => 1,
            'title' => str_repeat('あ', 31),
            'overview' => 'テスト概要',
            'content' => '1234567890',
            'price' => 10000,
            'purchased' => 1
        ];

        //アイディアを登録
        $response = $this->postJson('/api/ideas', $data);

        //レスポンスが422 Unprocessable Entityであることを確認
        $response->assertStatus(422);

        //バリデーションエラーが含まれていることを確認
        $response->assertJsonValidationErrors([
            'title' => 'タイトル欄には30文字以下の文字列を指定してください。'
        ]);

        // データベースにアイディアが保存されていないことを確認
        $this->assertDatabaseMissing('ideas', $data);
    }

    /**
     * @test
     */
    public function 概要が空だと登録できない()
    {
        //アイディアのデータ
        $data = [
            'user_id' => 1,
            'category_id' => 1,
            'title' => 'テスト投稿',
            'overview' => '',
            'content' => '1234567890',
            'price' => 10000,
            'purchased' => 1
        ];

        //アイディアを登録
        $response = $this->postJson('/api/ideas', $data);

        //レスポンスが４２２であることを確認
        $response->assertStatus(422);

        //バリデーションエラーが含まれていることを確認
        $response->assertJsonValidationErrors([
            'overview' => '概要欄は必須です。'
        ]);

        // データベースにアイディアが保存されていないことを確認
        $this->assertDatabaseMissing('ideas', $data);
    }

    /**
     * @test
     */
    public function 概要が91文字以上だと登録できない()
    {
        //アイディアのデータ
        $data = [
            'user_id' => 1,
            'category_id' => 1,
            'title' => 'テスト投稿',
            'overview' => str_repeat('あ', 91),
            'content' => '1234567890',
            'price' => 10000,
            'purchased' => 1
        ];

        //アイディアを登録
        $response = $this->postJson('/api/ideas', $data);

        //レスポンスが422 Unprocessable Entityであることを確認
        $response->assertStatus(422);

        //バリデーションエラーが含まれていることを確認
        $response->assertJsonValidationErrors([
            'overview' => '概要欄には90文字以下の文字列を指定してください。'
        ]);

        // データベースにアイディアが保存されていないことを確認
        $this->assertDatabaseMissing('ideas', $data);
    }

    /**
     * @test
     */
    public function 詳細が空だと登録できない()
    {
        //アイディアのデータ
        $data = [
            'user_id' => 1,
            'category_id' => 1,
            'title' => 'テスト投稿',
            'overview' => 'テスト概要',
            'content' => '',
            'price' => 10000,
            'purchased' => 1
        ];

        //アイディアを登録
        $response = $this->postJson('/api/ideas', $data);

        //レスポンスが４２２であることを確認
        $response->assertStatus(422);

        //バリデーションエラーが含まれていることを確認
        $response->assertJsonValidationErrors([
            'content' => '詳細欄は必須です。'
        ]);

        // データベースにアイディアが保存されていないことを確認
        $this->assertDatabaseMissing('ideas', $data);
    }

    /**
     * @test
     */
    public function 詳細が256文字以上だと登録できない()
    {
        //アイディアのデータ
        $data = [
            'user_id' => 1,
            'category_id' => 1,
            'title' => 'テスト投稿',
            'overview' => 'テスト概要',
            'content' => str_repeat('あ', 256),
            'price' => 10000,
            'purchased' => 1
        ];

        //アイディアを登録
        $response = $this->postJson('/api/ideas', $data);

        //レスポンスが422 Unprocessable Entityであることを確認
        $response->assertStatus(422);

        //バリデーションエラーが含まれていることを確認
        $response->assertJsonValidationErrors([
            'content' => '詳細欄には255文字以下の文字列を指定してください。'
        ]);

        // データベースにアイディアが保存されていないことを確認
        $this->assertDatabaseMissing('ideas', $data);
    }

    /**
     * @test
     */
    public function 値段が空だと登録できない()
    {
        //アイディアのデータ
        $data = [
            'user_id' => 1,
            'category_id' => 1,
            'title' => 'テスト投稿',
            'overview' => 'テスト概要',
            'content' => '1234567890',
            'price' => null,
            'purchased' => 1
        ];

        //アイディアを登録
        $response = $this->postJson('/api/ideas', $data);

        //レスポンスが４２２であることを確認
        $response->assertStatus(422);

        //バリデーションエラーが含まれていることを確認
        $response->assertJsonValidationErrors([
            'price' => '価格欄は必須です。'
        ]);

        // データベースにアイディアが保存されていないことを確認
        $this->assertDatabaseMissing('ideas', $data);
    }

    /**
     * @test
     */
    public function 値段が１００万円以上だと登録できない()
    {
        //アイディアのデータ
        $data = [
            'user_id' => 1,
            'category_id' => 1,
            'title' => 'テスト投稿',
            'overview' => 'テスト概要',
            'content' => '1234567890',
            'price' => 1000001,
            'purchased' => 1
        ];

        //アイディアを登録
        $response = $this->postJson('/api/ideas', $data);

        //レスポンスが４２２であることを確認
        $response->assertStatus(422);

        //バリデーションエラーが含まれていることを確認
        $response->assertJsonValidationErrors([
            'price' => '価格欄には1,000,000円以下の価格を指定してください。'
        ]);

        // データベースにアイディアが保存されていないことを確認
        $this->assertDatabaseMissing('ideas', $data);
    }

    /**
     * @test
     */
    public function カテゴリーが空だと登録できない()
    {
        //アイディアのデータ
        $data = [
            'user_id' => 1,
            'category_id' => null,
            'title' => 'テスト投稿',
            'overview' => 'テスト概要',
            'content' => '1234567890',
            'price' => 10000,
            'purchased' => 1
        ];

        //アイディアを登録
        $response = $this->postJson('/api/ideas', $data);

        //レスポンスが４２２であることを確認
        $response->assertStatus(422);

        //バリデーションエラーが含まれていることを確認
        $response->assertJsonValidationErrors([
            'category_id' => 'カテゴリーを選択してください。'
        ]);

        // データベースにアイディアが保存されていないことを確認
        $this->assertDatabaseMissing('ideas', $data);
    }


    /**
     * @test
     */
    public function 投稿者がpurchasedがfalseの時アイディアを更新できる()
    {
        // アイデアを生成
        $idea = Idea::factory()->create([
            'user_id' => $this->user->id,
            'category_id' => 1,
            'purchased' =>false,
        ]);

        // 更新するアイデアのデータ
        $updatedData = [
            'title' => '更新されたテスト投稿',
            'overview' => '更新されたテスト概要',
            'content' => '9876543210',
            'price' => 20000,
            'purchased' => 0,
            'category_id' => 2,
        ];

        // アイデアを更新
        $response = $this->actingAs($this->user, 'sanctum')->putJson('/api/ideas/' . $idea->id, $updatedData);

        // レスポンスが成功であることを確認
        $response->assertOk();

        // データベースにアイデアが更新されたことを確認
        $this->assertDatabaseHas('ideas', [
            'id' => $idea->id,
            'title' => $updatedData['title'],
            'overview' => $updatedData['overview'],
            'content' => $updatedData['content'],
            'price' => $updatedData['price'],
            'purchased' => $updatedData['purchased'],
        ]);
    }


    /**
     * @test
     */
    public function 投稿者でもpurchasedがtrueの時はアイディアを更新できない()
    {
        // アイデアを生成
        $idea = Idea::factory()->create([
            'user_id' => $this->user->id,
            'category_id' => 1,
            'purchased' =>true,
        ]);

        // 更新するアイデアのデータ
        $updatedData = [
            'title' => '更新されたテスト投稿',
            'overview' => '更新されたテスト概要',
            'content' => '9876543210',
            'price' => 20000,
            'purchased' => true,
            'category_id' => 2,
        ];

        // アイデアを更新
        $response = $this->actingAs($this->user, 'sanctum')->putJson('/api/ideas/' . $idea->id, $updatedData);

        // レスポンスが成功であることを確認
        $response->assertStatus(403);
    }


    /**
     * @test
     */
    public function 投稿者以外の時purchasedがtrueの時でも更新できない()
    {
        // アイデアを生成
        $idea = Idea::factory()->create([
            'user_id' => $this->user->id,
            'category_id' => 1,
            'purchased' => true,
        ]);

        // 更新するアイデアのデータ
        $updatedData = [
            'title' => '更新されたテスト投稿',
            'overview' => '更新されたテスト概要',
            'content' => '9876543210',
            'price' => 20000,
            'purchased' => true,
            'category_id' => 2,
        ];

        // 別のユーザーとして更新を試みる
        $response = $this->actingAs($this->otherUser, 'sanctum')->putJson('/api/ideas/' . $idea->id, $updatedData);

        // レスポンスが403であることを確認
        $response->assertStatus(403);
    }


    /**
     * @test
     */
    public function アイディアを削除することができる()
    {
        // アイデアを生成
        $idea = Idea::factory()->create([
            'user_id' => $this->user->id,
            'category_id' => 1,
        ]);

        //アイディアを削除
        $response = $this->actingAs($this->user, 'sanctum')->deleteJson('/api/ideas/' . $idea->id);
        
        //アイデアが正常に削除されたことを確認
        $response->assertOk();

        //残りのアイディアの数を取得
        $countOfIdeas = Idea::count();

        //残りのアイデアの数が期待値と一致することを確認
        $this->assertEquals(0, $countOfIdeas);
    }


    /**
     * @test
     */
    public function 投稿者以外がアイディアを削除できない()
    {
        // アイデアを生成
        $idea = Idea::factory()->create([
            'user_id' => $this->user->id,
            'category_id' => 1,
        ]);

        // 別のユーザーとして削除を試みる
        $response = $this->actingAs($this->otherUser, 'sanctum')->deleteJson('/api/ideas/' . $idea->id);

        // レスポンスが403であることを確認
        $response->assertStatus(403);
    }




    //権限以外の人がcontentを見れないそれぞれ？
    // 権限以外の人が編集削除ができない→ideaについては完了
    //平均値が出力される
    //個別レビューが取得できる
}
