<?php
// Endpoint do Raio-X: grava o lead no Brevo (lista 5), avisa a equipa e confirma ao cliente.
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
  'htmlContent' => '<p><b>Nome:</b> ' . htmlspecialchars($nome) . '<br><b>Email:</b> ' . htmlspecialchars($email) . '<br><b>Link:</b> ' . htmlspecialchars($link) . '<br><b>Idioma:</b> ' . $idioma . '<br><b>Servicos:</b> ' . htmlspecialchars($serv) . '</p><p>' . nl2br(htmlspecialchars($msg)) . '</p>',
], $apiKey);

// ---- email de confirmacao ao cliente ----
$T = [
  'pt' => [
    'subject'  => 'Recebemos o seu pedido de Raio-X',
    'ola'      => 'Olá',
    'p1'       => 'O seu pedido de Raio-X chegou bem. Obrigado pela confiança.',
    'p2'       => 'Vamos analisar com calma o que nos enviou e devolvemos o diagnóstico honesto em até <b>48 horas úteis</b>, neste mesmo email.',
    'p3'       => 'Se o assunto for urgente, pode falar já connosco:',
    'btn'      => 'Falar no WhatsApp',
    'wa'       => '351912880264',
    'assin'    => 'Dhemes · CrieAlgo',
    'rodape'   => 'CrieAlgo · Rua Prof. Manuel de Barros, 18, Esposende, Portugal',
    'legal'    => 'https://criealgo.pro/legal/pt.html',
    'legalTxt' => 'Privacidade e Termos',
    'reply'    => 'contact@criealgo.pro',
  ],
  'en' => [
    'subject'  => 'We received your X-Ray request',
    'ola'      => 'Hi',
    'p1'       => 'Your X-Ray request arrived safely. Thank you for the trust.',
    'p2'       => 'We will look carefully at what you sent and get back to you with an honest diagnosis within <b>48 business hours</b>, right here by email.',
    'p3'       => 'If it is urgent, you can talk to us right now:',
    'btn'      => 'Chat on WhatsApp',
    'wa'       => '351912880264',
    'assin'    => 'Dhemes · CrieAlgo',
    'rodape'   => 'CrieAlgo · Rua Prof. Manuel de Barros, 18, Esposende, Portugal',
    'legal'    => 'https://criealgo.pro/legal/en.html',
    'legalTxt' => 'Privacy & Terms',
    'reply'    => 'contact@criealgo.pro',
  ],
  'es' => [
    'subject'  => 'Recibimos su solicitud de Rayos-X',
    'ola'      => 'Hola',
    'p1'       => 'Su solicitud de Rayos-X llegó bien. Gracias por la confianza.',
    'p2'       => 'Vamos a analizar con calma lo que nos envió y le devolvemos el diagnóstico honesto en un máximo de <b>48 horas laborables</b>, en este mismo email.',
    'p3'       => 'Si el asunto es urgente, puede hablar con nosotros ahora mismo:',
    'btn'      => 'Hablar por WhatsApp',
    'wa'       => '351912880264',
    'assin'    => 'Dhemes · CrieAlgo',
    'rodape'   => 'CrieAlgo · Rua Prof. Manuel de Barros, 18, Esposende, Portugal',
    'legal'    => 'https://criealgo.pro/legal/es.html',
    'legalTxt' => 'Privacidad y Términos',
    'reply'    => 'contact@criealgo.pro',
  ],
  'br' => [
    'subject'  => 'Recebemos o seu pedido de Raio-X',
    'ola'      => 'Olá',
    'p1'       => 'O seu pedido de Raio-X chegou direitinho. Obrigado pela confiança.',
    'p2'       => 'Vamos analisar com calma o que você enviou e devolvemos o diagnóstico honesto em até <b>48 horas úteis</b>, neste mesmo email.',
    'p3'       => 'Se o assunto for urgente, pode falar agora com o Rafael:',
    'btn'      => 'Falar no WhatsApp',
    'wa'       => '5511995360430',
    'assin'    => 'Rafael · CrieAlgo Brasil',
    'rodape'   => 'CrieAlgo · Rua Pedroso Xavier, 188, São Paulo, SP',
    'legal'    => 'https://criealgo.pro/legal/br.html',
    'legalTxt' => 'Privacidade e Termos',
    'reply'    => 'rafael@criealgo.com.br',
  ],
];
$L = $T[$idioma];
$hi = $L['ola'] . ($nome ? ', ' . htmlspecialchars(explode(' ', $nome)[0]) : '') . '!';
$html = '<!doctype html><html><body style="margin:0;padding:0;background:#F4F4F2;font-family:Helvetica,Arial,sans-serif;">'
  . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F4F2;padding:32px 12px;"><tr><td align="center">'
  . '<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;">'
  . '<tr><td style="background:#0B0B0F;padding:26px 36px;">'
  . '<span style="font-size:24px;font-weight:800;letter-spacing:-1px;color:#ffffff;">criealgo</span><span style="font-size:24px;font-weight:800;color:#06D6A0;">.</span>'
  . '</td></tr>'
  . '<tr><td style="padding:36px;">'
  . '<p style="font-size:20px;font-weight:700;color:#0B0B0F;margin:0 0 16px;">' . $hi . '</p>'
  . '<p style="font-size:15px;line-height:1.65;color:#444;margin:0 0 14px;">' . $L['p1'] . '</p>'
  . '<p style="font-size:15px;line-height:1.65;color:#444;margin:0 0 22px;">' . $L['p2'] . '</p>'
  . '<p style="font-size:15px;line-height:1.65;color:#444;margin:0 0 18px;">' . $L['p3'] . '</p>'
  . '<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="border-radius:999px;background:#25D366;">'
  . '<a href="https://wa.me/' . $L['wa'] . '" style="display:inline-block;padding:13px 30px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;">' . $L['btn'] . '</a>'
  . '</td></tr></table>'
  . '<p style="font-size:15px;color:#0B0B0F;font-weight:600;margin:30px 0 0;">' . $L['assin'] . '</p>'
  . '</td></tr>'
  . '<tr><td style="padding:20px 36px 28px;border-top:1px solid #eee;">'
  . '<p style="font-size:11px;color:#999;margin:0;line-height:1.6;">' . $L['rodape'] . '<br>'
  . '<a href="' . $L['legal'] . '" style="color:#118AB2;text-decoration:none;">' . $L['legalTxt'] . '</a></p>'
  . '</td></tr></table></td></tr></table></body></html>';

brevo('/smtp/email', [
  'sender'  => ['name' => 'CrieAlgo', 'email' => 'dhemesandersen@gmail.com'],
  'replyTo' => ['email' => $L['reply'], 'name' => 'CrieAlgo'],
  'to'      => [['email' => $email, 'name' => $nome ?: $email]],
  'subject' => $L['subject'],
  'htmlContent' => $html,
], $apiKey);

echo json_encode(['ok' => $saved]);
