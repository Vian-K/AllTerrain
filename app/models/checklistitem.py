from .db import db, environment, SCHEMA, add_prefix_for_prod


class ChecklistItem(db.Model):
    __tablename__ = "checklistitems"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    checklistid = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('checklist.id')), nullable=False)
    items = db.Column(db.String(3000), nullable=False)
    isComplete = db.Column(db.Boolean, nullable=False)

    checklist = db.relationship("Checklist", back_populates='checklistitems')

    def to_dict(self):
        return {
            'id': self.id,
            'items': self.items,
            'isComplete': self.isComplete

        }
