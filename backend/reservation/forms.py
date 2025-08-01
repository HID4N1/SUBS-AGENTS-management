from django import forms
from .models import TimeSlot, Location



# step 1: Define the form for personal information
class PersonalInformationForm(forms.Form):
    client_name = forms.CharField(max_length=100, label="Name")
    client_phone = forms.CharField(max_length=15, label="Phone")
    client_email = forms.EmailField(required=False, label="Email")  # Optional

# step 2: Define the form for Time slot
class TimeSlotSelectionForm(forms.Form):
    time_slots = forms.ModelMultipleChoiceField(queryset=TimeSlot.objects.filter(is_available=True), widget=forms.CheckboxSelectMultiple)

# step 3: Define the form for Location
class LocationSelectionForm(forms.Form):
    location = forms.ModelChoiceField(queryset=Location.objects.all())