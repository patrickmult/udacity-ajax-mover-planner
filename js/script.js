
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

    var streetviewURL = "https://maps.googleapis.com/maps/api/streetview?size=640x400&location=" + address;
    $(bodycontainer).css('background-image', 'url("'+ streetviewURL + '")');
    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);



// $('#divID').css("background-image", "url(/myimage.jpg)");  
// 

//    $bodycontainer.append('<img class="bgimg" src="' + streetviewURL + '">');