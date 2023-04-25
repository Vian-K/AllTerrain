from flask_wtf import FlaskForm
from wtforms.fields import (StringField, BooleanField, SubmitField)
from wtforms.validators import DataRequired

class ItemsForm(FlaskForm):

    item = StringField("Item", validators=[DataRequired()])
    submit = SubmitField("Submit")
