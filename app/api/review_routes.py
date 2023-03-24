from flask import Blueprint, jsonify, request
from app.models import Review , db
from app.forms import ReviewForm
from flask_login import login_required, current_user
import datetime

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/')
def allReviews():
    reviews = Review.query.all()
    allReviews = []

    for review in reviews:
        rd = review.to_dict()
        allReviews.append(rd)
    return {'reviews': allReviews}

@review_routes.route('/', methods=['POST'])
@login_required
def createReview():
    date = datetime.datetime.now()
    data = request.get_json()
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['crsf_token']

    if form.validate_on_submit():
        old_review = Review.query.filter_by(product_id=data["product_id"], user_id=current_user.id).first()
        if old_review:
            return {'message': "You have already left a review for this product"}
        new_review = Review(
            review= data["review"],
            rating= data["rating"],
            campsiteid = data["campsiteid"],
            userid = current_user.id,
            createdAt = date
        )
        db.session.add(new_review)
        db.session.commit()

        return new_review.to_dict()
    else:
        return {'message': "Bad Data"}, 400 and form.errors

# @review_routes.route('<int:id>', methods=['DELETE'])
# @login_required
