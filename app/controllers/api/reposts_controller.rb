class Api::RepostsController < ApplicationController

  def create
    @repost = Repost.new(track_id: params[:track_id], user_id: current_user.id)
    if @repost.save
      @track = Track.with_attached_file.with_attached_artwork
      .includes(:genre, :reposters, :likes, :likers, artist: [:tracks, :albums, profile_pic_attachment: :blob], comments: [user: [profile_pic_attachment: :blob]])
      .find(params[:track_id])
      render '/api/tracks/show'
    else
      render json: @repost.errors.full_messages, status: 404
    end
  end

  def destroy
    @repost = Repost.where(user_id: current_user.id, track_id: params[:track_id])
    if @repost[0]
      @repost[0].destroy
      @track = Track.with_attached_file.with_attached_artwork
      .includes(:genre, :reposters, :likes, :likers, artist: [:tracks, :albums, profile_pic_attachment: :blob], comments: [user: [profile_pic_attachment: :blob]])
      .find(params[:track_id])
      render '/api/tracks/show'
    else
      render json: {}, status: 404
    end
  end
end
