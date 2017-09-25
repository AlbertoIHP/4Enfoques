<li class="{{ Request::is('users*') ? 'active' : '' }}">
    <a href="{!! route('users.index') !!}"><i class="fa fa-edit"></i><span>Users</span></a>
</li>

<li class="{{ Request::is('projects*') ? 'active' : '' }}">
    <a href="{!! route('projects.index') !!}"><i class="fa fa-edit"></i><span>Projects</span></a>
</li>

<li class="{{ Request::is('stakeholders*') ? 'active' : '' }}">
    <a href="{!! route('stakeholders.index') !!}"><i class="fa fa-edit"></i><span>Stakeholders</span></a>
</li>

<li class="{{ Request::is('goals*') ? 'active' : '' }}">
    <a href="{!! route('goals.index') !!}"><i class="fa fa-edit"></i><span>Goals</span></a>
</li>

<li class="{{ Request::is('softgoals*') ? 'active' : '' }}">
    <a href="{!! route('softgoals.index') !!}"><i class="fa fa-edit"></i><span>Softgoals</span></a>
</li>

<li class="{{ Request::is('nfrs*') ? 'active' : '' }}">
    <a href="{!! route('nfrs.index') !!}"><i class="fa fa-edit"></i><span>Nfrs</span></a>
</li>

<li class="{{ Request::is('softgoalNfrs*') ? 'active' : '' }}">
    <a href="{!! route('softgoalNfrs.index') !!}"><i class="fa fa-edit"></i><span>Softgoal Nfrs</span></a>
</li>

