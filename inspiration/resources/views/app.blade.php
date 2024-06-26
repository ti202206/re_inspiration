<!DOCTYPE html>
<html lang="ja">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    <link rel="icon" href="https://tests-dev.net/assets/images/favicon.png">
    <link rel="icon" href="https://tests-dev.net/favicon.ico">
    <link rel="icon" href="https://tests-dev.net/assets/images/favicon-32x32.png">
    <link rel="icon" href="https://tests-dev.net/assets/images/favicon-16x16.png">


    <script src="https://kit.fontawesome.com/719016ddac.js" crossorigin="anonymous"></script>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Inspiration index</title>
</head>

<body>
    <div id="app"></div>
    <script src="{{ mix('js/app.js') }}"></script>
</body>

</html>
