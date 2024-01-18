<?php

namespace App\Models;

use App\Models\User;
use App\Models\PlaceImage;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Place extends Model
{
    use HasFactory;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function placeImage(): HasMany
    {
        return $this->hasMany(PlaceImage::class);
    }
}
