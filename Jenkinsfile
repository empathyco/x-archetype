    def params = [:]
    // body.resolveStrategy = Closure.DELEGATE_FIRST
    // body.delegate = params
    // body()

    def INSTANCE = 'Archetype' //params.instance
    def TESTS = params.containsKey('tests') ? params.tests : true
    def BUILDER = 'cypress/browsers:node14.15.0-chrome86-ff82' // params.containsKey('builder') ? params.builder : 'node:14'

    def PROD_BUILD = true



    //We do this because of https://issues.jenkins-ci.org/browse/JENKINS-53335
    def BRANCH = env.CHANGE_BRANCH ?: env.BRANCH_NAME

    pipeline {
        agent {
            label 'docker'
        }
        environment { SONAR_HOST_URL = 'https://sonarqube.internal.empathybroker.com' }
        options {
            ansiColor('xterm')
            buildDiscarder(logRotator(numToKeepStr:'30', artifactNumToKeepStr:'10'))
        }
        stages {
            stage('Deploy to PROD') {
                steps {
                    script {
                        try {
                            timeout(time: 15, unit: "SECONDS") {
                                input message: 'Do you want to deploy to PROD?', ok: 'Yes'
                            }
                        }catch(e){
                            println "input aborted or timeout expired, will try to rollback."
                            PROD_BUILD = false
                        }
                    }
                }
            }
            stage('Building & Testing') {
                agent {
                    docker {
                        image BUILDER
                        reuseNode true
                        args '-v /tmp/cache:/tmp/cache'
                    }
                }
                stages {
                    stage('Parse package.json') {
                        steps {
                            script { packageJson = readJSON file: 'package.json' }
                        }
                    }
                    stage('Installing Dependencies') {
                        steps {
                            npmCI()
                        }
                    }
                    stage('Building') {
                        steps {
                            sh 'npm run build'
                        }
                    }
//                     stage('Running tests') {
//                         when {
//                             expression { TESTS }
//                         }
//                         steps {
//                             sh 'npm run test'
//                         }
//                     }
                    stage('Code Quality') {
                        steps {
                            //dependencyCheckWrapper projectType: 'npm', projectName: packageJson.name, projectVersion: packageJson.version
                            withSonarQubeEnv('SonarQube') {
                                sonarQubeReport(type: 'npm', isPR: (env.CHANGE_ID != null))
                            }
                        }
                    }
                    stage('Quality Gate') {
                        when { changeRequest() }
                        steps {
                            timeout(time: 10, unit: 'MINUTES') {
                                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                                    waitForQualityGate(abortPipeline: true)
                                }
                            }
                        }
                    }
                }
                post {
                    always {
                        jiraSendBuildInfo()
                    }
                }
            }

            stage('Deploying') {
                parallel {
                    stage('Test') {
                        when {
                            anyOf {
                                branch 'main' 
                                tag 'test'
                            }
                        }
                        steps {
                            deployXComponents('test')
                        }
                    }
                    stage('Staging') {
                        when {
                            tag 'release-*'
                            expression { !PROD_BUILD }
                            beforeAgent true
                        }
                        steps {
                            deployXComponents('staging')
                        }
                    }
                    stage('Production') {
                        when {
                            tag 'release-*'
                            expression { PROD_BUILD }
                            beforeAgent true
                        }
                        steps {
                            deployXComponents('production')
                        }
                    }
                    stage('PR preview') {
                        when { changeRequest() }
                        steps {
                            script {
                                deployXComponents('test', env.CHANGE_ID)
                                deployHost = 'https://x.test.empathy.co/preview'
                                deployUrl = INSTANCE == 'Archetype' ? '${deployHost}/${env.CHANGE_ID}/index.html' : '${deployHost}/${INSTANCE}/${env.CHANGE_ID}/index.html'
                                pullRequest.comment("PR ${env.CHANGE_ID} preview deployed in ${deployUrl}")
                            }
                        }
                    }
                }
            }
        }
        post {
            always {
                cleanWs()
            }
        }
    }

def deployXComponents(String environment, String previewId  = null) {
    PRODUCTION_CACHE = params.containsKey('cache') ? params.cache : 'max-age=3600'
    BUCKET = [  production: "x.empathy.co",
                staging: "x.staging.empathy.co",
                test: "x.test.empathy.co"]
    CACHE = [   production: PRODUCTION_CACHE,
                staging: "no-store",
                test: "no-store"]
    CLOUDFRONT_ID = [   production: "E38CXDQ4X62BTH", //Empathy Production
                        staging: "ESRVBXWWNTLF3", //Empathy Staging
                        test: "EYLDEFZB36ES0"] //Empathy Test

    ROLE_ACCOUNT = [  production: "660159542556", //Empathy Production
                      staging: "953921081809", //Empathy Staging
                      test: "732785771697"] //Empathy Test
    INSTANCE = 'Archetype'
    URLPath = "s3://${BUCKET[environment]}"
    deployPath = get_base_url(previewId)
    withAWS(role:'Jenkins', roleAccount: ROLE_ACCOUNT[environment]) {
        if (INSTANCE == 'Archetype') {
            sh "aws s3 sync dist ${URLPath}${deployPath} --delete --cache-control ${CACHE[environment]} --include \"*\" --exclude \"*/*\""
        } else {
            sh "aws s3 sync dist ${URLPath}/${INSTANCE}${deployPath} --delete --cache-control ${CACHE[environment]}"
        }
        cfInvalidate(distribution: CLOUDFRONT_ID[environment], paths:[deployPath == '' ? "/*": "${deployPath}*"])
    }

    sendDeploymentEvent type: 'XComponents',
        instance: INSTANCE,
        environment: environment.toUpperCase(),
        tags: ['X', INSTANCE, packageJson.version, environment.toUpperCase()]

    notifyDeployment(version: packageJson.version, environment: environment.toUpperCase())
    environmentType = (environment=='test') ? 'testing' : environment
    jiraSendDeploymentInfo environmentId: environment, environmentName: environment, environmentType: environmentType
}

/**
 * Method that returns baseUrl for the deployment
 * @param ID of the current PR, if applicable
 */
def get_base_url(String previewId) {
    if (previewId == null) {
        return ''
    }
    baseUrl = "/preview/${previewId}/"
    return baseUrl
}
