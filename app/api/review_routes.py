from flask import Blueprint, jsonify, request
from app.models import Review , db, Campsite
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

@review_routes.route('/<int:id>')
def campsiteReviews(id):
    campsite = Campsite.query.get(id)
    reviewsObj = {'reviews': [review.to_dict() for review in campsite.reviews]}
    if not reviewsObj:
        return ("Campsite not found"), 404
    else:
        return reviewsObj



@review_routes.route('/', methods=['POST'])
@login_required
def createReview():
    date = datetime.datetime.now()
    data = request.get_json()
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        old_review = Review.query.filter_by(campsiteid=data["campsiteid"], userid=current_user.id).first()

        if old_review:
            return {'message': "You have already left a review for this product"}
        new_review = Review(
            review= data["review"],
            rating= data["rating"],
            campsiteid = data["campsiteid"],
            userid = current_user.id,
            created_at = date
        )
        db.session.add(new_review)
        db.session.commit()

        return new_review.to_dict()
    else:
        return form.errors and {'message': "Bad Data"}, 400

@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def deleteReview(id):
    review = Review.query.get(id)
    print("review", review)
    if not review:
        return ("Review not found"), 404
    if review.userid != current_user.id:
        return {"Error": "You are not allowed to delete this review."}, 401

    db.session.delete(review)
    db.session.commit()

    return {"Review successfully deleted": id}
