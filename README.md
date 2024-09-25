# Wurth Frontend Monorepo

## Package Manager

This repository uses [pnpm](https://pnpm.io/).

## Visual Studio Code extensions

Install all the recommended extensions when opening this repository in Visual Studio Code.

## Environment Variables

Create the `.env.local` file at the root. Any new variables must also be specified in the `globalEnv` field in the `turbo.json` file.

## Project Structure

The repository has two main folders `apps` and `packages`.

- `app` - Contains the main applications, like the Web and Mobile applications.
- `packages` - Contains code that is shared among the applications in the `apps` folder, like sharable [ESLint](https://eslint.org/) configs in `eslint-config`.

## Workarounds for Expo

- Follow the instructions in this [link](https://github.com/byCedric/expo-monorepo-example#pnpm-workarounds) to get Expo working with pnpm and monorepos.
- Check the `resolver.resolveRequest` field in the Metro config to get it to resolve packages properly

## GitHub Actions

This repository has GitHub Actions configured to run [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) checks to run on Pull Requests for all packages by default. To save time, the actions have [Remote Caching](https://turbo.build/repository/docs/core-concepts/remote-caching) configured to skip the checks on packages that don't have any code changes.

To configure the remote cache follow [this guide](https://turbo.build/repo/docs/guides/ci-vendors/github-actions). Ideally the `TURBO_TOKEN` secret should come from the Vercel team owner's account so that we don't need to replace the secret every time members in the Vercel team change.
