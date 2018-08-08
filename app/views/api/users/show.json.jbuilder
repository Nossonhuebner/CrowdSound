json.partial! "api/users/user", user: @user, followees: @user.followees.take(10)
