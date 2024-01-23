<?php

namespace App\Http\Controllers;

use App\Models\Place;
use App\Models\PlaceImage;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class PlaceController extends Controller
{
    public function createPlace(Request $req)
    {
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
            if($images){
                try{
                    foreach ($images as $key => $image) {
    
                        // Sanitize the original filename directly using Str::slug()
                        $sanitizedOriginalName = Str::slug($image->getClientOriginalName());
            
                        // Generate a unique filename
                        $imageName = $sanitizedOriginalName . '_' . time() . '_' . $key . '.' . $image->getClientOriginalExtension();
            
                        // Move the file to the desired location
                        $image->move('uploads/', $imageName);
        
                        PlaceImage::create([
                            "place_id"=> $place->id,
                            "place_image" => $imageName
                        ]);
                    }
                }catch (\Exception $e) {
                    return response()->json(['status' => 500, 'error' => 'Failed to insert image data.'], 500);
                }
            }
            return response()->json(['status' => 201, 'message' => 'place are created successfully'], 201);
        } 
    }

    public function fetchPlace()
    {
        try {
            $places = Place::with('placeImage')->get();
    
            if ($places->count() > 0) {
                return response()->json([
                    'status' => 200,
                    'places' => $places,
                ], 200);
            }
        } catch (ModelNotFoundException $exception) {
            return response()->json([
                'status' => 404,
                'message' => 'No Records Found!!',
            ], 404);
        }
    } 

    public function updatePlace(Request $req)
    {

    }

    public function deletePlace($id)
    {
        
    }  
    
    
}
