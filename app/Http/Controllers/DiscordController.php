<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use App\Models\DiscordUser;
use Illuminate\Http\Request;

class DiscordController extends Controller
{
    protected string $tokenURL = "https://discord.com/api/oauth2/token";
    protected string $apiURLBase = "https://discord.com/api/users/@me";
    protected array $tokenData = [
        "client_id" => NULL,
        "client_secret" => NULL,
        "grant_type" => "authorization_code",
        "code" => NULL,
        "redirect_uri" => NULL,
        "scope" => null
    ];

    /**
     * Sets the required data for the token request.
     *
     * @return void
     */
    public function __construct()
    {
        $this->tokenData['client_id'] = config('discord.client_id');
        $this->tokenData['client_secret'] = config('discord.client_secret');
        $this->tokenData['grant_type'] = config('discord.grant_type');
        $this->tokenData['redirect_uri'] = config('discord.redirect_uri');
        $this->tokenData['scope'] = config('discord.scopes');
    }

    /**
     * Handles the Discord OAuth2 login.
     *
     * @param Request $request
    //     * @return \Illuminate\Http\JsonResponse
     */
    public function handle(Request $request)//: \Illuminate\Http\JsonResponse
    {
        // Checking if the authorization code is present in the request.
        if ($request->missing('code')) {
            if (env('local')) {
                return response()->json([
                    'discord_message' => config('discord.error_messages.missing_code', 'The authorization code is missing.'),
                    'code' => 400
                ]);
            } else {
                return redirect(route('user.settings'))->with('error', config('discord.error_messages.missing_code', 'The authorization code is missing.'));
            }
        }

        // Getting the access_token from the Discord API.
        try {
            $accessToken = $this->getDiscordAccessToken($request->get('code'));
        } catch (\Exception $e) {
            if (env('local')) {
                return response()->json([
                    'discord_message' => config('discord.error_messages.invalid_code', 'The authorization code is invalid.'),
                    'message' => $e->getMessage(),
                    'code' => $e->getCode()
                ]);
            } else {
                return redirect(route('user.settings'))->with('error', config('discord.error_messages.invalid_code', 'The authorization code is invalid.'));
            }
        }

        // Using the access_token to get the user's Discord ID.
        try {
            $user = $this->getDiscordUser($accessToken->access_token);
        } catch (\Exception $e) {
            if (env('local')) {
                return response()->json([
                    'discord_message' => config('discord.error_messages.authorization_failed', 'The authorization failed.'),
                    'message' => $e->getMessage(),
                    'code' => $e->getCode()
                ]);
            } else {
                return redirect(route('user.settings'))->with('error', config('discord.error_messages.authorization_failed', 'The authorization failed.'));
            }
        }

        // Making sure the current authorized user has not linked a Discord account
        if (auth()->check() && auth()->user()->hasLinkedDiscord()) {
            return redirect(route('user.settings'))->with('error', config('discord.error_messages.user_already_linked', 'You already have linked a Discord account. Please unlink and try again.'));
        }

        // Making sure the Discord account is not already linked to another user
        if (DiscordUser::where('id', '=', $user->id)->exists()) {
            return redirect(route('user.settings'))->with('error', config('discord.error_messages.discord_already_linked', 'This Discord account is already linked to another user. Please unlink and try again.'));
        }

        // Trying to create or update the user in the database.
        try {
            $user = $this->createOrUpdateUser($user, $accessToken->refresh_token);
        } catch (\Exception $e) {
            if (env('local')) {
                return response()->json([
                    'discord_message' => config('discord.error_messages.database_error', 'There was an error while trying to create or update the Discord user.'),
                    'message' => $e->getMessage(),
                    'code' => $e->getCode()
                ]);
            } else {
                return redirect(route('user.settings'))->with('error', config('discord.error_messages.database_error', 'There was an error while trying to create or update the Discord user.'));
            }
        }

        // Redirecting the user to the intended page or to the home page.
        return redirect(route('user.settings'))->with('success', 'You have successfully linked ' . $user->username . '#' . $user->discriminator . '!');
    }

    /**
     * Handles unlinking your Discord account
     *
     * @param Request $request
     */
    public function unlink(Request $request)
    {
        if(auth()->user()->hasLinkedDiscord())
        {
            $discord = auth()->user()->discord;
            $discord->delete();
            return redirect(route('user.settings'))->with('success', 'Discord account successfully unlinked.');
        } else {
            return redirect(route('user.settings'))->with('error', 'No Discord account found.');
        }
    }

    /**
     * Handles the Discord OAuth2 callback.
     *
     * @param string $code
     * @return object
     * @throws \Illuminate\Http\Client\RequestException
     */
    private function getDiscordAccessToken(string $code): object
    {
        $this->tokenData['code'] = $code;

        $response = Http::asForm()->post($this->tokenURL, $this->tokenData);

        $response->throw();

        return json_decode($response->body());
    }

    /**
     * Handles the Discord OAuth2 login.
     *
     * @param string $access_token
     * @return object
     * @throws \Illuminate\Http\Client\RequestException
     */
    private function getDiscordUser(string $access_token): object
    {
        $response = Http::withToken($access_token)->get($this->apiURLBase);

        $response->throw();

        return json_decode($response->body());
    }

    /**
     * Handles the creation or update of the user.
     *
     * @param object $user
     * @param string $refresh_token
     * @return User
     * @throws \Exception
     */
    private function createOrUpdateUser(object $user, string $refresh_token): DiscordUser
    {
        return DiscordUser::updateOrCreate(
            [
                'id' => $user->id,
            ],
            [
                'user_id' => auth()->user()->id,
                'username' => $user->username,
                'discriminator' => $user->discriminator,
                'avatar' => $user->avatar ?: NULL,
                'verified' => $user->verified ?? FALSE,
                'locale' => $user->locale,
                'mfa_enabled' => $user->mfa_enabled,
                'refresh_token' => $refresh_token
            ]
        );
    }
}
