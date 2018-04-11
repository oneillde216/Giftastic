var topics = [
	 "Keanu Reeves", 
    "Brendan Fraser", 
    "Macaulay Culkin", 
    "Steven Seagal", 
    "Dwayne Johnson", 
    "Mark Wahlberg",
    "Tom Green",
    "William Shatner",
    "Arnold Schwarzenegger",
    "Will Smith",
    "Tom Green",
    "Owen Wilson"
];

for(var i = 0; i < topics.length; i++) {
	var button = $("<button>").text(topics[i]);
	button.attr("data-actor", topics[i]);
	button.addClass("actor-button");
	$("#button-group").append(button);
}



$("#add-actor-button").on("click", function(e) {
	e.preventDefault();
	var alreadyExist = false;
	if(topics.indexOf($("#new-actor-input").val()) !== -1) {
		alreadyExist = true;
	}


	if($("#new-actor-input").val() !== "" && alreadyExist === false) {
		var newactor = $("#new-actor-input").val().toLowerCase();
		topics.push(newactor);
		var button = $("<button>").text(newactor);
		button.attr("data-actor", newactor);
		button.addClass("actor-button");
		$("#button-group").append(button);
	}
	$("#new-actor-input").val("");
});



$(document).on("click", ".actor-button", function() {
	var actor = $(this).attr("data-actor");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        actor + "&api_key=aj3vWy31RkOAHnhDK9Yua4eXI7qLbLvg&limit=10";

    $.ajax({
    	url: queryURL,
    	method: "GET"
    	
    }).done(function(response) {

    	var results = response.data;

		var resultsContainerSection = $("<section class='results-container'>");

    	for(var i = 0; i < results.length; i++) {
    		var singleResultDiv = $("<div class='result-container'>");
    		
    		var rating = results[i].rating;

    		var p = $("<p>").text("Rating: " + rating);

    		var actorImg = $("<img class='result'>");
    		actorImg.attr("src", results[i].images.fixed_height_still.url);
    		actorImg.attr("data-state", "still");
    		actorImg.attr("data-still", results[i].images.fixed_height_still.url);
    		actorImg.attr("data-animate", results[i].images.fixed_height.url);

    		singleResultDiv.prepend(actorImg);
    		singleResultDiv.prepend(p);

    		resultsContainerSection.prepend(singleResultDiv);
    	}

    	$("#actors-group").prepend(resultsContainerSection);
    });
});

$(document).on("click", ".result", function() {
	var state = $(this).attr("data-state");

	if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});