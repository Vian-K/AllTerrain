from flask import Blueprint, jsonify, request
from app.models import Checklist, ChecklistItem, db
from flask_login import login_required, current_user
from app.forms import ChecklistForm
checklist_routes = Blueprint('checklists', __name__)

@checklist_routes.route('/')
def allChecklists():
    checklists = Checklist.query.all()
    allChecklists = []

    for checklist in checklists:
        cd = checklist.to_dict()
        cdItems = {'checklistitems': [checklistitems.to_dict() for checklistitems in checklist.checklistitems]}

        cd.update(cdItems)
        allChecklists.append(cd)
    return {'checklists': allChecklists}

@checklist_routes.route('/', methods=['POST'])
def createChecklist():
    data = request.get_json()
    form = ChecklistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_checklist = Checklist(
            name = data['name'],
            userid = current_user.id,
            isComplete = data['isComplete']
        )
        db.session.add(new_checklist)
        db.session.commit()

        return new_checklist.to_dict()
    else:
        return form.errors



@checklist_routes.route('/<int:id>', methods=['DELETE'])
def deleteChecklists(id):
    checklists = Checklist.query.get(id)
    if not checklists:
        return ('Not Found'), 404
    db.session.delete(checklists)
    db.session.commit()

    return {'Checklist successfully deleted': id}
