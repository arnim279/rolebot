# rolebot

a simple discord that allows members of your server to select their roles.  
[invite to your server](https://discord.com/api/oauth2/authorize?client_id=904084390445977662&permissions=2048&scope=bot%20applications.commands)

<!-- TODO: preview gif -->

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
docker compose up
```

### license

<!-- TODO: add license -->
