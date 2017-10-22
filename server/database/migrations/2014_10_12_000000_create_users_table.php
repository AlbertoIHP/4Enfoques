<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		// Schema::table('users', function (Blueprint $table) {
		// 	$table->timestamp('deleted_at')->nullable();
		// 	$table->rememberToken();
		// 	$table->timestamps();
		// });
		// Schema::table('projects', function (Blueprint $table) {
		// 	$table->timestamp('deleted_at')->nullable();
		// 	$table->rememberToken();
		// 	$table->timestamps();
		// });

		// Schema::table('stakeholders', function (Blueprint $table) {
		// 	$table->timestamp('deleted_at')->nullable();
		// 	$table->rememberToken();
		// 	$table->timestamps();
		// });


		// Schema::table('goals', function (Blueprint $table) {
		// 	$table->timestamp('deleted_at')->nullable();
		// 	$table->rememberToken();
		// 	$table->timestamps();
		// });


		// Schema::table('softgoals', function (Blueprint $table) {
		// 	$table->timestamp('deleted_at')->nullable();
		// 	$table->rememberToken();
		// 	$table->timestamps();
		// });


		// Schema::table('softgoals_has_nfrs', function (Blueprint $table) {
		// 	$table->timestamp('deleted_at')->nullable();
		// 	$table->rememberToken();
		// 	$table->timestamps();
		// });



		// Schema::table('nfrs', function (Blueprint $table) {
		// 	$table->timestamp('deleted_at')->nullable();
		// 	$table->rememberToken();
		// 	$table->timestamps();
		// });

		Schema::table('users', function (Blueprint $table) {
			$table->boolean('confirmed')->default(0);
			$table->string('confirmation_code')->nullable();
		});

	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('users');
	}
}
