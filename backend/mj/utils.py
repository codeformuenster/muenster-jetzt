import os
from contextlib import suppress


def load_dotenv(path='.env'):
    with suppress(FileNotFoundError):
        with open(path) as f:
            for line in f:
                if line.strip() and not line.strip().startswith('#'):
                    key, val = line.strip().split('=', 1)
                    os.environ.setdefault(key, val)
