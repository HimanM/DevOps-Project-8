# Enterprise DevOps Infrastructure Automation

[![Terraform](https://github.com/HimanM/DevOps-Project-8/actions/workflows/terraform.yaml/badge.svg)](https://github.com/HimanM/DevOps-Project-8/actions/workflows/terraform.yaml)
[![Build and Push](https://github.com/HimanM/DevOps-Project-8/actions/workflows/build-and-push.yaml/badge.svg)](https://github.com/HimanM/DevOps-Project-8/actions/workflows/build-and-push.yaml)
[![Deploy](https://github.com/HimanM/DevOps-Project-8/actions/workflows/deploy.yaml/badge.svg)](https://github.com/HimanM/DevOps-Project-8/actions/workflows/deploy.yaml)
[![Update Documentation](https://github.com/HimanM/DevOps-Project-8/actions/workflows/update-docs.yaml/badge.svg)](https://github.com/HimanM/DevOps-Project-8/actions/workflows/update-docs.yaml)

#### Deployment Status: Active
<!-- DYNAMIC_LINKS_START -->

> [!NOTE]
> **Deployment Status**: Active 🟢

### 🚀 Live Access Points (No Longer Works - Infra Destroyed via Terraform Destroy)

| Service | URL | Description |
| :--- | :--- | :--- |
| **Frontend** | [http://35.164.246.177:3000](http://35.164.246.177:3000) | Next.js User Interface |
| **Backend API** | [http://35.167.63.85:3001/api/hello](http://35.167.63.85:3001/api/hello) | Node.js API Root |
| **Grafana** | [http://35.88.107.146:3000](http://35.88.107.146:3000) | Dashboards (admin/admin) |
| **Prometheus** | [http://35.88.107.146:9090](http://35.88.107.146:9090) | Metrics Browser |
| **Loki** | [http://35.88.107.146:3100/ready](http://35.88.107.146:3100/ready) | Log Aggregator Status |

<!-- DYNAMIC_LINKS_END -->

## Project Overview

This project is an advanced demonstration of **Infrastructure as Code (IaC)** and **Configuration Management** principles, designed to simulate a real-world enterprise deployment.

The core objective of this project is to go beyond basic provisioning and implement robust, team-ready infrastructure workflows. It focuses heavily on:
1.  **Terraform State Management**: Implementing a robust **Remote State** architecture using AWS S3 for storage and **DynamoDB for state locking**, ensuring safe collaboration and preventing state corruption in concurrent environments.
2.  **Automated Infrastructure Pipelines**: Integrating Terraform directly into **GitHub Actions CI/CD**, automating the `plan` and `apply` stages to treat infrastructure changes with the same rigor as application code.
3.  **Ansible Configuration Management**: Using Ansible roles to dynamically configure servers, demonstrating how to decouple server provisioning (Terraform) from software configuration (Ansible).

## Architecture

The infrastructure resides in a custom AWS VPC, provisioned entirely via Terraform.

```ascii
       +------------------+
       |   Internet       |
       +--------+---------+
                |
          +-----+-----+
          |    IGW    |
          +-----+-----+
                |
      +---------+---------+
      |      VPC          |
      |  (10.0.0.0/16)    |
      +---------+---------+
                |
    +-----------+-----------+
    | Public Subnet (10.0.1.0/24) |
    +---+-----------+-------+
        |           |       |
  +-----+----+ +----+----+ +-----+-----+
  | Frontend | | Backend | | Monitor |
  | EC2 (3000)| | EC2 (3001)| |(3000/9090)|
  +----------+ +---------+ +-----------+
```
![EC2 Instances](docs/ec2_instances.png)

## Key Learning Outcomes

### 1. Terraform Remote State & Locking
A critical feature of this project is the implementation of a **Remote Backend**. Instead of a local state file, Terraform uses:
*   **S3 Bucket**: Stores the `terraform.tfstate` file, ensuring a single source of truth for the infrastructure.
    ![S3 Bucket State](docs/tfstate_s3_bucket.png)
*   **DynamoDB Table**: Provides **State Locking**. This prevents simultaneous `terraform apply` executions (e.g., from two different developers or CI pipeline runs) from corrupting the infrastructure state.
    ![DynamoDB Lock Table](docs/tf_lock_table_dynamodb.png)

### 2. Infrastructure in CI/CD
This project demonstrates "GitOps" for infrastructure. Terraform is not run manually on a developer's machine but executed via **GitHub Actions**:
*   **Terraform Validate/Plan**: Runs on Pull Requests to preview infrastructure changes.
*   **Terraform Apply**: Runs on merge to `main`, automatically provisioning or updating AWS resources.
    ![Terraform Workflow Success](docs/github_workflow_terraform_infra_success.png)

### 3. Ansible for Configuration
While Terraform handles *creating* the EC2 instances, Ansible handles *configuring* them. This separation of concerns allows for:
*   **Idempotency**: Ansible playbooks can run multiple times without breaking the configuration.
*   **Dynamic Inventory**: Ansible automatically discovers the IPs of the servers created by Terraform, ensuring accurate targeting.
    ![Ansible Deploy Success](docs/github_workflow_deploy_images_via_ansible_and_configure_services_and_monitoring_success.png)

## Setup Instructions

Follow these steps to replicate this deployment in your own AWS environment.

### 1. Repository Setup

Clone the repository to your local machine:

```bash
git clone https://github.com/HimanM/DevOps-Project-8.git
cd DevOps-Project-8
```

### 2. Infrastructure Prerequisites

#### IAM User
Ensure you have an AWS IAM user with `AdministratorAccess` (or sufficient permissions for EC2, VPC, S3, DynamoDB, and IAM role creation).

#### Create SSH Key Pair
Generate a key pair for EC2 instance access. Run the following command in your terminal:

```bash
aws ec2 create-key-pair \
  --key-name devops-project-8-keypair \
  --region us-west-2 \
  --query 'KeyMaterial' \
  --output text > devops-project-8-keypair.pem
```
![Key Pair](docs/aws_onetime_keypair.png)

*   **Action**: Save the content of `devops-project-8-keypair.pem` securely. You will need it for GitHub Secrets.

#### Configure Terraform Backend (S3 + DynamoDB)
Terraform uses a remote backend to store state files securely. Execute the following commands to provision the necessary S3 bucket and DynamoDB table.

**1. Define Variables**
```bash
BUCKET_NAME="my-terraform-state-himan-001"
DYNAMO_TABLE="terraform-lock-table"
AWS_REGION="us-west-2"
```

**2. Create S3 Bucket**
```bash
aws s3api create-bucket \
  --bucket $BUCKET_NAME \
  --region $AWS_REGION \
  --create-bucket-configuration LocationConstraint=$AWS_REGION
```
![Create S3](docs/create_s3_bucket_for_tfstate.png)

**3. Enable Versioning**
```bash
aws s3api put-bucket-versioning \
  --bucket $BUCKET_NAME \
  --versioning-configuration Status=Enabled
```

**4. Create DynamoDB Lock Table**
(Crucial for State Locking)
```bash
aws dynamodb create-table \
  --table-name $DYNAMO_TABLE \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region $AWS_REGION
```
![Create DynamoDB](docs/dynamodb_locking_table.png)

### 3. GitHub Secrets Configuration

Navigate to your GitHub repository settings: **Settings > Secrets and variables > Actions**. Add the following repository secrets:

| Secret Name | Description | Example Value |
| :--- | :--- | :--- |
| `AWS_ACCESS_KEY_ID` | AWS IAM Access Key | `AKIA...` |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM Secret Key | `wJal...` |
| `EC2_SSH_KEY` | Content of your .pem private key | `-----BEGIN RSA PRIVATE KEY-----...` |

### 4. Deployment Execution

The CI/CD pipeline is fully automated using GitHub Actions. To trigger a deployment:

1.  Make a change to the codebase.
2.  Commit and push to the `main` branch.

**Pipeline Stages:**
1.  **Terraform**: Validates and provisions the AWS infrastructure.
2.  **Build & Push**: Builds Docker images for the frontend and backend, then pushes them to the GitHub Container Registry (GHCR).
    ![Build and Push Success](docs/github_workflow_build_and_push_images_success.png)
3.  **Deploy**: Connects to the provisioned EC2 instances via SSH and executes Ansible playbooks to pull images and start containers.
4.  **Update Documentation**: Automatically updates this README with the live public IPs of the deployed services.

## Application Verification

### Frontend
The Next.js Application is accessible via the public IP of the Frontend instance.
![Frontend App](docs/frontend.png)

### Backend API
The Express.js API serves data endpoints.
*   **Hello Endpoint**:
    ![API Hello](docs/backend_api_response_hello_endpoint.png)
*   **Data Endpoint**:
    ![API Data](docs/backend_api_response_data_endpoint.png)

## Observability Stack

The project includes a full monitoring stack running on the Monitoring Server.

### Prometheus & Grafana
**System Metrics (node_exporter)**: Monitors CPU, Memory, and Disk/Network usage.
![Node Exporter Dashboard](docs/grafana_node_exporter_dashboard.png)

**Docker Container Stats (cAdvisor)**: Monitors resource usage per container.
![Docker Dashboard](docs/grafana_docker_containers_dashboard.png)

### Loki Logs
**Centralized Logging**: Aggregates logs from Frontend and Backend services.
![Loki Logs Dashboard](docs/grafana_loki_logs_dashboard.png)

## Technology Stack

### Infrastructure as Code (Terraform)
*   **State Management**: Remote S3 backend with DynamoDB locking.
*   **Resources**: VPC, Public Subnets, Security Groups, Internet Gateway, Route Tables, EC2 Instances.
*   **Automation**: Terraform is run automatically in the CI pipeline to ensure infrastructure consistency.

### Configuration Management (Ansible)
*   **Role-Based Architecture**:
    *   `backend`: Provisions Node.js API container, Node Exporter, Promtail.
    *   `frontend`: Provisions Next.js container, Node Exporter, Promtail.
    *   `monitoring`: Provisions the observability stack (Prometheus, Grafana, Loki).
*   **Dynamic Inventory**: IPs are dynamically passed from Terraform outputs to Ansible variables during deployment.

### Observability
*   **Prometheus**: Scrapes metrics from Node Exporters (system metrics) and cAdvisor (container metrics).
*   **Grafana**: Visualizes metrics and logs. Pre-configured with automatic datasource provisioning.
*   **Loki**: Centralized aggregation of logs from all services via Promtail.
*   **Dashboards**:
    *   System Metrics (Check CPU/Memory/Disk)
    *   Docker Container Stats (Check Network/CPU per container)
    *   Loki Logs (Centralized log view)

## Future Enhancements
*   Implementation of HTTPS via Let's Encrypt and Nginx.
*   Auto-scaling groups for high availability.
*   Refactoring module structure for Terraform reusability.

---
*Project maintained by HimanM*
