<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="SoftgoalNfr",
 *      required={""},
 *      @SWG\Property(
 *          property="softgoals_id",
 *          description="softgoals_id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="nfrs_id",
 *          description="nfrs_id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="remember_token",
 *          description="remember_token",
 *          type="string"
 *      )
 * )
 */
class SoftgoalNfr extends Model
{
	use SoftDeletes;

	public $table = 'softgoals_has_nfrs';
	
	const CREATED_AT = 'created_at';
	const UPDATED_AT = 'updated_at';


	protected $dates = ['deleted_at'];


	public $fillable = [
		'nfrs_id',
		'softgoals_id',
		'remember_token'
	];

	/**
	 * The attributes that should be casted to native types.
	 *
	 * @var array
	 */
	protected $casts = [
		'softgoals_id' => 'integer',
		'nfrs_id' => 'integer',
		'remember_token' => 'string'
	];

	/**
	 * Validation rules
	 *
	 * @var array
	 */
	public static $rules = [
		
	];

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 **/
	public function nfr()
	{
		return $this->belongsTo(\App\Models\Nfr::class);
	}

	/**
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
	 **/
	public function softgoal()
	{
		return $this->belongsTo(\App\Models\Softgoal::class);
	}
}
