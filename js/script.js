
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $bodycontainer = $('#bodycontainer')

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

    return false;
};

$('#form-container').submit(loadData);



// $('#divID').css("background-image", "url(/myimage.jpg)");  
// 

//    $bodycontainer.append('<img class="bgimg" src="' + streetviewURL + '">');