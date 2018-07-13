class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      log_in!(@user)
      render '/api/users/show'
    else
      render json: @user.errors.full_messages, status: 404
    end
  end

  def show
    @user = User.includes(tracks: [:genre]).find(params[:id])
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end

end
