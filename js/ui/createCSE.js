import { handleEvents } from "./handleEvents.js";

export function createCSE(data) {
	const userInput = document.getElementById("search-input");
	const sendButton = document.getElementById("send-button");
	const titleElement = document.getElementById("cse-title");
	const initialMessageElement = document.getElementById("initial-message");
	const mainElement = document.getElementById("search");
	const footerElement = document.getElementById("credits");
	const title = data[0];
	const initialMessage = data[1];
	const websites = data[2];
	// On change le titre et le message initial avec le contenu personnalisé
	titleElement.innerHTML = title;
	initialMessageElement.innerHTML = initialMessage;
	// On crée la syntaxe de recherche pour le moteur de recherche personnalisé
	const cseSyntax = " (site:" + websites.join(" OR site:") + ")";
	// On affiche le champ de recherche
	mainElement.style.visibility = "visible";
	footerElement.style.visibility = "visible";
	userInput.focus();

	handleEvents(userInput, sendButton, cseSyntax);
}
