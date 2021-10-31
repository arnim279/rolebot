import { getJSONFromSQLQuery, db } from './database.ts';
import { config } from '../index.ts';
import * as restAPITypes from 'https://deno.land/x/discord_api_types@0.24.0/rest/v9/mod.ts';

export async function updateMessage(server_id: string, channel_id: string) {
	const { message_id } =
		getJSONFromSQLQuery<{ message_id: string }>(
			'SELECT message_id FROM messages WHERE server_id = ? AND channel_id = ?',
			[server_id, channel_id]
		)[0] || {};

	const roles = getJSONFromSQLQuery<{ role_id: string; role_name: string }>(
		'SELECT role_id, role_name FROM roles WHERE server_id = ?',
		[server_id]
	);

	const message: restAPITypes.RESTPostAPIChannelMessageJSONBody = {
		content: 'select your roles:',
		components: roles
			.filter((_, i) => i % 5 === 0)
			.map((_, rowIndex) => ({
				type: 1,
				components: roles
					.filter(
						(_, roleIndex) => roleIndex >= rowIndex && roleIndex < rowIndex + 5
					)
					.map(({ role_id, role_name }) => ({
						type: 2,
						custom_id: `${server_id}_${role_id}`,
						label: role_name || 'empty name',
						style: 1,
					})),
			})),
	};

	if (!message_id) {
		const { id: message_id } = (await fetch(
			`https://discord.com/api/v9/channels/${channel_id}/messages`,
			{
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					'authorization': `Bot ${config.botToken}`,
				},
				body: JSON.stringify(message),
			}
		).then(r => r.json())) as restAPITypes.RESTGetAPIChannelMessageResult;
	} else {
		await fetch(
			`https://discord.com/api/v9/channels/${channel_id}/messages/${message_id}`,
			{
				method: 'PUT',
				headers: {
					'content-type': 'application/json',
					'authorization': `Bot ${config.botToken}`,
				},
				body: JSON.stringify(message),
			}
		);
	}
}

export async function deleteMessage(server_id: string, channel_id: string) {
	const { message_id } =
		getJSONFromSQLQuery<{ message_id: string }>(
			'SELECT message_id FROM messages WHERE server_id = ? AND channel_id = ?',
			[server_id, channel_id]
		)[0] || {};

	await fetch(
		`https://discord.com/api/v9/channels/${channel_id}/messages/${message_id}`,
		{
			method: 'DELETE',
			headers: {
				authorization: `Bot ${config.botToken}`,
			},
		}
	);

	db.query(
		'DELETE FROM messages WHERE server_id = ? AND channel_id = ? AND message_id = ?;',
		[server_id, channel_id, message_id]
	);
}
