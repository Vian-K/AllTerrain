from flask import Blueprint, jsonify, request
from app.models import Product, db, Review
from app.forms import ProductForm
from app.forms import ReviewForm
import datetime
from flask_login import login_required, current_user

campsite_routes = Blueprint('campsite', __name__)
