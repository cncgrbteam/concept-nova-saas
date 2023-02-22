<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Exception;
use GuzzleHttp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class AuthController extends Controller
{
    protected $client;
    protected $clientHeader = [];
    protected $auth_client;
    protected $auth_clientHeader;

    public function __construct()
    {
        $this->auth_client = new GuzzleHttp\Client(['base_uri' => env('AUTHMS_BASE_URL')]);
    }
    
    public function login()
    {
        return view('login');
    }

    public function postLogin(Request $request)
    {
        // dd($request);
        try {
            $response = $this->auth_client->request('POST', 'login', [
                'form_params' => [
                    'email' => $request->input('email'),
                    'password' => $request->input('password')
                ], 'http_errors' => false
            ]);

            $statusCode = $response->getStatusCode();
            if ($statusCode === 200) {

                $data = json_decode($response->getBody()->getContents());

                $token = $data->data->{'auth-token'};

                $loginCount = $data->data->loginCount;

                $role = $data->data->role;
                // dd($role);
                // fetch users details
                $userData = $this->fetchUsersDetails($token);


                //set sesssion variables
                $this->storeSessions($request, $userData, $token, $loginCount, $role);
                return redirect('/');
            } else if ($statusCode == 400) {
                return back()->withInput()->with('error', 'Email or password is wrong');
            } else {
                return back()->withInput()->with('error', 'Error in network connection');
            }
        } catch (GuzzleHttp\Exception\ClientException $e) {
            $statusCode = $e->getResponse()->getStatusCode();
            // dd($statusCode);
            if ($statusCode == 400) {
                return back()->withInput()->with('error', 'Email or password is wrong');
            } else {
                return back()->withInput()->with('error', 'Error in network connection');
            }
            return back()->with('error', $e->getMessage());
        }
    }

    /**
     * Fetches the users details like name, id, phone_number
     * @return
     */
    private function fetchUsersDetails($token)
    {
        try {
            $this->auth_clientHeader = [
                'auth-token' => "" . $token . "",
                'Accept' => 'application/json'
            ];

            //dd($this->auth_clientHeader);

            $response = $this->auth_client->get('users/userDetails', [
                'headers' => $this->auth_clientHeader
            ]);

            $decodedData = (json_decode($response->getBody()->getContents()));
            return $decodedData->data;
        } catch (Exception $e) {
            // Bugsnag::notifyException($e);
            return back()->with('error', $e->getMessage());
        }
    }
    /**
     * This stores the user's session data
     *
     * return void
     */
    public function storeSessions($request, $userData, $token, $loginCount, $role)
    {
        // First flush the session
        $request->session()->flush();

        //set the session
        // session(['userId' => $userData->_id]);
        // session(['firstName' => $userData->firstname]);
        // session(['lastName' => $userData->lastname]);
        // session(['account' => $userData->account]);
        // session(['iat' => $userData->iat]);
        // session(['fullName' => "" . $userData->firstname . " " . $userData->lastname]);
        // session(['token' => $token]);
        // session(['loginCount' => $loginCount]);
        // $tokenCreatedAt = Carbon::now();
        // session(['tokenCreatedAt' => $tokenCreatedAt]);
        // session(['role' => $role]);
        Redis::set('userId', $userData->_id);
        Redis::set('firstName', $userData->firstname);
        Redis::set('lastName', $userData->lastname);
        Redis::set('account', $userData->account);
        Redis::set('iat', $userData->iat);
        Redis::set('fullName', "" . $userData->firstname . " " . $userData->lastname);
        Redis::set('token', $token);
        Redis::set('loginCount', $loginCount);
        $tokenCreatedAt = Carbon::now();
        Redis::set('tokenCreatedAt', $tokenCreatedAt);
        // Redis::set('role', $role);
        Redis::set('token', $token);

        return;
    }

    public function logout()
    {
        Redis::del('userId');
        Redis::del('firstName');
        Redis::del('lastName');
        Redis::del('account');
        Redis::del('iat');
        Redis::del('fullName');
        Redis::del('token');
        Redis::del('loginCount');
        Redis::del('tokenCreatedAt');
        Redis::del('token');
        return redirect('/login');
    }
}
