<?php

namespace App\Repositories;

use App\Models\Nfr;
use InfyOm\Generator\Common\BaseRepository;

/**
 * Class NfrRepository
 * @package App\Repositories
 * @version September 12, 2017, 2:42 am UTC
 *
 * @method Nfr findWithoutFail($id, $columns = ['*'])
 * @method Nfr find($id, $columns = ['*'])
 * @method Nfr first($columns = ['*'])
*/
class NfrRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name',
        'description'
    ];

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Nfr::class;
    }
}
