<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MusicasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('musicas')->insert([
            [
                'titulo' => 'Song 1',
                'visualizacoes' => 1000,
                'youtube_id' => 'abc123',
                'thumb' => 'https://example.com/thumb1.jpg',
                'created_at' => now(),
            ],
            [
                'titulo' => 'Song 2',
                'visualizacoes' => 2000,
                'youtube_id' => 'def456',
                'thumb' => 'https://example.com/thumb2.jpg',
                'created_at' => now(),
            ],
        ]);
    }
}
