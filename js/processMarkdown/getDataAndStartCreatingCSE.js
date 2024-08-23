import { handleURL } from "../utils/urls.js";
import { parseMarkdown } from "./parseMarkdown.js";
import { createCSE } from "../ui/createCSE.js";

export function getDataAndStartCreatingCSE(md) {
	// On récupère l'URL du hashtag sans le #
	const url = window.location.hash.substring(1).replace(/\?.*/, "");
	// On traite l'URL pour pouvoir récupérer correctement la source en Markdown
	const sourceMD = handleURL(url);
	if (sourceMD !== "") {
		fetch(sourceMD)
			.then((response) => response.text())
			.then((data) => {
				data = parseMarkdown(data);
				createCSE(data);
			})
			.catch((error) => {
				const data = parseMarkdown(md);
				createCSE(data);
				alert(
					"Il y a une erreur dans l'URL. Merci de la vérifier et de vous assurer que le fichier est bien accessible.",
				);
				console.error(error);
			});
	} else {
		const data = parseMarkdown(md);
		createCSE(data);
	}
}