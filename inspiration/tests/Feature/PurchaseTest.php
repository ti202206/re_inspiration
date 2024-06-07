<?php

namespace Tests\Feature;

use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Idea;
use App\Models\Purchase;

class PurchaseTest extends TestCase
{
    use RefreshDatabase;

    protected $user1;
    protected $user2;
    protected $user3;
    protected $ideas;

    protected function setUp(): void
    {
        parent::setUp();

        // CSRFミドルウェアを無効にする
        $this->withoutMiddleware([
            \Illuminate\Auth\Middleware\Authenticate::class,
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class
        ]);

        // ユーザー1の生成
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

        //カテゴリーを作成
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
    public function 他のユーザーが投稿したアイディアを購入できる()
    {
        //購入操作
        $response = $this->postJson('/api/purchases', [
            'idea_id' => $this->ideas->first()->id
        ]);

        //レスポンスの確認
        $response->assertStatus(201);
        $this->assertDatabaseHas('purchases', [
            'buyer_id' => $this->user2->id,
            'idea_id' => $this->ideas->first()->id
        ]);
    }

    /**
     * @test
     */
    public function 自身が投稿したアイディアを購入できない()
    {
        //アイディア作成者user1に切り替える
        $this->actingAs($this->user1);

        //自身の購入を行う
        $response = $this->postJson('/api/purchases', [
            'idea_id' => $this->ideas->first()->id
        ]);

        //レスポンス（403:禁止されている）の確認
        $response->assertStatus(403);
    }

    /**
     * @test
     */
    public function 購入者は購入後にレビューと評価を追加できる()
    {
        //購入操作
        $response = $this->postJson('/api/purchases', [
            'idea_id' => $this->ideas->first()->id
        ]);

        //レスポンスの確認
        $response->assertStatus(201);

        //データベースから購入情報を取得
        $purchase = Purchase::first();

        //レビューと評価を追加
        $response = $this->patchJson("/api/purchases/{$purchase->id}", [
            'review' => 'Great product!',
            'rating' => 5
        ]);

        $response->assertOk();
        $this->assertDatabaseHas('purchases', [
            'id' => $purchase->id,
            'review' => 'Great product!',
            'rating' => 5
        ]);
    }

    /**
     * @test
     */
    public function 自身が購入したものに評価だけ投稿できない()
    {
        //購入操作
        $response = $this->postJson('/api/purchases', [
            'idea_id' => $this->ideas->first()->id
        ]);

        //レスポンスの確認
        $response->assertStatus(201);

        //データベースから購入情報を取得
        $purchase = Purchase::first();

        //レビューと評価を追加
        $response = $this->patchJson("/api/purchases/{$purchase->id}", [
            'rating' => 5
        ]);

        //レスポンス（422:リクエストが無効）の確認
        $response->assertStatus(422);

        //エラー内容を確認
        $response->assertJsonValidationErrors(['review']);
    }

    /**
     * @test
     */
    public function 自身が購入したものにレビューだけ投稿できない()
    {
        //購入操作
        $response = $this->postJson('/api/purchases', [
            'idea_id' => $this->ideas->first()->id
        ]);

        //レスポンスの確認
        $response->assertStatus(201);

        //データベースから購入情報を取得
        $purchase = Purchase::first();

        //レビューと評価を追加
        $response = $this->patchJson("/api/purchases/{$purchase->id}", [
            'review' => 'Great product!',
        ]);

        //レスポンス（400:リクエストが無効）の確認
        $response->assertStatus(422);

        //エラー内容を確認
        $response->assertJsonValidationErrors(['rating']);
    }


    /**
     * @test
     */
    public function 他のユーザーの評価・レビューを変更できない()
    {
        //購入操作
        $response = $this->postJson('/api/purchases', [
            'idea_id' => $this->ideas->first()->id
        ]);

        //レスポンスの確認
        $response->assertStatus(201);

        //データベースから購入情報を取得
        $purchase = Purchase::first();

        //レビューと評価を追加
        $response = $this->patchJson("/api/purchases/{$purchase->id}", [
            'review' => 'Great product!',
            'rating' => 5
        ]);

        //第三者に切り替え
        $this->actingAs($this->user3);

        //評価・レビューの変更
        $response = $this->patchJson("/api/purchases/{$purchase->id}", [
            'review' => 'Good Service!',
            'rating' => 4
        ]);

        //レスポンス（403:禁止されている）の確認
        $response->assertStatus(403);
    }

    /**
     * @test
     */
    public function 他のユーザーが購入したものにレビューできない()
    {
        //購入操作
        $response = $this->postJson('/api/purchases', [
            'idea_id' => $this->ideas->first()->id
        ]);

        //レスポンスの確認
        $response->assertStatus(201);

        //データベースから購入情報を取得
        $purchase = Purchase::first();

        //ユーザーの切り替え
        $this->actingAs($this->user1);

        //レビューと評価を追加
        $response = $this->patchJson("/api/purchases/{$purchase->id}", [
            'review' => 'Great product!',
            'rating' => 5
        ]);

        //レスポンス（403:禁止されている）の確認
        $response->assertStatus(403);
    }

    /**
     * @test
     */
    public function ユーザーは自身の購入履歴を表示できる()
    {
        //購入操作
        $response = $this->postJson('/api/purchases', [
            'idea_id' => $this->ideas[0]->id
        ]);
        $response = $this->postJson('/api/purchases', [
            'idea_id' => $this->ideas[1]->id
        ]);
        $response = $this->postJson('/api/purchases', [
            'idea_id' => $this->ideas[2]->id
        ]);

        //一覧の取得
        $response = $this->getJson('/api/purchases');

        //レスポンスの確認
        $response->assertOk();
        $response->assertJsonCount(3);
    }

    /**
     * @test
     */
    public function 他のユーザーの購入履歴を取得できない()
    {
        //購入操作
        $response = $this->postJson('/api/purchases', [
            'idea_id' => $this->ideas[0]->id
        ]);
        $response = $this->postJson('/api/purchases', [
            'idea_id' => $this->ideas[1]->id
        ]);
        $response = $this->postJson('/api/purchases', [
            'idea_id' => $this->ideas[2]->id
        ]);

        //第三者に切り替え
        $this->actingAs($this->user3);

        //一覧を取得
        $response = $this->getJson('/api/purchases');

        //何も取得できないことを確認
        $response->assertJsonCount(0);
    }

    /**
     * @test
     */
    public function ユーザーは自身のレビューした購入履歴を表示できる()
    {
        //購入操作
        $response = $this->postJson('/api/purchases', [
            'idea_id' => $this->ideas[0]->id
        ]);
        $response = $this->postJson('/api/purchases', [
            'idea_id' => $this->ideas[1]->id
        ]);
        $response = $this->postJson('/api/purchases', [
            'idea_id' => $this->ideas[2]->id
        ]);

        //データから取得して，レビュー操作
        $purchase1 = Purchase::where('idea_id', $this->ideas[0]->id)->first();
        $this->patchJson("/api/purchases/{$purchase1->id}", [
            'review' => 'Great product!',
            'rating' => 5
        ]);
        $purchase2 = Purchase::where('idea_id', $this->ideas[1]->id)->first();
        $this->patchJson("/api/purchases/{$purchase2->id}", [
            'review' => 'Good Service!',
            'rating' => 4
        ]);

        //レビュー一覧の取得
        $response = $this->getJson('/api/reviewed-purchases');

        //レスポンスの確認
        $response->assertOk();

        //数の確認
        $response->assertJsonCount(2);

        //内容の確認
        $response->assertJsonFragment([
            'review' => 'Great product!',
            'rating' => 5
        ]);
        $response->assertJsonFragment([
            'review' => 'Good Service!',
            'rating' => 4
        ]);
    }


    /**
     * @test
     */
    public function 他のユーザーのレビュー履歴を取得できない()
    {
        //購入操作
        $response = $this->postJson('/api/purchases', [
            'idea_id' => $this->ideas[0]->id
        ]);
        $response = $this->postJson('/api/purchases', [
            'idea_id' => $this->ideas[1]->id
        ]);
        $response = $this->postJson('/api/purchases', [
            'idea_id' => $this->ideas[2]->id
        ]);

        //データから取得して，レビュー操作
        $purchase1 = Purchase::where('idea_id', $this->ideas[0]->id)->first();
        $this->patchJson("/api/purchases/{$purchase1->id}", [
            'review' => 'Great product!',
            'rating' => 5
        ]);
        $purchase2 = Purchase::where('idea_id', $this->ideas[1]->id)->first();
        $this->patchJson("/api/purchases/{$purchase2->id}", [
            'review' => 'Good Service!',
            'rating' => 4
        ]);

        //第三者に切り替え
        $this->actingAs($this->user3);

        //一覧を取得
        $response = $this->getJson('/api/reviewed-purchases');

        //何も取得できないことを確認
        $response->assertJsonCount(0);
    }

    /**
     * @test
     */
    public function 購入履歴が空の場合は何も表示しない()
    {
        $response = $this->getJson('/api/purchases');

        $response->assertOk();
        $response->assertJsonCount(0);
    }
}


//同じアイディアは購入できない