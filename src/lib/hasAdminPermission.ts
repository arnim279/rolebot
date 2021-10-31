import * as gateWayTypes from 'https://deno.land/x/discord_api_types@0.24.0/payloads/v9/mod.ts';

export function hasAdminPermission(
	member: gateWayTypes.APIInteractionGuildMember
) {
	let permissions = parseInt(member.permissions);
	const manage_roles_permission = 1 << 28;

	return (permissions & manage_roles_permission) === manage_roles_permission;
}
