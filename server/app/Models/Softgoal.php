<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="Softgoal",
 *      required={""},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="name",
 *          description="name",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="description",
 *          description="description",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="relevance",
 *          description="relevance",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="goals_id",
 *          description="goals_id",
 *          type="integer",
 *          format="int32"
 *      )
 * )
 */
class Softgoal extends Model
{
    use SoftDeletes;

    public $table = 'softgoals';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'name',
        'description',
        'relevance',
        'goals_id'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'name' => 'string',
        'description' => 'string',
        'relevance' => 'string',
        'goals_id' => 'integer'
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
    public function goal()
    {
        return $this->belongsTo(\App\Models\Goal::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     **/
    public function nfrs()
    {
        return $this->belongsToMany(\App\Models\Nfr::class, 'softgoals_has_nfrs');
    }
}
