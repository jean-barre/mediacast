var SEARCH_MAX_RESULT = 13;
var URL_FIRST_PART = "https://www.googleapis.com/youtube/v3/search?part=snippet&";
var API_KEY = "AIzaSyB15FQ1zt4TpMVM4oNlcHKHMcrsUJwT9E4";

function requestYoutubeRelatedVideos() {

    var form = document.getElementById("youtube_request_form");
    var text = "";

    if (form.length > 0) {
        //console.log("Form not empty");
        text = form.elements[0].value;

        if (text.length > 0) {
            //console.log("Search text : "+text);
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() {

                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    //console.log("Sending request...");
                    processYoutubeReply(xmlHttp.responseText);
                } else {
                    //console.log("xml http ready state: "+xmlHttp.readyState)
                    //console.log("xml http status: "+xmlHttp.status)
                    //console.log("xml http status: "+xmlHttp.responseText)
                }
            }
            xmlHttp.open("GET", URL_FIRST_PART+"maxResults="+SEARCH_MAX_RESULT+"&q="+text+"&key="+API_KEY+"&type=video", true);

            //console.log("Sending request...");
            xmlHttp.send(null);
        }
    }
}

var resultsTitles = [];
var resultsLinks = [];
var resultsPictures = [];

function makeUL(titles, links, pictures) {
    // Create the list element:
    var list = document.createElement('ul');

    for(var i = 0; i < links.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        var button = document.createElement('button');

        var img = document.createElement('img');
        img.src = pictures[i];
        img.style.height = '80px';
        button.appendChild(img);

        var buttonText = document.createTextNode(titles[i]);
        button.appendChild(buttonText);

        var textLink = document.createAttribute("link");
        textLink.value = links[i];
        button.setAttributeNode(textLink);

        button.onclick = function() {playYouTubeVideo(this);};

        item.appendChild(button);

        list.appendChild(item);
    }
    return list;
}


function processYoutubeReply(response)
{
    //console.log("Processing reply");
    resultsTitles = [];
    resultsLinks = [];
    resultsPictures = [];

    var jsonResponse = JSON.parse(response);
    var jsonItems = jsonResponse.items;

    for(var i = 0; i < jsonItems.length; i++) {
    	var jsonItem = jsonItems[i];
        //console.log(jsonItem)
    	if (jsonItem !== 'undefined') {
            var snippet = jsonItem["snippet"];
            var title = snippet["title"];
            resultsTitles.push(title);

	    	var id = jsonItem["id"];
	    	var videoId = id["videoId"];
            resultsLinks.push(videoId);

            var thumbnails = snippet["thumbnails"];
            var high = thumbnails["medium"];
            var picture = high["url"];
            resultsPictures.push(picture)
    	}
    }
    var divNode = document.getElementById("youtube_result");
	while (divNode.firstChild) {
	    divNode.removeChild(divNode.firstChild);
	}
    divNode.appendChild(makeUL(resultsTitles, resultsLinks, resultsPictures));
}
