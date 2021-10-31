import * as gateWayTypes from 'https://deno.land/x/discord_api_types@0.24.0/payloads/v9/mod.ts';
import * as restAPITypes from 'https://deno.land/x/discord_api_types@0.24.0/rest/v9/mod.ts';
import { config } from '../index.ts';

export async function handleComponentInteraction(
	interaction: gateWayTypes.APIMessageComponentInteraction
) {
	const user_id = interaction.member?.user.id;
	const [server_id, role_id] = interaction.data.custom_id.split('_');

	const has_role = interaction.member?.roles.includes(role_id);

	await fetch(
		`https://discord.com/api/v9/guilds/${server_id}/members/${user_id}/roles/${role_id}`,
		{
			method: has_role ? 'DELETE' : 'PUT',
			headers: {
				'authorization': `Bot ${config.botToken}`,
				'X-Audit-Log-Reason': 'changed their role via message component',
				'content-length': '0',
			},
		}
	);

	return {
		type: gateWayTypes.InteractionResponseType.ChannelMessageWithSource,
		data: {
			content: `${has_role ? 'removed' : 'gave you'} <@&${role_id}>`,
			flags: gateWayTypes.MessageFlags.Ephemeral,
		},
	};
}
