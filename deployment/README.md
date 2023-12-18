# Münster Update Deployment Guide

## Kustomize / Kubernetes

This method requires an external Postgres server.

The kustomization in `dev` is an example for a deployment. Check out the `backend-secret.example.yaml` for required secrets for the backend.

## Plain docker / docker-compose

This document attempts to describe the deployment of Münster Update to a linux server.

### Requirements

- a linux server (we're using ubuntu 20.04 lts) with ssh access
- ansible on your local computer
- a fork of this repository (a local clone also works)

### Installation

The installation is described in the README file of the [infrastructure](../infrastructure/README.md) directory.
