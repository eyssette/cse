import { launchSearch } from "./launchSearch.js";

export function handleEvents(
	userInput,
	sendButton,
	listWebsites,
	bestSearXinstance,
) {
	userInput.addEventListener("keypress", (event) => {
		if (event.key === "Enter") {
			sendButton.click();
		}
	});
	sendButton.addEventListener("click", () => {
		const userInputText = userInput.value.replace("\n", "");
		launchSearch(userInputText, listWebsites, bestSearXinstance);
	});
}
