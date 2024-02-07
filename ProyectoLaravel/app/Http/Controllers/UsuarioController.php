<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Usuario;

class UsuarioController extends Controller
{
    public function index()
    {
        $usuarios = Usuario::all()->where('active', true);
        return response()->json($usuarios);
    }

    public function store(Request $request)
    {
        $usuario = new Usuario;
        $usuario->email = $request->email;
        $usuario->password = $request->password;
        if ($request->active) {
            $usuario->active = $request->active;
        }
        $usuario->save();
        $token = $usuario->createToken('token-register')->plainTextToken;
        return response()->json(['token' => $token], 201);
    }

    public function show($id)
    {
        $usuario = Usuario::findOrFail($id);
        return response()->json($usuario);
    }

    public function update(Request $request, $id)
    {
        $usuario = Usuario::findOrFail($id);
        $usuario->email = $request->email;
        $check = $usuario->password;
        if ($request->password != $check) {
            $usuario->password = bcrypt($request->password);
        }
        if ($request->active != $usuario->active) {
            $usuario->active = $request->active;
        }
        $usuario->save();
        return response()->json($usuario);
    }

    public function destroy($id)
    {
        $usuario = Usuario::findOrFail($id);
        $usuario->delete();
        return response()->json($usuario);
    }

    public function changeStatus($id)
    {
        $usuario = Usuario::findOrFail($id);
        $usuario->active = !$usuario->active;
        $usuario->save();
        return response()->json($usuario);
    }

    public function login(Request $request)
    {
        $usuario = Usuario::where('email', $request->email)->first();
        if ($usuario && password_verify($request->password, $usuario->password)) {
            $token = $usuario->createToken('token-login')->plainTextToken;
            return response()->json(['token' => $token], 200);
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
