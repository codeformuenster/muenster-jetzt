
# start postgresql
sudo docker run -d \
     --name some-postgres \
     -e POSTGRES_PASSWORD=mysecretpassword \
     -e PGDATA=/var/lib/postgresql/data/pgdata \
     -v /custom/mount:/var/lib/postgresql/data \
     -p 5432:5432 \
     postgres

# connect on the commandline
psql --host localhost postgres postgres


