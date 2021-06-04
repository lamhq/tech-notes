# Connecting to Messaging and Voice Channels

## Testing Channels on Your Local Machine

If you're running Rasa X Local mode or a Rasa Open Source server on `localhost`, most external channels won't be able to find your server URL, since `localhost` is not open to the internet.

To make a port on your local machine publicly available on the internet, you can use `ngrok`.

Intall `ngrok`:

```sh
yarn global add ngrok
```

After installing ngrok, run:

```sh
ngrok http 5005; rasa run
```

wherever the instructions say to use `https://<host>:<port>/webhooks/<CHANNEL>/webhook`, use `<ngrok_url>/<CHANNEL>/webhook`, replacing `<ngrok_url>` with the randomly generated URL displayed in your ngrok terminal window.

*For example, if connecting your bot to Slack, your URL should resemble https://26e7e7744191.ngrok.io/webhooks/slack/webhook.*


## Slack

Connecting a bot to Slack requires you to configure it to send messages (using API credentials) and to receive messages (using a webhook).

### Sending Messages

Add the following lines to the file `credentials.yml`:

`credentials.yml`:

```yml
slack:
  slack_channel: "CA003L0XZ"    # channel ID, not a channel name!
  slack_token: "xoxb-XXX"       # token obtained in the next step
  slack_signing_secret: "YYY"   # secret obtained in the next step
```

The `slack_channel` can be a channel or an individual person. To get a channel id, right click on the channel in Slack and choose **Copy Link**. The id will be the last component in the URL.

#### Create a Slack App to get `slack_token` and `slack_signing_secret`

1. Go to [**Your Apps**](https://api.slack.com/apps) and click on **Create New App**.
2. Head over to **OAuth & Permissions** and scroll down to **Scopes**. Add the following scopes:

- `app_mentions:read`
- `channels:history`
- `chat:write`
- `groups:history`
- `im:history`
- `mpim:history`
- `reactions:write`

Scopes give your app permission to do things in your workspace.

3. On the **OAuth & Permissions** page, click **Install App to Workspace** to add the bot to your workspace.

Once added, Slack will show you a **Bot User OAuth Access Token** which you'll need to add to your `credentials.yml` as the value for `slack_token`. The token should start with `xoxb`.

4. Head over to **Basic Information** to gather the **Signing Secret**. Copy the signing secret into your `credentials.yml` as the value for `slack_signing_secret`.


### Receiving Messages

To receive messages, you will need a publicly available URL for Slack to reach your bot and tell you about new messages.

If you are running locally, you can test channels using ngrok.

1. Start your bot with `rasa run`
2. Go to Slack, configure the webhook by heading to **Event Subscriptions** and turning **Enable Events** on.  
In **Request URL**, enter the public url of your bot and append `/webhooks/slack/webhook`.  
E.g. `https://<host>/webhooks/slack/webhook,` replacing `<host>` with your URL. If you are using ngrok, your url should look like `https://92832de0.ngrok.io/webhooks/slack/webhook`.

3. In **Subscribe to bot events** section on the same page. You'll need to add the following events:
    - `message.channels`
    - `message.groups`
    - `message.im`
    - `message.mpim`