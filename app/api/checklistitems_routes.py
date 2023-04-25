from flask import Blueprint, jsonify, request
from app.models import Checklist, ChecklistItem, db
from flask_login import login_required, current_user
from app.forms import ItemsForm
checklistitem_routes = Blueprint('checklistitems', __name__)

@checklistitem_routes.route('/')
def allChecklistItems():
    checklistitems = ChecklistItem.query.all()
    allItems = []
    for items in checklistitems:
        cd = items.to_dict()
        allItems.append(cd)
    return {'checklistitems': allItems}

@checklistitem_routes.route('/', methods=['POST'])

def createChecklistItems():
    data = request.get_json()
    form = ItemsForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_item = ChecklistItem(
            checklistid = data['checklistid'],
            isComplete = data['isComplete'],
            items = data['items']

        )
        db.session.add(new_item)
        db.session.commit()

        return new_item.to_dict()
    else:
        return form.errors

@checklistitem_routes.route('/<int:id>', methods=['PUT'])
def updateChecklistitems(id):
    checklistitems = ChecklistItem.query.get(id)
    data = request.get_json()
    if checklistitems:
        checklistitems.id = checklistitems.id
        checklistitems.isComplete = data['isComplete']
        checklistitems.items = data['items']

        db.session.commit()
        checklistobj = checklistitems.to_dict()

        return checklistobj
    else:
        return {'Error': "Checklist Item not found"}, 404
