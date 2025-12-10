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

1.  **Clone Repository**: `git clone https://github.com/HimanM/DevOps-Project-8`
2.  **AWS Credentials**: Configure `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` in GitHub Secrets.
3.  **GHCR Token**: Create a PAT with `read:packages` and `write:packages` scope and add it as a secret if not using GITHUB_TOKEN directly.

## Manual Infrastructure Setup (S3 + DynamoDB)

Before running Terraform, creating the backend state resources manually is required if you haven't automated it yet.

**S3 Bucket**:
1.  Go to S3 Console.
2.  Create bucket: `my-terraform-state-himan-001`.
3.  Region: `us-west-2`.
4.  Enable Versioning.

**DynamoDB Table**:
1.  Go to DynamoDB Console.
2.  Create table: `terraform-lock-table`.
3.  Partition key: `LockID` (String).

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
