<?php

use Faker\Factory as Faker;
use App\Models\SoftgoalNfr;
use App\Repositories\SoftgoalNfrRepository;

trait MakeSoftgoalNfrTrait
{
    /**
     * Create fake instance of SoftgoalNfr and save it in database
     *
     * @param array $softgoalNfrFields
     * @return SoftgoalNfr
     */
    public function makeSoftgoalNfr($softgoalNfrFields = [])
    {
        /** @var SoftgoalNfrRepository $softgoalNfrRepo */
        $softgoalNfrRepo = App::make(SoftgoalNfrRepository::class);
        $theme = $this->fakeSoftgoalNfrData($softgoalNfrFields);
        return $softgoalNfrRepo->create($theme);
    }

    /**
     * Get fake instance of SoftgoalNfr
     *
     * @param array $softgoalNfrFields
     * @return SoftgoalNfr
     */
    public function fakeSoftgoalNfr($softgoalNfrFields = [])
    {
        return new SoftgoalNfr($this->fakeSoftgoalNfrData($softgoalNfrFields));
    }

    /**
     * Get fake data of SoftgoalNfr
     *
     * @param array $postFields
     * @return array
     */
    public function fakeSoftgoalNfrData($softgoalNfrFields = [])
    {
        $fake = Faker::create();

        return array_merge([
            'nfrs_id' => $fake->randomDigitNotNull,
            'deleted_at' => $fake->date('Y-m-d H:i:s'),
            'remember_token' => $fake->word,
            'created_at' => $fake->date('Y-m-d H:i:s'),
            'updated_at' => $fake->date('Y-m-d H:i:s')
        ], $softgoalNfrFields);
    }
}
