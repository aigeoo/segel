<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Deal;
use App\Models\Company;
use App\Models\User;
use App\Models\Contact;
use Illuminate\Support\Facades\Auth;

class DealController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $deals = Deal::orderBy('id', 'desc')->get();
        $companies = Company::all();
        $users = User::all();
        $contacts = Contact::all();

        return Inertia::render('Deal', [
            'initialDeals' => $deals,
            'companies' => $companies,
            'users' => $users,
            'contacts' => $contacts,
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
            'company_id' => 'required|integer',
            'contact_id' => 'required|integer',
            'title' => 'required|string|max:255',
            'value' => 'required',
            'stage' => 'required|string|max:255',
            'deadline' => 'required|string',
        ]);

        $deal = Deal::create([
            'company_id' => $validatedData['company_id'],
            'user_id' => Auth::id(),
            'contact_id' => $validatedData['contact_id'],
            'title' => $validatedData['title'],
            'value' => $validatedData['value'],
            'stage' => $validatedData['stage'],
            'deadline' => $validatedData['deadline'],
        ]);

        return redirect(route('deals.index'));
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
        $deal = Deal::findOrFail($id);

        $deal->update([
            'title' => $request->input('title'),
            'value' => $request->input('value'),
            'stage' => $request->input('stage'),
            'deadline' => $request->input('deadline'),
            'company_id' => $request->input('company_id'),
            'user_id' => $request->input('user_id'),
            'contact_id' => $request->input('contact_id'),
        ]);

        return redirect(route('deals.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $deal = Deal::find($id);
        $deal->delete();
        return redirect(route('deals.index'));
    }
}
