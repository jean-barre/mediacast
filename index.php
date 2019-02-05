<!DOCTYPE html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<script type="text/javascript" src="../js/control.js"></script>
	<link href="styles/style.css" rel="stylesheet" type="text/css">
	<title>MediaCast</title>
</head>
<body>

	<h1>Welcome to MediaCast</h1>

	<p>
		<div class="top-div">
			</br>
			<i>Select the Media you want to share.</i>
		</div>

		<div class="home-row">
			<div class="home-column" style="background-image:url('images/laradiosympa.jpg');background-color:#908e44;background-repeat: no-repeat;background-size: contain; border-radius: 10px">
				<button style="width: 100%; height: 100%; background-color: transparent; border-color: transparent;" onclick="playLaRadioSympa()">
					<h2>La Radio Sympa</h2>
					<p>Click to play</p>
				</button>
			</div>
			<div class="home-column" style="background-image:url('images/radiomeuh.png');background-color:#FFFFFF;background-repeat: no-repeat;background-size: contain; border-radius: 10px">
				<button style="width: 100%; height: 100%; background-color: transparent; border-color: transparent;" onclick="playRadioMeuh()">
					<h2>Radio Meuh</h2>
					<p>Click to play</p>
				</button>
			</div>
			<div class="home-column" style="background-image:url('images/youtube.png');background-color:#FFFFFF;background-repeat: no-repeat;background-size: 20%;background-position: 20px center; border-radius: 10px">
				<button style="width: 100%; height: 100%; background-color: transparent; border-color: transparent;" onclick="window.location.href='/yt-search.php'">
					<h2>YouTube</h2>
					<p>Click to search</p>
				</button>
			</div>
		</div>
	</p>

</body>
</html>
