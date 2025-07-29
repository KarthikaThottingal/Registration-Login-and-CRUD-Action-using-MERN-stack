pipeline {
    agent any

    environment {
        CI = 'true'
    }

    tools {
        //nodejs 'NodeJS 18'
        nodejs 'node-22.15.1'  // must match the name you set in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                // Adjust the script if you use a different command
                sh 'npm test'
            }
        }

        stage('Archive Reports') {
            steps {
                // Archives all files in the Reports folder
                archiveArtifacts artifacts: 'Reports/**/*.*', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo 'Cleaning workspace...'
            cleanWs()
        }
    }
}
