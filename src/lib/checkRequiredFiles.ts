export function checkRequiredFiles() {
	let config: Record<string, string | boolean> = {};
	try {
		config = JSON.parse(Deno.readTextFileSync('./config.json'));
	} catch {
		console.error('./config.json invalid');
		Deno.exit(1);
	}

	if (config.analytics === true) {
		try {
			Deno.readTextFileSync('./data/analytics.csv');
		} catch {
			Deno.writeFileSync(
				'./data/analytics.csv',
				new TextEncoder().encode(
					'unix_time_secs, interaction_type, interaction_name'
				)
			);
		}
	}
}
