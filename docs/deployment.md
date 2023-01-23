## How to deploy

This project uses the following [Jenkins file](https://github.com/empathyco/platform-jenkins-library/blob/master/vars/XComponentsPipeline.groovy).
To deploy the project in the different environments you should take this into account:

| Environment | Branch     | Tag       |
|-------------|------------|-----------|
| test        | any branch | test      |
| staging     | main       |           |
| production  | main       | release-* |

So everytime that a commit is made in main (merge PR, commit directly on main...etc), the changes are going to be
deployed in `staging` and a tag should be needed to deploy on `test` or `production`.

Every PR created will be deployed as a [PR Preview](./pr-preview.md)

To do a rollback, the previous tag can be manually launched again in Jenkins. In main, a revert of the commit should be done.


