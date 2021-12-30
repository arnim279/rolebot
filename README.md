<img src="./assets/avatar.png" style="height: 5rem"/>

# rolebot

a simple discord bot that allows members of your server to select their roles.  
[invite to your server](https://discord.com/api/oauth2/authorize?client_id=904084390445977662&permissions=2048&scope=bot%20applications.commands)

### important files

[`commands.json`](./commands.json): application commands  
[`data/analytics.csv`](./data/analytics.csv): analytics data (will be created automatically)

### setup

you need to create the config file since it isn't tracked with git.

`./config.json`:

```js
{
  "applicationKey": string, // your bot's public application key
  "botToken": string, // your bot's secret token
  "analytics": boolean // whether analytics should be stored
}
```

### serving

```bash
docker compose up -d

# or

deno run --allow-net --allow-read --allow-write src/index.ts
```

### contributing

feel free to open a PR, but before making huge changes, please explain what you plan to do first.
