class Api::LikesController < ApplicationController

  def create
    @like = Like.new(track_id: params[:track_id], user_id: current_user.id)
    if @like.save
      @track = Track.with_attached_file.with_attached_artwork
      .includes(:genre, :likes, :likers, artist: [:tracks, :albums, profile_pic_attachment: :blob], comments: [user: [profile_pic_attachment: :blob]])
      .find(params[:track_id])
      render '/api/tracks/show'
    else
      render json: @like.errors.full_messages, status: 404
    end
  end

  def destroy
    @like = Like.where(user_id: current_user.id, track_id: params[:track_id])
    if @like[0]
      @like[0].destroy
      @track = Track.with_attached_file.with_attached_artwork
      .includes(:genre, :likes, :likers, artist: [:tracks, :albums, profile_pic_attachment: :blob], comments: [user: [profile_pic_attachment: :blob]])
      .find(params[:track_id])
      render '/api/tracks/show'
    else
      render json: {}, status: 404
    end
  end
end
