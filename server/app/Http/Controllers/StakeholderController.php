<?php

namespace App\Http\Controllers;

use App\DataTables\StakeholderDataTable;
use App\Http\Requests;
use App\Http\Requests\CreateStakeholderRequest;
use App\Http\Requests\UpdateStakeholderRequest;
use App\Repositories\StakeholderRepository;
use Flash;
use App\Http\Controllers\AppBaseController;
use Response;

class StakeholderController extends AppBaseController
{
    /** @var  StakeholderRepository */
    private $stakeholderRepository;

    public function __construct(StakeholderRepository $stakeholderRepo)
    {
        $this->stakeholderRepository = $stakeholderRepo;
    }

    /**
     * Display a listing of the Stakeholder.
     *
     * @param StakeholderDataTable $stakeholderDataTable
     * @return Response
     */
    public function index(StakeholderDataTable $stakeholderDataTable)
    {
        return $stakeholderDataTable->render('stakeholders.index');
    }

    /**
     * Show the form for creating a new Stakeholder.
     *
     * @return Response
     */
    public function create()
    {
        return view('stakeholders.create');
    }

    /**
     * Store a newly created Stakeholder in storage.
     *
     * @param CreateStakeholderRequest $request
     *
     * @return Response
     */
    public function store(CreateStakeholderRequest $request)
    {
        $input = $request->all();

        $stakeholder = $this->stakeholderRepository->create($input);

        Flash::success('Stakeholder saved successfully.');

        return redirect(route('stakeholders.index'));
    }

    /**
     * Display the specified Stakeholder.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $stakeholder = $this->stakeholderRepository->findWithoutFail($id);

        if (empty($stakeholder)) {
            Flash::error('Stakeholder not found');

            return redirect(route('stakeholders.index'));
        }

        return view('stakeholders.show')->with('stakeholder', $stakeholder);
    }

    /**
     * Show the form for editing the specified Stakeholder.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $stakeholder = $this->stakeholderRepository->findWithoutFail($id);

        if (empty($stakeholder)) {
            Flash::error('Stakeholder not found');

            return redirect(route('stakeholders.index'));
        }

        return view('stakeholders.edit')->with('stakeholder', $stakeholder);
    }

    /**
     * Update the specified Stakeholder in storage.
     *
     * @param  int              $id
     * @param UpdateStakeholderRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateStakeholderRequest $request)
    {
        $stakeholder = $this->stakeholderRepository->findWithoutFail($id);

        if (empty($stakeholder)) {
            Flash::error('Stakeholder not found');

            return redirect(route('stakeholders.index'));
        }

        $stakeholder = $this->stakeholderRepository->update($request->all(), $id);

        Flash::success('Stakeholder updated successfully.');

        return redirect(route('stakeholders.index'));
    }

    /**
     * Remove the specified Stakeholder from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $stakeholder = $this->stakeholderRepository->findWithoutFail($id);

        if (empty($stakeholder)) {
            Flash::error('Stakeholder not found');

            return redirect(route('stakeholders.index'));
        }

        $this->stakeholderRepository->delete($id);

        Flash::success('Stakeholder deleted successfully.');

        return redirect(route('stakeholders.index'));
    }
}
