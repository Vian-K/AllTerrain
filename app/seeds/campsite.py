from app.models import db, Campsite, environment, SCHEMA
from sqlalchemy.sql import text

def seed_campsite():
    demo1 = Campsite(
       name="Big Sur Campground", ownersid=1, details="Beautiful area", location="36.5042, -121.4234", landtype="Public", cost=25, roaddifficulty=3, cleanliness=3, celldata="AT&T", accessibility="bathrooms, RV plug-in, water"
    )
    demo2 = Campsite(
       name="Kirk Creek", ownersid=2, details="By a creek in the mountains", location="36.2711, -121.8127", landtype="Private", cost=85, roaddifficulty=1, cleanliness=4, celldata="None", accessibility="Full amenities"
    )
    demo3 = Campsite(
        name="Lake Isabella Campground", ownersid=3, details="This campground attached to the lake with boat ramp!", location="35.6078, -118.4398", landtype="Public", cost=30, roaddifficulty=2, cleanliness=3, celldata="AT&T, Verizon, T-Mobile, Sprint", accessibility="Bathrooms and boat ramp"
    )


    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.commit()

def undo_campsite():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.campsite RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM campsite"))

    db.session.commit()
