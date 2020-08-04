# Infrastructure

The ansible scripts to setup the (production) server.

## usage
```
ansible-playbook -i production main-server.yml --vault-password-file ~/.vault-pass-ms-jetzt
# or only specific roles
ansible-playbook -i production main-server.yml --vault-password-file ~/.vault-pass-ms-jetzt --tags "common_role, ufw_role"
```