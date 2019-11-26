<?php

if($_POST['id'] === "subscribe-text-field-form") {
	$stack = json_decode($_POST['data']);
	$email = "";
	foreach ($stack as $key => $value) {
		if (strtolower($value->name_attr) == "email") {
			$email = $value->value;
		}
		$data[strtolower($value->name_attr)] = $value->value;
	}

	foreach( $_FILES as $file) {
		if ( !move_uploaded_file( $file['tmp_name'], dirname(__FILE__) . '/../tmp/' . $file['name'] ) ) {
			echo "error upload file";
		}
	}

	$apiKey = 'e32795cd0ab8e36f2207286bc349d256-us13';
    $listId = '4a5463144e';

    $memberId = md5(strtolower($email));
    $dataCenter = substr($apiKey,strpos($apiKey,'-')+1);

    $url = 'https://' . $dataCenter . '.api.mailchimp.com/3.0/lists/' . $listId . '/members/' . $memberId;

    $json = json_encode( array(
		'email_address' => $email,
        'status'        => 'subscribed', // "subscribed","unsubscribed","cleaned","pending"
        'merge_fields'  => $data
    ) );

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_USERPWD, 'user:' . $apiKey);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $json);

    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err = curl_error($curl);

	curl_close($curl);

	if ($err) {
	  header("HTTP/1.1 406 Not Acceptable");
	  echo "cURL Error #:" . $err;
	} else {
	  echo $httpCode;
	}
}