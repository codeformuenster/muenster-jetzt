import dotenv
from mj.cli import cli


if __name__ == '__main__':
    dotenv.load_dotenv()
    cli(prog_name='python -m mj')
