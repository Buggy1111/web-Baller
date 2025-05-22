<?php
header('Content-Type: application/json; charset=utf-8');

// Načtení dat z POST
$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$phone   = trim($_POST['phone'] ?? '');
$message = trim($_POST['message'] ?? '');
$captcha = $_POST['g-recaptcha-response'] ?? '';

// Ověření reCAPTCHA
$secretKey = '6LcyyUMrAAAAAPjIXfUVXE6isrg7e2iC3p4oHziml';
$verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
$response = file_get_contents($verifyUrl . '?' . http_build_query([
  'secret'   => $secretKey,
  'response' => $captcha,
  'remoteip' => $_SERVER['REMOTE_ADDR']
]));
$respData = json_decode($response, true);
if (empty($respData['success']) || $respData['success'] !== true) {
  echo json_encode(['success' => false, 'error' => 'Neplatné ověření reCAPTCHA.']);
  exit;
}

// Základní validace
if (!$name || !$email || !$message) {
  echo json_encode(['success' => false, 'error' => 'Vyplňte prosím všechna povinná pole.']);
  exit;
}

// Poslání e-mailu
$to      = 'info@stavbyballer.cz';
$subject = 'Nová zpráva z kontaktního formuláře';
$body    = "Jméno: $name
E-mail: $email
Telefon: $phone

$message
";
$headers = "From: info@stavbyballer.cz
"
         . "Reply-To: $email
"
         . "Content-Type: text/plain; charset=utf-8
";

if (mail($to, $subject, $body, $headers)) {
  echo json_encode(['success' => true]);
} else {
  echo json_encode(['success' => false, 'error' => 'Nepodařilo se odeslat e-mail.']);
}
?>