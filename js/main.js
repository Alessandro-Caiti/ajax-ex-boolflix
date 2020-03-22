//  60d3f79d97d40d18b614554e8dc4b31d
//  https://api.themoviedb.org/3/movie/550?api_key=60d3f79d97d40d18b614554e8dc4b31d
// https://api.themoviedb.org/3/search/tv?

$(document).ready(function() {

    var apiBaseUrl = 'https://api.themoviedb.org/3';

    var cardSource = $("#card-template").html();
    var cardTemplate = Handlebars.compile(cardSource);

    $("#send").click(function() {
        movieSearch();
        tvSearch();
    });

    $("#film-selector").keydown(function(event) {
        if (event.keyCode == 13) {
            movieSearch();
            tvSearch();
        }
    });

    function movieSearch() {
        var movieSearch = $('#film-selector').val().toLowerCase();
        // $('#film-selector').val('');
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
                var movies = data.results;
                for (var i = 0; i < movies.length; i++) {
                    var movie = movies[i];
                    console.log(movie.title);
                    var movieProperties = {
                        moviePoster: 'https://image.tmdb.org/t/p/w342' + movie.poster_path,
                        movieTitle: movie.title,
                        originalTitle: movie.original_title,
                        movieLanguage: flag(movie.original_language),
                        vote: voteToStars(roundHalf(movie.vote_average))
                    };
                    var movieCard = cardTemplate(movieProperties);
                    $(".cards-container").append(movieCard);
                }
            },
            error: function() {
                alert("Errore!")
            }
        })
    }

    function tvSearch() {
        var tvSearch = $('#film-selector').val().toLowerCase();
        $('#film-selector').val('');
        $('.cards-container').empty();
        $.ajax({
            // url: 'https://api.themoviedb.org/3/search/movie?api_key=60d3f79d97d40d18b614554e8dc4b31d&query=name+name+name',
            url: apiBaseUrl + '/search/tv',
            data: {
                api_key: '60d3f79d97d40d18b614554e8dc4b31d',
                query:  tvSearch,
                language: 'it-IT'
            },
            method: "GET",
            success: function(data) {
                console.log(data);
                var series = data.results;
                for (var i = 0; i < series.length; i++) {
                    var serie = series[i];
                    console.log(serie.name);
                    var serieProperties = {
                        moviePoster: 'https://image.tmdb.org/t/p/w342' + serie.poster_path,
                        movieTitle: serie.name,
                        originalTitle: serie.original_name,
                        movieLanguage: flag(serie.original_language),
                        vote: voteToStars(roundHalf(serie.vote_average))
                    };
                    var serieCard = cardTemplate(serieProperties);
                    $(".cards-container").append(serieCard);
                }
            },
            error: function() {
                alert("Errore!")
            }
        })
    }

    function roundHalf(vote) {
        var voteRounded = Math.ceil(vote / 2);
        return voteRounded;
    }

    function voteToStars(voteRounded) {
        var stars = '';
        switch (voteRounded) {
            // case 0:
            //     stars = '<i class="far fa-star"></i>' + '<i class="far fa-star"></i>' + '<i class="far fa-star"></i>' + '<i class="far fa-star"></i>' + '<i class="far fa-star"></i>';
            //     break;
            case 1:
                stars = '<i class="fas fa-star"></i>' + '<i class="far fa-star"></i>' + '<i class="far fa-star"></i>' + '<i class="far fa-star"></i>' + '<i class="far fa-star"></i>';
                break;
            case 2:
                stars = '<i class="fas fa-star"></i>' + '<i class="fas fa-star"></i>' + '<i class="far fa-star"></i>' + '<i class="far fa-star"></i>' + '<i class="far fa-star"></i>';
                break;
            case 3:
                stars = '<i class="fas fa-star"></i>' + '<i class="fas fa-star"></i>' + '<i class="fas fa-star"></i>' + '<i class="far fa-star"></i>' + '<i class="far fa-star"></i>';
                break;
            case 4:
                stars = '<i class="fas fa-star"></i>' + '<i class="fas fa-star"></i>' + '<i class="fas fa-star"></i>' + '<i class="fas fa-star"></i>' + '<i class="far fa-star"></i>';
                break;
            case 5:
                stars = '<i class="fas fa-star"></i>' + '<i class="fas fa-star"></i>' + '<i class="fas fa-star"></i>' + '<i class="fas fa-star"></i>' + '<i class="fas fa-star"></i>';
                break;
        };
        return stars;
    }

    function flag(language) {
        var flag = '';
        if (language == 'en') {
            flag = '<img src="https://www.countryflags.io/us/flat/64.png">' + '<img src="https://www.countryflags.io/gb/flat/64.png">'
        } else if (language == 'it') {
            flag = '<img src="https://www.countryflags.io/it/flat/64.png">'
        } else if (language == 'fr') {
            flag = '<img src="https://www.countryflags.io/fr/flat/64.png">'
        } else if (language == 'de') {
            flag = '<img src="https://www.countryflags.io/de/flat/64.png">'
        }
        return flag;
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
