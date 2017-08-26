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

  var topic = $(this).data("val");
  var key = "eb2a08b4e22049ae890ccf2296deab6c";
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + key + "&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    for (var i = 0; i < 10; i++) {

      var $gifDiv = $("<div>");
      $gifDiv.addClass("gif-holder");

      var $gif = $("<img>");
      $gif.addClass("gif");
      $gif.attr("src", response.data[i].images.fixed_height_still.url);
      $gif.attr("data-still", response.data[i].images.fixed_height_still.url);
      $gif.attr("data-animate", response.data[i].images.fixed_height.url);
      $gif.attr("alt", topic);
      $gif.attr("data-state", "still");

      var $rating = $("<p>");
      $rating.addClass("rating");
      $rating.html("<span class='rating-label'>Rating: </span>" + response.data[i].rating); 

      $gifDiv.append($gif);
      $gifDiv.append($rating);
      $("#gifs").append($gifDiv);
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
