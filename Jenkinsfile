pipeline {
    agent any

    environment{
        imageName = "guyezra22/jenkins_app"
        registryCredential = 'guyezra22'
        dockerImage = ''
    }

    stages{
        stage("Install Dependencies"){
            agent { 
                docker {
                    image 'node:lts'
                }    
            }
            steps{
                sh 'npm install'
            }
        }

        stage("Build"){
            agent { 
                docker {
                    image 'node:lts'
                }    
            }
            steps{
                sh 'npm run build'
            }
        }

        stage("Tests"){
            agent { 
                docker {
                    image 'node:lts'
                }    
            }
            steps{
                sh 'npm test'
            }
        }

        stage("Building Image"){
            agent { 
                docker {
                    image 'node:lts'
                }    
            }
            steps{
                script{
                    dockerImage = docker.build imageName
                }
            }
        }

        stage("Deploy Image"){
            agent { 
                docker {
                    image 'node:lts'
                }    
            }
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