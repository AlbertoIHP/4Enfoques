<!-- Name Field -->
<div class="form-group col-sm-6">
    {!! Form::label('name', 'Name:') !!}
    {!! Form::text('name', null, ['class' => 'form-control']) !!}
</div>

<!-- Decription Field -->
<div class="form-group col-sm-12 col-lg-12">
    {!! Form::label('decription', 'Decription:') !!}
    {!! Form::textarea('decription', null, ['class' => 'form-control']) !!}
</div>

<!-- Function Field -->
<div class="form-group col-sm-6">
    {!! Form::label('function', 'Function:') !!}
    {!! Form::text('function', null, ['class' => 'form-control']) !!}
</div>

<!-- Profession Field -->
<div class="form-group col-sm-6">
    {!! Form::label('profession', 'Profession:') !!}
    {!! Form::text('profession', null, ['class' => 'form-control']) !!}
</div>

<!-- Projects Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('projects_id', 'Projects Id:') !!}
    {!! Form::number('projects_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('stakeholders.index') !!}" class="btn btn-default">Cancel</a>
</div>
