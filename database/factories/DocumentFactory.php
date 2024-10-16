<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Document>
 */
class DocumentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => rand(1, 30),
            'related_type' => fake()->randomElement(['contact', 'company', 'deal']),
            'name' => fake()->word() . '.' . fake()->fileExtension(),
            'path' => fake()->filePath(),
            'size' => fake()->randomNumber(6),
        ];
    }
}
