<?php

namespace Tests\Feature;

use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Idea;
use App\Models\Favorite;

class FavoriteTest extends TestCase
{
    use RefreshDatabase;

    protected $user1;
    protected $user2;
    protected $user3;
    protected $idea;

    protected function setUp(): void
    {
        parent::setUp();

        // CSRF トークンの検証を無効化
        $this->withoutMiddleware([
            \Illuminate\Auth\Middleware\Authenticate::class,
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class
        ]);

        // ユーザーを作成し、認証を行う
        $this->user1 = User::factory()->create([
            'id' => 1,
            'name' => 'user1',
            'email' => 'test@example.com',
            'password' => bcrypt('123456')
        ]);

        // ユーザー2の生成
        $this->user2 = User::factory()->create([
            'id' => 2,
            'name' => 'user2',
            'email' => 'test@info.com',
            'password' => bcrypt('123456')
        ]);

        $this->user3 = User::factory()->create([
            'id' => 3,
            'name' => 'user3',
            'email' => 'test@test.com',
            'password' => bcrypt('123456')
        ]);

        // テストユーザーでログインして、トークンを生成
        $token = $this->user1->createToken('test-token')->plainTextToken;

        // 生成したトークンを使用して認証
        $this->withHeader('Authorization', 'Bearer ' . $token);

        // カテゴリを作成
        Category::factory()->create(['id' => 1, 'name' => 'マッチング']);

        //アイディアを生成(ダミーでuser_id,category_idを設定)
        $this->ideas = Idea::factory()->count(5)->create([
            'user_id' => $this->user1->id,
            'category_id' => 1,
        ]);

        // テスト購入者のユーザー２に切り替える
        $this->actingAs($this->user2);
    }

    //テスト環境をリセット
    protected function tearDown(): void
    {
        parent::tearDown();
    }

    /**
     * @test
     */
    public function 自身の気になるを切り替えられる()
    {
        // 気になる登録のトグル機能をテスト
        $response = $this->postJson('/api/favorites/toggle', ['idea_id' => $this->ideas[0]->id]);
        $response->assertOk();

        //気になる登録されたことを確認
        $this->assertDatabaseHas('favorites', [
            'user_id' => $this->user2->id,
            'idea_id' => $this->ideas[0]->id,
            'is_favorite' => true
        ]);

        //気になる解除のトグル機能テスト
        $response = $this->postJson('/api/favorites/toggle', ['idea_id' => $this->ideas[0]->id]);
        $response->assertOk();

        //気になる解除されたことを確認
        $this->assertDatabaseHas('favorites', [
            'user_id' => $this->user2->id,
            'idea_id' => $this->ideas[0]->id,
            'is_favorite' => false
        ]);
    }

    /**
     * @test
     */
    public function 他のユーザーの気になるを切り替えられない()
    {
        // 気になる登録のトグル機能をテスト
        $response = $this->postJson('/api/favorites/toggle', ['idea_id' => $this->ideas[0]->id]);
        $response->assertOk();

        //気になる登録されたことを確認
        $this->assertDatabaseHas('favorites', [
            'user_id' => $this->user2->id,
            'idea_id' => $this->ideas[0]->id,
            'is_favorite' => true
        ]);

        // ユーザーの切り替え
        $this->actingAs($this->user3);

        // 気になるの切り替え
        $response = $this->postJson('/api/favorites/toggle', ['idea_id' => $this->ideas[0]->id]);

        // レスポンスの確認
        $response->assertStatus(200);

        //ユーザー２の気になるが影響を受けていないことを確認．
        $this->assertDatabaseHas('favorites', [
            'user_id' => $this->user2->id,
            'idea_id' => $this->ideas[0]->id,
            'is_favorite' => true
        ]);

        //ユーザー３の気になる追加されていることを確認
        $this->assertDatabaseHas('favorites', [
            'user_id' => $this->user3->id,
            'idea_id' => $this->ideas[0]->id,
            'is_favorite' => true
        ]);
    }

    /**
     * @test
     */
    public function 自身の気になる一覧を取得できる()
    {
        // 気になる登録のトグル機能をテスト
        $response = $this->postJson('/api/favorites/toggle', ['idea_id' => $this->ideas[0]->id]);
        $response->assertOk();
        $response = $this->postJson('/api/favorites/toggle', ['idea_id' => $this->ideas[1]->id]);
        $response->assertOk();
        $response = $this->postJson('/api/favorites/toggle', ['idea_id' => $this->ideas[2]->id]);
        $response->assertOk();

        // 一覧の取得
        $response = $this->getJson('/api/favorites');

        // 自身の気になるを取得できる
        $response->assertOk();
        $response->assertJsonCount(3);
        $response->assertJsonFragment([
            'idea_id' => $this->ideas[0]->id,
            'idea_id' => $this->ideas[1]->id,
            'idea_id' => $this->ideas[2]->id,
        ]);
    }


    /**
     * @test
     */
    public function 他人の気になる一覧を取得できない()
    {
        // 気になる登録のトグル機能をテスト
        $response = $this->postJson('/api/favorites/toggle', ['idea_id' => $this->ideas[0]->id]);
        $response->assertOk();
        $response = $this->postJson('/api/favorites/toggle', ['idea_id' => $this->ideas[1]->id]);
        $response->assertOk();
        $response = $this->postJson('/api/favorites/toggle', ['idea_id' => $this->ideas[2]->id]);
        $response->assertOk();

        // ユーザー３に切り替える
        $this->actingAs($this->user3);

        // 一覧の取得
        $response = $this->getJson('/api/favorites');

        // 他の人の気になる一覧は取得できない
        $response->assertOk();
        $response->assertJsonCount(0);
    }
}
