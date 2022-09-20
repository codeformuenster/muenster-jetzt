# muenster-jetzt

## Deployment

We use GitHub Actions and docker-compose to deploy the master branch to a staging environment at https://staging.muenster-jetzt.de

### Staging deployment

Each run of workflow [workflow 'Build and deploy'] on branch `master` builds and pushes container images [`docker.io/codeformuenster/muenster-jetzt-frontend:master`](https://hub.docker.com/r/codeformuenster/muenster-jetzt-frontend) and [`docker.io/codeformuenster/muenster-jetzt-api:master`](https://hub.docker.com/r/codeformuenster/muenster-jetzt-api). Then it deploys them in on our staging server environment.

### Production deployment

The production deployment is deployed through CI triggered by pushes to the `production` branch. Check [`.github/workflows/build-and-deploy.yaml`](https://github.com/codeformuenster/muenster-jetzt/blob/master/.github/workflows/build-and-deploy.yaml).

Easiest way to do so is to create a pull request from [master into production](https://github.com/codeformuenster/muenster-jetzt/compare/production...master) branches.

## Dev Setup with VS Code

If you don't want to use VS Code or the proprietary remote development extension pack, check the README files of the back and frontend.

### Intro

There is no need to clutter your dev machine with different versions of every tool (like nodejs, python).
We are using docker containers as a dev environment to leave your host in a clean state and prevent "works on my mashine" bugs.
This guide will help you to setup everything in a convenient way without the typical drawbacks of developing in a container (e.g. no debugging, missing code completion etc.)

### Pre-Requirements
Install the following things:
* [Docker](https://www.docker.com/)
* [Docker-Compose](https://docs.docker.com/compose/), version 1.26.2 or greater
* [Visual Studio Code](https://code.visualstudio.com/)
* [Visual Studio Code Remote Development Extension Pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)

To understand the details behind this, take a look at these links:
* https://code.visualstudio.com/docs/remote/containers
* https://code.visualstudio.com/docs/remote/containers-advanced#_connecting-to-multiple-containers-at-once

### Configure your environment
**within the backend folder:** Copy the `.env.example` into a `.env` file and edit the content to your needs. This is only a dev setup but please choose at least unique passwords!

### Run the code
* Open this project in Visual Studio Code
* Use the command "Remote-Container: Open Folder in Container" (from Menu -> View -> Command Palette)
* select the `backend` folder (this will reload visual studio, start the container and will give you an editor instance with all the required plugins etc)
* leave that window open, repeat all of the above steps in a new Visual Studio Code Window but select the `frontend` folder instead of `backend`
* The Readmes of their respective folders contains more information on starting the development environment

🎉 congrats you are now running your dev environment

### Final Notes

This setup does a few cool things:
* forwards your ssh agent to allow git push from within the container
* exposes the container ports in a way that network access from the host looks is like local host access in the container (no need to bind to `0.0.0.0`)

[workflow 'Build and deploy']: .github/workflows/build-and-deploy.yaml
