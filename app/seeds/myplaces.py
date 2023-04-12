from app.models import db, Campsite, MyPlace, environment, SCHEMA
from sqlalchemy.sql import text

def seed_myplaces():
    demo1 = MyPlace(
        userid = 1, campsiteid=1
    )
    demo2 = MyPlace(
        userid = 2, campsiteid=2
    )
    demo3 = MyPlace(
        userid = 3, campsiteid=3
    )



    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.commit()

def undo_myplaces():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.myplaces RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM myplaces"))

    db.session.commit()
