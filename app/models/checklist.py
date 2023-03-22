from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship

class Checklist(db.Model):
    __tablename__ = "checklist"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    checklist = db.Column(db.String(3000), nullable=False)

    user = db.relationship("User", back_populates='checklist')
    checklistitems = db.relationship("ChecklistItem", back_populates='checklist')

    def to_dict(self):
        return {
            'id': self.id,
            'userid': self.userid,
            'checklist': self.checklist

        }
