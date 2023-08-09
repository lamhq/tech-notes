# Getting Started

## Installing Cypress

```bash
yarn add cypress --dev
```


## Opening the App

```bash
npx cypress open
```

### Adding npm Scripts

```json
{
  "scripts": {
    "cypress:open": "cypress open"
  }
}
```

```bash
npm run cypress:open
```

## The Launchpad

On opening Cypress, your testing journey begins with the Launchpad.

![](https://docs.cypress.io/img/guides/core-concepts/cypress-app/the-launchpad.png)

The Launchpad presents you with testing type options: **E2E Testing** or **Component Testing**.

The Launchpad will scaffold out a set of configuration files appropriate to your chosen testing type.
