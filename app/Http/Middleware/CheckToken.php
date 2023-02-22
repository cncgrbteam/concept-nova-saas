<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class CheckToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $currentTime = Carbon::now();
        if (!Redis::exists('tokenCreatedAt')) {
            return redirect('/login');
        }
        $tokenCreatedAt = Carbon::parse(Redis::get('tokenCreatedAt'));
        if ($tokenCreatedAt->diffInHours($currentTime) >= 3) {
            return redirect('/login');
        }
        return $next($request);
    }
}
