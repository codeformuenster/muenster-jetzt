# muenster-jetzt

## Deployment

We deploy the master branch to a staging environment at https://staging.muenster-jetzt.de

## Dev Setup
### Intro

There is no need to clutter your dev machine with differnt versions of every tool (like nodejs, python).
We are using docker containers as a dev environment to leave your host in a clean state and prevent "works on my mashine" bugs.
This guide will help you to setup everything in a convenient way without the typical drawbacks of developing in a container (e.g. no debugging, missing code completion etc.)

### Pre-Requirements
Install the following things:
* [Docker](https://www.docker.com/)
* [Docker-Compose](https://docs.docker.com/compose/)
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
* leave that window open, repeat all of the above steps in a new Visual Studio Code Window but select the `frontend` folder instead of `backend``
* The Readmes of their respective folders contains more information on starting the development environment

🎉 congrats you are now running your dev environment

### Final Notes

This setup does a few cool things:
* forwards your ssh agent to allow git push from within the container
* exposes the container ports in a way that network access from the host looks is like local host access in the container (no need to bind to `0.0.0.0`)

## Deployment

We use GitHub Actions for deploying containers using docker-compose.

### Staging deployment

Each run of workflow [workflow 'Build and deploy'] on branch `master` builds and pushes container images [`docker.io/muenster-jetzt-frontend:master`](https://hub.docker.com/r/codeformuenster/muenster-jetzt-frontend) and [`docker.io/muenster-jetzt-api:master`](https://hub.docker.com/r/codeformuenster/muenster-jetzt-api). Then it deploys them in on our staging server environment.

### Production deployment

**to be implemented**

[workflow 'Build and deploy']: .github/workflows/build-and-deploy.yaml
