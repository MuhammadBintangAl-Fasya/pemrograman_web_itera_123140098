import argparse
import sys

from pyramid.paster import bootstrap, setup_logging
from sqlalchemy.exc import OperationalError

from .. import models


def setup_models(dbsession):
    """
    Add initial model objects.
    """
    # Cek apakah data sudah ada
    existing_mk1 = dbsession.query(models.Matakuliah).filter_by(kode_mk='IF101').first()
    existing_mk2 = dbsession.query(models.Matakuliah).filter_by(kode_mk='IF102').first()
    existing_mk3 = dbsession.query(models.Matakuliah).filter_by(kode_mk='IF201').first()
    
    if not existing_mk1:
        matakuliah1 = models.Matakuliah(
            kode_mk='IF101',
            nama_mk='Algoritma dan Pemrograman',
            sks=3,
            semester=1
        )
        dbsession.add(matakuliah1)
        print("✅ Matakuliah IF101 added.")
    else:
        print("⚠️  Matakuliah IF101 already exists.")
    
    if not existing_mk2:
        matakuliah2 = models.Matakuliah(
            kode_mk='IF102',
            nama_mk='Struktur Data',
            sks=3,
            semester=2
        )
        dbsession.add(matakuliah2)
        print("✅ Matakuliah IF102 added.")
    else:
        print("⚠️  Matakuliah IF102 already exists.")
    
    if not existing_mk3:
        matakuliah3 = models.Matakuliah(
            kode_mk='IF201',
            nama_mk='Basis Data',
            sks=4,
            semester=3
        )
        dbsession.add(matakuliah3)
        print("✅ Matakuliah IF201 added.")
    else:
        print("⚠️  Matakuliah IF201 already exists.")


def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'config_uri',
        help='Configuration file, e.g., development.ini',
    )
    return parser.parse_args(argv[1:])


def main(argv=sys.argv):
    args = parse_args(argv)
    setup_logging(args.config_uri)
    
    # bootstrap will return a context with request + closer
    env = bootstrap(args.config_uri)
    request = env['request']
    
    try:
        # gunakan request.tm (bukan tm_manager)
        with request.tm:
            dbsession = request.dbsession
            setup_models(dbsession)
        print("\n🎉 Database initialized successfully!")
    except OperationalError:
        print('''
❌ Pyramid is having a problem using your SQL database.

Your database should be up and running before you initialize your project.
Make sure:
1. PostgreSQL server is running
2. Database 'pyramid_matakuliah' exists
3. Connection string in development.ini is correct
4. User 'pyramid_user' has proper permissions
''')
    finally:
        env['closer']()


if __name__ == '__main__':
    main()