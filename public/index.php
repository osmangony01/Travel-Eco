<?php

use GuzzleHttp\Client;


use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use GuzzleHttp\Psr7\HttpFactory;
use OpenTelemetry\API\Trace\Span;
use Illuminate\Contracts\Http\Kernel;
use OpenTelemetry\API\Trace\StatusCode;
use OpenTelemetry\SDK\Trace\TracerProvider;
use OpenTelemetry\API\Trace\TracerInterface;
use Illuminate\Database\Events\QueryExecuted;
use OpenTelemetry\SDK\Trace\Sampler\AlwaysOnSampler;
use OpenTelemetry\Contrib\Zipkin\Exporter as ZipkinExporter;
use OpenTelemetry\SDK\Common\Export\Http\PsrTransportFactory;
use OpenTelemetry\SDK\Trace\SpanProcessor\BatchSpanProcessor;
use OpenTelemetry\SDK\Trace\SpanProcessor\SimpleSpanProcessor;

// 
define('LARAVEL_START', microtime(true));

/*
|--------------------------------------------------------------------------
| Check If The Application Is Under Maintenance
|--------------------------------------------------------------------------
|
| If the application is in maintenance / demo mode via the "down" command
| we will load this file so that any pre-rendered content can be shown
| instead of starting the framework, which could cause an exception.
|
*/

if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

/*
|--------------------------------------------------------------------------
| Register The Auto Loader
|--------------------------------------------------------------------------
|
| Composer provides a convenient, automatically generated class loader for
| this application. We just need to utilize it! We'll simply require it
| into the script here so we don't need to manually load our classes.
|
*/

require __DIR__.'/../vendor/autoload.php';

/*
|--------------------------------------------------------------------------
| Run The Application
|--------------------------------------------------------------------------
|
| Once we have the application, we can handle the incoming request using
| the application's HTTP kernel. Then, we will send the response back
| to this client's browser, allowing them to enjoy our application.
|
*/

$app = require_once __DIR__.'/../bootstrap/app.php';

$kernel = $app->make(Kernel::class);

// open telemetry tracing
// $httpClient = new Client();
// $httpFactory = new HttpFactory();

// $tracer = (new TracerProvider(
//     [
//         new SimpleSpanProcessor(
//              new OpenTelemetry\Contrib\Zipkin\Exporter(
//                 PsrTransportFactory::discover()->create('http://localhost:9411/api/v2/spans', 'application/json')
//             ),
//         ),
//     ],
//     new AlwaysOnSampler(),
// ))->getTracer('my-ins');

// $request = Request::capture();
// $span = $tracer->spanBuilder($request->url())->startSpan();
// $spanScope = $span->activate();



$response = $kernel->handle($request = Request::capture())->send();
$kernel->terminate($request, $response);


// $span->end();
// $spanScope->detach();


// db information with telemetry
// try {
//     // Laravel Eloquent database query
//     DB::listen(function (QueryExecuted $query) use ($span) {
//         // Add database-related attributes to the span
//         // $span->setAttribute('db.query', $query->sql);
//         $span->setAttribute('db.time', $query->time);
//         $span->setAttribute('db.database', $query->connection->getDatabaseName());
//     });

//     //$users = \App\Models\Post::all();

// } catch (\Exception $exception) {
//     // Handle database query exceptions
//     // $span->setStatus(StatusCode::ERROR, $exception->getMessage());
//     $span->setAttribute('error', $exception->getMessage());
// } finally {
//     // End the span and detach the scope
//     $span->end();
//     $spanScope->detach();
// }