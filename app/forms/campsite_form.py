from flask_wtf import FlaskForm
from wtforms.fields import (StringField, SubmitField, IntegerField, FloatField)
from wtforms.validators import DataRequired

class CampsiteForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    details = StringField('Details', validators=[DataRequired()])
    location = StringField('Location', validators=[DataRequired()])
    landtype = StringField('Land Type', validators=[DataRequired()])
    cost = IntegerField('Cost', validators=[DataRequired()])
    roaddifficulty = IntegerField('Road Difficulty', validators=[DataRequired()])
    cleanliness = IntegerField("Cleanliness", validators=[DataRequired()])
    celldata = StringField("Cell Data", validators=[DataRequired()])
    accessibility = StringField("Accessibility", validators=[DataRequired()])
