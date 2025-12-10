# DevOps Full-Stack Deployment Project

## Architecture

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

## Setup

### Prerequisites
1.  **AWS Account**: You need an active AWS account.
2.  **GitHub Repository**: Fork or duplicate this repository.
3.  **Terraform**: Installed locally (optional, for manual testing).
4.  **Ansible**: Installed locally (optional, for manual testing).

### 1. AWS Configuration (One-time)
#### Create Key Pair
Run this in your terminal to create the key pair in the correct region and save the private key:

```bash
aws ec2 create-key-pair \
  --key-name devops-project-8-keypair \
  --region us-west-2 \
  --query 'KeyMaterial' \
  --output text > devops-project-8-keypair.pem
```

**Important**:
1.  This creates `devops-project-8-keypair.pem` in your current folder.
2.  Copy the content of this file.
3.  Add it to GitHub Secrets as `EC2_SSH_KEY`.

### 2. Manual Infrastructure Setup (S3 + DynamoDB)
Terraform needs a remote backend to store its state. You can copy-paste these commands to your terminal (Git Bash or WSL) to set it up:

#### 1. Configure Variables
```bash
# Choose unique names
BUCKET_NAME="my-terraform-state-himan-001"
DYNAMO_TABLE="terraform-lock-table"
AWS_REGION="us-west-2"
```

#### 2. Create S3 Bucket
```bash
aws s3api create-bucket \
  --bucket $BUCKET_NAME \
  --region $AWS_REGION \
  --create-bucket-configuration LocationConstraint=$AWS_REGION
```

#### 3. Enable Versioning (Recommended)
```bash
aws s3api put-bucket-versioning \
  --bucket $BUCKET_NAME \
  --versioning-configuration Status=Enabled
```

#### 4. Enable Encryption (Recommended)
```bash
aws s3api put-bucket-encryption \
  --bucket $BUCKET_NAME \
  --server-side-encryption-configuration '{
      "Rules": [{
          "ApplyServerSideEncryptionByDefault": {
              "SSEAlgorithm": "AES256"
          }
      }]
  }'
```

#### 5. Create DynamoDB Lock Table
```bash
aws dynamodb create-table \
  --table-name $DYNAMO_TABLE \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region $AWS_REGION
```

#### 6. Verify Creation
```bash
# Check Table
aws dynamodb describe-table --table-name $DYNAMO_TABLE

# Check Bucket
aws s3 ls s3://$BUCKET_NAME
```

### 3. GitHub Secrets Configuration
Go to your **GitHub Repository > Settings > Secrets and variables > Actions** and add the following:

| Secret Name | Description | Example Value |
| :--- | :--- | :--- |
| `AWS_ACCESS_KEY_ID` | AWS IAM Access Key | `AKIAIOSFODNN7EXAMPLE` |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM Secret Key | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `EC2_SSH_KEY` | Content of `devops-project-8-keypair.pem` | `-----BEGIN RSA PRIVATE KEY----- ...` |

> **Note**: `GITHUB_TOKEN` is used automatically for authentication with GHCR, so you typically do not need to add a PAT unless you have specific permission issues.

### 4. Deployment Workflow
1.  **Commit & Push**: Pushing to the `main` branch triggers the pipeline.
    -   **Terraform**: Provisions EC2, VPC, etc.
    -   **Build & Push**: Builds Docker images (Frontend/Backend) and pushes to GHCR.
    -   **Deploy**: Connects to EC2 instances and runs Ansible to deploy containers.

2.  **Access the Application**:
<!-- DYNAMIC_LINKS_START -->

> [!NOTE]
> **Deployment Status**: Active 🟢

### 🚀 Live Access Points

| Service | URL | Description |
| :--- | :--- | :--- |
| **Frontend** | [http://35.164.246.177:3000](http://35.164.246.177:3000) | Next.js User Interface |
| **Backend API** | [http://35.167.63.85:3001/api/hello](http://35.167.63.85:3001/api/hello) | Node.js API Root |
| **Grafana** | [http://35.88.107.146:3000](http://35.88.107.146:3000) | Dashboards (admin/admin) |
| **Prometheus** | [http://35.88.107.146:9090](http://35.88.107.146:9090) | Metrics Browser |
| **Loki** | [http://35.88.107.146:3100/ready](http://35.88.107.146:3100/ready) | Log Aggregator Status |

<!-- DYNAMIC_LINKS_END -->



## Terraform

We use Terraform for Infrastructure as Code.
-   **State**: Stored in S3 with DynamoDB locking.
-   **Commands**:
    -   `terraform init`: Initialize remote backend.
    -   `terraform plan`: Preview changes.
    -   `terraform apply`: Create resources.

The workflow `.github/workflows/terraform.yaml` automates this on Push/PR.

## GitHub Actions

-   **Terraform Workflow**: Validates and Applies infrastructure changes.
-   **Build & Push**: Builds Docker images for Frontend and Backend and pushes to GitHub Container Registry (GHCR).
-   **Deploy**: Triggered after successful build. Connects to EC2 instances using SSH and runs Ansible playbooks.

## Ansible

Configuration Management is handled by Ansible.
-   **Roles**:
    -   `backend`: Deploys Node.js container.
    -   `frontend`: Deploys Next.js container linked to backend.
    -   `monitoring`: Deploys Prometheus, Grafana, Loki stack using Docker Compose.
-   **Inventory**: Managed dynamically or via `inventory.ini`. CI/CD populates IPs.

## Observability

-   **Prometheus**: Metrics collection (Port 9090).
-   **Grafana**: Visualization (Port 3000).
-   **Loki**: Log aggregation (Port 3100).

Access Grafana at `http://<Monitoring-EC2-IP>:3000`. Default creds: `admin/admin`.
