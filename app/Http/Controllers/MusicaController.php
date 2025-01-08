<?php

namespace App\Http\Controllers;

use App\Models\Musica;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MusicaController extends Controller
{

    public function index(Request $request)
    {
        $validSortColumns = ['titulo', 'visualizacoes', 'created_at'];

        $sort = $request->input('sort', 'titulo');
        if (!in_array($sort, $validSortColumns)) {
            $sort = 'titulo';
        }

        $direction = $request->input('direction', 'asc');
        if (!in_array($direction, ['asc', 'desc'])) {
            $direction = 'asc';
        }

        $musicas = Musica::orderBy($sort, $direction)->paginate(10);

        return Inertia::render('Musicas/Index', [
            'musicas' => $musicas,
            'sort' => $sort,
            'direction' => $direction,
        ]);
    }


    public function create()
    {
        return Inertia::render('Musicas/Create');
    }


    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'youtube_link' => 'required|url',
        ]);

        Musica::create($validatedData);

        return redirect()->route('music.index')->with('success', 'Música criada com sucesso.');
    }


    public function show($id)
    {
        $music = Musica::findOrFail($id);

        return Inertia::render('Admin/Musica/Show', [
            'musica' => $music,
        ]);
    }

    public function edit(Musica $musica)
    {
        return Inertia::render('Admin/Musica/Edit', [
            'musica' => $musica,
            'id' => $musica->id,
        ]);
    }

    public function update(Request $request, $id)
    {
        $musica = Musica::findOrFail($id);

        $validatedData = $request->validate([
            'url' => 'required|url',
        ]);

        $musica->update([
            'url' => $validatedData['url'],
        ]);

        return response()->json(['musica' => $musica]);
    }


    public function destroy(Musica $music)
    {
        $music->delete();

        return redirect()->route('music.index')->with('success', 'Música deletada com sucesso.');
    }



    // admin

    public function admiindex()
    {
        $musicas = Musica::paginate(10);

        return Inertia::render('Admin/Index', [
            'musicas' => $musicas,
        ]);
    }

    public function admindashboard()
    {
        return Inertia::render('Admin/Dashboard');
    }

    public function admicreate()
    {
        return Inertia::render('Admin/Musica/Create');
    }

    public function sugestoes()
    {
        $musicas = Musica::paginate(10);

        return Inertia::render('Admin/Sugestoes/Index', [
            'musicas' => $musicas,
        ]);
    }

    public function approve($id)
    {
        $musica = Musica::findOrFail($id);

        $musica->status = 'aprovada';
        $musica->save();

        return response()->json(['message' => 'Música aprovada com sucesso!']);
    }

    public function disapprove($id)
    {
        $musica = Musica::findOrFail($id);

        $musica->status = 'reprovada';
        $musica->save();

        return response()->json(['message' => 'Música reprovada com sucesso!']);
    }
}
