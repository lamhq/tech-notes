# Manage Cost in AWS

## Dashboards

The AWS Bills dashboard is a central place where you can manage and view your billing and payment information.

Here are some key features:

1. **Billing and Cost Management Home**: Provides a summary of your current charges, credits, and any outstanding balances.
2. **Bills**: Displays detailed information about your monthly bills, including a breakdown of charges by service.
3. **Payment Methods**: Allows you to manage your payment methods and view your payment history.
4. **Credits**: Shows any promotional credits you have and their expiration dates.
5. **Budgets and Alerts**: Lets you set up budgets and receive alerts when your spending exceeds certain thresholds.

You can access the Bills dashboard by logging into your AWS account and navigating to the Billing and Cost Management section.

## Enable Access to Billing information

To enable access to billing information for IAM users:

1. **Sign in to the AWS Management Console** using your root account.
2. **Navigate to your account settings**:
   - In the top navigation bar, click on your account name.
   - Select **Account** from the dropdown menu.
3. **Enable IAM access to billing information**:
   - Scroll down to the **IAM User and Role Access to Billing Information** section.
   - Click on **Edit**.
   - Check the box for **Activate IAM Access**.
4. **Attach the necessary IAM policies** to the IAM users or roles:
   - Go to the **IAM service** page.
   - Select the user or role you want to grant access to.
   - Attach a policy that grants billing access, such as `AWSBillingReadOnlyAccess` or a custom policy.
