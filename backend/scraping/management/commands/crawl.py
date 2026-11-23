from django.core.management.base import BaseCommand
from scrapy.crawler import CrawlerProcess
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
                "SPIDER_MODULES": ["scraping.spiders"],
            }
        )
        spider_loader = SpiderLoader(settings)
        # Run all spiders if none specified
        spiders = options["spider"] or spider_loader.list()
        process = CrawlerProcess(settings=settings)
        for spider_name in spiders:
            process.crawl(spider_loader.load(spider_name))
        process.start()
