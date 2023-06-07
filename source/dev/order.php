<?php
if (isset($_POST['tel'])) {
	$tel = $_POST['tel'];
}
if (isset($_POST['title'])) {
	$title = $_POST['title'];
}

$message;

if ($tel) {
	$message .= "\nТелефон: $tel";
}

if ($title) {
	$message .= "\nЗаявка: $title";
}

$to = "proflist-context@yandex.ru, rpm-2009@yandex.ru";
$headers = "Content-type: text/plain; charset = UTF-8";
$subject = "Новый заказ с сайта";
$send = mail($to, $subject, $message, $headers);

if ($send) {
	echo 1;
}