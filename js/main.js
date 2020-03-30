//  60d3f79d97d40d18b614554e8dc4b31d
//  https://api.themoviedb.org/3/movie/550?api_key=60d3f79d97d40d18b614554e8dc4b31d
// https://api.themoviedb.org/3/search/tv?

$(document).ready(function() {

    var apiBaseUrl = 'https://api.themoviedb.org/3';
    var posterBaseUrl = 'https://image.tmdb.org/t/p/';
    var posterSize = 'w342';


    var cardSource = $("#card-template").html();
    var cardTemplate = Handlebars.compile(cardSource);

    homepageContents('movie')
    homepageContents('tv')

    $("#send").click(function() {
        contentsSrc()
    });

    $("#show-selector").keydown(function(event) {
        if (event.keyCode == 13) {
            contentsSrc()
        }
    });

    function contentsSrc() {
        var srcQuery = $('#show-selector').val().toLowerCase();
        $('#show-selector').val('');
        if (srcQuery.length !== 0) {
            $('.cards-container').empty();
            findContents('movie', srcQuery);
            findContents('tv', srcQuery);
        } else {
            alert('Scrivi qualcosa nel campo di ricerca!')
        }
    }

    function homepageContents(media) {
        $.ajax({
            url: apiBaseUrl + '/' + media + '/popular',
            data: {
                api_key: '60d3f79d97d40d18b614554e8dc4b31d',
                language: 'it-IT'
            },
            method: 'GET',
            success: function(data) {
                var contents = data.results;
                printCard(media, contents);
            },
            error: function(err) {
                alert('Errore!')
            }
        });
    }

    function findContents(media, srcQuery) {
        $.ajax({
            url: apiBaseUrl + '/search/' + media,
            data: {
                api_key: '60d3f79d97d40d18b614554e8dc4b31d',
                query: srcQuery,
                language: 'it-IT'
            },
            method: 'GET',
            success: function(data) {
                var contents = data.results;
                printCard(media, contents);
            },
            error: function(err) {
                alert('Errore!')
            }
        });
    }

    function printCard(media, contents) {
        var title, originalTitle;
        for (var i = 0; i < contents.length; i++) {
            var content = contents[i];
            console.log(contents);
            if (media == 'movie') {
                title = content.title;
                originalTitle = content.original_title;
            } else if (media == 'tv') {
                title = content.name;
                originalTitle = content.original_name;
            }

            var contentProperties = {
                contentPoster: printPoster(content.poster_path),
                contentTitle: title,
                contentOriginalTitle: originalTitle,
                contentLanguage: langToFlag(content.original_language),
                contentVote: voteToStars(roundHalf(content.vote_average)),
                contentOverview: content.overview
            };

            var contentCard = cardTemplate(contentProperties);
            if (media == 'movie') {
                $(".cards-container.movies").append(contentCard);
            } else if (media == 'tv') {
                $(".cards-container.series").append(contentCard);
            }

            // $(".cards-container").append(contentCard);
        }
    }

    //Funzione ricerca vecchia divisa per movie e series

    // function movieSearch() {
    //     var movieSearch = $('#show-selector').val().toLowerCase();
    //     // $('#film-selector').val('');
    //     $('.cards-container').empty();
    //     $.ajax({
    //         // url: 'https://api.themoviedb.org/3/search/movie?api_key=60d3f79d97d40d18b614554e8dc4b31d&query=name+name+name',
    //         url: apiBaseUrl + '/search/movie',
    //         data: {
    //             api_key: '60d3f79d97d40d18b614554e8dc4b31d',
    //             query:  movieSearch,
    //             language: 'it-IT'
    //         },
    //         method: "GET",
    //         success: function(data) {
    //             console.log(data);
    //             var movies = data.results;
    //             for (var i = 0; i < movies.length; i++) {
    //                 var movie = movies[i];
    //                 console.log(movie.title);
    //                 var movieProperties = {
    //                     moviePoster: printPoster(movie.poster_path),
    //                     movieTitle: movie.title,
    //                     originalTitle: movie.original_title,
    //                     movieLanguage: langToFlag(movie.original_language),
    //                     vote: voteToStars(roundHalf(movie.vote_average))
    //                 };
    //                 var movieCard = cardTemplate(movieProperties);
    //                 $(".cards-container").append(movieCard);
    //             }
    //         },
    //         error: function() {
    //             alert("Errore!")
    //         }
    //     })
    // }
    //
    // function tvSearch() {
    //     var tvSearch = $('#show-selector').val().toLowerCase();
    //     $('#show-selector').val('');
    //     $('.cards-container').empty();
    //     $.ajax({
    //         // url: 'https://api.themoviedb.org/3/search/movie?api_key=60d3f79d97d40d18b614554e8dc4b31d&query=name+name+name',
    //         url: apiBaseUrl + '/search/tv',
    //         data: {
    //             api_key: '60d3f79d97d40d18b614554e8dc4b31d',
    //             query:  tvSearch,
    //             language: 'it-IT'
    //         },
    //         method: "GET",
    //         success: function(data) {
    //             console.log(data);
    //             var series = data.results;
    //             for (var i = 0; i < series.length; i++) {
    //                 var serie = series[i];
    //                 console.log(serie.name);
    //                 var serieProperties = {
    //                     moviePoster: printPoster(serie.poster_path),
    //                     movieTitle: serie.name,
    //                     originalTitle: serie.original_name,
    //                     movieLanguage: langToFlag(serie.original_language),
    //                     vote: voteToStars(roundHalf(serie.vote_average))
    //                 };
    //                 var serieCard = cardTemplate(serieProperties);
    //                 $(".cards-container").append(serieCard);
    //             }
    //         },
    //         error: function() {
    //             alert("Errore!")
    //         }
    //     })
    // }

    function voteToStars(vote) {
        vote = Math.ceil(vote / 2);
        var stars = '';
        for (var i = 1; i <= 5; i++) {
            if (i <= vote) {
                stars += '<i class="fas fa-star"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        return stars;
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

    function langToFlag(language) {
        var availableFlag = [
            'en',
            'it',
            'fr',
            'de'
        ];
        if (availableFlag.includes(language)) {
            var flag = '<img src="img/flags/' + language + '.png" alt="' + language +'">';
            return flag;
        } else {
            var noFlag = 'Lingua originale:' + ' ' + language;
            return noFlag;
        }
    }

    function printPoster(path) {
        if (path !== null) {
            return posterBaseUrl + posterSize + path;
        } else {
            return 'img/noposter.jpg';
        }
    }
    // Funzione per mostrare le bandiere ma prese da sorgente esterna

    // function langToFlag(language) {
    //     var flag = '';
    //     if (language == 'en') {
    //         flag = '<img src="https://www.countryflags.io/us/flat/64.png">' + '<img src="https://www.countryflags.io/gb/flat/64.png">'
    //     } else if (language == 'it') {
    //         flag = '<img src="https://www.countryflags.io/it/flat/64.png">'
    //     } else if (language == 'fr') {
    //         flag = '<img src="https://www.countryflags.io/fr/flat/64.png">'
    //     } else if (language == 'de') {
    //         flag = '<img src="https://www.countryflags.io/de/flat/64.png">'
    //     } else {
    //         flag = 'Lingua originale' + ' ' + language;
    //     }
    //     return flag;
    // }

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
