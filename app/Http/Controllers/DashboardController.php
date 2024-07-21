<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Auth;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $totalPendingTasks = Task::query()->where('status', 'pending')->count();
        $userPendingTasks = Task::query()->where('status', 'pending')->where('assigned_user_id', $user->id)->count();
        $totalInProgressTasks = Task::query()->where('status', 'in_progress')->count();
        $userInProgressTasks = Task::query()->where('status', 'in_progress')->where('assigned_user_id', $user->id)->count();
        $totalCompletedTasks = Task::query()->where('status', 'completed')->count();
        $userCompletedTasks = Task::query()->where('status', 'completed')->where('assigned_user_id', $user->id)->count();

        $activeTasks = Task::query()
            ->whereIn('status', ['pending', 'in_progress'])
            ->where('assigned_user_id', $user->id)
            ->limit(10)->get();

        $activeTasks = TaskResource::collection($activeTasks);
        return inertia('Dashboard', compact(
            'totalPendingTasks',
            'userPendingTasks',
            'totalInProgressTasks',
            'userInProgressTasks',
            'totalCompletedTasks',
            'userCompletedTasks',
            'activeTasks',
        ));
    }
}
