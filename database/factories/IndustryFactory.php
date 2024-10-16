<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Industry>
 */
class IndustryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement([
                'Agency',
                'Apparel',
                'Banking',
                'Biotechnology',
                'Chemicals',
                'Communications',
                'Construction',
                'Consulting',
                'Education',
                'Electronics',
                'Energy',
                'Engineering',
                'Entertainment',
                'Environmental',
                'Finance',
                'Food - Beverage',
                'Government',
                'Healthcare',
                'Hospitality',
                'Insurance',
                'IT',
                'Machinery',
                'Manufacturing',
                'Marketing',
                'Media',
                'Not For Profit',
                'Recreation',
                'Retail',
                'Shipping',
                'Technology',
                'Telecommunications',
                'Transportation',
                'Utilities',
                'Other',
            ])
        ];
    }
}
