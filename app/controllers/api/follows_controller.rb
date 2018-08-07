class Api::FollowsController < ApplicationController

  def create
    @user = User.with_attached_profile_pic.includes(:albums, tracks: [:genre, :comments, :likes, :likers, artwork_attachment: :blob, file_attachment: :blob]).find(params[:user_id])
    render json: ['invalid params'] unless @user
    follow = Follow.new(followee_id: @user.id, follower_id: current_user.id)
    if follow.save
      render '/api/users/show'
    else
      render json: follow.errors.full_messages, status: 404
    end
  end

  def destroy
    @follow = Follow.where(followee_id: params[:user_id], follower_id: current_user.id)
    if @follow[0]
      @follow[0].destroy
      @user = User.with_attached_profile_pic.includes(:albums, tracks: [:genre, :comments, :likes, :likers, artwork_attachment: :blob, file_attachment: :blob]).find(params[:user_id])
      render '/api/users/show'
    else
      render json: @follow[0].errors.full_messages, status: 404
    end
  end

end
