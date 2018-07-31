class Api::LikesController < ApplicationController

  def create
    @like = Like.new(track_id: params[:track_id], user_id: current_user.id)
    if @like.save
      @track = Track.includes(:genre, likes: [:user], comments: [:user]).find(params[:track_id])
      render '/api/tracks/show'
    else
      render json: @like.errors.full_messages
    end
  end

  def destroy
    @like = Like.where(user_id: current_user.id, track_id: params[:track_id])
    if @like[0]
      @like[0].destroy
      @track = Track.includes(:genre, likes: [:user], comments: [:user]).find(params[:track_id])
      render '/api/tracks/show'
    else
      render json: {}
    end
  end
end
