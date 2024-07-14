pipeline {
    agent {
        docker {
            image 'node:lts'
        }
    }
    stages {
        stage("Install Dependencies") {
            steps {
                sh 'npm install'
            }
        }

        stage("Build") {
            steps {
                sh 'npm run build'
            }
        }

        stage("Tests") {
            steps {
                sh 'npm test'
            }
        }
    }
}
