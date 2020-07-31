from mj.cli import cli
from mj.utils import load_dotenv


if __name__ == '__main__':
    load_dotenv()
    cli(prog_name='python -m mj')
