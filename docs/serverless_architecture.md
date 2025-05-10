## Serverless Architecture Explanation

This document describes the proposed serverless architecture as an alternative to the Docker-based deployment used in the project. It focuses on using AWS services to handle user registration, data storage, and notifications in a scalable, efficient, and cost-effective manner.

### 1. UI (React App on S3/CloudFront)

The frontend React application is hosted on **Amazon S3** as a static website. To enable fast global delivery and caching, **CloudFront** is used as a CDN layer in front of the S3 bucket.

* **Why S3 + CloudFront?**

    * Serverless static hosting
    * Automatically scales to handle any number of users
    * Low latency delivery worldwide

### 2. API Gateway

**AWS API Gateway** acts as the HTTP entry point into the backend. It listens for HTTP POST requests at the `/graphql` path and routes them to the Lambda function that runs the GraphQL server.

* **Why API Gateway?**

    * Handles authentication, throttling, and rate limiting
    * Supports CORS out of the box
    * Auto-scales with traffic

### 3. AWS Lambda (Apollo Server)

The Apollo GraphQL server runs inside an **AWS Lambda** function. This function executes your resolvers for mutations like `createUser`, `updateUser`, and `deleteUser`, and queries like `getUsers`.

* **Why Lambda?**

    * Scales instantly based on demand
    * No server provisioning or maintenance
    * Cost-efficient (pay per request)

### 4. Aurora Serverless (PostgreSQL)

All user data is stored in an **Aurora Serverless** PostgreSQL database. It automatically scales capacity up or down depending on the number of connections and workload.

* **Why Aurora Serverless?**

    * Compatible with PostgreSQL and TypeORM
    * No need to manually configure instances or replicas
    * Perfect for bursty or unpredictable workloads

### 5. AWS SNS (Simple Notification Service)

Whenever a new user registers, the Lambda function publishes a message to an **SNS Topic**. This topic is configured to send an email to a subscribed address.

* **Why SNS?**

    * Reliable, fan-out notification system
    * Simple integration with Lambda
    * Email, SMS, or other subscriber support

### Summary

This architecture provides:

* ✅ Scalability (Lambda, Aurora, S3, CloudFront all scale automatically)
* ✅ Maintainability (no servers to manage)
* ✅ Cost efficiency (pay only when used)
* ✅ Production readiness with minimal ops overhead
