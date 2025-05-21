export async function fetchBestSearxInstances() {
	const res = await fetch("https://searx.space/data/instances.json");
	const data = await res.json();
	const instances = data.instances;
	const filtered = Object.entries(instances)
		.filter((instance) => {
			const isPerfectSearchGo =
				instance[1].timing &&
				instance[1].timing.search_go &&
				instance[1].timing.search_go.success_percentage &&
				instance[1].timing.search_go.success_percentage == 100;
			const isPerfectUptime =
				instance[1].uptime &&
				instance[1].uptime.uptimeDay &&
				instance[1].uptime.uptimeDay == 100;
			return isPerfectSearchGo && isPerfectUptime;
		})
		.sort((a, b) => {
			const aMean = a[1].timing.search_go.all.mean;
			const bMean = b[1].timing.search_go.all.mean;
			return aMean - bMean;
		});
	return filtered;
}
