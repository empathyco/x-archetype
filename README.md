# Interface X

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Created by](https://img.shields.io/badge/Created%20by-Empathy.co-green)](https://www.empathy.co)

Welcome to the Interface X Archetype

## What is this repository for?

The purpose of this repository is to be the starting point to a customer setup using the X Components. Please take a look at
the [documentation](./docs/index.md).

If you want to contribute to this project please keep in mind that it uses
[Conventional Commits](https://www.conventionalcommits.org/) for its commit messages.

## Translations

This project has a couple a of npm commands which allow you to export/import the translations:

- If you want to export to a .csv file the messages of the project:

```shell
npm run json:csv
```

- If you want to import the translations in a .csv file to this project:

```shell
npm run csv:json
```

In that case you need to put the .csv files inside a folder called `output`in the root directory.

## License

[Apache 2.0](./LICENSE)
