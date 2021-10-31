import * as gateWayTypes from 'https://deno.land/x/discord_api_types@0.24.0/payloads/v9/mod.ts';
import * as restAPITypes from 'https://deno.land/x/discord_api_types@0.24.0/rest/v9/mod.ts';
import { hasAdminPermission } from '../lib/hasAdminPermission.ts';
import {
	addRole,
	removeRole,
	getJSONFromSQLQuery,
	db,
} from '../lib/database.ts';
import { updateMessage, deleteMessage } from '../lib/manageMessage.ts';
import { config } from '../index.ts';

export async function handleApplicationCommand(
	interaction: gateWayTypes.APIChatInputApplicationCommandInteraction
): Promise<gateWayTypes.APIInteractionResponse> {
	const command = interaction.data
		.options?.[0] as gateWayTypes.ApplicationCommandInteractionDataOptionSubCommand;

	switch (command.name) {
		case 'add': {
			if (!hasAdminPermission(interaction.member!)) return noPermission();
			const role = command.options[0].value as string;
			const server = interaction.guild_id!;

			if (
				getJSONFromSQLQuery('SELECT * FROM roles WHERE server_id = ?;', [
					server,
				]).length >= 25
			) {
				return {
					type: gateWayTypes.InteractionResponseType.ChannelMessageWithSource,
					data: {
						content: `can't add more than 25 roles`,
						flags: gateWayTypes.MessageFlags.Ephemeral,
					},
				};
			}

			const { name } =
				(
					(await fetch(`https://discord.com/api/v9/guilds/${server}/roles`, {
						headers: {
							authorization: `Bot ${config.botToken}`,
						},
					}).then(r => r.json())) as restAPITypes.RESTGetAPIGuildRolesResult
				).find(r => r.id === role) || {};

			addRole(server, role, name as string);
			await updateMessage(interaction.guild_id!, interaction.channel_id);

			return {
				type: gateWayTypes.InteractionResponseType.ChannelMessageWithSource,
				data: {
					content: `added <@&${role}>`,
					flags: gateWayTypes.MessageFlags.Ephemeral,
				},
			};
		}

		case 'remove': {
			if (!hasAdminPermission(interaction.member!)) return noPermission();
			const role = command.options[0].value as string;
			const server = interaction.guild_id!;

			removeRole(server, role);
			await updateMessage(interaction.guild_id!, interaction.channel_id);

			return {
				type: gateWayTypes.InteractionResponseType.ChannelMessageWithSource,
				data: {
					content: `removed <@&${role}>`,
					flags: gateWayTypes.MessageFlags.Ephemeral,
				},
			};
		}

		case 'clear': {
			if (!hasAdminPermission(interaction.member!)) return noPermission();
			const server = interaction.guild_id!;

			removeRole(server);
			await deleteMessage(interaction.guild_id!, interaction.channel_id);

			return {
				type: gateWayTypes.InteractionResponseType.ChannelMessageWithSource,
				data: {
					content: `cleared all roles`,
					flags: gateWayTypes.MessageFlags.Ephemeral,
				},
			};
		}

		case 'invite': {
			return {
				type: gateWayTypes.InteractionResponseType.ChannelMessageWithSource,
				data: {
					content:
						'[invite me](https://discord.com/api/oauth2/authorize?client_id=904084390445977662&permissions=268437504&scope=bot%20applications.commands)',
				},
			};
		}

		default: {
			return {
				type: gateWayTypes.InteractionResponseType.ChannelMessageWithSource,
				data: {
					content: 'unknown command',
					flags: gateWayTypes.MessageFlags.Ephemeral,
				},
			};
		}
	}
}

function noPermission(): gateWayTypes.APIInteractionResponse {
	return {
		type: gateWayTypes.InteractionResponseType.ChannelMessageWithSource,
		data: {
			content: "you don't have permission to do this",
			flags: gateWayTypes.MessageFlags.Ephemeral,
		},
	};
}
