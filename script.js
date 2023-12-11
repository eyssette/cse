// On peut définir ici le moteur de recherche Searx que l'on va utiliser
const searchEngine = "https://paulgo.io/search?q=";
/* const searchEngine = "https://zotop.zaclys.com/search?q="; */

// On peut sélectionner les moteurs de recherche utilisés par Searx
const setEngines = "&engines=google&disabled_engines=brave" // Brave renvoie souvent des résultats trop larges

// On peut définir la langue de recherche
const defineLang = "&language=all";

// Par défaut on affiche ça :
const cseDefault = `# Créez votre moteur de recherche

> Ce site vous permet de créer un moteur de recherche personnalisé à partir d'une liste de sites.
> 1. Créez un fichier sur CodiMD ou sur une forge.
> 2. Ce fichier doit comporter : un titre, un bloc de citation qui constituera le message initial, et une liste de sites. Vous pouvez récupérer [ce modèle](https://codimd.apps.education.fr/b8KAltV2QQWR2rKhF_eYcg?both) ou bien regarder cet [exemple](https://eyssette.forge.aeif.fr/cse#https://eyssette.forge.aeif.fr/my-cse/intro-philo.md).
> 3. La recherche est plus pertinente si votre liste de sites n'est pas trop longue. Vous pouvez également utiliser le caractère générique \`*\`. Par exemple : \`ac-*.fr\` permet d'intégrer tous les sites \`ac-lyon.fr\`, \`ac-grenoble.fr\`, etc.
> 4. Votre moteur de recherche sera alors disponible à l'adresse : https://eyssette.forge.aeif.fr/cse#URL (en remplaçant URL par l'URL de votre fichier).
> 5. Si votre fichier n'est pas accessible : essayez de mettre \`https://api.allorigins.win/raw?url=\` avant votre URL

- eyssette.github.io`;
let md = cseDefault;

// On peut définir des raccourcis vers des moteurs de recherche (si on veut forker le projet et avoir une URL plus courte à partager)

const shortcuts = [
	["intro-philo","https://raw.githubusercontent.com/eyssette/my-cse/main/intro-philo.md"],
	["recherche-philo","https://raw.githubusercontent.com/eyssette/my-cse/main/recherche-philo.md"],
	["drane","https://raw.githubusercontent.com/eyssette/my-cse/main/drane.md"]
]

let cseSyntax = "";

function getMarkdownContent() {
	// Récupération du markdown externe
	let urlMD = window.location.hash.substring(1); // Récupère l'URL du hashtag sans le #
	if (urlMD !== "") {
		// Gestion des fichiers hébergés sur github
		if (urlMD.startsWith("https://github.com")) {
			urlMD = urlMD.replace(
				"https://github.com",
				"https://raw.githubusercontent.com"
			);
			urlMD = urlMD.replace("/blob/", "/");
		}
		// Gestion des fichiers hébergés sur codiMD
		if (
			urlMD.startsWith("https://codimd") &&
			urlMD.indexOf("download") === -1
		) {
			urlMD =
				urlMD.replace("?edit", "").replace("?both", "").replace("?view", "") +
				"/download";
		}
		// Vérification de la présence d'un raccourci
		shortcut = shortcuts.find(element => element[0]==urlMD)
		if (shortcut) {
			urlMD = shortcut[1]
		}
		// Récupération du contenu du fichier
		fetch(urlMD)
			.then((response) => response.text())
			.then((data) => {
				md = data;
				cseData = parseMarkdown(md);
				createCSE(cseData);
			})
			.catch((error) => {
				cseData = parseMarkdown(cseDefault);
				createCSE(cseData);
				alert("Il y a une erreur dans l'URL. Merci de la vérifier et de vous assurer que le fichier est bien accessible.")
				console.log(error);
			});
	} else {
		cseData = parseMarkdown(md);
		createCSE(cseData);
	}
}

getMarkdownContent()

function parseMarkdown(markdownContent) {
	const lines = markdownContent.split("\n");
	let cseData = [];
	let cseTitle = "Mon moteur de recherche personnalisé";
	let initialMessageComputed = false;
	let initialMessageContent = [];
	let listWebsites = [];

	// Expression régulière pour chercher les URLs des sites (dans une liste d'éléments)
	const regex = /^- +(.+)/;

	// Gestion de la conversion du markdown en HTML
	const converter = new showdown.Converter({
		emoji: true,
		parseImgDimensions: true,
		simplifiedAutoLink: true,
	});
	function markdownToHTML(text) {
		const html = converter.makeHtml(text);
		return html;
	}


	for (let line of lines) {
		// On parcourt le contenu du fichier ligne par ligne
		if (line.startsWith("# ")) {
			// Récupération du titre du moteur de recherche
			cseTitle = line.replace("# ", "").trim();
		} else if (line.startsWith(">") && !initialMessageComputed) {
			// Récupération du message initial du moteur de recherche, défini par un bloc citation
			line = line.replace(/^>\s?/, "").trim();
			initialMessageContent.push(line);
		} else {
			const match = line.match(regex);
			// Récupération de la liste des sites pour le moteur de recherche
			if (match) {
				initialMessageComputed = true;
				const website = match[1];
				listWebsites.push(website);
			}
		}
	}

	if (initialMessageContent.length==0) {
		initialMessageContent = ["Vous pouvez faire votre recherche ci-dessous"]
	} 

	cseData = [
		cseTitle,
		markdownToHTML(initialMessageContent.join('\n')),
		listWebsites
	];
	return cseData;
}

const userInput = document.getElementById("search-input");
const sendButton = document.getElementById("send-button");
const waitMessageElement = document.getElementById("wait-message")
const loaderElement = document.getElementById("loader")

userInput.focus();

function createCSE(data) {
	const titleElement = document.getElementById("cse-title")
	const initialMessageElement = document.getElementById("initial-message")
	const mainElement = document.getElementById("search")
	const footerElement = document.getElementById("credits")
	title = data[0];
	initialMessage = data[1];
	websites = data[2];
	// On change le titre et le message initial avec le contenu personnalisé
	titleElement.innerHTML = title;
	initialMessageElement.innerHTML = initialMessage;
	// On crée la syntaxe de recherche pour le moteur de recherche personnalisé
	cseSyntax = " (site:" + data[2].join(" OR site:") + ")"
	// On affiche le champ de recherche
	mainElement.style.visibility = "visible";
	footerElement.style.visibility = "visible";
}

// Gestion des événements "click" et "Enter"

sendButton.addEventListener("click", () => {
	const userInputText = userInput.value;
	search(userInputText)
})

userInput.addEventListener("keypress", (event) => {
	if (event.key === "Enter") {
		sendButton.click();
	}
});

// On lance la recherche

function search(searchInput) {
	// On affiche un message d'attente des résultats
	loaderElement.style.display = "block"
	waitMessageElement.style.visibility = 'visible';
	// On configure l'URL de notre moteur de recherche
	searchText = encodeURI(searchInput) + " " + cseSyntax + defineLang + setEngines
	const urlSearch = searchEngine + searchText;
	// On lance la page de recherche
	localStorage.setItem('searchLaunched', 'true');
	window.location.href = urlSearch;
}

window.addEventListener( "pageshow", () => {
		loaderElement.style.display = "none"
		waitMessageElement.style.visibility = 'hidden';
  });