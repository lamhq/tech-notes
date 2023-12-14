# Template basics

## Resource properties and using resources together

The name used for a resource within the template is a logical name. When AWS CloudFormation creates the resource, it generates a physical name that is based on the combination of the logical name, the stack name, and a unique ID.

You're probably wondering how you set properties on one resource based on the name or property of another resource. AWS CloudFormation has a number of intrinsic functions that you can use to refer to other resources and their properties.

The following template adds a Parameters object containing the KeyName parameter, which is used to specify the KeyName property for the AWS::EC2::Instance resource. The parameter type is `AWS::EC2::KeyPair::KeyName`, which ensures a user specifies a valid key pair name in his or her account and in the region where the stack is being created.

```yml
Parameters:
  KeyName:
    Description: The EC2 Key Pair to allow SSH access to the instance
    Type: 'AWS::EC2::KeyPair::KeyName'
Resources:
  Ec2Instance:
    Type: 'AWS::EC2::Instance'
    Properties:
      SecurityGroups:
        - !Ref InstanceSecurityGroup
      KeyName: !Ref KeyName
      ImageId: ami-7a11e213
  InstanceSecurityGroup:
    Type: 'AWS::EC2::SecurityGroup'
    Properties:
      GroupDescription: Enable SSH access via port 22
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: '22'
          ToPort: '22'
          CidrIp: 0.0.0.0/0
```

The following template creates a CloudFront distribution resource that specifies the DNS name of an S3 bucket resource using `Fn::GetAtt` function to get the bucket's DomainName attribute.

```yml
Resources:
  myBucket:
    Type: 'AWS::S3::Bucket'
  myDistribution:
    Type: 'AWS::CloudFront::Distribution'
    Properties:
      DistributionConfig:
        Origins:
          - DomainName: !GetAtt
              - myBucket
              - DomainName
            Id: myS3Origin
            S3OriginConfig: {}
        Enabled: 'true'
        DefaultCacheBehavior:
          TargetOriginId: myS3Origin
          ForwardedValues:
            QueryString: 'false'
          ViewerProtocolPolicy: allow-all
```

The `Fn::GetAtt` function takes two parameters, the logical name of the resource and the name of the attribute to be retrieved.


## Receiving user input using input parameters

You declare parameters in a template's Parameters object. A parameter contains a list of attributes that define its value and constraints against its value. The only required attribute is Type, which can be String, Number, or an AWS-specific type.

```yml
Parameters:
  KeyName:
    Description: Name of an existing EC2 KeyPair to enable SSH access into the WordPress web server
    Type: AWS::EC2::KeyPair::KeyName
  WordPressUser:
    Default: admin
    NoEcho: true  # returns the parameter value masked as asterisks (*****)
    Description: The WordPress database admin account user name
    Type: String
    MinLength: 1
    MaxLength: 16
    AllowedPattern: "[a-zA-Z][a-zA-Z0-9]*"
  WebServerPort:
    Default: 8888
    Description: TCP/IP port for the WordPress web server
    Type: Number
    MinValue: 1
    MaxValue: 65535
```

## Specifying conditional values using mappings

There may be settings that are region dependent or are somewhat complex for users to figure out because of other conditions or dependencies.

For example, we hardcoded the AMI ID for the ImageId property of our EC2 instance. This works fine in the US-East region, where it represents the AMI that we want. However, if the user tries to build the stack in a different region he or she will get the wrong AMI or no AMI at all. (AMI IDs are unique to a region, so the same AMI ID in a different region may not represent any AMI or a completely different one.)

Mappings enable you to use an input value as a condition that determines another value. Similar to a switch statement, a mapping associates one set of values with another.

The following template contains a Mappings object with a mapping named RegionMap that is used to map an AMI ID to the appropriate region.

```yml
Parameters:
  KeyName:
    Description: Name of an existing EC2 KeyPair to enable SSH access to the instance
    Type: String
Mappings:
  RegionMap:
    us-east-1:
      AMI: ami-76f0061f
    us-west-1:
      AMI: ami-655a0a20
    eu-west-1:
      AMI: ami-7fd4e10b
    ap-southeast-1:
      AMI: ami-72621c20
    ap-northeast-1:
      AMI: ami-8e08a38f
Resources:
  Ec2Instance:
    Type: 'AWS::EC2::Instance'
    Properties:
      KeyName: !Ref KeyName
      ImageId: !FindInMap
        - RegionMap
        - !Ref 'AWS::Region'
        - AMI
      UserData: !Base64 '80'
```

In the `RegionMap`, each region is mapped to a name-value pair. The name-value pair is a label, and the value to map.

To use a map to return a value, you use the `Fn::FindInMap` function, passing the name of the map, the value used to find the mapped value, and the label of the mapped value you want to return.

The `AWS::Region` pseudo parameter is a value that AWS CloudFormation resolves as the region where the stack is created. Pseudo parameters are resolved by AWS CloudFormation when you create the stack.

In the example above, the ImageId property of the resource Ec2Instance uses the `Fn::FindInMap` function to determine its value by specifying `RegionMap` as the map to use, `AWS::Region` as the input value to map from, and `AMI` as the label to identify the value to map to.

You can use the `Fn::GetAZs` function to get the list of all availability zones in a region.


## Constructed values

For example, in the following fragment from the WordPress template, the `Fn::Join` function constructs the `Target` subproperty of the `HealthCheck` property for the ElasticLoadBalancer resource by concatenating the `WebServerPort` parameter with other literal strings to form the value needed.

```yml
Resources:
  ElasticLoadBalancer:
    Type: 'AWS::ElasticLoadBalancing::LoadBalancer'
    Properties:
      AvailabilityZones: !GetAZs ''
      Instances:
        - !Ref Ec2Instance1
        - !Ref Ec2Instance2
      Listeners:
        - LoadBalancerPort: '80'
          InstancePort: !Ref WebServerPort
          Protocol: HTTP
      HealthCheck:
        Target: !Join
          - ''
          - - 'HTTP:'
            - !Ref WebServerPort
            - /
        HealthyThreshold: '3'
        UnhealthyThreshold: '5'
        Interval: '30'
        Timeout: '5'
```

The `Fn::Join` function takes two parameters, a delimiter that separates the values you want to concatenate and an array of values in the order that you want them to appear.

## Output values

Each output value has a name, a Value attribute that contains declaration of the value returned as the output value, and optionally a description of the value. For example, we declare the following Outputs object

```yml
Outputs:
  InstallURL:
    Value: !Join
      - ''
      - - 'http://'
        - !GetAtt
          - ElasticLoadBalancer
          - DNSName
        - /wp-admin/install.php
    Description: Installation URL of the WordPress website
  WebsiteURL:
    Value: !Join
      - ''
      - - 'http://'
        - !GetAtt
          - ElasticLoadBalancer
          - DNSName
```

# Best practices

## Organize your stacks by lifecycle and ownership

For example, imagine a team of developers and engineers who own a website that is hosted on autoscaling instances behind a load balancer. Because the website has its own lifecycle and is maintained by the website team, you can create a stack for the website and its resources.

Now imagine that the website also uses back-end databases, where the databases are in a separate stack that are owned and maintained by database administrators. Whenever the website team or database team needs to update their resources, they can do so without affecting each other's stack.

If all resources were in a single stack, coordinating and communicating updates can be difficult.


## Use cross-stack references to export shared resources

When you organize your AWS resources based on lifecycle and ownership, you might want to build a stack that uses resources that are in another stack.

Use cross-stack references to export resources from a stack so that other stacks can use them. Stacks can use the exported resources by calling them using the `Fn::ImportValue` function.


## Reuse templates to replicate stacks in multiple environments

For example, you can create environments for development, testing, and production so that you can test changes before implementing them into production.

To make templates reusable, use the parameters, mappings, and conditions sections so that you can customize your stacks when you create them.

For example, for your development environments, you can specify a lower-cost instance type compared to your production environment, but all other configurations and settings remain the same.


## Use nested stacks to reuse common template patterns

For example, assume that you have a load balancer configuration that you use for most of your stacks. Instead of copying and pasting the same configurations into your templates, you can create a dedicated template for the load balancer. Then, you just use the `AWS::CloudFormation::Stack` resource to reference that template from within other templates.


## Do not embed credentials in your templates

Rather than embedding sensitive information in your AWS CloudFormation templates, we recommend you use dynamic references in your stack template.

Dynamic references provide a compact, powerful way for you to reference external values that are stored and managed in other services, such as the **AWS Systems Manager Parameter Store** or **AWS Secrets Manager**.

**AWS Secrets Manager** helps you to securely encrypt, store, and retrieve credentials for your databases and other services.

The **AWS Systems Manager Parameter Store** provides secure, hierarchical storage for configuration data management.


## Use AWS-specific parameter types

If your template requires inputs for existing AWS-specific values, such as existing Amazon Virtual Private Cloud IDs or an Amazon EC2 key pair name, use AWS-specific parameter types.


## Use parameter constraints

With constraints, you can describe allowed input values so that AWS CloudFormation catches any invalid values before creating a stack. You can set constraints such as a minimum length, maximum length, and allowed patterns.


## Use AWS::CloudFormation::Init to deploy software applications on Amazon EC2 instances


## Validate templates before using them

For the AWS CLI or AWS CloudFormation API, use the [aws cloudformation validate-template](aws cloudformation validate-template) command or ValidateTemplate action.


## Manage all stack resources through AWS CloudFormation

Do not make changes to stack resources outside of AWS CloudFormation.


## Use stack policies

Stack policies help protect critical stack resources from unintentional updates that could cause resources to be interrupted or even replaced.

A stack policy is a JSON document that describes what update actions can be performed on designated resources.


## Use AWS CloudTrail to log AWS CloudFormation calls

AWS CloudTrail tracks anyone making AWS CloudFormation API calls in your AWS account.


## Use code reviews and revision controls to manage your templates
