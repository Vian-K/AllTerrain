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
    demo4  = CampsiteImage(
        campsiteid= 4, image="https://img.hipcamp.com/images/f_png,q_auto/v1677654529/journal/heroimages/tm4bhuint3yhxautjwss/tm4bhuint3yhxautjwss.jpg?_i=AA", preview=True
    )
    demo5  = CampsiteImage(
        campsiteid= 5, image="https://asi.cpp.edu/campuscrop/wp-content/uploads/2018/07/o.jpg", preview=True
    )
    demo6  = CampsiteImage(
        campsiteid= 6, image="https://explorerchick.com/wp-content/uploads/2019/02/Camping-in-lake-clark-national-park-women-only-copy-01.jpeg", preview=True
    )
    demo7  = CampsiteImage(
        campsiteid= 7, image="https://cdn.securem2.com/commonimages/pages/2023/1/benchesonisland_f8ombnu4ehvk.jpg", preview=True
    )
    demo8  = CampsiteImage(
        campsiteid= 8, image="https://www.travelandleisure.com/thmb/yBk0Ow-fi7ToryfR4PmapdcH8ww=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/CAMPING0915-Glacier-National-Park-eb04b1b037d241159003d931c8a46dbc.jpg", preview=True
    )
    demo9  = CampsiteImage(
        campsiteid= 9, image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNhcTJ7nHSrwh7tUi1nsiNAJuU73K-P3gF7A&usqp=CAU", preview=True
    )
    demo10  = CampsiteImage(
        campsiteid= 10, image="https://lakelanier.com/wp-content/uploads/2013/07/DSC_00831.jpg", preview=True
    )
    demo11  = CampsiteImage(
        campsiteid= 11, image="https://exploreessaouira.com/wp-content/uploads/2023/01/campsites-in-Essaouira.jpg", preview=True
    )
    demo12 = CampsiteImage(
        campsiteid= 12, image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROMrUwFtdtiNBTGSHscFM_Cc777zlPDvxvmSBSZ_C6v1HvmXhWnkzYEEce4SDgmE2PRqg&usqp=CAU", preview=True
    )
    demo13 = CampsiteImage(
        campsiteid= 13, image="https://lp-cms-production.imgix.net/2020-11/shutterstockRF_116105287.jpg?auto=format&w=1440&h=810&fit=crop&q=75", preview=True
    )
    demo14 = CampsiteImage(
        campsiteid= 14, image="https://www.pitchup.com/images/1/image/upload/s--rougn3eg--/c_limit,h_2400,w_3200/e_improve,fl_progressive/q_auto/b_rgb:000,g_south_west,l_pitchup.com_wordmark_white_watermark,o_15/v1/gill-head-farm/988926.jpg", preview=True
    )
    demo15 = CampsiteImage(
        campsiteid= 15, image="https://assets.simpleviewinc.com/simpleview/image/upload/crm/virginia/po-campsite_3B41E13E-B6B5-433F-AD81BAEF6B13BEB9_b20dd75b-a8eb-46ef-9b18b6b4cc4d78a5.jpg", preview=True
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

def undo_campsiteimages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.campsiteimages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM campsiteimages"))

    db.session.commit()
