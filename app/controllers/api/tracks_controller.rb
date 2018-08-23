class Api::TracksController < ApplicationController

  def index
    @tracks = Track.all.with_attached_artwork.with_attached_file
    .includes(:comments, :likers, artist: [:tracks, profile_pic_attachment: :blob]).first(12)
  end

  def show
    @track = Track.with_attached_file.with_attached_artwork
    .includes(:genre, :likes, :likers, artist: [:tracks, :followers, :followees, :albums, profile_pic_attachment: :blob], comments: [user: [profile_pic_attachment: :blob]]).find(params[:id])
    render '/api/tracks/show'
  end

  def create
    @track = Track.new(track_params)
    @track.artist_id = current_user.id
    if @track.save
      @track = Track.with_attached_file.with_attached_artwork
      .includes(:genre, :likes, :likers, artist: [:tracks, :followers, :followees, :albums, profile_pic_attachment: :blob], comments: [user: [profile_pic_attachment: :blob]]).find(@track.id)
      render '/api/tracks/show'
    else
      render json: @track.errors.full_messages, status: 404
    end
  end

  def update
    @track = Track.with_attached_file.with_attached_artwork
    .includes(:genre, :likes, :likers, artist: [:tracks, :followers, :followees, :albums, profile_pic_attachment: :blob],
      comments: [user: [:followers, profile_pic_attachment: :blob]]).find(params[:id])
    if @track.update(album_id: @album.id)
      render '/api/tracks/show'
    else
      render json: @track.errors.full_messages, status: 404
    end
  end

  def destroy
    track = Track.find(params[:id])
    track.destroy if track
    render json: {}
  end

  def increment_plays
    @track = Track.with_attached_file.with_attached_artwork
    .includes(:genre, :likes, :likers, artist: [:tracks, :albums, profile_pic_attachment: :blob],
       comments: [user: [:followers, profile_pic_attachment: :blob]]).find(params[:id])
    if @track.update(plays: @track.plays + 1)
      render '/api/tracks/show'
    else
      render json: @track.errors.full_messages, status: 404
    end
  end

  def next_track
    @track = Track.with_attached_file.with_attached_artwork
    .includes(:genre, :likes, :likers, artist: [:tracks, :albums, profile_pic_attachment: :blob],
       comments: [user: [:followers, profile_pic_attachment: :blob]]).sample

    render '/api/tracks/show'
  end

  private

  def track_params
    params.require(:track).permit(:title, :file, :artwork, :description)
  end

end
