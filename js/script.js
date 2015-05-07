
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $bodycontainer = $('#bodycontainer');
    var $wikiHeaderElem = $('#wikipedia-header');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    var streetviewURL = "https://maps.googleapis.com/maps/api/streetview?size=640x400&location=" + address;
    $(bodycontainer).css('background-image', 'url("'+ streetviewURL + '")');

    // NYT API AJAX request
    var nytimeURL= "http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+ cityStr + "&sort=newest&api-key=39bb6196e774f3c3ab07ea39de138a6c:9:72021044"

    $.getJSON(nytimeURL, function(data) {
        console.log(data);
        var articles = data.response.docs;
        for (var i=0;i<articles.length;i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">'+
                '<a href="'+article.web_url+'">'+article.headline.main + '</a>' +
                '<p>'+ article.snippet + '</p>'+
                '</li>');
        }
    }).error(function(e){
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');   
    });

    //Wiki API AJAX request
    var wikiURL = "http://en.wikipedia.org/w/api.php?action=opensearch&search="+ cityStr + "&limit=10&namespace=0&format=json"

    $.ajax({
        dataType: "jsonp",
        url: wikiURL,
        //jsonp: callback
        success: function (response) {
            console.log(response);
            var articleList = response[1];

            for (var i=0;i<articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="'+url+'">' + articleStr + '</a></li>');
            };
        }
    }).error(function(e){
        $wikiHeaderElem.text('Wikipedia Articles Could Not Be Loaded');   
    });

    return false;
};

$('#form-container').submit(loadData);



// $('#divID').css("background-image", "url(/myimage.jpg)");  
// 

//    $bodycontainer.append('<img class="bgimg" src="' + streetviewURL + '">');