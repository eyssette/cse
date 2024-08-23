export let config = {};

// On peut définir ici le moteur de recherche Searx que l'on va utiliser
config.searchEngine = "https://paulgo.io/search?q=";
// config.searchEngine = "https://zotop.zaclys.com/search?q=";

// Attention, certains moteurs de recherche ne permettent pas d'utiliser toutes les options ci-dessous

// On peut sélectionner les moteurs de recherche utilisés par Searx
// Je supprime ici Brave, qui renvoie souvent des résultats trop larges
config.setEngines = "&engines=google&disabled_engines=brave";

// On peut définir la langue de recherche
config.defineLang = "&language=all";

// On peut définir des raccourcis vers des moteurs de recherche (si on veut forker le projet et avoir une URL plus courte à partager)
config.shortcuts = [
	[
		"intro-philo",
		"https://raw.githubusercontent.com/eyssette/my-cse/main/intro-philo.md",
	],
	[
		"recherche-philo",
		"https://raw.githubusercontent.com/eyssette/my-cse/main/recherche-philo.md",
	],
	["drane", "https://raw.githubusercontent.com/eyssette/my-cse/main/drane.md"],
];

// Un proxy si l'URL du fichier Markdown n'est pas accessible
config.corsProxy = "https://corsproxy.io/?";