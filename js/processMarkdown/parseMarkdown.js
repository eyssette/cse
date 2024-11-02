import { markdownToHTML } from "./markdownToHTML.js";

// Expression régulière pour chercher les URLs des sites (dans une liste d'éléments)
const regexIsWebsite = /^- +(.+)/;

const regexIsCSS = /<style[^>]*>([\s\S]*?)<\/style>/gi;

export function parseMarkdown(markdownContent) {
	const matchCSS = markdownContent.match(regexIsCSS);
	let styleCSS = "";
	if (matchCSS) {
		styleCSS = matchCSS[0];
		markdownContent = markdownContent.replace(styleCSS, "");
		styleCSS = styleCSS.replace(/<\/?style>/g, "");
	}
	const lines = markdownContent.split("\n");
	let cseData = [];
	let cseTitle = "Mon moteur de recherche personnalisé";
	let initialMessageComputed = false;
	let initialMessageContent = [];
	let listWebsites = [];
	let additionalContent = [];

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
			const matchIsWebsite = line.match(regexIsWebsite);
			// Récupération de la liste des sites pour le moteur de recherche
			if (matchIsWebsite) {
				initialMessageComputed = true;
				const website = matchIsWebsite[1];
				listWebsites.push(website);
			} else {
				// Tout ce qui vient après la liste des sites est considéré comme du contenu additionnel
				if (listWebsites.length > 0) {
					additionalContent.push(line);
				}
			}
		}
	}

	if (initialMessageContent.length == 0) {
		initialMessageContent = ["Vous pouvez faire votre recherche ci-dessous"];
	}

	cseData = [
		markdownToHTML(cseTitle).replace(/<\/?p>/g, ""),
		markdownToHTML(initialMessageContent.join("\n")),
		listWebsites,
		styleCSS,
		markdownToHTML(additionalContent.join("\n")),
	];
	return cseData;
}
