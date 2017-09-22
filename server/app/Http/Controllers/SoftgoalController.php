<?php

namespace App\Http\Controllers;

use App\DataTables\SoftgoalDataTable;
use App\Http\Requests;
use App\Http\Requests\CreateSoftgoalRequest;
use App\Http\Requests\UpdateSoftgoalRequest;
use App\Repositories\SoftgoalRepository;
use Flash;
use App\Http\Controllers\AppBaseController;
use Response;

class SoftgoalController extends AppBaseController
{
    /** @var  SoftgoalRepository */
    private $softgoalRepository;

    public function __construct(SoftgoalRepository $softgoalRepo)
    {
        $this->softgoalRepository = $softgoalRepo;
    }

    /**
     * Display a listing of the Softgoal.
     *
     * @param SoftgoalDataTable $softgoalDataTable
     * @return Response
     */
    public function index(SoftgoalDataTable $softgoalDataTable)
    {
        return $softgoalDataTable->render('softgoals.index');
    }

    /**
     * Show the form for creating a new Softgoal.
     *
     * @return Response
     */
    public function create()
    {
        return view('softgoals.create');
    }

    /**
     * Store a newly created Softgoal in storage.
     *
     * @param CreateSoftgoalRequest $request
     *
     * @return Response
     */
    public function store(CreateSoftgoalRequest $request)
    {
        $input = $request->all();

        $softgoal = $this->softgoalRepository->create($input);

        Flash::success('Softgoal saved successfully.');

        return redirect(route('softgoals.index'));
    }

    /**
     * Display the specified Softgoal.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $softgoal = $this->softgoalRepository->findWithoutFail($id);

        if (empty($softgoal)) {
            Flash::error('Softgoal not found');

            return redirect(route('softgoals.index'));
        }

        return view('softgoals.show')->with('softgoal', $softgoal);
    }

    /**
     * Show the form for editing the specified Softgoal.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $softgoal = $this->softgoalRepository->findWithoutFail($id);

        if (empty($softgoal)) {
            Flash::error('Softgoal not found');

            return redirect(route('softgoals.index'));
        }

        return view('softgoals.edit')->with('softgoal', $softgoal);
    }

    /**
     * Update the specified Softgoal in storage.
     *
     * @param  int              $id
     * @param UpdateSoftgoalRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateSoftgoalRequest $request)
    {
        $softgoal = $this->softgoalRepository->findWithoutFail($id);

        if (empty($softgoal)) {
            Flash::error('Softgoal not found');

            return redirect(route('softgoals.index'));
        }

        $softgoal = $this->softgoalRepository->update($request->all(), $id);

        Flash::success('Softgoal updated successfully.');

        return redirect(route('softgoals.index'));
    }

    /**
     * Remove the specified Softgoal from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $softgoal = $this->softgoalRepository->findWithoutFail($id);

        if (empty($softgoal)) {
            Flash::error('Softgoal not found');

            return redirect(route('softgoals.index'));
        }

        $this->softgoalRepository->delete($id);

        Flash::success('Softgoal deleted successfully.');

        return redirect(route('softgoals.index'));
    }
}
