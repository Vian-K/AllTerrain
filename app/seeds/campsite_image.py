from app.models import db, CampsiteImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_campsiteimages():
    demo1 = CampsiteImage(
        campsiteid= 1, image="https://www.travelandleisure.com/thmb/iX92Q5-8pFx6hDVsfZvRmAvp-6s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/big-sur-campgrounds-cabins-CAMPBIGSUR0522-1743fe36d5794a36b98e52ebf6220818.jpg", preview=True
    )
    demo2 = CampsiteImage(
        campsiteid= 2, image="https://monocounty.ca.gov/sites/default/files/styles/full_node_primary/public/imageattachments/economic/page/4262/silver_shore.jpg?itok=NfyUXlla", preview=True
    )
    demo3  = CampsiteImage(
        campsiteid= 3, image="https://i0.wp.com/familyroadtripguru.com/wp-content/uploads/2019/05/P1110797.jpg?resize=1024%2C768&ssl=1", preview=True
    )
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.commit()

def undo_campsiteimages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.campsiteimages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM campsiteimages"))

    db.session.commit()
