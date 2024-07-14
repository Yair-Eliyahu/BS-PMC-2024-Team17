pipeline {
    agent any 

    stages{
        stage("Install Dependencies"){
            agent{
                docker { image 'node:lts' }
            }
            steps{
                sh 'cd Sami_QuizzerAI'
                sh 'npm install'
            }
        }

        stage("Build"){
            agent{
                docker { image 'node:lts' }
            }
            steps{
                sh 'cd Sami_QuizzerAI'
                sh 'npm run build'
            }
        }

        stage("Test"){
            agent{
                docker { image 'node:lts' }
            }
            steps{
                sh 'cd Sami_QuizzerAI'
                sh 'npm test'
            }
        }
    }
}