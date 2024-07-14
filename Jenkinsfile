pipeline {
    agent any
    // tools {
    //     nodejs "node"
    // }
    enviorment{
        imageName = "guyezra22/QuizzerAI"
        registryCredential = 'guyezra22'
        dockerImage = ''
    }
    stages{
        stage("Install Dependencies"){
            steps{
                sh 'npm install'
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
               
                sh 'cp -r build/* /var/www/html/'
		        sh 'sudo nginx -s reload'
                
            }
        }
    }
}