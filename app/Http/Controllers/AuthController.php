<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function register(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'password' => 'required|string|min:6'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $user = User::create([
                "name" => $req->name,
                "email" => $req->email,
                "password" => bcrypt($req->password)
            ]);

            return response()->json([
                'status' => 200,
                'message' => 'User created successfully',
                'user' => $user
            ], 201);

        } catch (\Exception $e) {
            return response()->json(['status' => 500, 'error' => 'Failed to registration, Please try again!!.'], 500);
        }
    }

    /** 
     * Get a JWT token via given credentials.
     */
    public function login(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors()
            ], 422);
        }

        $credentials = $req->only('email', 'password');

        if (!$token = $this->guard()->attempt($credentials)) {
            return response()->json(['status' => 401, 'error' => 'Unauthorized'], 401);
        }

        return $this->createNewToken($token);
    }

    // give the authenticated user
    public function profile()
    {
        return response()->json($this->guard()->user(), 200);
    }

    /**
     * Get the authenticated User
     */
    public function me()
    {
        return response()->json($this->guard()->user(), 200);
    }

    /**
     * Log the user out (Invalidate the token)
     */
    public function logout()
    {
        $this->guard()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     */
    public function refresh()
    {
        return $this->respondWithToken($this->guard()->refresh());
    }

    /**
     * Get the token array structure.
     */
    protected function createNewToken($token)
    {
        // Set the token as an HTTP-only cookie
        $cookie = cookie('access_token', $token, auth()->factory()->getTTL() * 60, '/', null, false, true);

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ])->withCookie($cookie);
    }

    /**
     * Get the guard to be used during authentication.
     */
    public function guard()
    {
        return Auth::guard();
    }
}
