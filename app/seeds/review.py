from app.models import db, Campsite, Review, environment, SCHEMA
from sqlalchemy.sql import text
import datetime

def seed_review():
    demo1 = Review(
        userid = 1, campsiteid=1, review="Solid place, good shade with a great view", rating=5, created_at= datetime.datetime.now()
    )
    demo2 = Review(
        userid = 2, campsiteid=2, review="Great campsite", rating=5, created_at= datetime.datetime.now()
    )
    demo3 = Review(
        userid = 3, campsiteid=3, review="Would definitely come back here!!", rating=5, created_at= datetime.datetime.now()
    )



    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.commit()

def undo_review():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.review RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM campsite"))

    db.session.commit()
