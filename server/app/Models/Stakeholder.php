<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @SWG\Definition(
 *      definition="Stakeholder",
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
 *          property="decription",
 *          description="decription",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="function",
 *          description="function",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="profession",
 *          description="profession",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="projects_id",
 *          description="projects_id",
 *          type="integer",
 *          format="int32"
 *      )
 * )
 */
class Stakeholder extends Model
{
    use SoftDeletes;

    public $table = 'stakeholders';
    
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';


    protected $dates = ['deleted_at'];


    public $fillable = [
        'name',
        'decription',
        'function',
        'profession',
        'projects_id'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'name' => 'string',
        'decription' => 'string',
        'function' => 'string',
        'profession' => 'string',
        'projects_id' => 'integer'
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
    public function project()
    {
        return $this->belongsTo(\App\Models\Project::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     **/
    public function goals()
    {
        return $this->hasMany(\App\Models\Goal::class);
    }
}
