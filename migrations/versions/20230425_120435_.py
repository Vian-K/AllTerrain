"""empty message

Revision ID: 2bde0de6d7dc
Revises: 
Create Date: 2023-04-25 12:04:35.156682

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2bde0de6d7dc'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('campsite',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('ownersid', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('details', sa.String(length=500), nullable=True),
    sa.Column('location', sa.String(length=500), nullable=False),
    sa.Column('landtype', sa.String(length=50), nullable=False),
    sa.Column('cost', sa.Integer(), nullable=False),
    sa.Column('roaddifficulty', sa.Integer(), nullable=False),
    sa.Column('cleanliness', sa.Integer(), nullable=False),
    sa.Column('celldata', sa.String(length=50), nullable=False),
    sa.Column('accessibility', sa.String(length=50), nullable=False),
    sa.ForeignKeyConstraint(['ownersid'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('checklist',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userid', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('isComplete', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['userid'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('campsiteimages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('image', sa.String(), nullable=False),
    sa.Column('preview', sa.Boolean(), nullable=False),
    sa.Column('campsiteid', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['campsiteid'], ['campsite.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('checklistitems',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('checklistid', sa.Integer(), nullable=False),
    sa.Column('item', sa.String(length=3000), nullable=False),
    sa.ForeignKeyConstraint(['checklistid'], ['checklist.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('myplaces',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('campsiteid', sa.Integer(), nullable=False),
    sa.Column('userid', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['campsiteid'], ['campsite.id'], ),
    sa.ForeignKeyConstraint(['userid'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userid', sa.Integer(), nullable=False),
    sa.Column('campsiteid', sa.Integer(), nullable=False),
    sa.Column('review', sa.String(length=255), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['campsiteid'], ['campsite.id'], ),
    sa.ForeignKeyConstraint(['userid'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reviews')
    op.drop_table('myplaces')
    op.drop_table('checklistitems')
    op.drop_table('campsiteimages')
    op.drop_table('checklist')
    op.drop_table('campsite')
    op.drop_table('users')
    # ### end Alembic commands ###