<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Document;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class DocumentController extends Controller
{
    public function index()
    {
        $documents = Document::orderBy('id', 'desc')->get();
    
        return Inertia::render('Document', [
            'documents' => $documents,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'related_type' => 'required|string|in:contact,company,deal',
            'file' => 'required|file|max:5120', 
        ]);

        $file = $request->file('file');

        $fileName = $validated['name'] . '.' . $file->getClientOriginalExtension();

        $path = $file->storeAs('documents', $fileName, 'public');

        $document = Document::create([
            'user_id' => Auth::id(),
            'name' => $fileName, 
            'related_type' => $validated['related_type'],
            'path' => $path,
            'size' => $file->getSize(),
        ]);

        return redirect(route('documents.index'));
    }

    public function destroy($id)
    {
        $document = Document::findOrFail($id);

        Storage::delete($document->path);

        $document->delete();

        return redirect(route('documents.index'));
    }

    public function download($id)
    {
        $document = Document::findOrFail($id);

        if (!Storage::disk('public')->exists($document->path)) {
            abort(404, 'File not found');
        }

        return Storage::disk('public')->download($document->path, $document->name);
    }
}