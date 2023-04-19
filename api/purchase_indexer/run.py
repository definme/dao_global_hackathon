import os
import sys

import django

django_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(django_dir)
sys.path.append(django_dir)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "api.settings")
django.setup()

INDEXER_INTERVAL = int(os.environ["INDEXER_INTERVAL"])
ORACLE_WORKER_PRIVATE_KEY = os.environ["ORACLE_WORKER_PRIVATE_KEY"]
PURCHASE_ADMIN_PRIVATE_KEY = os.environ["PURCHASE_ADMIN_PRIVATE_KEY"]
SALE_CONTRACT = os.environ["SALE_CONTRACT"]
ORACLE_CONTRACT = os.environ["ORACLE_CONTRACT"]


def main():
    from purchase_indexer.main import PurchaseIndexer
    indexer = PurchaseIndexer(INDEXER_INTERVAL, ORACLE_WORKER_PRIVATE_KEY, PURCHASE_ADMIN_PRIVATE_KEY,
                              SALE_CONTRACT, ORACLE_CONTRACT)
    indexer.start()


if __name__ == "__main__":
    main()
