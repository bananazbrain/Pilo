<?php
if (isset($_POST['tel'])) {
	$tel = $_POST['tel'];
}
if (isset($_POST['zadacha'])) {
	$zadacha = $_POST['zadacha'];
}
if (isset($_POST['type'])) {
	$type = $_POST['type'];
}
if (isset($_POST['thick'])) {
	$thick = $_POST['thick'];
}
if (isset($_POST['delivery'])) {
	$delivery = $_POST['delivery'];
}


$message;

if ($tel) {
	$message .= "\nТелефон: $tel";
}

if ($zadacha) {
	$message .= "\nДля каких задач: $zadacha";
}

if ($type) {
	$message .= "\nКакой тип фанеры: $type";
}

if ($thick) {
	$message .= "\nКакая толщина: $thick";
}

if ($delivery) {
	$message .= "\nДоставка: $delivery";
}

// $to = "proflist-context@yandex.ru, rpm-2009@yandex.ru";
$to = "e5ash.bro@gmail.com";
$headers = "Content-type: text/plain; charset = UTF-8";
$subject = "Новый заказ с сайта";
$send = mail($to, $subject, $message, $headers);

if ($send) {
	echo 1;
}