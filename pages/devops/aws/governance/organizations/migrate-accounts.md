# Migrating accounts between organizations

Accounts can be migrated between organizations.

You must have root or IAM access to both the member and management accounts.

For migrating a few accounts, use AWS Organizations console. Otherwise, use API or AWS CLI.

Billing history and billing reports for all accounts stay with the management account in an organization.

Before migration download any billing or report history for any member accounts that you want to keep.

When a member account leaves an organization, all charges incurred by the account are charged directly to the standalone account.

Even if the account move only takes a minute to process, it is likely that some charges will be incurred by the member account.
