from django.core.management.base import BaseCommand
from twisted.internet import reactor
from scrapy.crawler import CrawlerRunner
from scrapy.utils.log import configure_logging
from scrapy.settings import Settings
from scrapy.spiderloader import SpiderLoader


class Command(BaseCommand):

    help = "Crawl events and populate database"

    def add_arguments(self, parser):
        parser.add_argument(
            "spider",
            nargs="*",
            help=(
                "Name(s) of spider(s) to run. Will run all spiders if missing."
            ),
        )

    def handle(self, *args, **options):
        settings = Settings(
            {
                "SPIDER_MODULES": ["scraping.spiders", "scraping.spiders.ics"],
            }
        )
        spider_loader = SpiderLoader(settings)
        # Run all spiders if none specified
        spiders = options["spider"] or spider_loader.list()
        configure_logging()
        runner = CrawlerRunner(settings=settings)
        for spider_name in spiders:
            runner.crawl(spider_loader.load(spider_name))
        deferred = runner.join()
        deferred.addBoth(lambda _: reactor.stop())
        reactor.run()
