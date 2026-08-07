<?php
// Endpoint do Raio-X: grava o lead no Brevo (lista 5) e avisa por email.
header('Content-Type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['ok'=>false]); exit; }

$in = json_decode(file_get_contents('php://input'), true);
if (!is_array($in)) $in = $_POST;

// honeypot
if (!empty($in['site_url'])) { echo json_encode(['ok'=>true]); exit; }

$email = filter_var(trim($in['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$nome  = mb_substr(trim($in['nome'] ?? ''), 0, 120);
$link  = mb_substr(trim($in['link'] ?? ''), 0, 300);
$msg   = mb_substr(trim($in['mensagem'] ?? ''), 0, 2000);
$idioma= in_array($in['idioma'] ?? '', ['pt','en','es','br']) ? $in['idioma'] : 'pt';
$serv  = mb_substr(trim($in['servicos'] ?? ''), 0, 600);
if (!$email) { http_response_code(422); echo json_encode(['ok'=>false,'err'=>'email']); exit; }

$apiKey = 'COLOCAR_CHAVE_API_BREVO_AQUI';

function brevo($path, $payload, $apiKey) {
  $ch = curl_init('https://api.brevo.com/v3' . $path);
  curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_HTTPHEADER => ['api-key: ' . $apiKey, 'content-type: application/json', 'accept: application/json'],
    CURLOPT_TIMEOUT => 12,
  ]);
  $out = curl_exec($ch);
  $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);
  return [$code, $out];
}

list($code, $out) = brevo('/contacts', [
  'email' => $email,
  'updateEnabled' => true,
  'listIds' => [5],
  'attributes' => ['NOME' => $nome, 'LINK' => $link, 'MENSAGEM' => $msg, 'IDIOMA' => $idioma, 'SERVICOS' => $serv],
], $apiKey);
$saved = ($code >= 200 && $code < 300);

// aviso interno (nao bloqueia a resposta)
brevo('/smtp/email', [
  'sender' => ['name' => 'Site CrieAlgo', 'email' => 'dhemesandersen@gmail.com'],
  'to' => [['email' => 'dhemesandersen@gmail.com', 'name' => 'Dhemes']],
  'subject' => 'Novo Raio-X: ' . ($nome ?: $email),
  'htmlContent' => '<p><b>Nome:</b> ' . htmlspecialchars($nome) . '<br><b>Email:</b> ' . htmlspecialchars($email) . '<br><b>Link:</b> ' . htmlspecialchars($link) . '<br><b>Idioma:</b> ' . $idioma . '</p><p>' . nl2br(htmlspecialchars($msg)) . '</p>',
], $apiKey);

echo json_encode(['ok' => $saved]);
