<?php

namespace App\Services;

use App\Models\Musica;
use Exception;

class MusicaService
{
    public function extractVideoId($url)
    {
        $patterns = [
            '/youtube\.com\/watch\?v=([^&]+)/',
            '/youtu\.be\/([^?]+)/',
            '/youtube\.com\/embed\/([^?]+)/',
        ];

        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $url, $matches)) {
                return $matches[1];
            }
        }

        return null;
    }

    public function getVideoInfo($videoId)
    {
        $url = "https://www.youtube.com/watch?v=" . $videoId;
        $ch = curl_init();

        curl_setopt_array($ch, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        ]);

        $response = curl_exec($ch);
        if ($response === false) {
            throw new Exception("Erro ao acessar o YouTube: " . curl_error($ch));
        }

        curl_close($ch);

        if (!preg_match('/<title>(.+?) - YouTube<\/title>/', $response, $titleMatches)) {
            throw new Exception("Não foi possível encontrar o título do vídeo");
        }

        $title = html_entity_decode($titleMatches[1], ENT_QUOTES);

        if (preg_match('/"viewCount":\s*"(\d+)"/', $response, $viewMatches)) {
            $views = (int)$viewMatches[1];
        } else {
            $views = 0;
        }

        return [
            'titulo' => $title,
            'visualizacoes' => $views,
            'youtube_id' => $videoId,
            'thumb' => 'https://img.youtube.com/vi/'.$videoId.'/hqdefault.jpg',
        ];
    }

    public function salvaMusica($videoInfo)
    {
        Musica::create([
            'titulo' => $videoInfo['titulo'],
            'youtube_id' => $videoInfo['youtube_id'],
            'visualizacoes' => $videoInfo['visualizacoes'],
            'thumb' => $videoInfo['thumb'],
        ]);
    }
}
