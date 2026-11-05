
variable "aws_region" {
  description = "AWS deployment region"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "microservices-devops"
}

variable "instance_type" {
  description = "EC2 deployment instance type"
  type        = string
  default     = "t3.medium"
}
