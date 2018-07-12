class Api::TracksController < ApplicationController

  def show
    @track = Track.find(params[:id])

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

  def destroy
    track = Track.find(params[:id])
    track.destroy if track
    render json: {}
  end

  private

  def track_params
    params.require(:track).permit(:title, :file, :description)
  end

end
