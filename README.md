# DevOps Project 8: Enterprise Infrastructure Automation

> **Enterprise-grade Infrastructure as Code and Configuration Management with Terraform, Ansible, and AWS**

[![Terraform](https://github.com/HimanM/DevOps-Project-8/actions/workflows/terraform.yaml/badge.svg)](https://github.com/HimanM/DevOps-Project-8/actions/workflows/terraform.yaml)
[![Build and Push](https://github.com/HimanM/DevOps-Project-8/actions/workflows/build-and-push.yaml/badge.svg)](https://github.com/HimanM/DevOps-Project-8/actions/workflows/build-and-push.yaml)
[![Deploy](https://github.com/HimanM/DevOps-Project-8/actions/workflows/deploy.yaml/badge.svg)](https://github.com/HimanM/DevOps-Project-8/actions/workflows/deploy.yaml)
[![Update Documentation](https://github.com/HimanM/DevOps-Project-8/actions/workflows/update-docs.yaml/badge.svg)](https://github.com/HimanM/DevOps-Project-8/actions/workflows/update-docs.yaml)

<!-- DYNAMIC_LINKS_START -->

> [!NOTE]
> **Deployment Status**: Inctive 🔴

### 🚀 Live Access Points (No Longer Works - Infra Destroyed via Terraform Destroy)

| Service | URL | Description |
| :--- | :--- | :--- |
| **Frontend** | [http://35.164.246.177:3000](http://35.164.246.177:3000) | Next.js User Interface |
| **Backend API** | [http://35.167.63.85:3001/api/hello](http://35.167.63.85:3001/api/hello) | Node.js API Root |
| **Grafana** | [http://35.88.107.146:3000](http://35.88.107.146:3000) | Dashboards (admin/admin) |
| **Prometheus** | [http://35.88.107.146:9090](http://35.88.107.146:9090) | Metrics Browser |
| **Loki** | [http://35.88.107.146:3100/ready](http://35.88.107.146:3100/ready) | Log Aggregator Status |

<!-- DYNAMIC_LINKS_END -->

## Table of Contents

- [About This Project](#about-this-project)
- [Technologies Used](#technologies-used)
- [Techniques & Concepts](#techniques--concepts)
- [Architecture](#architecture)
- [Key Learning Outcomes](#key-learning-outcomes)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Setup Instructions](#setup-instructions)
- [Deployment Execution](#deployment-execution)
- [Application Verification](#application-verification)
- [Observability Stack](#observability-stack)
- [Screenshots/Visual Reference](#screenshotsvisual-reference)
- [License](#license)
- [Author](#author)

## About This Project

This project is a comprehensive hands-on demonstration of **DevOps practices, Infrastructure as Code (IaC), and Configuration Management** principles. It's designed as a learning platform for engineers looking to gain practical experience with real-world enterprise infrastructure automation.

**Purpose:** This project goes beyond basic cloud provisioning to implement production-ready infrastructure workflows. It's built specifically for learning and mastering DevOps tools and techniques through hands-on implementation.

**What You'll Learn:**
- How to implement Terraform remote state management with S3 and DynamoDB locking for team collaboration
- How to build CI/CD pipelines for infrastructure using GitHub Actions
- How to separate concerns between infrastructure provisioning (Terraform) and configuration management (Ansible)
- How to implement a complete observability stack with Prometheus, Grafana, and Loki
- How to containerize applications with Docker and deploy them in a multi-tier architecture

This project simulates a real-world enterprise deployment where multiple team members collaborate on infrastructure changes, requiring robust state management, automated testing, and deployment pipelines.

## Technologies Used

![Terraform](https://img.shields.io/badge/Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white)
![Ansible](https://img.shields.io/badge/Ansible-EE0000?style=for-the-badge&logo=ansible&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)

**Core Infrastructure:**
- **Terraform** - Infrastructure as Code for AWS resource provisioning
- **Ansible** - Configuration Management and application deployment
- **AWS** - Cloud platform (EC2, VPC, S3, DynamoDB, Security Groups)
- **Docker** - Container runtime for application deployment

**CI/CD & Automation:**
- **GitHub Actions** - Automated infrastructure and deployment pipelines
- **GitHub Container Registry (GHCR)** - Docker image storage

**Application Stack:**
- **Next.js** - Frontend React framework
- **Node.js/Express** - Backend API server

**Observability & Monitoring:**
- **Prometheus** - Metrics collection and time-series database
- **Grafana** - Visualization and dashboarding
- **Loki** - Log aggregation system
- **Promtail** - Log shipping agent
- **Node Exporter** - System metrics exporter
- **cAdvisor** - Container metrics exporter

## Techniques & Concepts

This project demonstrates the following DevOps techniques and concepts:

**Infrastructure as Code (IaC):**
- Declarative infrastructure definition using Terraform
- Version-controlled infrastructure changes
- Reproducible environment provisioning

**Remote State Management:**
- Terraform remote backend with AWS S3
- State file versioning for rollback capability
- DynamoDB-based state locking to prevent concurrent modifications
- Team collaboration without state file conflicts

**CI/CD for Infrastructure:**
- GitOps workflow for infrastructure changes
- Automated `terraform plan` on pull requests
- Automated `terraform apply` on main branch merges
- Infrastructure validation in CI pipeline

**Configuration Management:**
- Idempotent configuration with Ansible
- Role-based playbook organization
- Dynamic inventory management
- Separation of infrastructure provisioning and configuration

**Containerization:**
- Multi-stage Docker builds
- Container orchestration with Docker Compose
- Image versioning and registry management

**Observability & Monitoring:**
- Centralized metrics collection
- Log aggregation from multiple sources
- Custom dashboards for infrastructure and application monitoring
- Alerting and performance tracking

**Security Best Practices:**
- SSH key management
- Secrets management with GitHub Secrets
- Security group configuration for network isolation
- IAM role-based access control

## Architecture

The infrastructure is deployed on AWS within a custom VPC, with all resources provisioned via Terraform and configured via Ansible.

```ascii
                    +------------------+
                    |    Internet      |
                    +--------+---------+
                             |
                       +-----+-----+
                       | Internet  |
                       |  Gateway  |
                       +-----+-----+
                             |
                   +---------+---------+
                   |       VPC         |
                   |   10.0.0.0/16     |
                   +---------+---------+
                             |
              +--------------+---------------+
              |   Public Subnet 10.0.1.0/24  |
              +--------------+---------------+
                             |
         +-------------------+--------------------+
         |                   |                    |
    +----+-----+      +------+------+      +------+-------+
    | Frontend |      |   Backend   |      |  Monitoring  |
    |   EC2    |      |     EC2     |      |     EC2      |
    | Port 3000|      |  Port 3001  |      | Ports 3000,  |
    |          |      |             |      | 9090, 3100   |
    +----------+      +-------------+      +--------------+
         |                   |                    |
    Next.js App         Express API      Prometheus+Grafana
    Node Exporter       Node Exporter       +Loki Stack
    Promtail            Promtail
```

**Infrastructure Components:**
- **VPC**: Custom Virtual Private Cloud with CIDR 10.0.0.0/16
- **Public Subnet**: Single subnet (10.0.1.0/24) with internet access via IGW
- **Internet Gateway**: Routes traffic between VPC and the internet
- **Security Groups**: Firewall rules controlling inbound/outbound traffic
- **EC2 Instances**: Three t2.micro instances for frontend, backend, and monitoring

**Network Flow:**
1. All traffic enters through the Internet Gateway
2. Security groups filter traffic based on port rules
3. Frontend serves user interface on port 3000
4. Backend exposes API endpoints on port 3001
5. Monitoring server collects metrics and logs from all instances

![EC2 Instances](docs/ec2_instances.png)

## Key Learning Outcomes

### 1. Terraform Remote State & Locking

One of the most critical aspects of production Terraform usage is implementing a **Remote Backend** for state management. This project demonstrates:

**S3 Remote State:**
- The `terraform.tfstate` file is stored in AWS S3, providing a centralized, durable storage location
- State versioning is enabled to allow rollback to previous infrastructure states
- Multiple team members can access the same state file securely
- Prevents the "local state file" problem where different developers have conflicting states

![S3 Bucket State](docs/tfstate_s3_bucket.png)

**DynamoDB State Locking:**
- A DynamoDB table with a `LockID` primary key prevents concurrent Terraform operations
- When `terraform apply` runs, it acquires a lock in DynamoDB
- If another process tries to run Terraform, it waits for the lock to be released
- Prevents state corruption from simultaneous modifications
- Critical for CI/CD environments where multiple pipeline runs could overlap

![DynamoDB Lock Table](docs/tf_lock_table_dynamodb.png)

> [!IMPORTANT]
> Without state locking, concurrent Terraform runs can corrupt your infrastructure state, leading to orphaned resources or incorrect configurations. Always use DynamoDB locking in team environments.

### 2. Infrastructure CI/CD

This project implements "GitOps" principles for infrastructure management. Instead of running Terraform manually, all infrastructure changes flow through GitHub Actions:

**Automated Workflow:**
- **Pull Request Stage**: Runs `terraform plan` to preview changes
- **Merge to Main**: Automatically runs `terraform apply` to provision resources
- **Validation**: Ensures infrastructure changes are reviewed and tested before deployment

**Benefits:**
- Infrastructure changes are version-controlled and auditable
- No manual state file management
- Consistent execution environment (CI runner)
- Prevents "it works on my machine" issues

![Terraform Workflow Success](docs/github_workflow_terraform_infra_success.png)

### 3. Ansible for Configuration Management

While Terraform provisions the infrastructure (creates EC2 instances, networks, etc.), Ansible configures the software on those instances. This separation of concerns follows best practices:

**Key Concepts:**
- **Idempotency**: Ansible playbooks can run multiple times safely without breaking configurations
- **Dynamic Inventory**: Ansible automatically retrieves EC2 IP addresses from Terraform outputs
- **Role-Based Organization**: Separate roles for frontend, backend, and monitoring keep playbooks maintainable
- **Declarative Configuration**: Describe the desired state; Ansible handles implementation

![Ansible Deploy Success](docs/github_workflow_deploy_images_via_ansible_and_configure_services_and_monitoring_success.png)

## Prerequisites

Before starting this project, ensure you have the following:

**Required Accounts:**
- AWS Account with billing enabled
- GitHub account (for repository and Actions)

**Required Permissions:**
- AWS IAM user with `AdministratorAccess` or permissions for:
  - EC2 (create/manage instances, key pairs, security groups)
  - VPC (create/manage VPCs, subnets, internet gateways)
  - S3 (create/manage buckets)
  - DynamoDB (create/manage tables)

**Local Tools (for manual testing/development):**
- AWS CLI configured with credentials
- Terraform (version 1.0+)
- Ansible (version 2.9+)
- SSH client
- Git

**Knowledge Prerequisites:**
- Basic understanding of cloud computing concepts
- Familiarity with command line operations
- Basic understanding of networking (IPs, ports, subnets)
- Understanding of YAML syntax

> [!NOTE]
> You don't need to install Terraform or Ansible locally if you're only using the GitHub Actions pipeline. The CI/CD environment has all tools pre-installed.

## Getting Started

### Clone the Repository

Start by cloning this repository to your local machine or working in GitHub Codespaces:

```bash
git clone https://github.com/HimanM/DevOps-Project-8.git
cd DevOps-Project-8
```

### Explore the Project Structure

Familiarize yourself with the repository layout:

```
DevOps-Project-8/
├── terraform/          # Infrastructure as Code definitions
│   ├── main.tf        # Main Terraform configuration
│   ├── variables.tf   # Variable definitions
│   └── outputs.tf     # Output values for Ansible
├── ansible/           # Configuration management
│   ├── playbooks/     # Ansible playbooks
│   └── roles/         # Reusable role definitions
├── app/               # Application source code
│   ├── frontend/      # Next.js application
│   └── backend/       # Express.js API
├── .github/workflows/ # CI/CD pipeline definitions
└── docs/              # Documentation and screenshots
```

### Fork the Repository (Recommended)

If you plan to deploy this yourself:

1. Fork this repository to your own GitHub account
2. Clone your fork instead of the original repository
3. This allows you to configure GitHub Secrets and run workflows

## Setup Instructions

Follow these detailed steps to replicate this deployment in your own AWS environment.

### Step 1: Create AWS SSH Key Pair

Generate an EC2 key pair that will be used to SSH into the instances. This key is required for Ansible to connect and configure the servers.

```bash
aws ec2 create-key-pair \
  --key-name devops-project-8-keypair \
  --region us-west-2 \
  --query 'KeyMaterial' \
  --output text > devops-project-8-keypair.pem
```

**What this does:**
- Creates a new EC2 key pair named `devops-project-8-keypair` in AWS
- Saves the private key material to a local file `devops-project-8-keypair.pem`
- The `--query 'KeyMaterial'` extracts only the key content from the API response
- The `--output text` formats it as plain text without JSON wrapping

**Important:** Keep this file secure! Anyone with access to this key can access your EC2 instances.

```bash
chmod 400 devops-project-8-keypair.pem
```

**What this does:** Sets read-only permissions for the owner, which is required for SSH to accept the key file.

![AWS Key Pair](docs/aws_onetime_keypair.png)

### Step 2: Configure Terraform Remote Backend

Terraform needs a place to store its state file remotely. We'll create an S3 bucket for storage and a DynamoDB table for state locking.

#### Define Environment Variables

Set up variables to avoid repeating values:

```bash
BUCKET_NAME="my-terraform-state-himan-001"
DYNAMO_TABLE="terraform-lock-table"
AWS_REGION="us-west-2"
```

**What this does:** 
- Creates shell variables for reuse in subsequent commands
- `BUCKET_NAME` must be globally unique across all AWS accounts
- Change `himan-001` to something unique to you

#### Create S3 Bucket for State Storage

```bash
aws s3api create-bucket \
  --bucket $BUCKET_NAME \
  --region $AWS_REGION \
  --create-bucket-configuration LocationConstraint=$AWS_REGION
```

**What this does:**
- Creates an S3 bucket in the specified region
- The `LocationConstraint` is required for regions outside us-east-1
- This bucket will store the `terraform.tfstate` file

![Create S3 Bucket](docs/create_s3_bucket_for_tfstate.png)

#### Enable Bucket Versioning

```bash
aws s3api put-bucket-versioning \
  --bucket $BUCKET_NAME \
  --versioning-configuration Status=Enabled
```

**What this does:**
- Enables versioning on the S3 bucket
- Every change to the state file creates a new version
- Allows you to rollback to previous infrastructure states if needed
- Provides an audit trail of infrastructure changes

![S3 Bucket Versioning](docs/tfstate_s3_bucket.png)

#### Create DynamoDB Table for State Locking

```bash
aws dynamodb create-table \
  --table-name $DYNAMO_TABLE \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region $AWS_REGION
```

**What this does:**
- Creates a DynamoDB table with a primary key `LockID` (string type)
- Uses `PAY_PER_REQUEST` billing (no provisioned capacity needed)
- Terraform will write a lock record here before modifying infrastructure
- Prevents concurrent `terraform apply` operations from corrupting state
- Critical for team environments and CI/CD pipelines

![DynamoDB Lock Table](docs/dynamodb_locking_table.png)

> [!IMPORTANT]
> Make sure the bucket name and DynamoDB table name match what's configured in `terraform/main.tf` backend configuration block.

### Step 3: Configure GitHub Secrets

GitHub Secrets allow the CI/CD pipeline to access AWS and SSH into EC2 instances securely.

Navigate to your forked repository:
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** for each of the following:

| Secret Name | Description | How to Get Value |
|-------------|-------------|------------------|
| `AWS_ACCESS_KEY_ID` | AWS IAM user access key for programmatic access | From AWS IAM console → Users → Security credentials |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM user secret key | Generated when creating access key (shown only once) |
| `EC2_SSH_KEY` | Private SSH key for EC2 access | Contents of `devops-project-8-keypair.pem` file created earlier |

**For `EC2_SSH_KEY`:**
```bash
cat devops-project-8-keypair.pem
```
Copy the entire output including `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----` lines.

> [!WARNING]
> Never commit AWS credentials or private keys to your repository. Always use GitHub Secrets for sensitive data.

## Deployment Execution

The entire deployment process is automated through GitHub Actions. No manual intervention is required once GitHub Secrets are configured.

### Triggering Deployment

Simply push a commit to the `main` branch:

```bash
git add .
git commit -m "Deploy infrastructure and application"
git push origin main
```

### Pipeline Stages

The deployment consists of three sequential workflows:

#### 1. Terraform Infrastructure Provisioning

**Workflow:** `terraform.yaml`

**What it does:**
- Initializes Terraform with the S3 remote backend
- Runs `terraform plan` to preview infrastructure changes
- Executes `terraform apply` to create AWS resources (VPC, subnets, EC2 instances, security groups)
- Outputs EC2 instance IPs for use by Ansible

**Duration:** ~3-5 minutes

![Terraform Workflow Success](docs/github_workflow_terraform_infra_success.png)

#### 2. Build and Push Docker Images

**Workflow:** `build-and-push.yaml`

**What it does:**
- Builds Docker images for the frontend (Next.js) and backend (Express.js)
- Tags images with the Git commit SHA for versioning
- Pushes images to GitHub Container Registry (GHCR)
- Makes images available for deployment to EC2 instances

**Duration:** ~2-4 minutes

![Build and Push Success](docs/github_workflow_build_and_push_images_success.png)

#### 3. Deploy with Ansible

**Workflow:** `deploy.yaml`

**What it does:**
- Retrieves EC2 instance IPs from Terraform state
- Configures SSH access using the `EC2_SSH_KEY` secret
- Runs Ansible playbooks to:
  - Install Docker on all EC2 instances
  - Pull Docker images from GHCR
  - Start containers for frontend, backend, and monitoring services
  - Configure Prometheus, Grafana, and Loki
  - Set up log shipping with Promtail

**Duration:** ~5-7 minutes

![Ansible Deploy Success](docs/github_workflow_deploy_images_via_ansible_and_configure_services_and_monitoring_success.png)

#### 4. Update Documentation

**Workflow:** `update-docs.yaml`

**What it does:**
- Runs after successful deployment
- Retrieves public IP addresses of deployed EC2 instances
- Updates this README.md with live access URLs
- Commits changes back to the repository

**Duration:** ~1-2 minutes

> [!NOTE]
> The entire pipeline from code push to live infrastructure takes approximately 12-18 minutes. You can monitor progress in the GitHub Actions tab of your repository.

## Application Verification

Once deployment completes, verify that all components are running correctly.

### Frontend Application

Access the Next.js user interface at `http://<FRONTEND_IP>:3000`

**What to verify:**
- Page loads successfully
- UI elements render correctly
- Navigation works

![Frontend Application](docs/frontend.png)

### Backend API

The Express.js REST API exposes several endpoints for testing.

#### Hello Endpoint

Test the basic health check endpoint:

```bash
curl http://<BACKEND_IP>:3001/api/hello
```

**Expected response:**
```json
{
  "message": "Hello from the backend!",
  "timestamp": "2024-12-11T15:19:00.000Z"
}
```

![Backend Hello Endpoint](docs/backend_api_response_hello_endpoint.png)

#### Data Endpoint

Test the data retrieval endpoint:

```bash
curl http://<BACKEND_IP>:3001/api/data
```

**Expected response:**
```json
{
  "data": "Here is some data from the backend.",
  "env_info": "Environment variables loaded"
}
```

![Backend Data Endpoint](docs/backend_api_response_data_endpoint.png)

## Observability Stack

The monitoring server provides comprehensive observability into both infrastructure and application performance.

### Prometheus Metrics

Access Prometheus at `http://<MONITORING_IP>:9090`

**Capabilities:**
- Query time-series metrics using PromQL
- View active targets and scrape status
- Check system and container metrics

**Key metrics collected:**
- `node_cpu_seconds_total` - CPU usage by core
- `node_memory_MemAvailable_bytes` - Available system memory
- `container_cpu_usage_seconds_total` - Container CPU usage
- `container_memory_usage_bytes` - Container memory usage

### Grafana Dashboards

Access Grafana at `http://<MONITORING_IP>:3000`

**Default credentials:** admin / admin

#### Node Exporter Dashboard

Displays system-level metrics for all EC2 instances:
- CPU utilization per core
- Memory usage and available memory
- Disk I/O statistics
- Network traffic (bytes in/out)
- System uptime

![Node Exporter Dashboard](docs/grafana_node_exporter_dashboard.png)

#### Docker Containers Dashboard

Shows container-specific metrics:
- CPU usage per container
- Memory usage per container
- Network traffic per container
- Container restart counts

![Docker Containers Dashboard](docs/grafana_docker_containers_dashboard.png)

#### Loki Logs Dashboard

Provides centralized log aggregation and search:
- Real-time log streaming from all services
- Filter logs by service, level, or keyword
- View historical logs with timestamp ranges
- Correlate logs with metrics

![Loki Logs Dashboard](docs/grafana_loki_logs_dashboard.png)

**How logs are collected:**
1. Application containers write logs to stdout/stderr
2. Promtail agents on each instance collect container logs
3. Logs are shipped to Loki on the monitoring server
4. Grafana queries Loki to display logs in dashboards

> [!NOTE]
> Grafana dashboards are pre-configured and automatically provisioned during Ansible deployment. No manual dashboard import is required.

## Screenshots/Visual Reference

This section provides a comprehensive visual walkthrough of the entire infrastructure and deployment process.

### Infrastructure Components

**EC2 Instances:**
![EC2 Instances](docs/ec2_instances.png)

**S3 Bucket for Terraform State:**
![S3 Terraform State](docs/tfstate_s3_bucket.png)

**DynamoDB State Lock Table:**
![DynamoDB Lock Table](docs/tf_lock_table_dynamodb.png)

### Setup Process

**Creating S3 Bucket:**
![Create S3 Bucket](docs/create_s3_bucket_for_tfstate.png)

**Creating DynamoDB Table:**
![Create DynamoDB Table](docs/dynamodb_locking_table.png)

**AWS Key Pair Creation:**
![AWS Key Pair](docs/aws_onetime_keypair.png)

### CI/CD Workflows

**Terraform Infrastructure Workflow:**
![Terraform Workflow](docs/github_workflow_terraform_infra_success.png)

**Build and Push Docker Images:**
![Build and Push Workflow](docs/github_workflow_build_and_push_images_success.png)

**Ansible Deployment Workflow:**
![Ansible Deploy Workflow](docs/github_workflow_deploy_images_via_ansible_and_configure_services_and_monitoring_success.png)

### Application Screenshots

**Frontend Application:**
![Frontend](docs/frontend.png)

**Backend API - Hello Endpoint:**
![Backend Hello](docs/backend_api_response_hello_endpoint.png)

**Backend API - Data Endpoint:**
![Backend Data](docs/backend_api_response_data_endpoint.png)

### Monitoring and Observability

**Grafana - Node Exporter Dashboard:**
![Node Exporter Dashboard](docs/grafana_node_exporter_dashboard.png)

**Grafana - Docker Containers Dashboard:**
![Docker Containers Dashboard](docs/grafana_docker_containers_dashboard.png)

**Grafana - Loki Logs Dashboard:**
![Loki Logs Dashboard](docs/grafana_loki_logs_dashboard.png)

## License

This project is released under the MIT License and is intended for **educational purposes only**.

You are free to:
- Use this project for learning and educational purposes
- Modify and extend the code for your own projects
- Share and distribute the code

**Disclaimer:** This project is designed for learning DevOps practices. It is not intended for production use without additional security hardening, high availability configuration, and cost optimization.

## Author

**HimanM**

- GitHub: [@HimanM](https://github.com/HimanM)
- Repository: [DevOps-Project-8](https://github.com/HimanM/DevOps-Project-8)

For questions, feedback, or collaboration opportunities, feel free to open an issue or reach out through GitHub.

---

> **Note:** This project is part of a DevOps learning series focused on hands-on implementation of infrastructure automation, configuration management, and observability practices.
