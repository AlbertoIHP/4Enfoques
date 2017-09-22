@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Nfr
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($nfr, ['route' => ['nfrs.update', $nfr->id], 'method' => 'patch']) !!}

                        @include('nfrs.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection