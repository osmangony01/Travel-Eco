<?php

namespace App\Models;

use App\Models\User;
use App\Models\HotelImage;
use App\Models\HotelAmenity;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Hotel extends Model
{
    use HasFactory;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function hotelAmenity(): HasMany
    {
        return $this->hasMany(HotelAmenity::class);
    }

    public function hotelImage(): HasMany
    {
        return $this->hasMany(HotelImage::class);
    }
}
