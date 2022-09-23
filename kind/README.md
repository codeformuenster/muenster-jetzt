# Local Kubernetes test drive

```bash
kind create cluster
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml

kubectl apply --kustomize .

# look around
kubectl get -n muensterjetzt deployments
kubectl logs -n muensterjetzt deployments/postgres
kubectl logs -n muensterjetzt deployments/frontend

# zapp
kind delete cluster
```
