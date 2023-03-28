from .db import db, environment, SCHEMA, add_prefix_for_prod



class Review(db.Model):
    __tablename__="reviews"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    campsiteid = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('campsite.id')), nullable=False)
    review = db.Column(db.String(255), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.String(), nullable=False)

    campsite = db.relationship("Campsite", back_populates='reviews')
    users = db.relationship("User", back_populates='reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'userid': self.userid,
            'review': self.review,
            'rating': self.rating,
            'created_at': self.created_at
        }
