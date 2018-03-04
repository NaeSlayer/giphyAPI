$(document).ready(function () {

    // inital array of topics
    var topics = ["dwight", "jim", "pam", "michael", "stanley", "kevin", "meredith", "phyllis", "andy", "erin"];

    var gifs;

    $("#giphy-view").on("mouseenter", ".gifImage", function () {
        var image = $(this);
        var imageURL = image.data("animate")
        image.attr("src", imageURL);

    });

    $("#giphy-view").on("mouseleave", ".gifImage", function () {
        var image = $(this);
        var imageURL = image.data("still")
        image.attr("src", imageURL);
    });

    function getGifImage(source, id, dataStill, dataAnimate) {
        var gifImage = $('<img>');
        // build gifImage
        gifImage.addClass("gifImage");
        gifImage.attr("src", source);
        gifImage.attr("id", id)
        gifImage.data('still', dataStill);
        gifImage.data('animate', dataAnimate);
        return gifImage;
    }

    function displayGifs() {
        $("#giphy-view").empty();
        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + " the20%office&api_key=UAH7aljkF4fNOdraEANpxT58M8TXSJiX&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            gifs = response;
            var images;


            for (var i = 0; i < response.data.length; i++) {

                var giphyView = $("#giphy-view");
                var gifImage = getGifImage(response.data[i].images.fixed_height_still.url, "gif-" + i, response.data[i].images.fixed_height_still.url, response.data[i].images.fixed_height.url)
                $(giphyView).append(gifImage);

                var ratingsDiv = $("<p>");
                ratingsDiv.text("Rating: " + response.data[i].rating);
                $(giphyView).append(ratingsDiv);

            }

        })
        console.log(queryURL);


    }

    function renderTopicButtons() {
        topic = $("#topic-input").val("");
        $("#topics-view").empty();

        for (var i = 0; i < topics.length; i++) {
            var gifButton = $('<button>');
            gifButton.addClass("topic btn")
            gifButton.attr("data-name", topics[i]);
            gifButton.text(topics[i]);
            $("#topics-view").append(gifButton);
        }
    }

    renderTopicButtons();

    $("#add-topic").on("click", function (event) {

        event.preventDefault();
        var topic = $("#topic-input").val();


        topics.push(topic);

        renderTopicButtons();

    });


    $(document).on("click", ".topic", displayGifs);


})