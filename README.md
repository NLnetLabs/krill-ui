# Krill user interface

A user interface for [Krill](https://github.com/NLnetLabs/krill). Krill is a Resource Public Key Infrastructure (RPKI) daemon, featuring a Certificate Authority (CA) and publication server, written in Rust.

## Architecture

This SPA front-end application is written using two main dependencies, namely [React](https://reactjs.org/) as a rendering engine and [Router5](https://router5.js.org/) for routing/navigation.

Styling is written in vanilla CSS and is inspired by the Element as UI framework, as used by [Lagosta](https://github.com/NLnetLabs/lagosta)

The aim was to use as little dependencies as possible to ease the process of maintenance.

## Requirements

Install a recent version of [yarn](https://yarnpkg.com/).

## Run in development

```sh
yarn
yarn dev
```

Navigate to [http://localhost:5173/login](http://localhost:5173/login).

## Build for production

```sh
yarn
yarn build
```

## Linting

```sh
yarn lint
```