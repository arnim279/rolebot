import { DB, ColumnName } from 'https://deno.land/x/sqlite@v2.4.2/mod.ts';

export const db = new DB('./data/data.sql');

export function initDatabase() {
	db.query(`
		CREATE TABLE IF NOT EXISTS roles (
			server_id string,
			role_id string
		);

		CREATE TABLE IF NOT EXISTS messages (
			server_id string,
			channel_id string,
			message_id string
		);
	`);
}

export function query(query: string) {
	db.query(query);
}

export function getJSONFromSQLQuery<type>(query: string) {
	const queryResponse = db.query(query);

	let columns: ColumnName[];
	try {
		columns = queryResponse.columns();
	} catch {
		columns = [];
	}

	const res: Record<string, number>[] = [];

	for (const column of queryResponse) {
		res.push({});
		for (const index in column) {
			res[res.length - 1][columns[index].name] = column[index];
		}
	}
	return res as unknown[] as type[];
}
