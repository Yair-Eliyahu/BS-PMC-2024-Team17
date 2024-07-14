pipeline {
    agent {
        docker {
            image 'node:18-alpine'
            args '-u root:root'
        }
    }

    stages{
        stage("Install Dependencies"){
            agent{
                docker { image 'node:18-alpine' }
            }
            steps{
                dir('Sami_QuizzerAI'){
                    sh 'npm install'
                }
            }
        }

        stage("Build"){
            agent{
                docker { image 'node:18-alpine' }
            }
            steps{
                dir('Sami_QuizzerAI'){
                    sh 'npm run build'
                }
                
            }
        }

        stage("Test"){
            agent{
                docker { image 'node:18-alpine' }
            }
            steps{
                dir('Sami_QuizzerAI'){
                    sh 'npm test'
                }
            }
        }
    }
}