pipeline {
    agent any

    stages{
        stage("Install Dependencies"){
            agent{
                docker{
                    image 'node:latest'
                }
            }
            steps{
                sh 'npm install -g npm@latest'
            }
        }

        stage("Build"){
            agent{
                docker{
                    image 'node:latest'
                }
            }
            steps{
                sh 'npm run build'
            }
        }

        stage("Tests"){
            agent{
                docker{
                    image 'node:latest'
                }
            }
            steps{
                sh 'npm test'
            }
        }
    }
}