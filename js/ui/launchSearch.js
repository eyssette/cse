import { config } from "../config.js";

export function launchSearch(searchInput, cseSyntax) {
	const waitMessageElement = document.getElementById("wait-message");
	const loaderElement = document.getElementById("loader");
	// On affiche un message d'attente des résultats
	loaderElement.style.display = "block";
	waitMessageElement.style.visibility = "visible";
	// On configure l'URL de notre moteur de recherche
	const searchText =
		encodeURI(searchInput) +
		" " +
		cseSyntax +
		config.defineLang +
		config.setEngines;
	const urlSearch = config.searchEngine + searchText;
	// On lance la page de recherche
	localStorage.setItem("searchLaunched", "true");
	window.location.href = urlSearch;
	window.addEventListener("pageshow", () => {
		loaderElement.style.display = "none";
		waitMessageElement.style.visibility = "hidden";
	});
}
