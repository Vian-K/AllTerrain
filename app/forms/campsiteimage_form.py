from flask_wtf import FlaskForm
from wtforms.fields import (StringField, SubmitField, IntegerField, FloatField, BooleanField)
from wtforms.validators import DataRequired

class CampsiteImageForm(FlaskForm):
    image = StringField('image', validators=[DataRequired()])
    preview = BooleanField("preview", validators=[DataRequired()])
    campsiteid = IntegerField("campsiteid", validators=[DataRequired()])
    submit = SubmitField("submit")
