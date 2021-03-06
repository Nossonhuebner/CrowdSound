class Api::SessionsController < ApplicationController

  def create
    @user = User.includes(:tracks).find_by_credentials(params[:user][:username], params[:user][:password])
    if @user
      log_in!(@user)
      render '/api/users/show'
    else
      render json: ['invalid credentials'], status: 404
    end
  end

  def destroy
    if logged_in?
      log_out!
      render json: {}
    else
      render json: ['not logged in'], status: 404
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end

end
