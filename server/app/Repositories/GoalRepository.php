<?php

namespace App\Repositories;

use App\Models\Goal;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class GoalRepository
 * @package App\Repositories
 * @version September 12, 2017, 2:42 am UTC
 *
 * @method Goal findWithoutFail($id, $columns = ['*'])
 * @method Goal find($id, $columns = ['*'])
 * @method Goal first($columns = ['*'])
*/
class GoalRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name',
        'description',
        'relevance',
        'stakeholders_id'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Goal::class;
    }
}
