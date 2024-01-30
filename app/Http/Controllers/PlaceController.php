<?php

namespace App\Http\Controllers;

use App\Models\Place;
use App\Models\PlaceImage;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use OpenTelemetry\API\Trace\Span;
use OpenTelemetry\API\Trace\StatusCode;
use OpenTelemetry\SDK\Trace\TracerProvider;

use Illuminate\Support\Facades\Validator;
use OpenTelemetry\SDK\Trace\Sampler\AlwaysOnSampler;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use OpenTelemetry\API\Trace\SpanContextKey;
use OpenTelemetry\Context\Context;
use Illuminate\Http\JsonResponse;

class PlaceController extends Controller
{
    public function createPlace(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'user_id' => 'required',
            'place_name' => 'required|string',
            'place_description' => 'required|string',
            'place_location' => 'required|string',
            'place_rating' => 'required',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg, webp',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $place = Place::create([
                'user_id' => $req->user_id,
                'place_name' => $req->place_name,
                'place_description' => $req->place_description,
                'place_location' => $req->place_location,
                'place_rating' => $req->place_rating,
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

                    PlaceImage::create([
                        "place_id" => $place->id,
                        "place_image" => $imageName
                    ]);
                }
            } catch (\Exception $e) {
                return response()->json(['status' => 500, 'error' => 'Failed to insert image data.'], 500);
            }
        }
        return response()->json(['status' => 201, 'message' => 'place are created successfully'], 201);
    }



    public function fetchPlace()
    {
        try {

            // $startTime = microtime(true);

            $places = Place::with('placeImage')->get();

            // $duration = microtime(true) - $startTime;


            // if ($places->count() > 0) {

            //     // $tracer = TracerProvider::getDefaultTracer();
            //     $tracingTime = microtime(true);

            //     $tracerProvider = new TracerProvider();
            //     $tracer = $tracerProvider->getTracer('my-ins');

            //     if ($tracer) {

            //         $span = Span::getCurrent();

            //         $span->setAttribute('foo', 'bar');
            //         $span->setAttribute('Application', 'Laravel');
            //         $span->setAttribute('foo', 'bar1');
            //         $span->setAttribute('duration_ms', $duration * 1000);
            //         $span->updateName('Place api');

            //         $childSpan = $tracer->spanBuilder('Child span')->startSpan();
            //         $childScope = $childSpan->activate();
            //         try {
            //             throw new \Exception('Exception Example');
            //         } catch (\Exception $exception) {
            //             $childSpan->recordException($exception);
            //         }

                    

            //         $jsonTime = microtime(true);

            //         $jsonResponse = response()->json([
            //             'status' => 200,
            //             'places' => $places,
            //         ], 200);

            //         $jsonDuration = microtime(true) - $jsonTime;

            //         $span->setAttribute('json-conversion-time', $jsonDuration*1000);

            //         $childSpan->end();
            //         $childScope->detach();
            //     }

                return response()->json([
                    'status' => 200,
                    'places' => $places,
                ], 200);

                // Convert data to JSON
                // $jsonResponse = response()->json([
                //     'status' => 200,
                //     'places' => $places,
                //     "time" => $tracingDuration*1000
                // ], 200);

                //$endTime = microtime(true) - $startTime;
                //dd($endTime*1000);
                // return $jsonResponse;
            // }
        } catch (ModelNotFoundException $exception) {
            return response()->json([
                'status' => 404,
                'message' => 'No Records Found!!',
            ], 404);
        }
    }

    // practice purpose
    // public function fetchPlace()
    // {
    //     try {
    //         $startTime = microtime(true);
    //         $places = Place::with('placeImage')->get();
    //         $duration = microtime(true) - $startTime;

    //         if ($places->count() > 0) {
    //             $tracerProvider = new TracerProvider();

    //             $tracer = $tracerProvider->getTracer('my-ins');

    //             if ($tracer) {
    //                 $context = Context::getCurrent();
    //                 $span = $context->get(SpanKey::instance());

    //                 if ($span instanceof Span) {
    //                     $span->setAttribute('foo', 'bar');
    //                     $span->setAttribute('Application', 'Laravel');
    //                     $span->setAttribute('foo', 'bar1');
    //                     $span->setAttribute('duration_ms', $duration * 1000);
    //                     $span->updateName('Place api');

    //                     $childSpan = $tracer->spanBuilder('Child span')->startSpan();
    //                     $childScope = $childSpan->activate();
    //                     try {
    //                         throw new \Exception('Exception Example');
    //                     } catch (\Exception $exception) {
    //                         $childSpan->recordException($exception);
    //                     }
    //                     $childSpan->end();
    //                     $childScope->detach();
    //                 }

    //                 // Start measuring the JSON conversion duration
    //                 $jsonConversionStartTime = microtime(true);
    //                 // Convert data to JSON
    //                 $jsonResponse = response()->json([
    //                     'status' => 200,
    //                     'places' => $places,
    //                 ], 200);

    //                 // Measure the JSON conversion duration
    //                 $jsonConversionDuration = microtime(true) - $jsonConversionStartTime;

    //                 // Include JSON conversion duration in the attributes
    //                 $span->setAttribute('json_conversion_duration_ms', $jsonConversionDuration * 1000);

    //                 // Include duration in the JSON response
    //                 return $jsonResponse;
    //             }
    //         }
    //     } catch (ModelNotFoundException $exception) {
    //         return response()->json([
    //             'status' => 404,
    //             'message' => 'No Records Found!!',
    //         ], 404);
    //     }
    // }

    public function updatePlace(Request $req)
    {
    }

    public function deletePlace($id)
    {
    }
}
