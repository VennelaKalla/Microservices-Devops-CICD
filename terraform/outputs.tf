
output "user_ecr_repository_url" {
  value = aws_ecr_repository.user_service.repository_url
}

output "product_ecr_repository_url" {
  value = aws_ecr_repository.product_service.repository_url
}

output "order_ecr_repository_url" {
  value = aws_ecr_repository.order_service.repository_url
}

output "iam_role_name" {
  value = aws_iam_role.ec2_ecr_role.name
}

output "instance_profile_name" {
  value = aws_iam_instance_profile.ec2_profile.name
}
