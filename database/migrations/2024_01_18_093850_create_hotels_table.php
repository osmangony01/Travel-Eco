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
        Schema::create('hotels', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id');
            $table->string('hotel_name');
            $table->longText('hotel_description')->nullable();
            $table->integer('hotel_rating')->nullable();
            $table->text('hotel_location');
            $table->string('hotel_map')->nullable();
            $table->integer('hotel_price');
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            $table->integer('hotel_type')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hotels');
    }
};
