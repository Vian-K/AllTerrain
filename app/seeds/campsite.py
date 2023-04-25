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
    demo16 = Campsite(
    name="Lakefront Retreat Campground",
    ownersid=3,
    details="This tranquil campground sits right on the shores of a beautiful lake, perfect for swimming, fishing, and boating.",
    location="48.031710, -116.684609",
    landtype="Public",
    cost=40,
    roaddifficulty=2,
    cleanliness=4,
    celldata="AT&T",
    accessibility="3"
)

    demo17 = Campsite(
    name="Hiker's Haven Campground",
    ownersid=3,
    details="This campground is located near some of the best hiking trails in the area and is a great basecamp for exploring the great outdoors.",
    location="36.186225, -115.657981",
    landtype="Public",
    cost=25,
    roaddifficulty=1,
    cleanliness=3,
    celldata="T-Mobile",
    accessibility="4"
)

    demo18 = Campsite(
    name="Playful Pines Campground",
    ownersid=3,
    details="This family-friendly campground features a playground for kids to enjoy while the adults relax by the fire.",
    location="44.650031, -123.152472",
    landtype="Private",
    cost=30,
    roaddifficulty=2,
    cleanliness=4,
    celldata="AT&T",
    accessibility="3"
)
    demo19 = Campsite(
    name="Meadow View Campground",
    ownersid=3,
    details="Enjoy stunning views of the surrounding mountains and meadows at this quiet and peaceful campground.",
    location="44.099884, -114.947753",
    landtype="Public",
    cost=20,
    roaddifficulty=3,
    cleanliness=3,
    celldata="Verizon",
    accessibility="4"
)

    demo20 = Campsite(
    name="River Bend Campground",
    ownersid=3,
    details="Set up camp right next to the river and fall asleep to the soothing sound of flowing water at this tranquil campground.",
    location="41.332726, -105.678164",
    landtype="Private",
    cost=35,
    roaddifficulty=2,
    cleanliness=4,
    celldata="T-Mobile",
    accessibility="3"
)

    demo21 = Campsite(
    name="Wilderness Retreat Campground",
    ownersid=3,
    details="Escape the hustle and bustle of city life and immerse yourself in nature at this secluded campground.",
    location="36.707424, -118.729325",
    landtype="Public",
    cost=25,
    roaddifficulty=4,
    cleanliness=3,
    celldata="AT&T",
    accessibility="2"
)

    demo22 = Campsite(
    name="Mountain View Campground",
    ownersid=3,
    details="Wake up to stunning panoramic views of the nearby mountains at this picturesque campground.",
    location="37.411236, -119.181567",
    landtype="Private",
    cost=40,
    roaddifficulty=1,
    cleanliness=5,
    celldata="Verizon",
    accessibility="4"
)

    demo23 = Campsite(
    name="Lakeside Campground",
    ownersid=3,
    details="Enjoy a peaceful and serene camping experience right by the lake at this beautiful campground.",
    location="44.424479, -110.584441",
    landtype="Public",
    cost=30,
    roaddifficulty=3,
    cleanliness=4,
    celldata="Sprint",
    accessibility="3"
)

    demo24 = Campsite(
    name="Hillside Retreat Campground",
    ownersid=3,
    details="Escape to the hills and enjoy breathtaking views of the valley below at this peaceful campground.",
    location="45.130536, -111.099548",
    landtype="Private",
    cost=35,
    roaddifficulty=2,
    cleanliness=4,
    celldata="AT&T",
    accessibility="3"
)

    demo25 = Campsite(
    name="Canyon View Campground",
    ownersid=3,
    details="Take in stunning views of the nearby canyon from your campsite at this beautiful and secluded campground.",
    location="37.332108, -113.041143",
    landtype="Public",
    cost=20,
    roaddifficulty=3,
    cleanliness=3,
    celldata="Verizon",
    accessibility="4"
)

    demo26 = Campsite(
    name="Desert Oasis Campground",
    ownersid=3,
    details="Experience the beauty and tranquility of the desert at this unique and peaceful campground.",
    location="36.175900, -115.090918",
    landtype="Private",
    cost=45,
    roaddifficulty=2,
    cleanliness=4,
    celldata="T-Mobile",
    accessibility="3"
)
    demo27 = Campsite(
    name="El Capitan State Beach",
    ownersid=3,
    details="This beachfront campground is perfect for surfers and beach enthusiasts, with easy access to the waves and stunning sunsets.",
    location="34.45637989733307,-119.8690496425158",
    landtype="Public",
    cost=35,
    roaddifficulty=3,
    cleanliness=4,
    celldata="Verizon",
    accessibility="3"
)

    demo28 = Campsite(
    name="Jenny Lake Campground",
    ownersid=3,
    details="Located near the popular Jenny Lake, this campground offers scenic views and access to hiking trails.",
    location="43.76653985324754,-110.7258743291134",
    landtype="Public",
    cost=40,
    roaddifficulty=4,
    cleanliness=4,
    celldata="T-Mobile",
    accessibility="2"
)

    demo29 = Campsite(
    name="Lost Lake Campground",
    ownersid=3,
    details="This peaceful campground is surrounded by nature, with a beautiful lake for swimming and fishing.",
    location="45.57493161211565,-121.84181271480375",
    landtype="Public",
    cost=20,
    roaddifficulty=2,
    cleanliness=5,
    celldata="AT&T",
    accessibility="4"
)

    demo30 = Campsite(
    name="Crater Lake Campground",
    ownersid=3,
    details="This campground offers breathtaking views of Crater Lake, the deepest lake in the United States.",
    location="42.944065708777175,-122.10471533030315",
    landtype="Public",
    cost=25,
    roaddifficulty=3,
    cleanliness=4,
    celldata="Verizon",
    accessibility="3"
)

    demo31 = Campsite(
    name="Mt. Hood National Forest Campground",
    ownersid=3,
    details="This remote campground is perfect for those seeking solitude and natural beauty, with access to hiking trails and stunning views of Mt. Hood.",
    location="45.33804285929607,-121.67786897747479",
    landtype="Public",
    cost=15,
    roaddifficulty=4,
    cleanliness=4,
    celldata="T-Mobile",
    accessibility="2"
)

    demo32 = Campsite(
    name="Yosemite Valley Campground",
    ownersid=3,
    details="Located in the heart of Yosemite Valley, this campground offers easy access to some of the park's most popular attractions.",
    location="37.735280270245185,-119.56616929234462",
    landtype="Public",
    cost=50,
    roaddifficulty=3,
    cleanliness=5,
    celldata="AT&T",
    accessibility="3"
)

    demo33 = Campsite(
    name="Yellowstone National Park Campground",
    ownersid=3,
    details="This campground is located in one of America's most famous national parks, with easy access to geysers, hot springs, and wildlife.",
    location="44.42552442147455,-110.58817239206893",
    landtype="Public",
    cost=35,
    roaddifficulty=4,
    cleanliness=4,
    celldata="Verizon",
    accessibility="2"
)

    demo34 = Campsite(
    name="Mount Rainier Paradise Inn",
    ownersid=3,
    details="Stay in the heart of Mount Rainier National Park at the historic Paradise Inn.",
    location="46.78689377857419,-121.73527692198967",
    landtype="Public",
    cost=125,
    roaddifficulty=4,
    cleanliness=5,
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
    db.session.add(demo16)
    db.session.add(demo17)
    db.session.add(demo18)
    db.session.add(demo19)
    db.session.add(demo20)
    db.session.add(demo21)
    db.session.add(demo22)
    db.session.add(demo23)
    db.session.add(demo24)
    db.session.add(demo25)
    db.session.add(demo26)
    db.session.add(demo27)
    db.session.add(demo28)
    db.session.add(demo29)
    db.session.add(demo30)
    db.session.add(demo31)
    db.session.add(demo32)
    db.session.add(demo33)
    db.session.add(demo34)
    db.session.commit()





def undo_campsite():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.campsite RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM campsite"))

    db.session.commit()
