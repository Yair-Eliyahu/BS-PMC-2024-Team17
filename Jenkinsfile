pipeline {
    agent {
        docker {
            image 'node:14'
            args '-u root:root'
        }
    }

    stages {
        stage("Install Dependencies") {
            steps {
                sh 'npm install'
                sh 'npm install --save-dev jest'
            }
        }
        stage('Pull Docker Image') {
            steps {
                script {
                    sh 'docker pull guyezra22/jenkins_app'
                }
            }
        }
        stage('List Docker Images') {
            steps {
                script {
                    sh 'docker images'
                }
            }
        }

        stage("Tests"){
            steps{
                dir('Sami_QuizzerAI'){
                    sh 'npm test'
                }
            }
        }
    }
}
