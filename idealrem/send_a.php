<?php
    $fName = 'Фамилия: '.$_POST['surname'].' '.$_POST['name'].'<br />';
    $fMail =  'Телефон: '.$_POST['tel'].' <br />';
    $fMessage =  'Комментарий: '.$_POST['comments'].' <br />';
    $AllInOne =  $fName.$fMail.$fMessage;
    $to = 'zaharchenko888@ukr.net'; 
    $headers="From: Оформлення замовлення на ремонт <idealrem.com.ua>\nReply-to:admin@rmc.kh.ua\nContent-Type: text/html; charset=\"utf-8\"\n"; 
    // функция, которая отправляет наше письмо
    mail($to, 'Замовлення на ремонт '.$_POST['tel'], $AllInOne, $headers); 
?>