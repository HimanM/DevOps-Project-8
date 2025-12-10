output "backend_ec2_ip" {
  value = aws_eip.backend_eip.public_ip
}

output "frontend_ec2_ip" {
  value = aws_eip.frontend_eip.public_ip
}

output "monitoring_ec2_ip" {
  value = aws_instance.monitoring_server.public_ip
}
