<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
  return redirect('home');
});


Auth::routes();

Route::get('/home', 'HomeController@index');

Route::resource('users', 'UserController');

Route::resource('projects', 'ProjectController');

Route::resource('stakeholders', 'StakeholderController');

Route::resource('goals', 'GoalController');

Route::resource('softgoals', 'SoftgoalController');

Route::resource('nfrs', 'NfrController');

Route::resource('softgoalNfrs', 'SoftgoalNfrController');