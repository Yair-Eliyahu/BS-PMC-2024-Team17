pipeline {
    agent{
        docker{
            image 'node:lts'
            args '-u root:root'
        }
    }

    stages{
        stage("Install Dependencies"){
            agent{
                docker{
                    image 'node:lts'
                }
            }
            steps{
                sh 'npm install -g npm@latest'
            }
        }

        stage("Build"){
            agent{
                docker{
                    image 'node:lts'
                }
            }
            steps{
                sh 'npm run build'
            }
        }

        stage("Tests"){
            agent{
                docker{
                    image 'node:lts'
                }
            }
            steps{
                sh 'npm test'
            }
        }
    }
}