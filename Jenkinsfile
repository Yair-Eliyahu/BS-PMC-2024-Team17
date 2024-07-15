pipeline {
    agent any
    
    stages{
        stage('Helo') {
            agent {
                docker { image 'node:20' }
            }
            steps{
                echo 'hello world'
            }
        }
    }
}