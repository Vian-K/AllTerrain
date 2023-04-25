from app.models import db, Checklist, ChecklistItem, environment, SCHEMA
from sqlalchemy.sql import text

def seed_checklist():
    demo1 = Checklist(
        userid = 1, name = "Demo Checklist Name 1", isComplete=True
    )
    demo2 = Checklist(
        userid = 2, name = "Demo Checklist Name 2", isComplete=True
    )
    demo3 = Checklist(
        userid = 3, name = "Demo Checklist Name 3", isComplete=True
    )

    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.commit()

def undo_checklist():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.checklist RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM checklist"))

    db.session.commit()
