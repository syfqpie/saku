from rest_framework_simplejwt.serializers import TokenObtainPairSerializer as RestTokenObtainPairSerializer
from dj_rest_auth.serializers import JWTSerializerWithExpiration as RestJWTSerializerWithExpiration


class TokenObtainPairSerializer(RestTokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["email"] = user.email

        return token


class JWTSerializer(RestJWTSerializerWithExpiration):
    
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep.pop("user")
        return rep
