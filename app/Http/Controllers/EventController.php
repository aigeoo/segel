<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Event;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Event::select('id', 'title', 'description', 'start', 'end')->orderBy('id', 'DESC')->get();

        return Inertia::render('Event', [
            'events' => $events,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'start' => 'required|date|before:end',
            'end' => 'required|date|after:start',
        ]);

        $event = Event::create([
            'user_id' => Auth::id(),
            'title' => $validatedData['title'],
            'description' => $validatedData['description'],
            'start' => $validatedData['start'],
            'end' => $validatedData['end'],
        ]);

        return redirect(route('events.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $event = Event::find($id);
        $event->delete();
        return redirect(route('events.index'));
    }
}
