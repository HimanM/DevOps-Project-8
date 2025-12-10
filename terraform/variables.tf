variable "aws_region" {
  description = "AWS Region"
  default     = "us-west-2"
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  description = "CIDR block for Public Subnet"
  default     = "10.0.1.0/24"
}

variable "private_subnet_cidr" {
  description = "CIDR block for Private Subnet"
  default     = "10.0.2.0/24"
}

variable "availability_zone" {
  description = "Availability Zone"
  default     = "us-west-2a"
}

variable "ami_id" {
  description = "AMI ID for EC2 instances (Ubuntu 22.04 LTS recommended for us-west-2)"
  # Ubuntu 22.04 LTS in us-west-2, check for latest if possible, but hardcoding a recent one is safer for stability.
  # This AMI ID might need updating.
  default = "ami-0efcece6bed30fd98"
}

variable "instance_type" {
  description = "Instance type for EC2"
  default     = "t2.micro"
}

variable "key_name" {
  description = "SSH Key Pair name"
  default     = "devops-project-8-keypair"
}

variable "project_name" {
  description = "Project Name Tag"
  default     = "DevOps-Project-8"
}
