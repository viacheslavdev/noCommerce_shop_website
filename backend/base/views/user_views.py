from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response    
from rest_framework import status
from django.contrib.auth.models import User

from base.models import Product
from base.serializers import UserSerializer, UserSerializerWithToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView # class base view

from django.contrib.auth.hashers import make_password

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        data['username'] = self.user.username
        data['email'] = self.user.email

        # get data from 
        serializer = UserSerializerWithToken(self.user).data

        # generate all values to api/users/login/
        for k, v in serializer.items():
            data[k] = v

        return data
    

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
    data = request.data
    print(request)
    print(data)
    try: 
        user = User.objects.create(
            first_name = data['name'],
            username = data['email'],
            email = data['email'],
            password= make_password(data['password']) # hashing password
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated]) 
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False) 

    data = request.data 

    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    print(serializer.data)
    return Response(serializer.data)  


@api_view(['GET'])
@permission_classes([IsAuthenticated]) # Allows access only to authenticated users. (in postman token is required)
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False) # many - one object or multiple 
    # Response is working with @api_view
    print(serializer.data)
    return Response(serializer.data)    


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True) 
    return Response(serializer.data)
