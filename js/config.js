export let config = {};

// On peut définir ici le moteur de recherche Searx que l'on va utiliser
config.defaultSearchEngine = "https://opnxng.com/";
// https://paulgo.io/search?q=
// https://searx.mha.fi/search?q=
// https://zotop.zaclys.com/search?q=

// Attention, certains moteurs de recherche ne permettent pas d'utiliser toutes les options ci-dessous

// On peut sélectionner les moteurs de recherche utilisés par Searx
// go = google, goi : google images, yt : youtube, ptb : peertube
config.setEngines = "!go ";

// On peut définir des paramètres de recherche
// safesearch = 2 => mode strict
config.searchMode = "&safesearch=2";

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
	[
		"pourlaclasse",
		"https://codimd.apps.education.fr/QNKTdG5ZROyixxq1EJM9DQ/download",
	],
];

// Un proxy si l'URL du fichier Markdown n'est pas accessible
config.corsProxy = "https://corsproxy.io/?url=";
