# X Components Archetype

The purpose of this project is to be the starting point for an X Components setup in which you can compose a search
interface using the components provided by the library.

## Getting started

### X Components

The X Components Archetype imports the X Components library along with several tools predefined. Visit the
[X Components repository](https://github.com/empathyco/x/tree/main/packages/x-components#readme) for further
information of X Components.

### Cloning project

The first step to start a new setup with the archetype is cloning the project.

We recommend using [Degit](https://github.com/Rich-Harris/degit) which let us copying a project without the .git
folder (without an initialized repository). Degit is installed as a dev dependency in this project. It basically
performs the same as:

```
git clone --depth 1 https://github.com/empathyco/x-archetype.git <your-target-folder>
rm -rf .git
```

You can follow these steps:

1. Clone the repository using *degit*. The following command will clone all the content of the `main` branch by default
in the current directory without any information about the source git repository (therefore without .git folder):

    ```
    npx degit https://github.com/empathyco/x-archetype.git <your-target-folder>
    ```

2. Initialize a repository example:

    ```
    git init
    git remote add origin <your-repository-url>
    git add .
    git commit -m "Initial X-Components Setup"
    git push -u origin main
    ```

### Customizing project

1. Replace the name in `package.json` (`@empathyco/x-archetype`) with your repository name.

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

### Styling with the design system

X Components implements its own design system with *design components* and *design tokens*. You can easily modify the
resultant application appearance overriding them in the predefined [tokens file](../src/design-system/tokens.scss).

You can take a look at the [X Components design system README](https://github.com/empathyco/x/tree/main/packages/x-components/contributing/design-system.md)
and see how it works.

You can also see this design system in action running the X Components project with these steps:

1. Clone the empathyco X mono repo which contains the X Components project as a package. There are other packages in
this repository that are dependencies for X Components.

    ```
    git clone https://github.com/empathyco/x <your-target-folder>
    ```

2. To install the dependencies execute this:

    ````
    npm install
    ````

3. After installing, you can run the project:

    ````
    cd packages/x-components
    npm run serve
    ````
   
4. Navigate to the local server which is usually located at port 8080 `http://localhost:8080/design-system`. You can
see all the different elements that compose the system and their modifiers.

Notice that these are design system components rather than Vue components as such. Inspect the elements to see the
classes used in each component and modifier.


### Internationalization

To learn about how to add messages for different locales, refer to the [internationalization section](i18n.md).


