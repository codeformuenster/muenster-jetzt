# Infrastructure

The ansible scripts to setup the (production) server.

## Quick Usage
```
ansible-playbook -i production main-server.yml --vault-password-file ~/.vault-pass-ms-jetzt
# or only specific roles
ansible-playbook -i production main-server.yml --vault-password-file ~/.vault-pass-ms-jetzt --tags "common_role, ufw_role"
```

## Preparation

Make sure you can access your server through ssh. Add your host to the ansible
inventory or create your own inventory file. Copy the `host_vars/45.132.245.60` directory
to a new directory in `host_vars` named like your host in the inventory. Modify the values
to your liking.

Create a new `vault.yaml` in your `host_vars` directory and generate new secrets
for all variables starting with `vault_`.

The ansible playbook will change sshd settings and install the ssh public keys
specified in the `grant_ssh_access_for` array. The array elements correspond to files
in `ssh/files/public_keys` which should contain a ssh public key.

## Installation

Execute ansible as described in [Quick Usage](#quick-usage).

## Deployment of the application

We're using Github Actions to deploy to our server by sshing into our server and executing some commands.
You can check the `deploy` job in [.github/workflows/build-and-deploy.yaml](../.github/workflows/build-and-deploy.yaml) to see the actual commands executed.
