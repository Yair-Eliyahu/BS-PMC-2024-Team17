pipeline {
    agent {
        docker {
            image 'node:14'
            args '-u root:root'
        }
    }
    environment {
        imageName = "guyezra22/jenkins_app"
        registryCredential = 'guyezra22'
        dockerImage = ''
    }
    stages {
        stage("Install Dependencies") {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Jest Tests') {
        agent {
            docker {
                image 'node:lts'
            }
        }
        steps {
            sh 'npm run test'
        }
    }

        stage("Building Image") {
            steps {
                script {
                    dockerImage = docker.build imageName
                }
            }
        }

        stage("Deploy Image") {
            steps {
                script {
                    docker.withRegistry("https://registry.hub.docker.com", 'dockerhub-creds') {
                        dockerImage.push("${env.BUILD_NUMBER}")
                    }
                }
            }
        }
    }
}
