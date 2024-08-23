import Showdown from "../externals/showdown.js";

// Gestion de la conversion du markdown en HTML
const converter = new Showdown.Converter({
	emoji: true,
	parseImgDimensions: true,
	simplifiedAutoLink: true,
});

export function markdownToHTML(text) {
	const html = converter.makeHtml(text);
	return html;
}
