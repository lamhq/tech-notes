# Billing for GitHub Actions

GitHub Actions usage is free for both public repositories and self-hosted runners. 

For private repositories, each GitHub account receives a certain amount of free minutes and storage, depending on the product used with the account.

Minutes reset every month, while storage usage does not.

| Product | Storage | Minutes (per month) |
| - | - | - |
| GitHub Free | 500 MB | 2,000 |

Jobs that run on Windows runners that GitHub hosts consume minutes at 2  times the rate that jobs on Linux runners consume. 

Jobs that run on macOS runners that GitHub hosts consume minutes at 10  times the rate that jobs on Linux runners consume. 

*For example, using 1,000 Windows minutes would consume 2,000 of the minutes included in your account. Using 1,000 macOS minutes, would consume 10,000 minutes included in your account.*

The storage used by a repository is the total storage used by GitHub Actions artifacts and GitHub Packages. Your storage cost is the total usage for all repositories owned by your account.