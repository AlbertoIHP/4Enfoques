@extends('layouts.app')

@section('content')
    <section class="content-header">
        <h1>
            Softgoal
        </h1>
   </section>
   <div class="content">
       @include('adminlte-templates::common.errors')
       <div class="box box-primary">
           <div class="box-body">
               <div class="row">
                   {!! Form::model($softgoal, ['route' => ['softgoals.update', $softgoal->id], 'method' => 'patch']) !!}

                        @include('softgoals.fields')

                   {!! Form::close() !!}
               </div>
           </div>
       </div>
   </div>
@endsection