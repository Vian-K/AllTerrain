from flask import Blueprint, jsonify, request
from app.models import Campsite, db
from app.forms import CampsiteForm
import datetime
from flask_login import login_required, current_user

campsite_routes = Blueprint('campsite', __name__)

@campsite_routes.route('/')
def allCampsites():
    campsites = Campsite.query.all()
    allCampsites = []

    for campsite in campsites:
        cd = campsite.to_dict()
        cdImages = {'campsiteImages': [campsiteimages.to_dict() for campsiteimages in campsite.campsiteimages]}
        cdReviews = {'reviews': [reviews.to_dict() for reviews in campsite.reviews]}
        cd.update(cdImages)
        cd.update(cdReviews)
        # print("-----CD------", cd)
        allCampsites.append(cd)

    return {'campsites': allCampsites}

@campsite_routes.route('/<int:id>')
def singleCampsite(id):
    campsite = Campsite.query.get(id)
    if not campsite:
        return ("Campsite not found"), 404
    else:
        cd = campsite.to_dict()
        owner = campsite.ownersid
        campsiteimages = campsite.campsiteimages
        cdImages = {'campsiteimages': [campsiteimages.to_dict() for campsiteimages in campsiteimages]}
        cdReviews = {'reviews': [reviews.to_dict() for reviews in campsite.reviews]}
        cdOwner = {'owner': owner}
        cd.update(cdOwner)
        cd.update(cdImages)
        cd.update(cdReviews)

        return {"campsite": cd}



@campsite_routes.route('/', methods=['POST'])
@login_required
def createCampsite():
    data = request.get_json()
    form = CampsiteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_campsite = Campsite(
            name = data["name"],
            ownersid = current_user.id,
            details = data["details"],
            location = data["location"],
            landtype = data["landtype"],
            cost = data["cost"],
            roaddifficulty = data["roaddifficulty"],
            cleanliness = data["cleanliness"],
            celldata = data["celldata"],
            accessibility = data["accessibility"],
        )
        db.session.add(new_campsite)
        db.session.commit()

        return new_campsite.to_dict()
    else:
        print("-------ERRORS-----", form.errors)
        return form.errors
@campsite_routes.route('/<int:id>', methods=['PUT'])
@login_required
def updateCampsite(id):
    campsite = Campsite.query.get(id)
    data = request.get_json()
    if campsite:
        campsite.name = data["name"]
        campsite.details = data["details"]
        campsite.location = data["location"]
        campsite.landtype = data["landtype"]
        campsite.cost = data["cost"]
        campsite.roaddifficulty = data["roaddifficulty"]
        campsite.cleanliness = data["cleanliness"]
        campsite.celldata = data["celldata"]
        campsite.accessibility = data["accessibility"]
        campsite.ownerid = current_user.id
        campsite.id = campsite.id

        db.session.commit()
        campsiteObj = campsite.to_dict()

        return campsiteObj
    else:
        return {"error": "Campsite does not exist"}, 404

@campsite_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def deleteCampsite(id):
    campsite = Campsite.query.get(id)
    if not campsite:
        return ("Campsite not found"), 404
    db.session.delete(campsite)
    db.session.commit()

    return {"Campsite successfully deleted": id}
