resource "aws_instance" "frontend_server" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  key_name               = var.key_name
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.frontend_sg.id]

  # Ensure frontend depends on backend if needed, or just loosely coupled
  # depends_on = [aws_instance.backend_server]

  tags = {
    Name = "${var.project_name}-frontend"
  }
}

resource "aws_eip" "frontend_eip" {
  instance = aws_instance.frontend_server.id
  domain   = "vpc"

  tags = {
    Name = "${var.project_name}-frontend-eip"
  }
}
