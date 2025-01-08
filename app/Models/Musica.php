<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Musica extends Model
{
    use HasFactory;

    public $timestamps = true;

    protected $fillable = ['url', 'titulo', 'youtube_id', 'visualizacoes', 'thumb'];
}

