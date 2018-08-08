class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      log_in!(@user)
      @user = User.with_attached_profile_pic.includes(:albums, :followers, followees: [profile_pic_attachment: :blob], tracks: [:genre, :comments, :likes, :likers, artwork_attachment: :blob, file_attachment: :blob]).find(@user.id)
      render '/api/users/show'
    else
      render json: @user.errors.full_messages, status: 404
    end
  end

  def update
    @user = current_user

    if @user.update(user_params)
      @user = User.with_attached_profile_pic.includes(:albums, :followers, :followees, tracks: [:genre, :comments, :likes, :likers, artwork_attachment: :blob, file_attachment: :blob]).find(@user.id)
      render '/api/users/show'
    else
      render json: @user.errors.full_messages, status: 404
    end
  end

  def show
    @user = User.with_attached_profile_pic.includes(:albums, :followers, :followees, tracks: [:genre, :comments, :likes, :likers, artwork_attachment: :blob, file_attachment: :blob]).find(params[:id])
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :profile_pic)
  end

end
