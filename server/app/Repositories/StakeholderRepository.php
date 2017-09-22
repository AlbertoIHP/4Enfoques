<?php

namespace App\Repositories;

use App\Models\Stakeholder;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class StakeholderRepository
 * @package App\Repositories
 * @version September 12, 2017, 2:42 am UTC
 *
 * @method Stakeholder findWithoutFail($id, $columns = ['*'])
 * @method Stakeholder find($id, $columns = ['*'])
 * @method Stakeholder first($columns = ['*'])
*/
class StakeholderRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name',
        'decription',
        'function',
        'profession',
        'projects_id'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Stakeholder::class;
    }
}
