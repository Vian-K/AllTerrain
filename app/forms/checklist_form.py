from flask_wtf import FlaskForm
from wtforms.fields import (StringField, BooleanField, SubmitField)
from wtforms.validators import DataRequired

class ChecklistForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    isComplete = StringField("isComplete", validators=[DataRequired()])
    submit = SubmitField("Submit")
