<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Avatar;
use App\Models\UserSettings;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\RedirectResponse;
use Illuminate\Auth\Events\Registered;
use App\Providers\RouteServiceProvider;
use Illuminate\Validation\ValidationException;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class AuthController extends Controller
{
    use AuthenticatesUsers;


    public function LoginVal(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        if (Auth::attempt(['username' => $credentials['username'], 'password' => $credentials['password']])) {
            // Authentication passed
            return redirect()->intended(RouteServiceProvider::HOME)->with([
                'type' => 'success',
                'message' => 'You have authenticated.'
            ]);
        }

        // Authentication failed
        throw ValidationException::withMessages([
            'username' => __('auth.failed'),
        ]);
    }

    public function LoginIndex()
    {
        return Inertia::render('Authentication/Login');
    }

    public function ForgotIndex()
    {
        return Inertia::render('Authentication/Forgot');
    }

    public function RegisterIndex()
    {
        return inertia('Authentication/Create', [
            'themes' => config('themes'),
        ]);
    }

    /**
     * @OA\Post(
     *     path="/auth/register/validate",
     *     summary="Register a new user",
     *     @OA\Parameter(
     *         name="name",
     *         in="query",
     *         description="User's name",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="email",
     *         in="query",
     *         description="User's email",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="password",
     *         in="query",
     *         description="User's password",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response="201", description="User registered successfully"),
     *     @OA\Response(response="422", description="Validation errors")
     * )
     */
    public function registerVal(Request $request)
    {
        $request->validate([
            'username' => 'required|alpha_num|min:3|max:25|profane|unique:' . User::class,
            'displayname' => 'required|alpha_num|min:3|max:25|profane',
            'birthdate.day' => 'required|numeric|min:1|max:31',
            'birthdate.month' => 'required|numeric|min:1|max:12',
            'birthdate.year' => 'required|numeric|min:1900|max:' . date('Y'),
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Check if the username field is present in $request
        if (!$request->username) {
            throw ValidationException::withMessages(['username' => 'The Username Field is empty']);
        }

        if (User::where('username', $request->username)->exists()) {
            throw ValidationException::withMessages(['username' => 'The Username is taken']);
        }

        if (User::where('email', $request->email)->exists()) {
            throw ValidationException::withMessages(['email' => 'You cannot use the same email for mutiple accounts']);
        }

        $birthdate = sprintf(
            '%02d/%02d/%04d',
            $request->input('birthdate.month'),
            $request->input('birthdate.day'),
            $request->input('birthdate.year')
        );

        $user = User::create([
            'username' => $request->username,
            'display_name' => $request->displayname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'birthdate' => $birthdate,
            'status' => 'Hey, Im new to ' . config('Values.name'),
            'about_me' => 'Greetings! Im new to ' . config('Values.name'),
        ]);

        UserSettings::create([
            'user_id' => $user->id,
        ]);

        // Create associated avatar
        Avatar::create([
            'user_id' => $user->id,
        ]);

        if ($user->id === 1) {
            Admin::create([
                'user_id' => $user->id,
            ]);
        }
        event(new Registered($user));

        novu()->createSubscriber([
            'subscriberId' => $user->id,
            'username' => $request->username,
            'email' => $request->email,
            'birthdate' => $birthdate,

        ])->toArray();

        Auth::login($user);
    }


    public function UserExit(): RedirectResponse
    {
        Auth::guard('web')->logout();

        return redirect()->intended(route("auth.login.page"))->with([
            'type' => 'success',
            'message' => 'You have logged out.'
        ]);
    }
}
