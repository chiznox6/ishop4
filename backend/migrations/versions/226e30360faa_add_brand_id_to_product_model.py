"""Add brand_id to Product model

Revision ID: 226e30360faa
Revises: ccc30f83fa5b
Create Date: 2025-09-26 21:24:31.342473

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '226e30360faa'
down_revision = 'ccc30f83fa5b'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.add_column(sa.Column('brand_id', sa.Integer(), nullable=True))

    # Update existing products with a default brand_id (e.g., the ID of the first brand)
    # This assumes that there is at least one brand in the 'brands' table.
    # If not, this step might fail or set NULLs if brand_id was nullable.
    op.execute("UPDATE products SET brand_id = 1 WHERE brand_id IS NULL")

    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.alter_column('brand_id',
                              existing_type=sa.Integer(),
                              nullable=False)
        batch_op.create_foreign_key('fk_products_brand_id_brands', 'brands', ['brand_id'], ['id'])

def downgrade():
    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.drop_constraint('fk_products_brand_id_brands', type_='foreignkey')
        batch_op.drop_column('brand_id')
