import * as gateWayTypes from 'https://deno.land/x/discord_api_types@0.24.0/payloads/v9/mod.ts';

export async function handleComponentInteraction(
	interaction: gateWayTypes.APIMessageComponentInteraction
) {
	return {
		type: gateWayTypes.InteractionResponseType.ChannelMessageWithSource,
		data: {
			content: 'component',
			flags: gateWayTypes.MessageFlags.Ephemeral,
		},
	};
}
