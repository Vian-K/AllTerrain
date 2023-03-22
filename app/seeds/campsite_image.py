from app.models import db, CampsiteImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_campsiteimages():
    demo1 = CampsiteImage(
        campsiteid= 1, image="https://images.squarespace-cdn.com/content/v1/5ca3e1daca525b6d60ba7012/1559662749660-7GYFIZ41PIDS0Z4DO33K/image-asset.jpeg?format=1000w", preview=True
    )
    demo2 = CampsiteImage(
        campsiteid= 2, image="https://californiacrossings.com/wp-content/uploads/2022/09/big-sur-campground-kirk-creek.jpg", preview=True
    )
    demo3  = CampsiteImage(
        campsiteid= 3, image="https://www.google.com/search?q=big+sur+campground&rlz=1C1CHBF_enUS881US881&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiY-uCC8O_9AhXoADQIHSqzCC0Q0pQJegQIBhAE&biw=1568&bih=815&dpr=1#imgrc=JkTL3TNNTiaR8M", preview=True
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
