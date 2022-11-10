## Basic concepts

A trigger tells a Pipeline to run.

A pipeline is made up of one or more stages. A pipeline can deploy to one or more environments.

A stage is a way of organizing jobs in a pipeline and each stage can have one or more jobs.

Each job runs on one agent. A job can also be agentless.

Each agent runs a job that contains one or more steps.

A step can be a task or script and is the smallest building block of a pipeline.

A task is a pre-packaged script that performs an action, such as invoking a REST API or publishing a build artifact.

An artifact is a collection of files or packages published by a run.


## Define stages, jobs

```yml
stages:
- stage: Build
  jobs:
  - job: Build Linux
    displayName: string
    timeoutInMinutes: 10
    continueOnError: boolean
    pool:
      vmImage: 'ubuntu-16.04'
    steps:
    - bash: echo "Hello world"

  - job: Build Window
    steps:
    - bash: echo "B"

- stage: Test
  jobs:
  - job: B1
  - job: B2

- stage: Deploy
  jobs:
  - job: B1
  - job: B2
```


## Using job variables
```yml
variables:
  mySimpleVar: simple var value
  "my.dotted.var": dotted var value
  "my var with spaces": var with spaces value

steps:
- script: echo Input macro = $(mySimpleVar). Env var = %MYSIMPLEVAR%
  condition: eq(variables['agent.os'], 'Windows_NT')
- script: echo Input macro = $(mySimpleVar). Env var = $MYSIMPLEVAR
  condition: in(variables['agent.os'], 'Darwin', 'Linux')
- bash: echo Input macro = $(my.dotted.var). Env var = $MY_DOTTED_VAR
- powershell: Write-Host "Input macro = $(my var with spaces). Env var = $env:MY_VAR_WITH_SPACES"
```


## Artifact download
```yml
# test and upload my code as an artifact named WebSite
jobs:
- job: Build
  pool:
    vmImage: 'ubuntu-16.04'
  steps:
  - script: npm test
  - task: PublishBuildArtifacts@1
    inputs:
      pathtoPublish: '$(System.DefaultWorkingDirectory)'
      artifactName: WebSite

# download the artifact and deploy it only if the build job succeeded
- job: Deploy
  pool:
    vmImage: 'ubuntu-16.04'
  steps:
  - checkout: none #skip checking out the default repository resource
  - task: DownloadBuildArtifacts@0
    displayName: 'Download Build Artifacts'
    inputs:
      artifactName: WebSite
      downloadPath: $(System.DefaultWorkingDirectory)

  dependsOn: Build
  condition: succeeded()
```


## Dependencies

Example jobs that build in parallel (no dependencies):

```yml
jobs:
- job: Windows
  pool:
    vmImage: 'vs2017-win2016'
  steps:
  - script: echo hello from Windows
- job: macOS
  pool:
    vmImage: 'macOS-10.13'
  steps:
  - script: echo hello from macOS
- job: Linux
  pool:
    vmImage: 'ubuntu-16.04'
  steps:
  - script: echo hello from Linux
```

The third job will be run after two first jobs finish

```yml
jobs:
- job: InitialA
  steps:
  - script: echo hello from initial A
- job: InitialB
  steps:
  - script: echo hello from initial B
- job: Subsequent
  dependsOn:
  - InitialA
  - InitialB
  steps:
  - script: echo hello from subsequent
```

If you do not use a dependsOn keyword, stages run in the order they are defined

```yml
stages:
- stage: QA
  jobs:
  - job:
    ...

- stage: Prod
  jobs:
  - job:
    ...
```

Example stages that run in parallel:

```yml
stages:
- stage: FunctionalTest
  jobs:
  - job:
    ...

- stage: AcceptanceTest
  dependsOn: []    # this removes the implicit dependency on previous stage and causes this to run in parallel
  jobs:
  - job:
    ...
```
