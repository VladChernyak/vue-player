# Contributing to Vue Player

Thank you for your interest in contributing! This guide covers everything you need to get started.

## Repository Structure

This is a pnpm monorepo with the following packages:

```
packages/
  core/    — framework-agnostic player engine and types
  vue/     — Vue 3 component and usePlayer composable
  nuxt/    — Nuxt 3 module with auto-imports
docs/      — VitePress documentation site
playground/ — local development sandbox
```

## Prerequisites

- Node.js 18+
- pnpm 9+

## Setup

```sh
git clone https://github.com/VladChernyak/vue-player.git
cd vue-player
pnpm install
```

## Development

Start the docs site with live reload:

```sh
pnpm docs:dev
```

Start the playground:

```sh
pnpm playground
```

Build all packages:

```sh
pnpm build
```

Run tests:

```sh
pnpm test
```

## Making Changes

1. Fork the repository and create a branch from `main`
2. Make your changes
3. Add tests if applicable
4. Make sure `pnpm test` and `pnpm build` pass
5. Open a pull request

## Commit Style

Use conventional commits:

```
feat: add subtitle track switcher
fix: correct seek clamping on live streams
docs: update usePlayer examples
chore: bump dependencies
```

## Reporting Bugs

Open an issue on [GitHub](https://github.com/VladChernyak/vue-player/issues) with:
- A minimal reproduction (CodeSandbox or StackBlitz link)
- Vue and browser versions
- Description of the expected vs actual behavior

## License

By contributing you agree that your changes will be licensed under the [MIT License](./LICENSE).
