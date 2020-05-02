# Monopoly Creator

This is a desktop application to create monopoly game simulation jobs on NYU Shanghai HPC clusters.

## HPC Setup

You must have an active account that has access to the NYU Shanghai HPC.

1. Create a directory named `monopoly` in the home directory on HPC.
2. Download the backend code [here](https://github.com/Monopoly-Simulation/backend_game.git), put the folder under directory `monopoly` and rename it to `code`.
3. Create two empty folders, `jobs` and `output` under `monopoly` directory.

### Folder structure on HPC

```
monopoly
|--- code
|--- jobs
|--- ouput
```

## Installation

Install [yarn](https://yarnpkg.com/) globally.

```bash
git clone https://github.com/Monopoly-Simulation/monopoly-creator.git # download source code
cd monopoly-creator
yarn # install dependencies
```

## Create credential file

Under `src/remote`, create a file named `credential.ts` including the following content:

```typescript
export default {
  host: 'hpc.shanghai.nyu.edu',
  username: '[Your NYU netid]',
  password: '[Your NYU password]',
};
```

Replace the `username` and `password` fields with your own account information.

## Develop with hot module reloading

```
yarn start
```

The application will be automatically started.

## Build deliverable packages

```
yarn build
```

Deliverable packages can be found under `dist` directory.
