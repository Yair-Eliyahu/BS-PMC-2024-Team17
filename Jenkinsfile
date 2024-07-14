pipeline {
    agent {
        docker {
            image 'node:14'
            args ' -u root:root'
        }
    }

    environment{
        imageName = "guyezra22/QuizzerAI"
        registryCredential = 'guyezra22'
        dockerImage = ''
    }
    stages{
        stage("Install Dependencies"){
            steps{
                sh ''' 
                npm init
                npm install --save-dev jest
                npm install  jest
                '''
            }
        }

        stage("Tests"){
            steps{
                sh 'npm  run build'
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