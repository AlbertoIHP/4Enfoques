<?php

namespace App\Repositories;

use App\Models\SoftgoalNfr;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class SoftgoalNfrRepository
 * @package App\Repositories
 * @version September 24, 2017, 11:33 pm UTC
 *
 * @method SoftgoalNfr findWithoutFail($id, $columns = ['*'])
 * @method SoftgoalNfr find($id, $columns = ['*'])
 * @method SoftgoalNfr first($columns = ['*'])
*/
class SoftgoalNfrRepository extends BaseRepository
{
	/**
	 * @var array
	 */
	protected $fieldSearchable = [
		'nfrs_id',
		'softgoals_id',
		'remember_token'
	];

	/**
	 * Configure the Model
	 **/
	public function model()
	{
		return SoftgoalNfr::class;
	}
}
