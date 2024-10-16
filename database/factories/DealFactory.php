<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Deal>
 */
class DealFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'company_id' => rand(1, 30),
            'user_id' => rand(1, 30),
            'contact_id' => rand(1, 30),
            'title' => fake()->sentence(),
            'value' => fake()->randomFloat(2, 1000, 100000),
            'stage' => fake()->randomElement(['lead', 'negotiation', 'won', 'lost']),
            'deadline' => fake()->dateTimeBetween('now', '+1 year'),
        ];
    }
}
