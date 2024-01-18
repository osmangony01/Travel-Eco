<?php

namespace App\Models;

use App\Models\User;
use App\Models\PostImage;
use App\Models\PostComment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Post extends Model
{
    use HasFactory;

    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function postComment(): HasMany
    {
        return $this->hasMany(PostComment::class);
    }

    public function postImage(): HasMany
    {
        return $this->hasMany(PostImage::class);
    }
}
