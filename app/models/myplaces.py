from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship

class MyPlace(db.Model):
    __tablename__="myplaces"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    campsiteid = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('campsite.id')), nullable=False)
    userid = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    users = db.relationship("User", back_populates='myplaces')
    campsite = db.relationship("Campsite", back_populates='myplaces')


    def to_dict(self):
        return {
            'id': self.id,
            'campsiteid': self.campsiteid,
            'userid': self.userid
        }
