<?php

namespace App\Http\Controllers;

use App\DataTables\SoftgoalNfrDataTable;
use App\Http\Requests;
use App\Http\Requests\CreateSoftgoalNfrRequest;
use App\Http\Requests\UpdateSoftgoalNfrRequest;
use App\Repositories\SoftgoalNfrRepository;
use Flash;
use App\Http\Controllers\AppBaseController;
use Response;

class SoftgoalNfrController extends AppBaseController
{
    /** @var  SoftgoalNfrRepository */
    private $softgoalNfrRepository;

    public function __construct(SoftgoalNfrRepository $softgoalNfrRepo)
    {
        $this->softgoalNfrRepository = $softgoalNfrRepo;
    }

    /**
     * Display a listing of the SoftgoalNfr.
     *
     * @param SoftgoalNfrDataTable $softgoalNfrDataTable
     * @return Response
     */
    public function index(SoftgoalNfrDataTable $softgoalNfrDataTable)
    {
        return $softgoalNfrDataTable->render('softgoal_nfrs.index');
    }

    /**
     * Show the form for creating a new SoftgoalNfr.
     *
     * @return Response
     */
    public function create()
    {
        return view('softgoal_nfrs.create');
    }

    /**
     * Store a newly created SoftgoalNfr in storage.
     *
     * @param CreateSoftgoalNfrRequest $request
     *
     * @return Response
     */
    public function store(CreateSoftgoalNfrRequest $request)
    {
        $input = $request->all();

        $softgoalNfr = $this->softgoalNfrRepository->create($input);

        Flash::success('Softgoal Nfr saved successfully.');

        return redirect(route('softgoalNfrs.index'));
    }

    /**
     * Display the specified SoftgoalNfr.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $softgoalNfr = $this->softgoalNfrRepository->findWithoutFail($id);

        if (empty($softgoalNfr)) {
            Flash::error('Softgoal Nfr not found');

            return redirect(route('softgoalNfrs.index'));
        }

        return view('softgoal_nfrs.show')->with('softgoalNfr', $softgoalNfr);
    }

    /**
     * Show the form for editing the specified SoftgoalNfr.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $softgoalNfr = $this->softgoalNfrRepository->findWithoutFail($id);

        if (empty($softgoalNfr)) {
            Flash::error('Softgoal Nfr not found');

            return redirect(route('softgoalNfrs.index'));
        }

        return view('softgoal_nfrs.edit')->with('softgoalNfr', $softgoalNfr);
    }

    /**
     * Update the specified SoftgoalNfr in storage.
     *
     * @param  int              $id
     * @param UpdateSoftgoalNfrRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateSoftgoalNfrRequest $request)
    {
        $softgoalNfr = $this->softgoalNfrRepository->findWithoutFail($id);

        if (empty($softgoalNfr)) {
            Flash::error('Softgoal Nfr not found');

            return redirect(route('softgoalNfrs.index'));
        }

        $softgoalNfr = $this->softgoalNfrRepository->update($request->all(), $id);

        Flash::success('Softgoal Nfr updated successfully.');

        return redirect(route('softgoalNfrs.index'));
    }

    /**
     * Remove the specified SoftgoalNfr from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $softgoalNfr = $this->softgoalNfrRepository->findWithoutFail($id);

        if (empty($softgoalNfr)) {
            Flash::error('Softgoal Nfr not found');

            return redirect(route('softgoalNfrs.index'));
        }

        $this->softgoalNfrRepository->delete($id);

        Flash::success('Softgoal Nfr deleted successfully.');

        return redirect(route('softgoalNfrs.index'));
    }
}
