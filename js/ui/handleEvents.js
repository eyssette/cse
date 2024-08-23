import { launchSearch } from "./launchSearch.js";

export function handleEvents(userInput, sendButton, cseSyntax) {
	userInput.addEventListener("keypress", (event) => {
		if (event.key === "Enter") {
			sendButton.click();
		}
	});
	sendButton.addEventListener("click", () => {
		const userInputText = userInput.value;
		launchSearch(userInputText, cseSyntax);
	});
}
