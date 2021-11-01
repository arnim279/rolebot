<img src="./assets/avatar.png" style="height: 5rem"/>

# rolebot

a simple discord bot that allows members of your server to select their roles.  
[invite to your server](https://discord.com/api/oauth2/authorize?client_id=904084390445977662&permissions=2048&scope=bot%20applications.commands)

[showcase](./assets/preview.mp4)

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

### license

MIT License

Copyright (c) 2021 arnim

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
