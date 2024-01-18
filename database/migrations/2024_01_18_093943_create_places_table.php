<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('places', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id');
            $table->string('place_name');
            $table->longText('place_description')->nullable();
            $table->integer('place_rating')->nullable();
            $table->text('place_location');
            $table->string('place_map')->nullable();
            $table->string('place_latitude')->nullable();
            $table->string('place_longitude')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('places');
    }
};
