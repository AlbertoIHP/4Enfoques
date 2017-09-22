<!-- Name Field -->
<div class="form-group col-sm-6">
    {!! Form::label('name', 'Name:') !!}
    {!! Form::text('name', null, ['class' => 'form-control']) !!}
</div>

<!-- Description Field -->
<div class="form-group col-sm-12 col-lg-12">
    {!! Form::label('description', 'Description:') !!}
    {!! Form::textarea('description', null, ['class' => 'form-control']) !!}
</div>

<!-- Relevance Field -->
<div class="form-group col-sm-6">
    {!! Form::label('relevance', 'Relevance:') !!}
    {!! Form::text('relevance', null, ['class' => 'form-control']) !!}
</div>

<!-- Goals Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('goals_id', 'Goals Id:') !!}
    {!! Form::number('goals_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('softgoals.index') !!}" class="btn btn-default">Cancel</a>
</div>
