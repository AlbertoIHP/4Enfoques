@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Softgoal Nfr
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($softgoalNfr, ['route' => ['softgoalNfrs.update', $softgoalNfr->id], 'method' => 'patch']) !!}

                        @include('softgoal_nfrs.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection