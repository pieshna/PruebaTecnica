<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Reportes;
use Illuminate\Support\Facades\DB;

class ReportesController extends Controller
{
    public function index()
    {
        $reportes = DB::table('reportes')
            ->join('usuario', 'reportes.userId', '=', 'usuario.id')
            ->select('reportes.id', 'nombre_reporte', 'estado', 'usuario.email', 'reportes.created_at', 'reportes.updated_at')
            ->get();
        return response()->json($reportes);
    }

    public function store(Request $request)
    {
        $reporte = new Reportes;
        $reporte->nombre_reporte = $request->nombre_reporte;
        if ($request->estado) {
            $reporte->estado = $request->estado;
        }
        $reporte->userId = $request->userId;
        $reporte->save();
        return response()->json($reporte, 201);
    }

    public function show($id)
    {
        $reporte = DB::table('reportes')
            ->join('usuario', 'reportes.id_usuario', '=', 'usuario.id')
            ->select('reportes.id', 'nombre_reporte', 'estado', 'usuario.email', 'reportes.created_at', 'reportes.updated_at')
            ->where('reportes.id', '=', $id)
            ->get();
        return response()->json($reporte);
    }

    public function update(Request $request, $id)
    {
        $reporte = Reportes::findOrFail($id);
        $reporte->nombre_reporte = $request->nombre_reporte;
        if ($request->estado != $reporte->estado) {
            $reporte->estado = $request->estado;
        }
        $reporte->userId = $request->userId;
        $reporte->save();
        return response()->json($reporte);
    }

    public function destroy($id)
    {
        $reporte = Reportes::findOrFail($id);
        $reporte->delete();
        return response()->json($reporte);
    }

    public function changeStatus($id)
    {
        $reporte = Reportes::findOrFail($id);
        if ($reporte->estado == 'ACT') {
            $reporte->estado = 'REC';
        } else if ($reporte->estado == 'REC') {
            $reporte->estado = 'COM';
        } else {
            return response()->json(['error' => 'El reporte ya se encuentra completado'], 304);
        }
        $reporte->save();
        return response()->json($reporte);
    }
}
