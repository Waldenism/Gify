$(document).ready(function(){

var topics = ["Frogs", "Super Nintendo", "Capcom", "Street Fighter", "Super Smash Bros.", "Harp", "Chess"]

for (var i = 0; i < topics.length; i++) {
  var $topicButton = $("<button>");
  $topicButton.attr("data-val", topics[i]);
  $topicButton.text(topics[i]);
  $("#topicButtons").append($topicButton);
}


$("#topicButtons").on("click", "button", function() {

  $("#gifs").empty();

  var item = $(this).data("val");

  var key = "eb2a08b4e22049ae890ccf2296deab6c";

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + item + "&api_key=" + key + "&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    for (var i = 0; i < 10; i++) {
      console.log(response);

      //url's for both paused and playing gif
      var gifStaticURL = response.data[i].images.fixed_height_still.url;
      var gifPlayURL = response.data[i].images.fixed_height.url;
      var ratingData = response.data[i].rating;

      var $gifHolder = $("<div>");
      $gifHolder.addClass("gif-holder");

      var $gif = $("<img>");
      $gif.addClass("gif");
      $gif.attr("src", gifStaticURL);
      $gif.attr("data-still", gifStaticURL);
      $gif.attr("data-animate", gifPlayURL);
      $gif.attr("alt", item);
      $gif.attr("data-state", "paused");

      var $rating = $("<p>");
      $rating.addClass("rating");
      $rating.html("<span class='rating-label'>Rating: </span>" + ratingData); 

      $gifHolder.append($gif);
      $gifHolder.append($rating);
      $("#gifs").append($gifHolder);

    }

  });

});



$("#gifs").on("click", ".gif", function() {
      var state = $(this).attr("data-state");
      
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

$("form").on("submit", function(event) {

      event.preventDefault();

      var value = $("input").val();

      var $topicButton = $("<button>");
      $topicButton.text(value);
      $topicButton.attr("data-val", value);

      $("#topicButtons").append($topicButton);

      $("input").val("");

    });

});//end document on ready
