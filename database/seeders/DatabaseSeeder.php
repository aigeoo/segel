<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Contact;
use App\Models\Deal;
use App\Models\Document;
use App\Models\Event;
use App\Models\Industry;
use App\Models\Task;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User
        User::factory()->create([
            'first_name' => 'admin',
            'last_name' => 'alessaei',
            'email' => 'admin@segel.com',
            'password' => 'admin'
        ]);

        User::factory(29)->create();

        // Task
        Task::factory(30)->create();

        // Event
        Event::factory(30)->create();

        // Document
        Document::factory(30)->create();

        // Industry
        Industry::factory(30)->create();

        // Company
        Company::factory(30)->create();

        // Contact
        Contact::factory(30)->create();

        // Deal
        Deal::factory(30)->create();
    }
}
