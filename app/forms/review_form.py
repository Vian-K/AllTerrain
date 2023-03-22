from flask_wtf import FlaskForm
from wtforms.fields import (StringField, SubmitField, IntegerField, FloatField)
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    userid = IntegerField("User Id", validators=[DataRequired()])
    campsiteid = IntegerField("Campsite Id", validators=[DataRequired()])
    review = StringField("Review", validators=[DataRequired()])
    rating = IntegerField("Rating", validators=[DataRequired()])
    created_at = StringField("Created At")
    SubmitField = SubmitField("Submit")
