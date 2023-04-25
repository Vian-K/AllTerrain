from app.models import db, Checklist, ChecklistItem, environment, SCHEMA
from sqlalchemy.sql import text

def seed_checklistitems():
    demo1 = ChecklistItem(
        checklistid = 1, item="food"
    )
    demo2 = ChecklistItem(
        checklistid = 2, item="cooler"
    )
    demo3 = ChecklistItem(
        checklistid = 3, item="sleeping bags"
    )

    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.commit()

def undo_checklistitems():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.checklistitems RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM checklistitems"))

    db.session.commit()
