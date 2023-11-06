$(document).ready(function() {
    var currentYear = new Date().getFullYear();
    var sortOrder = "asc";

    
    var films = [
        {
            title: "Deadpool",
            years: 2016,
            authors: "Tim Miller"
        },
        {
            title: "Spiderman",
            years: 2002,
            authors: "Sam Raimi"
        },
        {
            title: "Scream",
            years: 1996,
            authors: "Wes Craven"
        },
        {
            title: "It: chapter 1",
            years: 2019,
            authors: "Andy Muschietti"
        }
    ];

    
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    
    $('input[type="text"]').on('input', function() {
        var start = this.selectionStart;
        var end = this.selectionEnd;

        
        this.value = this.value.split(' ').map(function(word) {
            return capitalizeFirstLetter(word);
        }).join(' ');

        
        this.setSelectionRange(start, end);
    });


    
    function validateInputs(title, year, director) {
        var errors = [];
        if (title.length < 2) {
            errors.push("Le titre doit contenir au moins 2 caractères.");
        }
        if (year.length !== 4 || isNaN(year) || year < 1900 || year > currentYear) {
            errors.push(`L'année doit être un nombre entre 1900 et ${currentYear}.`);
        }
        if (director.length < 5) {
            errors.push("Le nom de l'auteur doit contenir au moins 5 caractères.");
        }
        return errors;
    }

    
    function showAlert(message, isSuccess) {
        var alertDiv = $('<div>').addClass('alert').text(message);
        if (isSuccess) {
            alertDiv.addClass('alert-success');
        } else {
            alertDiv.addClass('alert-danger');
        }
        $('.container').prepend(alertDiv);
        setTimeout(function() {
            alertDiv.remove();
        }, isSuccess ? 3000 : 5000);
        
    }

    function addFilmToTable(film) {
        var newRow = $("<tr>")
            .append($("<td>").text(film.title))
            .append($("<td>").text(film.years))
            .append($("<td>").text(film.authors))
            .append($("<td>").append($("<button>").addClass("delete-btn btn btn-danger").text("Supprimer")));
        $("#tableBody").append(newRow);
        
    }

    
    films.forEach(film => addFilmToTable(film));

    $("#addButton").click(function() {
        $(".containeradd").slideToggle();
    });

    $("#submitButton").click(function() {
        var title = capitalizeFirstLetter($("#titleInput").val().trim());
        var year = $("#filmYear").val().trim();
        var director = capitalizeFirstLetter($("#directorInput").val().trim());

        var errors = validateInputs(title, year, director);
        if (errors.length === 0) {
            var newFilm = {
                title: title,
                years: parseInt(year),
                authors: director
            };
            films.push(newFilm);
            addFilmToTable(newFilm);
            $("#titleInput").val('');
            $("#filmYear").val('');
            $("#directorInput").val('');
            
            Swal.fire({
            title: 'Succès !',
            text: 'Le film a été ajouté avec succès.',
            icon: 'success',
            timer: 3000,
            showConfirmButton: false
});

        } else {
            showAlert("Erreur dans le formulaire : " + errors.join(" "), false);
        }

    });

    $(document).on('click', '.delete-btn', function() {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce film ?")) {
            
            var row = $(this).closest('tr');
            var titleToRemove = row.find("td:first").text();
            films = films.filter(film => film.title !== titleToRemove);
            
            row.remove();
        }
        
    Swal.fire({
        title: 'Supprimé !',
        text: 'Le film a été supprimé avec succès.',
        icon: 'info',
        timer: 3000,
        showConfirmButton: false
        });
    });

    $("th").click(function() {
        var sortType = $(this).data("sort");
        var rows = $("tbody tr").get();
        rows.sort(function(a, b) {
            var A = $(a).children('td').eq(sortType === 'title' ? 0 : sortType === 'year' ? 1 : 2).text().toUpperCase();
            var B = $(b).children('td').eq(sortType === 'title' ? 0 : sortType === 'year' ? 1 : 2).text().toUpperCase();
            if (sortOrder === "asc") {
                return A.localeCompare(B);
            } else {
                return B.localeCompare(A);
            }
        });
        $.each(rows, function(index, row) {
            $("tbody").append(row);
        });
        sortOrder = (sortOrder === "asc") ? "desc" : "asc";
    });
});


