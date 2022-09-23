# muenster-jetzt database management, data import, and API

Based on [Django](https://www.djangoproject.com/), [Django REST
framework](https://www.django-rest-framework.org/), and
[Scrapy](https://scrapy.org/).

## Development setup for backend

All following commands are to be executed from the root of this repository.

### 1. Create and start database

1. Configure environmental variables, based on example:

    ```bash
    cp backend/.env.example backend/.env
    ```

   Optionally, these variables and credentials can be changed. But development will work without any change, too.

2. Start database: `docker-compose up -d db`

### 2a. DEV SETUP A: Develop in virtual environment

1. Make sure your local python version matches version in `backend/deployment/Dockerfile.prod`.
2. Create a virtual environment, if it does not exist yet: `python -m venv .venv`
3. Activate virtual envrionment: `source .venv/bin/activate`
4. Install all dependencies via `pip install -r backend/requirements.txt`

### 2b. DEV SETUP B: Develop in a container (DEPRECATED)

Change into the `backend` directory.

To open a shell inside a container with all dependencies installed, run:

```bash
# do this only once or if your requirements.txt changes
docker build -t muenster-jetzt-backend -f deployment/Dockerfile.prod .
# start a container
docker run --rm -it -v $(pwd):/app:Z --entrypoint /bin/bash --network muenster-jetzt_default -p 8000:8000 --env-file .env muenster-jetzt-backend
```

### 3. Initialize Database

1. Migrate your database: `./backend/manage.py migrate`
2. Crawl events and store them in the database: `./backend/manage.py crawl`
3. Start the API: `./backend/manage.py runserver 0.0.0.0:8000`

## General information

### Database schema

The database schema is managed via Django. If you need to alter it, just add a
new model in `events/models.py` (or edit an existing one) and run `./manage.py
makemigrations` to create a new migration.

### Naming Convention

Whenever you need to name a property, try to use the name that is used in <https://schema.org/> e.g. for events take a look at: <https://schema.org/Event>

### Dependency management

We're using [pip-tools](https://github.com/jazzband/pip-tools) to make sure all deployments are using the same dependency versions.

If you want to add a new dependency, add it into the `setup.py` file and run `pip-compile`. Don't forget to run `pip install -r requirements.txt` to install your added/updated dependency.

Same goes for upgrading dependencies. Execute `pip-compile --upgrade` to upgrade all dependencies, flag `--upgrade-package <name>` will upgrade only the requested package.

## Troubleshooting

### Backend has trouble connecting to the database

```bash
# Do this to debug the database container
docker ps                                 # find out name of db container
docker exec -it $containername bash       # log into db container
env                                       # check if env variables are ok

# If you changed the credentials in .env file, recreate db container:
docker-compose down db -v
docker-compose up db
```
