let films = [
    { titre: "Inception", genre: "Science-fiction", statut: "Vu" },
    { titre: "Stranger Things", genre: "Série", statut: "En cours" },
    { titre: "Toy Story", genre: "Animation", statut: "À voir" }
];

function mettreAJourStats() {
    document.getElementById("stat-total").textContent = films.length;
    document.getElementById("stat-avoir").textContent = films.filter(f => f.statut === "À voir").length;
    document.getElementById("stat-encours").textContent = films.filter(f => f.statut === "En cours").length;
    document.getElementById("stat-vu").textContent = films.filter(f => f.statut === "Vu").length;
}


function afficherTableau(filtre) {
    const tbody = document.querySelector("#tableau tbody");
    tbody.innerHTML = "";

    const filmsFiltres = filtre === "Tous" ? films : films.filter(f => f.statut === filtre);

    filmsFiltres.forEach(function(film) {
        const indexReel = films.indexOf(film);
        const classBadge = "badge badge-" + film.statut.replace(" ", "-");
        const tr = document.createElement("tr");
        tr.innerHTML =
            "<td>" + film.titre + "</td>" +
            "<td>" + film.genre + "</td>" +
            "<td><span class='" + classBadge + "'>" + film.statut + "</span></td>" +
            "<td><button class='supprimer' data-index='" + indexReel + "'>Supprimer</button></td>";
        tbody.appendChild(tr);
    });

    // Suppression
    document.querySelectorAll(".supprimer").forEach(function(btn) {
        btn.addEventListener("click", function() {
            films.splice(parseInt(this.dataset.index), 1);
            afficherTableau(document.getElementById("filtre").value);
            mettreAJourStats();
        });
    });
}

// Ajout d'un film
document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();

    const titre = document.getElementById("titre").value.trim();
    const genre = document.getElementById("genre").value;
    const statut = document.getElementById("statut").value;

    // Validation (Figure 5)
    let erreur = document.getElementById("erreur");
    if (!titre || !genre || !statut) {
        if (!erreur) {
            erreur = document.createElement("p");
            erreur.id = "erreur";
            erreur.textContent = "Veuillez remplir tous les champs.";
            this.appendChild(erreur);
        }
        return;
    }
    if (erreur) erreur.remove();

    films.push({ titre: titre, genre: genre, statut: statut });
    afficherTableau(document.getElementById("filtre").value);
    mettreAJourStats();
    this.reset();
});

// Filtrage
document.getElementById("filtre").addEventListener("change", function() {
    afficherTableau(this.value);
});

// Initialisation
afficherTableau("Tous");
mettreAJourStats();
