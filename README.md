> ### RenWorld Bank

This app is a bank for users to create transactions, send and receive money. You can view a demo here [Demo](https://calendar-appointments.herokuapp.com/)

## Features

-   Create appointments for different times in a day.
-   Edit/Delete an appointment.
-   Export appointments to Excel or PDF.
-   Print appointments.
-   Multiple appointment views (Month, Week, Appointments).
-   Importing old appointments.
-   Auto mark an appointment as completed if the end date has passed.

# Getting started

## Installation

Please check the official laravel installation guide for server requirements before you start. [Official Documentation](https://laravel.com/docs/5.8/installation)

Clone the repository

    git clone https://github.com/kingeke/Calendar-App.git

Switch to the repo folder

    cd Calendar-App

Install all the dependencies using composer

    composer install

Install all the packages using npm

    npm install

Copy the example env file and make the required configuration changes in the .env file

    cp .env.example .env

Generate a new application key

    php artisan key:generate

Generate a new JWT token key

    php artisan jwt:secret

**Make sure you set the correct database connection information before running the migrations**

    php artisan migrate

Seed database to have access to dummy user

    php artisan db:seed

Start the local development server

    php artisan serve

You can now access the server at http://127.0.0.1:8000

# Testing

## PHP

To run tests for the backend and assert the app still works 100%, set DB_DATABASE variable in phpunit.xml to your test database, and set JWT_SECRET variable to the variable provided when you ran

    php artisan jwt:secret

then run

    php vendor/phpunit/phpunit/phpunit

## Javascript

Jest is the test framework used for this platform.

To run tests use

    npm run test
