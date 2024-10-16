<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $start = $this->faker->dateTimeBetween('-1 month', 'now');

        // Ensure the end time is after the start time
        $end = (clone $start)->modify('+'.rand(1, 5).' hours');

        return [
            'user_id' => rand(1, 30),
            'title' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'start' => $start,
            'end' => $end
        ];
    }
}
