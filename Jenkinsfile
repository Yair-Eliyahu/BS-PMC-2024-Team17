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

        stage('Build Project') {
            agent {
                docker { image 'node:20' }
            }
            steps {
                sh 'npm run build'
            }
        }

        stage('Run Tests (Unit + Integration)') {
            agent {
                docker { image 'node:20' }
            }
            steps{
                sh 'npm test'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            cleanWs()
        }
        success {
            echo 'Pipeline succeeded!'
            // Add notifications here if needed
        }
        failure {
            echo 'Pipeline failed!'
            // Add notifications here if needed
        }
    }
}
