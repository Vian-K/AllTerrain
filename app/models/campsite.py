from .db import db, environment, SCHEMA, add_prefix_for_prod


class Campsite(db.Model):
    __tablename__ = "campsite"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    ownersid = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    name = db.Column(db.String(50), nullable=False)
    details = db.Column(db.String(500))
    location = db.Column(db.String(500), nullable=False)
    landtype = db.Column(db.String(50), nullable=False)
    cost = db.Column(db.Integer, nullable=False)
    roaddifficulty = db.Column(db.Integer, nullable=False)
    cleanliness = db.Column(db.Integer, nullable=False)
    celldata = db.Column(db.String(50), nullable=False)
    accessibility = db.Column(db.String(50), nullable=False)

    users = db.relationship("User", back_populates="campsite")
    campsiteimages = db.relationship("CampsiteImage", back_populates="campsite", cascade='all, delete')
    reviews = db.relationship("Review", back_populates='campsite', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'cost': self.cost,
            'roaddifficulty': self.roaddifficulty,
            'cleanliness': self.cleanliness,
            'celldata': self.celldata,
            'accessibility': self.accessibility

        }
