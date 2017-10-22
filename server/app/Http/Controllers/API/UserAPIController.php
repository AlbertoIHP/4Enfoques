<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateUserAPIRequest;
use App\Http\Requests\API\UpdateUserAPIRequest;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

//CORREO TIII
use Illuminate\Support\Facades\Mail;
use Input;


/**
 * Class UserController
 * @package App\Http\Controllers\API
 */

class UserAPIController extends AppBaseController
{
	/** @var  UserRepository */
	private $userRepository;

	public function __construct(UserRepository $userRepo)
	{
		$this->userRepository = $userRepo;
	}

	/**
	 * @param Request $request
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/users",
	 *      summary="Get a listing of the Users.",
	 *      tags={"User"},
	 *      description="Get all Users",
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
	 *                  @SWG\Items(ref="#/definitions/User")
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
		$this->userRepository->pushCriteria(new RequestCriteria($request));
		$this->userRepository->pushCriteria(new LimitOffsetCriteria($request));
		$users = $this->userRepository->all();

		return $this->sendResponse($users->toArray(), 'Users retrieved successfully');
	}


	/**
	 * @param CreateUserAPIRequest $request
	 * @return Response
	 *
	 * @SWG\Post(
	 *      path="/users",
	 *      summary="Store a newly created User in storage",
	 *      tags={"User"},
	 *      description="Store User",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="body",
	 *          in="body",
	 *          description="User that should be stored",
	 *          required=false,
	 *          @SWG\Schema(ref="#/definitions/User")
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
	 *                  ref="#/definitions/User"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	// public function store(CreateUserAPIRequest $request)
	// {
	// 	$input = $request->all();

	// 	$input["password"] = bcrypt($input["password"]);

	// 	$users = $this->userRepository->create($input);

	// 	return $this->sendResponse($users->toArray(), 'User saved successfully');
	// }


public function store(Request $request){

	$confirmation_code = str_random(30);
	$input = $request->all();

	$rules = [
	  'email' => 'required|unique:users',
	  'password' => 'required',
	];
	$data = [
	  'email' => $request->email,
	  'name' => $request->name,
	  'password' => bcrypt($request->password),
	  'confirmation_code' => $confirmation_code,
	];
	try {
	  $validator = \Validator::make($data, $rules);
	  if ($validator->fails()) {
		return [
		  'created' => false,
		  'errors' => $validator->errors()->all(),
		];
	  }else{
		Mail::send('email.validarCuenta', 
		  ['confirmation_code' => $confirmation_code], function ($message) {
			$message->to(Input::get('email'), Input::get('nombre'))
				->subject('Por favor verifique su cuenta');
		});
		User::create($data);
		return ['created' => true];
	  }
	} catch (\Exception $e) {
	  \Log::info('Error creating user: ' . $e);
	  return \Response::json(['created' => false], 500);
	}
  }


	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Get(
	 *      path="/users/{id}",
	 *      summary="Display the specified User",
	 *      tags={"User"},
	 *      description="Get User",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of User",
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
	 *                  ref="#/definitions/User"
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
		/** @var User $user */
		$user = $this->userRepository->findWithoutFail($id);

		if (empty($user)) {
			return $this->sendError('User not found');
		}

		return $this->sendResponse($user->toArray(), 'User retrieved successfully');
	}

	/**
	 * @param int $id
	 * @param UpdateUserAPIRequest $request
	 * @return Response
	 *
	 * @SWG\Put(
	 *      path="/users/{id}",
	 *      summary="Update the specified User in storage",
	 *      tags={"User"},
	 *      description="Update User",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of User",
	 *          type="integer",
	 *          required=true,
	 *          in="path"
	 *      ),
	 *      @SWG\Parameter(
	 *          name="body",
	 *          in="body",
	 *          description="User that should be updated",
	 *          required=false,
	 *          @SWG\Schema(ref="#/definitions/User")
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
	 *                  ref="#/definitions/User"
	 *              ),
	 *              @SWG\Property(
	 *                  property="message",
	 *                  type="string"
	 *              )
	 *          )
	 *      )
	 * )
	 */
	public function update($id, UpdateUserAPIRequest $request)
	{
		$input = $request->all();

		/** @var User $user */
		$user = $this->userRepository->findWithoutFail($id);



		if (empty($user)) {
			return $this->sendError('User not found');
		}

		$user = $this->userRepository->update($input, $id);

		return $this->sendResponse($user->toArray(), 'User updated successfully');
	}

	/**
	 * @param int $id
	 * @return Response
	 *
	 * @SWG\Delete(
	 *      path="/users/{id}",
	 *      summary="Remove the specified User from storage",
	 *      tags={"User"},
	 *      description="Delete User",
	 *      produces={"application/json"},
	 *      @SWG\Parameter(
	 *          name="id",
	 *          description="id of User",
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
	public function destroy($id)
	{
		/** @var User $user */
		$user = $this->userRepository->findWithoutFail($id);

		if (empty($user)) {
			return $this->sendError('User not found');
		}

		$user->delete();

		return $this->sendResponse($id, 'User deleted successfully');
	}

	  public function confirm ($confirmation_code) {

		if (!$confirmation_code) {
		  return \Response::json(['confirmation_code' => 'Invalid'], 500);
		}
		$user = User::whereConfirmationCode($confirmation_code)->first();
		if (!$user) {
		  return \Response::json(['confirmation_code' => 'Invalid'], 500);
		}
		$user->confirmed = 1;
		$user->confirmation_code = null;
		$user->save();
		return \Response::json(['verified' => true, 'confirmed' => $user->confirmed]);
	  }
}
