from app.models import db, Campsite, environment, SCHEMA
from sqlalchemy.sql import text

def seed_campsite():
    demo1 = Campsite(
       name="Big Sur Campground",
       ownersid=1,
       details="Beautiful area",
       location="36.27608501423519,-121.8142793152452",
       landtype="Public",
       cost=25,
       roaddifficulty=3,
       cleanliness=3,
       celldata="AT&T",
       accessibility="5"
    )
    demo2 = Campsite(
       name="June Lake",
       ownersid=2,
       details="By a creek in the mountains",
       location="37.78154416147273,-119.0823915421287",
       landtype="Private",
       cost=85,
       roaddifficulty=1,
       cleanliness=4,
       celldata="Verizon",
    accessibility="4"
    )
    demo3 = Campsite(
        name="Lake Isabella Campground",
        ownersid=3,
        details="This campground attached to the lake with boat ramp!",
        location="35.653740778894814,-118.45758625985853",
        landtype="Public",
        cost=30,
        roaddifficulty=2,
        cleanliness=3,
        celldata="AT&T", accessibility="5"
    )

    demo4 = Campsite(
    name="Mount Hood Campground",
    ownersid=3,
    details="This campground is located in the beautiful Mount Hood National Forest and offers stunning views of the surrounding mountains.",
    location="45.330915, -121.714128",
    landtype="Public",
    cost=20,
    roaddifficulty=2,
    cleanliness=4,
    celldata="Verizon",
    accessibility="4"
)

    demo5 = Campsite(
    name="River Bend Campground",
    ownersid=3,
    details="This peaceful campground is located right by the river and offers great fishing and kayaking opportunities.",
    location="42.559865, -123.373204",
    landtype="Private",
    cost=35,
    roaddifficulty=1,
    cleanliness=5,
    celldata="AT&T, T-Mobile",
    accessibility="3"
)

    demo6 = Campsite(
    name="Red Rock Canyon Campground",
    ownersid=3,
    details="This campground offers stunning views of the red rock formations and is perfect for stargazing at night.",
    location="36.137665, -115.426188",
    landtype="Public",
    cost=15,
    roaddifficulty=3,
    cleanliness=3,
    celldata="Sprint",
    accessibility="2"
)

    demo7 = Campsite(
    name="Lake Tahoe Campground",
    ownersid=3,
    details="This beautiful campground is located right by the crystal-clear waters of Lake Tahoe and offers great swimming and boating opportunities.",
    location="39.058319, -120.022614",
    landtype="Public",
    cost=30,
    roaddifficulty=2,
    cleanliness=5,
    celldata="T-Mobile",
    accessibility="4"
)
    demo8 = Campsite(
    name="Yosemite Pines Campground",
    ownersid=3,
    details="This rustic campground is located in the heart of Yosemite National Park and offers a true wilderness experience.",
    location="37.659934, -119.932685",
    landtype="Public",
    cost=25,
    roaddifficulty=3,
    cleanliness=3,
    celldata="T-Mobile",
    accessibility="1"
)

    demo9 = Campsite(
    name="Hot Springs Campground",
    ownersid=3,
    details="This unique campground is located near a natural hot spring and offers a relaxing soak after a long day of hiking.",
    location="43.705779, -121.394869",
    landtype="Public",
    cost=20,
    roaddifficulty=2,
    cleanliness=4,
    celldata="AT&T",
    accessibility="3"
)

    demo10 = Campsite(
    name="Grand Canyon Campground",
    ownersid=3,
    details="This stunning campground offers breathtaking views of the Grand Canyon and is a great basecamp for hiking and exploring the area.",
    location="36.057371, -112.108757",
    landtype="Public",
    cost=35,
    roaddifficulty=3,
    cleanliness=4,
    celldata="AT&T",
    accessibility="3"
)
    demo11 = Campsite(
    name="Family Fun Campground",
    ownersid=3,
    details="This family-friendly campground offers a variety of activities for kids and adults alike, including hiking, swimming, and mini-golf.",
    location="40.042316, -111.731942",
    landtype="Private",
    cost=40,
    roaddifficulty=2,
    cleanliness=5,
    celldata=" Verizon, ",
    accessibility="4"
)
    demo12 = Campsite(
    name="Yellowstone Gateway Campground",
    ownersid=3,
    details="This convenient campground is located just outside the entrance to Yellowstone National Park and offers easy access to the park's many attractions.",
    location="44.633081, -110.733662",
    landtype="Public",
    cost=30,
    roaddifficulty=2,
    cleanliness=4,
    celldata="T-Mobile",
    accessibility="4"
)
    demo13 = Campsite(
    name="Paws and Claws Campground",
    ownersid=3,
    details="This pet-friendly campground welcomes furry friends and even has a dog park for them to play in.",
    location="47.536915, -120.187105",
    landtype="Private",
    cost=25,
    roaddifficulty=1,
    cleanliness=4,
    celldata="AT&T",
    accessibility="3"
)
    demo14 = Campsite(
    name="RV Oasis Campground",
    ownersid=3,
    details="This campground offers full RV hookups and is a great place to park your home on wheels while you explore the area.",
    location="41.142148, -112.018326",
    landtype="Private",
    cost=35,
    roaddifficulty=2,
    cleanliness=5,
    celldata="T-Mobile",
    accessibility="4"
)
    demo15 = Campsite(
    name="Hot Tub Hideaway Campground",
    ownersid=3,
    details="This cozy campground features a private hot tub for soaking under the stars.",
    location="45.367693, -121.689942",
    landtype="Private",
    cost=50,
    roaddifficulty=3,
    cleanliness=4,
    celldata="None",
    accessibility="2"
)
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)
    db.session.add(demo9)
    db.session.add(demo10)
    db.session.add(demo11)
    db.session.add(demo12)
    db.session.add(demo13)
    db.session.add(demo14)
    db.session.add(demo15)
    db.session.commit()

def undo_campsite():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.campsite RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM campsite"))

    db.session.commit()
