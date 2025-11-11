import { handleEvents } from "./handleEvents.js";
import { openLinksInNewTab } from "../utils/urls.js";
import { config } from "../config.js";
import { fetchBestSearxInstances } from "./fetchBestSearxInstance.js";

export function createCSE(data) {
	const userInput = document.getElementById("search-input");
	const sendButton = document.getElementById("send-button");
	const titleElement = document.getElementById("cse-title");
	const initialMessageElement = document.getElementById("initial-message");
	const additionalContentElement =
		document.getElementById("additional-content");
	const mainElement = document.getElementById("search");
	const footerElement = document.getElementById("credits");
	const title = data[0];
	const initialMessage = data[1];
	const websites = data[2];
	const styleCSS = data[3].trim();
	const additionalContent = data[4].trim();
	if (styleCSS !== "") {
		const styleElement = document.createElement("style");
		styleElement.textContent = styleCSS;
		document.head.appendChild(styleElement);
	}
	if (additionalContent != "") {
		additionalContentElement.innerHTML = additionalContent;
	}
	// On change le titre et le message initial avec le contenu personnalisé
	titleElement.innerHTML = title;
	initialMessageElement.innerHTML = initialMessage;
	// On crée la syntaxe de recherche pour le moteur de recherche personnalisé
	const listWebsites = " (site:" + websites.join(" OR site:") + ")";
	// On affiche le champ de recherche
	mainElement.style.visibility = "visible";
	footerElement.style.visibility = "visible";
	userInput.focus();

	const links = document.querySelectorAll("a");
	openLinksInNewTab(links);

	// Si un moteur de recherche par défaut est défini, on l’utilise directement
	if (config.useDefaultSearchEngine) {
		handleEvents(
			userInput,
			sendButton,
			listWebsites,
			config.defaultSearchEngine,
		);
	} else {
		// Sinon, on récupère le meilleur serveur Searx disponible
		fetchBestSearxInstances().then((instances) => {
			const bestSearXinstance = instances.length
				? instances[0][0]
				: config.defaultSearchEngine;
			handleEvents(userInput, sendButton, listWebsites, bestSearXinstance);
		});
	}
}
