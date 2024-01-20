<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use App\Models\HotelImage;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HotelController extends Controller
{
    public function createHotel(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'user_id' => 'required',
            'hotel_name' => 'required|string',
            'hotel_description' => 'required|string',
            'hotel_location' => 'required|string',
            'hotel_price' => 'required',
            'hotel_rating' => 'required', 
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors()
            ], 422);
        } 

        try {
            $hotel = Hotel::create([
                'user_id' => $req->user_id,
                'hotel_name' => $req->hotel_name,
                'hotel_description' => $req->hotel_description,
                'hotel_location' => $req->hotel_location,
                'hotel_price' => $req->hotel_price,
                'hotel_rating' => $req->hotel_rating, 
            ]);
            
        } catch (\Exception $e) {
            return response()->json(['status' => 500, 'error' => 'Failed to insert data.'], 500);
        }

        $images = $req->file('images');
        If($images){
            try{
                foreach ($images as $key => $image) {

                    // Sanitize the original filename directly using Str::slug()
                    $sanitizedOriginalName = Str::slug($image->getClientOriginalName());
        
                    // Generate a unique filename
                    $imageName = $sanitizedOriginalName . '_' . time() . '_' . $key . '.' . $image->getClientOriginalExtension();
        
                    // Move the file to the desired location
                    $image->move('uploads/', $imageName);
    
                    HotelImage::create([
                        "hotel_id"=> $hotel->id,
                        "hotel_image" => $imageName
                    ]);
                }
            }catch (\Exception $e) {
                return response()->json(['status' => 500, 'error' => 'Failed to insert image data.'], 500);
            }
        }
        return response()->json(['status' => 201, 'message' => 'Hotel are created successfully'], 201);
    }
}
