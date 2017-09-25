<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
	return $request->user();
});





//Grupo de rutas que tienen un middleware jwt.auth
Route::group(['middleware' => ['cors', 'jwt.auth']], function () {

});




Route::group(['middleware' => ['cors']], function(){
	Route::post('/login', 'AuthController@userAuth');
	Route::post('/v1/users', 'UserAPIController@store');

	Route::resource('v1/users', 'UserAPIController');

	Route::resource('v1/projects', 'ProjectAPIController');

	Route::resource('v1/stakeholders', 'StakeholderAPIController');

	Route::resource('v1/goals', 'GoalAPIController');

	Route::resource('v1/softgoals', 'SoftgoalAPIController');

	Route::resource('v1/nfrs', 'NfrAPIController');

	Route::resource('v1/projects', 'ProjectAPIController');

	Route::resource('v1/softgoalNfrs', 'SoftgoalNfrAPIController');
});

