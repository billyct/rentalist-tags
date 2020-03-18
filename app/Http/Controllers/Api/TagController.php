<?php

namespace App\Http\Controllers\Api;

use App\Tag;
use App\Http\Resources\TagResource;
use App\Http\Controllers\Controller;

class TagController extends Controller
{
    /**
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        $tags = Tag::all();
        return TagResource::collection($tags);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function store()
    {
        $data = request()->validate([
            'name' => 'required',
        ]);

        Tag::create($data);

        return $this->success();
    }

    /**
     * @param \App\Tag $tag
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Tag $tag)
    {
        $data = request()->validate([
            'name' => 'required',
        ]);

        $tag->update($data);

        return $this->success();
    }

    /**
     * @param \App\Tag $tag
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroy(Tag $tag)
    {
        $tag->delete();
        return $this->success();
    }

}
