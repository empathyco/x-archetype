## How to deploy

This project uses the following [Jenkins file](https://github.com/empathyco/platform-jenkins-library/blob/master/vars/XComponentsPipeline.groovy).
To deploy the project in the different environments you should take this into account:

| Environment | Branch     | Tag       |
|-------------|------------|-----------|
| test        | any branch | test      |
| staging     | main       |           |
| production  | main       | release-* |

Every time a commit is made to `main`, the changes are going to be deployed to `staging`.
To deploy to `test` or `production` the correspondent tag must be created.

Every PR created will be deployed as a [PR Preview](./pr-preview.md)

To do a rollback, the previous tag can be manually launched again in Jenkins. In main, a revert of the commit should be done.


