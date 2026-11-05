
pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-1'
        AWS_ACCOUNT_ID = '200377817725'
        ECR_REGISTRY = '200377817725.dkr.ecr.us-east-1.amazonaws.com'
        USER_REPO = 'microservices-devops/user-service'
        PRODUCT_REPO = 'microservices-devops/product-service'
        ORDER_REPO = 'microservices-devops/order-service'
    }

    options {
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Source code checked out from GitHub'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                    docker build -t $ECR_REGISTRY/$USER_REPO:latest ./user-service
                    docker build -t $ECR_REGISTRY/$PRODUCT_REPO:latest ./product-service
                    docker build -t $ECR_REGISTRY/$ORDER_REPO:latest ./order-service
                '''
            }
        }

        stage('AWS Authentication') {
            steps {
                sh '''
                    set -e
                    unset AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN AWS_PROFILE
                    export AWS_SHARED_CREDENTIALS_FILE=/dev/null

                    aws sts get-caller-identity

                    aws ecr get-login-password --region $AWS_REGION | \
                    docker login --username AWS --password-stdin $ECR_REGISTRY
                '''
            }
        }


        stage('Deploy to EC2') {
            steps {
                sh '''
                    set -e

                    unset AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN AWS_PROFILE
                    export AWS_SHARED_CREDENTIALS_FILE=/dev/null

                    aws ecr get-login-password --region $AWS_REGION | \
                    docker login --username AWS --password-stdin $ECR_REGISTRY

                    docker compose -f docker-compose.deploy.yml pull \
                      user-service product-service order-service

                    docker compose -f docker-compose.deploy.yml up -d --build
                '''
            }
        }
        
        stage('Push Images to ECR') {
            steps {
                sh '''
                    docker push $ECR_REGISTRY/$USER_REPO:latest
                    docker push $ECR_REGISTRY/$PRODUCT_REPO:latest
                    docker push $ECR_REGISTRY/$ORDER_REPO:latest
                '''
            }
        }
    }

    post {
        success {
            echo 'All three microservice images pushed to AWS ECR successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the Jenkins console output.'
        }
    }
}
