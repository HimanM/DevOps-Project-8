terraform {
  backend "s3" {
    bucket         = "my-terraform-state-himan-001"
    key            = "project/terraform.tfstate"
    region         = "us-west-2"
    dynamodb_table = "terraform-lock-table"
    encrypt        = true
  }
}
