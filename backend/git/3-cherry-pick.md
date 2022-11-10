# Git Cherry Pick

Cherry picking is the act of picking a commit from a branch and applying it to another.

## Examples

```sh
git cherry-pick <commit1> <commit2> ...
```

## When to use git cherry pick

### Wrong branch commit

For example, say a commit is accidently made to the wrong branch. You can switch to the correct branch and cherry-pick the commit to where it should belong.


### Bug hotfixes

For an example scenario,say a developer has started work on a new feature.

During that new feature development they identify a pre-existing bug.

The developer creates an explicit commit patching this bug.

This new patch commit can be cherry-picked directly to the main branch to fix the bug before it effects more users.
