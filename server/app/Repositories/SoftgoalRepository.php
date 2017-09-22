<?php

namespace App\Repositories;

use App\Models\Softgoal;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class SoftgoalRepository
 * @package App\Repositories
 * @version September 12, 2017, 2:42 am UTC
 *
 * @method Softgoal findWithoutFail($id, $columns = ['*'])
 * @method Softgoal find($id, $columns = ['*'])
 * @method Softgoal first($columns = ['*'])
*/
class SoftgoalRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name',
        'description',
        'relevance',
        'goals_id'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Softgoal::class;
    }
}
