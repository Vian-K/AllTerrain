from flask import Blueprint, jsonify, request
from app.models import Campsite, MyPlace, db
from flask_login import login_required, current_user


myplaces_routes = Blueprint('myplaces', __name__)

@myplaces_routes.route('/')
@login_required
def myPlaces():
    if not current_user.id:
        return {"Error": "Must be logged in"}

    myplaces = MyPlace.query.filter_by(userid = current_user.id).all()
    allPlaces = []
    if not myplaces:
        return {"message": "You have no favorites"}

    for places in myplaces:
        pd = places.to_dict()
        allPlaces.append(pd)
    return {'myplaces' : allPlaces}

@myplaces_routes.route('/<int:id>', methods=['POST'])
@login_required
def addMyPlaces(id):
    myplaces = MyPlace(
        campsiteid = id,
        userid = current_user.id
    )
    db.session.add(myplaces)
    db.session.commit()

    return myplaces.to_dict()


@myplaces_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def deleteMyPlaces(id):
    myplaces = MyPlace.query.filter_by(campsiteid = id).first()
    if not myplaces:
        return ('Not Found'), 404
    if myplaces.userid != current_user.id:
        return {"Error": "You are not allowed to delete this."}, 401
    db.session.delete(myplaces)
    db.session.commit()

    return {"MyPlace successfully deleted": id}
