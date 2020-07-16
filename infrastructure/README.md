# Infrastructure

The ansible scripts to setup the (production) server.

## usage
```
ansible-playbook -i production main-server.yml
# or only specific roles
ansible-playbook -i production main-server.yml --tags "common_role, ufw_role"
```