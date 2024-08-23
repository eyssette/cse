import { markdownToHTML } from "./markdownToHTML.js";

// Expression régulière pour chercher les URLs des sites (dans une liste d'éléments)
const regex = /^- +(.+)/;

export function parseMarkdown(markdownContent) {
	const lines = markdownContent.split("\n");
	let cseData = [];
	let cseTitle = "Mon moteur de recherche personnalisé";
	let initialMessageComputed = false;
	let initialMessageContent = [];
	let listWebsites = [];

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

	if (initialMessageContent.length == 0) {
		initialMessageContent = ["Vous pouvez faire votre recherche ci-dessous"];
	}

	cseData = [
		cseTitle,
		markdownToHTML(initialMessageContent.join("\n")),
		listWebsites,
	];
	return cseData;
}
