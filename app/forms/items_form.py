from flask_wtf import FlaskForm
from wtforms.fields import (StringField, BooleanField, SubmitField)
from wtforms.validators import DataRequired

class ItemsForm(FlaskForm):
    isComplete = StringField("isComplete", validators=[DataRequired()])
    items = StringField("Items", validators=[DataRequired()])
    submit = SubmitField("Submit")
