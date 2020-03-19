//  60d3f79d97d40d18b614554e8dc4b31d
//  https://api.themoviedb.org/3/movie/550?api_key=60d3f79d97d40d18b614554e8dc4b31d

$(document).ready(function() {

    var apiBaseUrl = 'https://api.themoviedb.org/3';

    var source = $("#card-template").html();
    var cardTemplate = Handlebars.compile(source);

    $("#send").click(function() {
        movieSearch();
    });

    $("#film-selector").keydown(function(event) {
        if (event.keyCode == 13) {
            movieSearch();
        }
    });

    function movieSearch() {
        var movieSearch = $('#film-selector').val().toLowerCase();
        $('#film-selector').val('');
        $('.cards-container').empty();
        $.ajax({
            // url: 'https://api.themoviedb.org/3/search/movie?api_key=60d3f79d97d40d18b614554e8dc4b31d&query=name+name+name',
            url: apiBaseUrl + '/search/movie',
            data: {
                api_key: '60d3f79d97d40d18b614554e8dc4b31d',
                query:  movieSearch,
                language: 'it-IT'
            },
            method: "GET",
            success: function(data) {
                console.log(data);
                var films = data.results;
                for (var i = 0; i < films.length; i++) {
                    var film = films[i];
                    console.log(film.title);
                    var filmProperties = {
                        // moviePoster: film.poster_path,
                        movieTitle: film.title,
                        originalTitle: film.original_title,
                        movieLanguage: film.original_language,
                        vote: film.vote_average
                    };
                    var filmCard = cardTemplate(filmProperties);
                    $(".cards-container").append(filmCard);
                }
            },
            error: function() {
                alert("Errore!")
            }
        })
    }

    // $.ajax({
    //     // url: 'https://api.themoviedb.org/3/search/movie?api_key=60d3f79d97d40d18b614554e8dc4b31d&query=name+name+name',
    //     url: apiBaseUrl + '/search/movie',
    //     data: {
    //         api_key: '60d3f79d97d40d18b614554e8dc4b31d',
    //         query:  'ritorno al futuro',
    //         language: 'it-IT'
    //     },
    //     method: "GET",
    //     success: function(data) {
    //         console.log(data);
    //         var films = data.results;
    //         for (var i = 0; i < films.length; i++) {
    //             var film = films[i];
    //             console.log(film.title);
    //             var filmProperties = {
    //                 // moviePoster: film.poster_path,
    //                 movieTitle: film.title,
    //                 originalTitle: film.original_title,
    //                 movieLanguage: film.original_language,
    //                 vote: film.vote_average
    //             };
    //             var filmCard = cardTemplate(filmProperties);
    //             $(".cards-container").append(filmCard);
    //         }
    //     },
    //     error: function() {
    //         alert("Errore!")
    //     }
    // })

});
