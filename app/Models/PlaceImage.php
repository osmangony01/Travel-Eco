<?php

namespace App\Models;

use App\Models\Place;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PlaceImage extends Model
{
    use HasFactory;

    protected $fillable = ['place_id', 'place_image'];
    
    public function place():BelongsTo
    {
        return $this->belongsTo(Place::class);
    }
}