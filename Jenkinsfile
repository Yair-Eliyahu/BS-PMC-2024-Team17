pipeline {
    agent any 

    stages{
        stage("Install Dependencies"){
            agent{
                docker { image 'node:18-alpine' }
            }
            steps{
                sh 'npm install'
            }
        }

        stage("Run Dev"){
            agent{
                docker { image 'node:18-alpine' }
            }
            steps{
                sh 'npm run dev'
            }
        }

        stage("Test"){
            agent{
                docker { image 'node:18-alpine' }
            }
            steps{
                sh 'cd Sami_QuizzerAI'
                sh 'npm test'
            }
        }
        
    }
}