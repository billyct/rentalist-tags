<?php

namespace Tests\Feature\Controllers\Api;

use App\Tag;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TagControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_tag_controller_index()
    {
        factory(Tag::class, 20)->create();

        $response = $this->json('get','api/tags');
        $response->assertSuccessful();
    }

    public function test_tag_controller_store()
    {
        $tag = factory(Tag::class)->make();

        $data = ['name' => $tag->name];
        $response = $this->json('post', 'api/tags', $data);

        $response->assertSuccessful();
        $this->assertDatabaseHas('tags', $data);
    }

    public function test_tag_controller_store_with_422()
    {
        $response = $this->json('post', 'api/tags', []);
        $response->assertStatus(422);
    }

    public function test_tag_controller_update()
    {
        $tag = factory(Tag::class)->create();

        $data = ['name' => $this->faker->name];

        $response = $this->json('put', "api/tags/{$tag->id}", $data);
        $response->assertSuccessful();

        $this->assertDatabaseHas('tags', array_merge([
            'id' => $tag->id,
        ], $data));
    }

    public function test_tag_controller_update_with_422()
    {
        $tag = factory(Tag::class)->create();
        $response = $this->json('put', "api/tags/{$tag->id}", []);
        $response->assertStatus(422);
    }

    public function test_tag_controller_destroy()
    {
        $tag = factory(Tag::class)->create();

        $response = $this->json('delete', "api/tags/{$tag->id}");
        $response->assertSuccessful();

        $this->assertDatabaseMissing('tags', [
            'id' =>  $tag->id,
        ]);
    }
}
