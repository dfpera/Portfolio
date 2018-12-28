<?php
  //ignore any submissions that inlcude this field (spam filter)
  if(!empty($_POST['email'])) {
    header('HTTP/1.1 500 Internal Server');
    header('Content-Type: application/json; charset=UTF-8');
    die();
  }

  $owner_email = 'dfpera@gmail.com'; // Default email address to receive form
  $headers = "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
  $headers .= 'From:' . $_POST['emailaddr']; // Form user email
  $confirm_headers = "MIME-Version: 1.0" . "\r\n";
  $confirm_headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
  $confirm_headers .= 'From:' . $owner_email;
  $message_body = '';
  $confirm_body = '';

  /*
   * Form input
   */
  $subject = '[Contact Form] ';
  $name = strip_tags($_POST['name']);
  $email = strip_tags($_POST['emailaddr']);
  $phone = strip_tags($_POST['phone']);
  $company = strip_tags($_POST['company']);
  $message = strip_tags($_POST['message']);

  // Set subject and email recipient
  if (!empty($_POST['company'])) {
    $subject .= $name . ' from ' . $company;
  } else {
    $subject .= $name;
  }

  // Contact us message
  $message_body .= '
  <html>
  <head>
  <title>' . $subject . '</title>
  </head>
  <body>';
  if (!empty($_POST['phone'])) {
    $message_body .= '<p>Message from ' . $name . ' (' . $email . ', ' . $phone . '):<br>';
  } else {
    $message_body .= '<p>Message from ' . $name . ' (' . $email . '):<br>';
  }
  $message_body .= $message . '</p>';
  $message_body .= '
  </body>
  </html>';

  // Confirmation email
  $confirm_body .= '
  <html>
  <head>
  <title>' . $subject . '</title>
  </head>
  <body>
  <p>Thank you for contacting me.</p>
  <p>If you have any further questions/information, please reply to this email and I will be be in contact with you shortly.</p>
  </body>
  </html>';

  try {
    // Send email to recipient
    if(!mail($owner_email, $subject, $message_body, $headers)) {
      throw new Exception('mail failed');
    } else {
      echo 'mail sent';
    }

    // Send confirmation email to sender
    if(!mail($email, $subject, $confirm_body, $confirm_headers)) {
      throw new Exception('mail failed');
    } else {
      echo 'mail sent';
    }
  } catch(Exception $e) {
    echo $e->getMessage() ."\n";
  }
?>