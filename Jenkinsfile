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