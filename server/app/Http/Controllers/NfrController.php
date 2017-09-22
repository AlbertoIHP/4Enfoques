<?php

namespace App\Http\Controllers;

use App\DataTables\NfrDataTable;
use App\Http\Requests;
use App\Http\Requests\CreateNfrRequest;
use App\Http\Requests\UpdateNfrRequest;
use App\Repositories\NfrRepository;
use Flash;
use App\Http\Controllers\AppBaseController;
use Response;

class NfrController extends AppBaseController
{
    /** @var  NfrRepository */
    private $nfrRepository;

    public function __construct(NfrRepository $nfrRepo)
    {
        $this->nfrRepository = $nfrRepo;
    }

    /**
     * Display a listing of the Nfr.
     *
     * @param NfrDataTable $nfrDataTable
     * @return Response
     */
    public function index(NfrDataTable $nfrDataTable)
    {
        return $nfrDataTable->render('nfrs.index');
    }

    /**
     * Show the form for creating a new Nfr.
     *
     * @return Response
     */
    public function create()
    {
        return view('nfrs.create');
    }

    /**
     * Store a newly created Nfr in storage.
     *
     * @param CreateNfrRequest $request
     *
     * @return Response
     */
    public function store(CreateNfrRequest $request)
    {
        $input = $request->all();

        $nfr = $this->nfrRepository->create($input);

        Flash::success('Nfr saved successfully.');

        return redirect(route('nfrs.index'));
    }

    /**
     * Display the specified Nfr.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $nfr = $this->nfrRepository->findWithoutFail($id);

        if (empty($nfr)) {
            Flash::error('Nfr not found');

            return redirect(route('nfrs.index'));
        }

        return view('nfrs.show')->with('nfr', $nfr);
    }

    /**
     * Show the form for editing the specified Nfr.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $nfr = $this->nfrRepository->findWithoutFail($id);

        if (empty($nfr)) {
            Flash::error('Nfr not found');

            return redirect(route('nfrs.index'));
        }

        return view('nfrs.edit')->with('nfr', $nfr);
    }

    /**
     * Update the specified Nfr in storage.
     *
     * @param  int              $id
     * @param UpdateNfrRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateNfrRequest $request)
    {
        $nfr = $this->nfrRepository->findWithoutFail($id);

        if (empty($nfr)) {
            Flash::error('Nfr not found');

            return redirect(route('nfrs.index'));
        }

        $nfr = $this->nfrRepository->update($request->all(), $id);

        Flash::success('Nfr updated successfully.');

        return redirect(route('nfrs.index'));
    }

    /**
     * Remove the specified Nfr from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $nfr = $this->nfrRepository->findWithoutFail($id);

        if (empty($nfr)) {
            Flash::error('Nfr not found');

            return redirect(route('nfrs.index'));
        }

        $this->nfrRepository->delete($id);

        Flash::success('Nfr deleted successfully.');

        return redirect(route('nfrs.index'));
    }
}
