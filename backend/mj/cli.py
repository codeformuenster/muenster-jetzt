import click
import uvicorn
from peewee_migrate import Router
from scrapy.crawler import CrawlerProcess
from scrapy.settings import Settings
from scrapy.spiderloader import SpiderLoader

import mj
from mj.db import db


@click.group()
def cli():
    pass


@cli.command(help='Apply all pending database migrations')
def migrate():
    router = Router(db)
    # Backwards-compatibility for databases that were initialized via peewee's
    # db.create_tables() before we added migrations
    with db:
        if db.table_exists('event') and not db.table_exists('migratehistory'):
            router.run('001_initial', fake=True)
    router.run()


@cli.command(help='Auto-detect model changes and create database migrations')
@click.argument('name')
def makemigrations(name):
    router = Router(db, ignore=['mjmodel'])
    router.create(name, auto=mj)


@cli.command(help='Serve muenster-jetzt API')
@click.option(
    '--reload/--no-reload', default=False,
    help='Reload server on source code changes')
@click.option('--host', default='127.0.0.1', help='host address to bind to')
def serve(reload, host):
    uvicorn.run('mj.api:app', reload=reload, host=host)


@cli.command(help="Crawl events to populate database.")
@click.option(
    "--list", "list_spiders", is_flag=True, help="List available spiders."
)
@click.option(
    "--spider", "chosen_spider",
    help="Select a spider by its name to run it, otherwise run all.",
)
def crawl(list_spiders, chosen_spider):
    settings = Settings(
        {
            "SPIDER_MODULES": ["mj.spiders"],
        }
    )
    spiders = SpiderLoader(settings)
    # at --list flag, only print names of spiders, then exit
    if list_spiders:
        click.echo("Available spiders (run with --spider option):")
        for spider_name in spiders.list():
            click.echo(f" * {spider_name}")
        return
    # select which spider to run
    if chosen_spider:
        spider_list = [chosen_spider]
    else:
        spider_list = spiders.list()
    # run spiders
    process = CrawlerProcess(settings=settings)
    for spider_name in spider_list:
        process.crawl(spiders.load(spider_name))
    process.start()
