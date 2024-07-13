pipeline {
    agent any
    // tools {
    //     nodejs "node"
    // }
    environment{
        imageName = "guyezra22/QuizzerAI"
        registryCredential = 'guyezra22'
        dockerImage = ''
    }
    stages{
        stage("Install Dependencies"){
            steps{
                sh 'npm i'
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
               
               scrpit{
                sh 'docker build -t guyezra22/jenkins_app .'
               }
                
            }
        }
    
    }
}