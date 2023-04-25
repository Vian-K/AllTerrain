from flask.cli import AppGroup
from .users import seed_users, undo_users
from .campsite import seed_campsite, undo_campsite
from .campsite_image import seed_campsiteimages, undo_campsiteimages
from .review import seed_review, undo_review
from .myplaces import seed_myplaces, undo_myplaces
from .checklist import seed_checklist, undo_checklist
from .checklistitems import seed_checklistitems, undo_checklistitems
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_checklistitems()
        undo_checklist()
        undo_myplaces()
        undo_review()
        undo_campsiteimages()
        undo_campsite()
        undo_users()

    seed_users()
    seed_campsite()
    seed_campsiteimages()
    seed_review()
    seed_myplaces()
    seed_checklist()
    seed_checklistitems()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_campsite()
    undo_campsiteimages()
    undo_review()
    undo_myplaces()
    undo_checklist()
    undo_checklistitems()
    # Add other undo functions here
