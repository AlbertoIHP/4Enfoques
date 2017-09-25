<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateSoftgoalNfrAPIRequest;
use App\Http\Requests\API\UpdateSoftgoalNfrAPIRequest;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;
use DB;

/**
 **Se traen los modelos y sus respectivos repositorios para crearlos con los formularios
 **/

use App\Models\SoftgoalNfr;
use App\Repositories\SoftgoalNfrRepository;

use App\Models\Project;
use App\Repositories\ProjectRepository;

use App\Models\Stakeholder;
use App\Repositories\StakeholderRepository;

use App\Models\Goal;
use App\Repositories\GoalRepository;

use App\Models\Softgoal;
use App\Repositories\SoftgoalRepository;



/**
 * Class SoftgoalNfrController
 * @package App\Http\Controllers\API
 */

class SoftgoalNfrAPIController extends AppBaseController
{
	/** @var  SoftgoalNfrRepository */
	private $softgoalNfrRepository;

	public function __construct(SoftgoalNfrRepository $softgoalNfrRepo)
	{
		$this->softgoalNfrRepository = $softgoalNfrRepo;
	}

	/**
	 * @param Request $request
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/softgoalNfrs",
	 *      summary="Get a listing of the SoftgoalNfrs.",
	 *      tags={"SoftgoalNfr"},
	 *      description="Get all SoftgoalNfrs",
	 *      produces={"application/json"},
	 *      @SWG\Response(
	 *          response=200,
	 *          description="successful operation",
	 *          @SWG\Schema(
	 *              type="object",
	 *              @SWG\Property(
	 *                  property="success",
	 *                  type="boolean"
	 *              ),
	 *              @SWG\Property(
	 *                  property="data",
	 *                  type="array",
	 *                  @SWG\Items(ref="#/definitions/SoftgoalNfr")
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function index(Request $request)
	{
		$this->softgoalNfrRepository->pushCriteria(new RequestCriteria($request));
		$this->softgoalNfrRepository->pushCriteria(new LimitOffsetCriteria($request));
		$softgoalNfrs = $this->softgoalNfrRepository->all();

		return $this->sendResponse($softgoalNfrs->toArray(), 'Softgoal Nfrs retrieved successfully');
	}

	/**
	 * @param CreateSoftgoalNfrAPIRequest $request
	 * @return Response
	 *
	 * @SWG\Post(
	 *      path="/softgoalNfrs",
	 *      summary="Store a newly created SoftgoalNfr in storage",
	 *      tags={"SoftgoalNfr"},
	 *      description="Store SoftgoalNfr",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="body",
	 *          in="body",
	 *          description="SoftgoalNfr that should be stored",
	 *          required=false,
	 *          @SWG\Schema(ref="#/definitions/SoftgoalNfr")
	 *      ),
	 *      @SWG\Response(
	 *          response=200,
	 *          description="successful operation",
	 *          @SWG\Schema(
	 *              type="object",
	 *              @SWG\Property(
	 *                  property="success",
	 *                  type="boolean"
	 *              ),
	 *              @SWG\Property(
	 *                  property="data",
	 *                  ref="#/definitions/SoftgoalNfr"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function store(CreateSoftgoalNfrAPIRequest $request)
	{
		$input = $request->all();

		$softgoalNfrs = $this->softgoalNfrRepository->create($input);

		return $this->sendResponse($softgoalNfrs->toArray(), 'Softgoal Nfr saved successfully');
	}

	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/softgoalNfrs/{id}",
	 *      summary="Display the specified SoftgoalNfr",
	 *      tags={"SoftgoalNfr"},
	 *      description="Get SoftgoalNfr",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of SoftgoalNfr",
	 *          type="integer",
	 *          required=true,
	 *          in="path"
	 *      ),
	 *      @SWG\Response(
	 *          response=200,
	 *          description="successful operation",
	 *          @SWG\Schema(
	 *              type="object",
	 *              @SWG\Property(
	 *                  property="success",
	 *                  type="boolean"
	 *              ),
	 *              @SWG\Property(
	 *                  property="data",
	 *                  ref="#/definitions/SoftgoalNfr"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function show($id)
	{
		/** @var SoftgoalNfr $softgoalNfr */
		$softgoalNfr = $this->softgoalNfrRepository->findWithoutFail($id);

		if (empty($softgoalNfr)) {
			return $this->sendError('Softgoal Nfr not found');
		}

		return $this->sendResponse($softgoalNfr->toArray(), 'Softgoal Nfr retrieved successfully');
	}

	/**
	 * @param int $id
	 * @param UpdateSoftgoalNfrAPIRequest $request
	 * @return Response
	 *
	 * @SWG\Put(
	 *      path="/softgoalNfrs/{id}",
	 *      summary="Update the specified SoftgoalNfr in storage",
	 *      tags={"SoftgoalNfr"},
	 *      description="Update SoftgoalNfr",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of SoftgoalNfr",
	 *          type="integer",
	 *          required=true,
	 *          in="path"
	 *      ),
	 *      @SWG\Parameter(
	 *          name="body",
	 *          in="body",
	 *          description="SoftgoalNfr that should be updated",
	 *          required=false,
	 *          @SWG\Schema(ref="#/definitions/SoftgoalNfr")
	 *      ),
	 *      @SWG\Response(
	 *          response=200,
	 *          description="successful operation",
	 *          @SWG\Schema(
	 *              type="object",
	 *              @SWG\Property(
	 *                  property="success",
	 *                  type="boolean"
	 *              ),
	 *              @SWG\Property(
	 *                  property="data",
	 *                  ref="#/definitions/SoftgoalNfr"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function update($id, UpdateSoftgoalNfrAPIRequest $request)
	{
		$input = $request->all();

		/** @var SoftgoalNfr $softgoalNfr */
		$softgoalNfr = $this->softgoalNfrRepository->findWithoutFail($id);

		if (empty($softgoalNfr)) {
			return $this->sendError('Softgoal Nfr not found');
		}

		$softgoalNfr = $this->softgoalNfrRepository->update($input, $id);

		return $this->sendResponse($softgoalNfr->toArray(), 'SoftgoalNfr updated successfully');
	}

	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Delete(
	 *      path="/softgoalNfrs/{id}",
	 *      summary="Remove the specified SoftgoalNfr from storage",
	 *      tags={"SoftgoalNfr"},
	 *      description="Delete SoftgoalNfr",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of SoftgoalNfr",
	 *          type="integer",
	 *          required=true,
	 *          in="path"
	 *      ),
	 *      @SWG\Response(
	 *          response=200,
	 *          description="successful operation",
	 *          @SWG\Schema(
	 *              type="object",
	 *              @SWG\Property(
	 *                  property="success",
	 *                  type="boolean"
	 *              ),
	 *              @SWG\Property(
	 *                  property="data",
	 *                  type="string"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function destroy(CreateSoftgoalNfrAPIRequest $request)
	{	
		error_log("hola!");
		$input = $request->all();

		$idSoft = $input['softgoals_id'];
		$idNfr = $input['nfrs_id'];

		error_log("El id del softgoal recibido es: ".$idSoft);
		error_log("El id del nfr recibido es: ".$idNfr);

		$sql = 'delete from softgoals_has_nfrs where softgoals_id='.$idSoft.' and nfrs_id='.$idNfr;
		error_log("El sql a ejecutar es: ".$sql);
		if(DB::delete($sql)){
			return $this->sendResponse($input, 'Softgoal Nfr saved successfully');
		}else{
			return $this->sendError('Softgoal Nfr not found');
		}
		


		
	}


	public function formProject(Request $request){
		$input = $request->all();

		///AQUI VA LA LOGICA DE LENGUAJE NATURAL


		//SE DEBE DEVOLVER UN OBJETO DE TIPO PROJECT
		return $this->sendResponse($input, 'Softgoal Nfr saved successfully');

	}

	public function formStakeholder(Request $request){
		$objetoFormulario = $request->all();

		///AQUI VA LA LOGICA DE LENGUAJE NATURAL





		//SE CREA UN NUEVO STAKEHOLDER
		$nuevoStakeholder = "";



		//SE CREA EL REGISTRO
		$stakeholder = $this->StakeholderRepository->create($nuevoStakeholder);

	



		//SE DEBE DEVOLVER UN OBJETO DE TIPO PROJECT
		return $this->sendResponse($stakeholder->toArray(), 'El formulario ha determinado el stakeholder exitosamente');

	}

	public function formGoal(Request $request){
		$input = $request->all();

		///AQUI VA LA LOGICA DE LENGUAJE NATURAL


		//SE DEBE DEVOLVER UN OBJETO DE TIPO goal
		return $this->sendResponse($input, 'Softgoal Nfr saved successfully');

	}

	public function formSoftgoal(Request $request){
		$input = $request->all();

		///AQUI VA LA LOGICA DE LENGUAJE NATURAL


		//SE DEBE DEVOLVER UN OBJETO DE TIPO softgoal
		return $this->sendResponse($input, 'Softgoal Nfr saved successfully');

	}
}
