<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Company;
use App\Models\Industry;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $companies = Company::select('id', 'industry_id', 'name')->orderBy('id', 'DESC')->get();
        $industries = Industry::all();

        return Inertia::render('Company', [
            'companies' => $companies,
            'industries' => $industries
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
            'industry_id' => 'required',
            'name' => 'required|string|max:255',
        ]);

        $company = Company::create([
            'industry_id' => $validatedData['industry_id'],
            'name' => $validatedData['name'],
        ]);

        return redirect(route('companies.index'));
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
        $company = Company::find($id);
        $company->delete();
        return redirect(route('companies.index'));
    }
}
