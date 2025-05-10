<?php
  // 1. Your real receiving address:
  $receiving_email_address = 'kntim.dev@gmail.com';

  // 2. Adjust this path if your directory structure differs:
  $library_path = __DIR__ . '/../assets/vendor/php-email-form/php-email-form.php';

  if (! file_exists($library_path)) {
    die('Unable to load the "PHP Email Form" Library at ' . $library_path);
  }
  include($library_path);

  $contact = new PHP_Email_Form;
  $contact->ajax    = true;
  $contact->to      = $receiving_email_address;
  $contact->from_name  = $_POST['name'];
  $contact->from_email = $_POST['email'];
  $contact->subject    = $_POST['subject'];

  // If you need SMTP, uncomment and fill in:
  /*
  $contact->smtp = [
    'host'     => 'smtp.example.com',
    'username' => 'smtp_user',
    'password' => 'smtp_pass',
    'port'     => '587'
  ];
  */

  $contact->add_message($_POST['name'],    'From');
  $contact->add_message($_POST['email'],   'Email');
  $contact->add_message($_POST['message'], 'Message', 10);

  echo $contact->send();
?>
