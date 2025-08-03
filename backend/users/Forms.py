from django import forms
from .models import CustomUser

# Form for agent creation
class AgentCreateForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ['username', 'password', 'first_name', 'last_name', 'email', 'phone']

    def save(self, commit=True):
        # Ensure the user is created as an agent and set a password
        user = super().save(commit=False)
        user.role = 'Agent'  # Force the role to be 'Agent'
        if commit:
            user.set_password(self.cleaned_data['password'])
            user.save()
        return user


# Form for agent update
class AgentUpdateForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ['username', 'first_name', 'last_name', 'email', 'phone']

    def save(self, commit=True):
        user = super().save(commit=False)
        if commit:
            user.save()
        return user


# Form for agent deletion (admin can trigger this, but no form needed for this action)
class AgentDeleteForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ['id']

    def save(self, commit=True):
        user = super().save(commit=False)
        if commit:
            user.delete()
        return user
