<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Paint; // Replace with your Paint model path

class PaintSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $paints = [
            [
                'name' => 'Blue',
                'color_code' => '#0000FF',
                'quantity' => 100,
            ],
            [
                'name' => 'Grey',
                'color_code' => '#808080',
                'quantity' => 50,
            ],
            [
                'name' => 'Black',
                'color_code' => '#000000',
                'quantity' => 75,
            ],
            [
                'name' => 'Snow White',
                'color_code' => '#FFFFFF',
                'quantity' => 120,
            ],
            [
                'name' => 'Purple',
                'color_code' => '#800080',
                'quantity' => 60,
            ],
        ];

        foreach ($paints as $paint) {
            Paint::create($paint);
        }
    }
}
