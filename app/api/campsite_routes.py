from flask import Blueprint, jsonify, request
from app.models import Campsite, db, Review, CampsiteImage

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
        cd.update(cdImages)
        allCampsites.append(cd)

    return {'campsites': allCampsites}

@campsite_routes.route('/<int:id>')
def singleCampsite(id):
    campsite = Campsite.query.get(id)
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

# @campsite_routes.route('/', methods=['POST'])
# @login_required
