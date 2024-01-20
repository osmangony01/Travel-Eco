<?php

namespace App\Models;

use App\Models\Hotel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class HotelImage extends Model
{
    use HasFactory;

    protected $fillable = ['hotel_id', 'hotel_image'];
    
    public function hotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class);
    }
}
