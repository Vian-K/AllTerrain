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
    demo16 = CampsiteImage(
        campsiteid= 16, image="https://www.gannett-cdn.com/-mm-/c97542d6921c1d0b1a402f255abcb39a1b54b791/c=0-397-3261-2239/local/-/media/2017/01/18/Phoenix/Phoenix/636203411897211550-IMG-1352.JPG?width=660&height=373&fit=crop&format=pjpg&auto=webp", preview=True
    )
    demo17 = CampsiteImage(
        campsiteid= 17, image="https://www.stanleyhotel.com/uploads/9/8/6/9/98696462/img-0601_1_orig.jpg", preview=True
    )
    demo18 = CampsiteImage(
        campsiteid= 18, image="https://wisconsinlife.org/wp-content/uploads/2018/06/wisc-river-1.jpg", preview=True
    )
    demo19 = CampsiteImage(
        campsiteid= 19, image="https://mymodernmet.com/wp/wp-content/uploads/2017/11/you-did-not-sleep-there-extreme-camping-photography-thumbnail.jpg", preview=True
    )
    demo20 = CampsiteImage(
        campsiteid= 20, image="https://www.outdoor-insight.co.uk/wp-content/uploads/2022/02/The_Dyrt-scaled.jpg", preview=True
    )
    demo21 = CampsiteImage(
        campsiteid= 21, image="https://st2.depositphotos.com/1891797/5672/i/450/depositphotos_56720681-stock-photo-hiker-campfire-and-tent.jpg", preview=True
    )
    demo22 = CampsiteImage(
        campsiteid= 22, image="https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2011/10/camping_in_cave/10069911-2-eng-GB/Camping_in_cave.jpg", preview=True
    )
    demo23 = CampsiteImage(
        campsiteid= 23, image="https://hipcamp-res.cloudinary.com/image/upload/c_limit,f_auto,h_1200,q_60,w_1920/v1487888285/campground-photos/yug1atrq4our7lqcqwzg.jpg", preview=True
    )
    demo24 = CampsiteImage(
        campsiteid= 24, image="https://cdn.vox-cdn.com/thumbor/FMUIaXcnBaKK9YqdP8qtxUog150=/0x0:4741x3161/1200x800/filters:focal(1992x1202:2750x1960)/cdn.vox-cdn.com/uploads/chorus_image/image/59535149/shutterstock_625918454.0.jpg", preview=True
    )
    demo25 = CampsiteImage(
        campsiteid= 25, image="https://www.campingiceland.com/wp-content/uploads/2018/11/can-camp-anywhere-iceland-skogafoss-campsite-e1543335571850.jpg", preview=True
    )
    demo26 = CampsiteImage(
        campsiteid= 26, image="https://adventures.com/media/9903/camping-waterfall.jpg?anchor=center&mode=crop&width=970&height=645&rnd=132639093150000000&quality=80&format=jpg", preview=True
    )
    demo27 = CampsiteImage(
        campsiteid= 27, image="https://www.austincampground.com/wp-content/uploads/2021/04/Austin-Campground-Penn-Home-Thumbnail-RV-Sites.jpg", preview=True
    )
    demo28 = CampsiteImage(
        campsiteid= 28, image="https://howtostartanllc.com/images/business-ideas/business-idea-images/campground.jpg", preview=True
    )
    demo29 = CampsiteImage(
        campsiteid= 29, image="https://explorethec.com/wp-content/uploads/2022/01/rv-campground2.jpg", preview=True
    )
    demo30 = CampsiteImage(
        campsiteid= 30, image="https://photos.thedyrt.com/photo/684869/media/redden-state-forest-campground_48f1908e-163c-4fb6-8ce3-cdc8890b9d57.jpg", preview=True
    )
    demo31 = CampsiteImage(
        campsiteid= 31, image="https://u7q2x7c9.stackpathcdn.com/photos/26/18/383329_7719_XXL.jpg", preview=True
    )
    demo32 = CampsiteImage(
        campsiteid= 32, image="https://2.bp.blogspot.com/-Mfif8kIL5KM/USlDJdBC4OI/AAAAAAAADtw/P-aB9hqL4Y0/s1600/Winter+Camping-1.JPG", preview=True
    )
    demo33 = CampsiteImage(
        campsiteid= 33, image="https://everythinginacarryon.files.wordpress.com/2021/06/crowded-campground.jpg", preview=True
    )
    demo34 = CampsiteImage(
        campsiteid= 34, image="https://metro.co.uk/wp-content/uploads/2022/08/SEC_119537212-bee4.jpg?quality=90&strip=all&zoom=1&resize=480%2C252", preview=True
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

def undo_campsiteimages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.campsiteimages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM campsiteimages"))

    db.session.commit()
