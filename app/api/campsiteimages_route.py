from flask import Blueprint, jsonify, request
from app.models import CampsiteImage, db
from app.forms import CampsiteImageForm
from flask_login import login_required, current_user

campsiteimages_routes = Blueprint('campsiteimages', __name__)

@campsiteimages_routes.route('/')
def allImages():
    images = CampsiteImage.query.all()
    return {'campsiteImages': [image.to_dict() for image in images]}

@campsiteimages_routes.route('/<int:id>')
def getimagesById(id):
    images = CampsiteImage.query.get(id)
    return images.to_dict()

@campsiteimages_routes.route('/', methods=['POST'])
@login_required
def createCampsiteImages():
    data = request.get_json()
    form = CampsiteImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_campsiteImage = CampsiteImage(
            image = data["image"],
            preview = data['preview'],
            campsiteid = data['campsiteid']
        )
        db.session.add(new_campsiteImage)
        db.session.commit()

        return new_campsiteImage.to_dict()
    else:
        return form.errors

@campsiteimages_routes.route('/<int:id>', methods=['PUT'])
@login_required
def editCampsiteImages(id):
    campsiteid = id
    data = request.get_json()
    images = CampsiteImage.query.filter(CampsiteImage.campsiteid == campsiteid).all()
    imageobj = {}
    for image in images:
        image.image = data['image']
        db.session.commit()
        imageobj = image.to_dict()
    return imageobj

@campsiteimages_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def deleteCampsiteImage(id):
    campsiteImage = CampsiteImage.query.get(id)
    if not campsiteImage:
        return ("Image not found"), 404
    db.session.delete(campsiteImage)
    db.session.commit()

    return {"Image successfully delete": id}
