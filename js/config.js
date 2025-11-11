export let config = {};

// Par défaut, l'application recherche le meilleur moteur de recherche disponible
// Mais on peut définir ici un moteur de recherche spécifique si l'on souhaite
// utiliser un moteur précis.
// Ce moteur de recherche sera aussi utilisé si la recherche du meilleur moteur n'a pas fonctionné
config.useDefaultSearchEngine = true;
config.defaultSearchEngine = "https://www.ecosia.org/search?method=index&q=";

// Attention, certains moteurs de recherche ne permettent pas d'utiliser toutes les options ci-dessous

// On définit ici le préfixe utilisé
config.searchPrefix = "";
// Pour les moteurs de recherche Searx :
// config.searchPrefix = "search?q=";

// On peut sélectionner les moteurs de recherche utilisés par Searx
// go = google, goi : google images, yt : youtube, ptb : peertube
config.setEngines = "";

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
