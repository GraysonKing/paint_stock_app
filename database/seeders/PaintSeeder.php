<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Paint;

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
                'colour_code' => '#0000FF',
                'stock' => 11,
            ],
            [
                'name' => 'Grey',
                'colour_code' => '#808080',
                'stock' => 0,
            ],
            [
                'name' => 'Black',
                'colour_code' => '#000000',
                'stock' => 7,
            ],
            [
                'name' => 'White',
                'colour_code' => '#FFFFFF',
                'stock' => 12,
            ],
            [
                'name' => 'Purple',
                'colour_code' => '#800080',
                'stock' => 9,
            ],
        ];

        foreach ($paints as $paint) {
            Paint::create($paint);
        }
    }
}
