class Api::TracksController < ApplicationController

  def show
    @track = Track.includes(:artist, :comments).find(params[:id])
    render '/api/tracks/show'
  end

  def create
    @track = Track.new(track_params)
    @track.artist_id = current_user.id

    if @track.save
      render '/api/tracks/show'
    else
      render json: @track.errors.full_messages, status: 404
    end
  end

  def update
    @track = Track.includes(:artist, :comments).find(params[:id])
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
  #
  # def update
  #   @track =
  # end

  private

  def track_params
    params.require(:track).permit(:title, :file, :artwork, :description)
  end

end
