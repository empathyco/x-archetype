# Pull request preview

The Jenkins `XComponentsPipeline` has a `PR preview` stage to allow the deployment of a pull request, so the proposed
changes can be reviewed easily. Once a pull request is created, Jenkins will deploy the origin branch to a dedicated
environment **if the build and the tests execution were successful**.

The url will follow the pattern:

```https://x.test.empathy.co/preview/${instance}/${pr_number}/index.html```

Where the `instance` value must be configured for the `XComponentsPipeline`
on the [Jenkinsfile](https://github.com/empathyco/x-archetype/blob/main/Jenkinsfile#L2) and the `pr_number` is the pull
request number and it will be picked automatically from GitHub.

Every commit to the origin branch will update the deployment automatically. After a successful deployment Jenkins will
add a comment to the pull request with the url to the preview. In the case of the `Archetype` this value will be ignored
and the url will follow:

```https://x.test.empathy.co/preview/${pr_number}/index.html```


## Lifecycle

The pull request preview environment will be available during `7 days`.  After this time the deployment will not be accessible.
This time can be configured via terraform.



