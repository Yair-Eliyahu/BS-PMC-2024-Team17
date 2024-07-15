<<<<<<< HEAD
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
=======
pipeline {
    agent any
    
    stages{
        stage('Install Dependencies') {
            agent {
                docker { image 'node:20' }
            }
            steps{
                sh 'npm install'
            }
        }

        stage('Build') {
            agent {
                docker { image 'node:20' }
            }
            steps {
                sh 'npm run build'
            }
        }

        stage('Tests') {
            agent {
                docker { image 'node:20' }
            }
            steps{
                sh 'npm test'
            }
        }
    }
}
>>>>>>> 542acf5bbf30c1b2d4a8237f60ae8b4ac68a134f
