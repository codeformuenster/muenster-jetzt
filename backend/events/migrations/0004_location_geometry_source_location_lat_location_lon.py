# Generated by Django 4.0.4 on 2022-09-23 15:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("events", "0003_auto_20201104_1638"),
    ]

    operations = [
        migrations.AddField(
            model_name="location",
            name="geometry_source",
            field=models.CharField(
                blank=True,
                help_text="Source of the geometry in lat and lon fields",
                max_length=1023,
                null=True,
            ),
        ),
        migrations.AddField(
            model_name="location",
            name="lat",
            field=models.FloatField(
                blank=True,
                help_text="Latitude of the event location",
                null=True,
            ),
        ),
        migrations.AddField(
            model_name="location",
            name="lon",
            field=models.FloatField(
                blank=True,
                help_text="Longitude of the event location",
                null=True,
            ),
        ),
    ]
