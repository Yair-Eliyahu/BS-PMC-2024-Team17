pipeline {
    agent {
        docker {
            image 'node:18'
            args '-u root:root'
        }
    }
    environment{
        imageName = "guyezra22/jenkins_app"
        registryCredential = 'guyezra22'
        dockerImage = ''
    }

    stages{
        stage("Install Dependencies"){
            steps{
                sh 'npm install'
            }
        }

        stage("Build"){
            steps{
                sh 'npm run build'
            }
        }

        stage("Tests"){
            steps{
                sh 'npm test'
            }
        }

        stage("Building Image"){
            steps{
                script{
                    dockerImage = docker.build imageName
                }
            }
        }

        stage("Deploy Image"){
            steps{
                script{
                    docker.withRegistry("https://registry.hub.docker.com", 'dockerhub-creds'){
                        dockerImage.push("${env.BUILD_NUMBER}")
                    }
                }
            }
        }


    }
}