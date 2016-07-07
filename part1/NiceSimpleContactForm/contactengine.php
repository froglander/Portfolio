<?php

$EmailFrom = "bootcamp@dukworld.net";
$EmailTo = "bootcamp@dukworld.net";
$Subject = "Portfolio Contact Form";
$Name = Trim(stripslashes($_POST['inputName'])); 
$Email = Trim(stripslashes($_POST['inputEmail'])); 
$Message = Trim(stripslashes($_POST['inputMessage'])); 

// validation
$validationOK=true;
if (!$validationOK) {
  print "<meta http-equiv=\"refresh\" content=\"0;URL=error.html\">";
  exit;
}

// prepare email body text
$Body = "";
$Body .= "Name: ";
$Body .= $Name;
$Body .= "\n";
$Body .= "\n";
$Body .= "Email: ";
$Body .= $Email;
$Body .= "\n";
$Body .= "Message: ";
$Body .= $Message;
$Body .= "\n";

// send email 
$success = mail($EmailTo, $Subject, $Body, "From: <$EmailFrom>");

// redirect to success page 
if ($success){
  print "<meta http-equiv=\"refresh\" content=\"0;URL=contactthanks.php\">";
}
else{
  print "<meta http-equiv=\"refresh\" content=\"0;URL=error.html\">";
}
?>