<?php

namespace App\Http\Controllers;

use App\DataTables\GoalDataTable;
use App\Http\Requests;
use App\Http\Requests\CreateGoalRequest;
use App\Http\Requests\UpdateGoalRequest;
use App\Repositories\GoalRepository;
use Flash;
use App\Http\Controllers\AppBaseController;
use Response;

class GoalController extends AppBaseController
{
    /** @var  GoalRepository */
    private $goalRepository;

    public function __construct(GoalRepository $goalRepo)
    {
        $this->goalRepository = $goalRepo;
    }

    /**
     * Display a listing of the Goal.
     *
     * @param GoalDataTable $goalDataTable
     * @return Response
     */
    public function index(GoalDataTable $goalDataTable)
    {
        return $goalDataTable->render('goals.index');
    }

    /**
     * Show the form for creating a new Goal.
     *
     * @return Response
     */
    public function create()
    {
        return view('goals.create');
    }

    /**
     * Store a newly created Goal in storage.
     *
     * @param CreateGoalRequest $request
     *
     * @return Response
     */
    public function store(CreateGoalRequest $request)
    {
        $input = $request->all();

        $goal = $this->goalRepository->create($input);

        Flash::success('Goal saved successfully.');

        return redirect(route('goals.index'));
    }

    /**
     * Display the specified Goal.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $goal = $this->goalRepository->findWithoutFail($id);

        if (empty($goal)) {
            Flash::error('Goal not found');

            return redirect(route('goals.index'));
        }

        return view('goals.show')->with('goal', $goal);
    }

    /**
     * Show the form for editing the specified Goal.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $goal = $this->goalRepository->findWithoutFail($id);

        if (empty($goal)) {
            Flash::error('Goal not found');

            return redirect(route('goals.index'));
        }

        return view('goals.edit')->with('goal', $goal);
    }

    /**
     * Update the specified Goal in storage.
     *
     * @param  int              $id
     * @param UpdateGoalRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateGoalRequest $request)
    {
        $goal = $this->goalRepository->findWithoutFail($id);

        if (empty($goal)) {
            Flash::error('Goal not found');

            return redirect(route('goals.index'));
        }

        $goal = $this->goalRepository->update($request->all(), $id);

        Flash::success('Goal updated successfully.');

        return redirect(route('goals.index'));
    }

    /**
     * Remove the specified Goal from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $goal = $this->goalRepository->findWithoutFail($id);

        if (empty($goal)) {
            Flash::error('Goal not found');

            return redirect(route('goals.index'));
        }

        $this->goalRepository->delete($id);

        Flash::success('Goal deleted successfully.');

        return redirect(route('goals.index'));
    }
}
