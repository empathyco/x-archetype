# X Components Archetype

The purpose of this project is to be the starting point for an X Components setup.

## Getting started

### X Components

The X Components Archetype imports the X Components library along with several tools predefined. Visit the
[X Components repository](https://github.com/empathyco/x/tree/main/packages/x-components#readme) for further
information.

### Cloning project

The first step to start a new setup with the archetype is cloning the project.

We recommend to use [Degit](https://github.com/Rich-Harris/degit) which let us copying a project without the `.git`
folder (without an initialized repository). It basically performs the same as:

```
git clone --depth 1 https://github.com/empathyco/x-archetype.git
rm -rf .git
```

You can follow these steps:

1. Clone the repository using degit. The following command will clone all the content of the `main` branch by default
in the current directory without any information about the source git repository (therefore without `.git` folder):

    ```
    degit https://github.com/empathyco/x-archetype.git
    ```

2. Initialize a repository:

    ```
    git init
    git remote add origin <your-repository-url>
    git add .
    git commit -m "Initial X-Components Archetype"
    git push -u origin main
    ```

### Customizing project

1. Replace the name in `package.json` (`@empathyco/x-archetype`) for the repository name:

    ```
    {
      "name": "@empathyco/x-archetype",
      "version": "0.1.0",
      ...
    }
    ```

### Install and execute

1. To install the dependencies execute this:

    ````
    npm install
    ````

2. After installing, you can run the project:

    ````
    npm run serve
    ````
    
### Configure Adapter

Configure the adapter in [x-components/adapter.ts](../src/adapter/adapter.ts) file. Remember
to export it in order to be used in the plugin configuration (see next section). You can find more information
about the adapter here: 
[search-adapter](https://github.com/empathyco/x/tree/main/packages/search-adapter#readme)
     
### Configure Plugin

Modify the plugin options [x-components/plugin.options.ts](../src/x-components/plugin.options.ts)
file. The adapter is mandatory, and it is imported from the previous file.

### Internationalization

To learn about how to add messages for different locales, refer to the [internationalization section](i18n.md).


