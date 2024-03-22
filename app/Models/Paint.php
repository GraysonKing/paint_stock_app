<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paint extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'colour_code',
        'stock',
    ];

    public $incrementing = false; // Disable auto-incrementing primary key

    public function getKeyType()
    {
        return 'string'; // Set key type to string
    }
}
