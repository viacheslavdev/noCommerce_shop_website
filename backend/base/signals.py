from django.db.models.signals import pre_save
from django.contrib.auth.models import User


# These events can be triggered by user actions, data changes in the 
# database, or other actions that occur within the application. The handler 
# takes sender and instance parameters, where sender is the model class and 
# instance is the model object that will be saved to the database.
# sender - model class, instance - model object
# Also should be added to apps.py

def updateUser(sender, instance, **kwargs):
    user = instance
    if user.email != '':
        user.username = user.email



pre_save.connect(updateUser, sender=User)