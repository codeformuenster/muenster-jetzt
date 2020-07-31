import click
import uvicorn
from scrapy.crawler import CrawlerProcess
from scrapy.settings import Settings
from scrapy.spiderloader import SpiderLoader

from mj.db import db, Event, EventSource, Location, Organizer


@click.group()
def cli():
    pass


@cli.command(help='Apply all pending database migrations')
def migrate():
    with db:
        db.create_tables([Event, EventSource, Location, Organizer])


@cli.command(help='Serve muenster-jetzt API')
@click.option(
    '--reload/--no-reload', default=False,
    help='Reload server on source code changes')
def serve(reload):
    uvicorn.run('mj.api:app', reload=reload)


@cli.command(help='Crawl events')
@click.option(
    '--list', 'list_spiders', is_flag=True, help='List available spiders')
@click.argument('spider', nargs=-1)
def crawl(list_spiders, spider):
    settings = Settings({
        'SPIDER_MODULES': ['mj.spiders'],
    })
    spiders = SpiderLoader(settings)
    if list_spiders:
        for spider_name in spiders.list():
            click.echo(spider_name)
        return
    process = CrawlerProcess(settings=settings)
    spider_list = spider or spiders.list()
    for spider_name in spider_list:
        process.crawl(spiders.load(spider_name))
    process.start()
