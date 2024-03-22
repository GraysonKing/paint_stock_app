<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePaintRequest;
use App\Http\Requests\UpdatePaintRequest;
use App\Models\Paint;

class PaintController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StorePaintRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Paint $paint)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Paint $paint)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePaintRequest $request, Paint $paint)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Paint $paint)
    {
        //
    }
}
