<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
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
        $paints = Paint::all();

        return Inertia::render('ManagePaints', [
            'paints' => $paints,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePaintRequest $request)
    {
        Paint::whereId($request->id)->update($request->all());
    }
}
