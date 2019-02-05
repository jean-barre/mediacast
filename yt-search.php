
<!DOCTYPE html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<script type="text/javascript" src="../js/control.js"></script>
	<script type="text/javascript" src="../js/youtubeSearch.js"></script>
	<link href="styles/style.css" rel="stylesheet" type="text/css">
	<title>MediaCast</title>
</head>
<body>

	<button class="back-button" onclick="window.location.href='/index.php'">

	</button>
	<h1>YouTube SEARCHER</h1>

	<p>
		<div class="top-div">
			</br>
			<i>Go find a YouTube video to share :</i>
		</div>
		<form id="youtube_request_form" action="javascript:requestYoutubeRelatedVideos()" method="get">
			<input autocomplete="off" class="search-bar" name="search_query" type="text" maxlength="128"/>

			<input class="submit-button" type="submit" value="Search"/>
		</form>

		<div id="youtube_result"></div>
	</p>

</body>
</html>

