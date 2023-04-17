from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship

class CampsiteImage(db.Model):
    __tablename__ = "campsiteimages"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String, nullable=False)
    preview = db.Column(db.Boolean, default=True, nullable=False)
    campsiteid = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('campsite.id')), nullable=False)

    campsite = db.relationship("Campsite", back_populates='campsiteimages')
    

    def to_dict(self):
        return {
            'id': self.id,
            'image': self.image,
            'preview': self.preview,
            'campsiteid': self.campsiteid

        }
