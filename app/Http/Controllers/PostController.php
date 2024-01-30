<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Place;
use App\Models\PostComment;
use App\Models\PostImage;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use OpenTelemetry\API\Trace\Span;
use OpenTelemetry\API\Trace\StatusCode;
use OpenTelemetry\SDK\Trace\TracerProvider;

class PostController extends Controller
{
    public function createPost(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'user_id' => 'required',
            'post_title' => 'required|string',
            'post_content' => 'required|string',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $post = Post::create([
                'user_id' => $req->user_id,
                'post_title' => $req->post_title,
                'post_content' => $req->post_content,
            ]);
        } catch (\Exception $e) {
            return response()->json(['status' => 500, 'error' => 'Failed to insert data.'], 500);
        }

        $images = $req->file('images');
        if ($images) {
            try {
                foreach ($images as $key => $image) {

                    // Sanitize the original filename directly using Str::slug()
                    $sanitizedOriginalName = Str::slug($image->getClientOriginalName());

                    // Generate a unique filename
                    $imageName = $sanitizedOriginalName . '_' . time() . '_' . $key . '.' . $image->getClientOriginalExtension();

                    // Move the file to the desired location
                    $image->move('uploads/', $imageName);

                    PostImage::create([
                        "post_id" => $post->id,
                        "post_image" => $imageName
                    ]);
                }
            } catch (\Exception $e) {
                return response()->json(['status' => 500, 'error' => 'Failed to insert image data.', "error-type" => $e], 500);
            }
        }
        return response()->json(['status' => 201, 'message' => 'place are created successfully'], 201);
    }

    public function allPost()
    {
        try {
            $posts = Post::with('postImage', 'user', 'postComment')->get();

            if ($posts->count() > 0) {


                $tracerProvider = new TracerProvider();
                $tracer = $tracerProvider->getTracer('my-ins');

                if ($tracer) {

                    $span = Span::getCurrent();

                    $span->setAttribute('foo', 'bar');
                    $span->setAttribute('Application', 'Laravel');
                    $span->setAttribute('foo', 'bar1');
                    $span->updateName('post api');

                    $childSpan = $tracer->spanBuilder('Child span')->startSpan();
                    $childScope = $childSpan->activate();
                    try {
                        throw new \Exception('Exception Example');
                    } catch (\Exception $exception) {
                        $childSpan->recordException($exception);
                    }
                    $childSpan->end();
                    $childScope->detach();
                }

                return response()->json([
                    'status' => 200,
                    'posts' => $posts,
                ], 200);
            }
        } catch (ModelNotFoundException $exception) {
            return response()->json([
                'status' => 404,
                'message' => 'No Records Found!!',
            ], 404);
        }
    }

    public function createComment(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'user_id' => 'required',
            'post_id' => 'required',
            'post_comment_content' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'error' => $validator->errors(),
            ]);
        }

        try {
            $comment = PostComment::create([
                'user_id' => $req->user_id,
                'post_id' => $req->post_id,
                'post_comment_content' => $req->post_comment_content
            ]);
            return response()->json(['status' => 201, 'message' => 'place are created successfully'], 201);
        } catch (\Exception $e) {
            return response()->json(['status' => 500, 'error' => 'Failed to insert comment.'], 500);
        }
    }

    public function allComments()
    {
        try {
            $comments = PostComment::with('user')->get();

            if ($comments->count() > 0) {
                return response()->json([
                    'status' => 200,
                    'comments' => $comments,
                ], 200);
            }
        } catch (ModelNotFoundException $exception) {
            return response()->json([
                'status' => 404,
                'message' => 'No Records Found!!',
            ], 404);
        }
    }

    public function updatePost(Request $req, $id)
    {
        $validator = Validator::make($req->all(), [
            'post_title' => 'required|string',
            'post_content' => 'required|string',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
                $post = Post::findOrFail($id);
                $post->post_title = $req->post_title;
                $post->post_content =  $req->post_content;

                if ($post->save()) {
                    return response()->json([
                        'status' => 202,
                        'message' => 'Post updated successfully'
                    ], 202);
                } 
                else {
                    return response()->json([
                        'status' => 500,
                        'message' => 'Something went wrong!'
                    ], 500);
                }
        } catch (\Exception $e) {
            return response()->json(['status' => 500, 'error' => 'Failed to insert data.'], 500);
        }

        $images = $req->file('images');
        if ($images) {
            try {
                foreach ($images as $key => $image) {

                    // Sanitize the original filename directly using Str::slug()
                    $sanitizedOriginalName = Str::slug($image->getClientOriginalName());

                    // Generate a unique filename
                    $imageName = $sanitizedOriginalName . '_' . time() . '_' . $key . '.' . $image->getClientOriginalExtension();

                    // Move the file to the desired location
                    $image->move('uploads/', $imageName);

                    PostImage::create([
                        "post_id" => $post->id,
                        "post_image" => $imageName
                    ]);
                }
            } catch (\Exception $e) {
                return response()->json(['status' => 500, 'error' => 'Failed to insert image data.', "error-type" => $e], 500);
            }
        }
        return response()->json(['status' => 201, 'message' => 'post are created successfully'], 201);
    }

    public function deletePost($id)
    {
        try {
            $post = Post::findOrFail($id);
            $post->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Post deleted successful',
            ], 200);
        } catch (ModelNotFoundException $exception) {
            return response()->json([
                'status' => 404,
                'message' => 'post not found!',
            ], 404);
        }
    }

    public function userPost($id)
    {
        try {
            $user_post = Post::where('user_id', $id)->with('postImage', 'postComment', 'user')->get();

            if ($user_post->count() > 0) {
                return response()->json([
                    'status' => 200,
                    'posts' => $user_post,
                ], 200);
            }

            return response()->json([
                'status' => 404,
                'message' => 'user post not found!',
            ], 404);
        } catch (ModelNotFoundException $exception) {
            return response()->json([
                'status' => 500,
                'message' => 'Something Wrong!',
            ], 500);
        }
    }
}
