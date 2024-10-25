import { config } from "../config.js";

// Pour gérer l'URL de la source du Markdown
export function handleURL(url) {
	if (url !== "") {
		let addCorsProxy = true;
		// Vérification de la présence d'un raccourci
		const shortcut = config.shortcuts.find((element) => element[0] == url);
		if (shortcut) {
			url = shortcut[1];
			// Si on a un raccourci, on n'a pas besoin de traiter correctement l'url
			return url;
		}
		// Gestion des fichiers hébergés sur la forge et publiés sur une page web
		if (url.includes(".forge")) {
			addCorsProxy = false;
		}
		// Gestion des fichiers hébergés sur github
		if (url.startsWith("https://github.com")) {
			addCorsProxy = false;
			url = url.replace(
				"https://github.com",
				"https://raw.githubusercontent.com",
			);
			url = url.replace("/blob/", "/");
		}
		// gestion des fichiers hébergés sur codiMD / hedgedoc / digipage
		if (
			url.startsWith("https://codimd") ||
			url.startsWith("https://pad.numerique.gouv.fr/") ||
			url.includes("hedgedoc") ||
			url.includes("digipage")
		) {
			addCorsProxy = false;
			url = url
				.replace("?edit", "")
				.replace("?both", "")
				.replace("?view", "")
				.replace(/#$/, "")
				.replace(/\/$/, "");
			url = url.indexOf("download") === -1 ? url + "/download" : url;
		}
		// gestion des fichiers hébergés sur framapad ou digidoc
		if (
			(url.includes("framapad") || url.includes("digidoc")) &&
			!url.endsWith("/export/txt")
		) {
			addCorsProxy = false;
			url = url.replace(/\?.*/, "") + "/export/txt";
		}
		url = addCorsProxy ? config.corsProxy + url : url;
	}
	return url;
}
