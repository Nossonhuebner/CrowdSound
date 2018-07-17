class Api::AlbumsController < ApplicationController

  def create
    @album = Album.new(album_params)
    @album.artist_id = current_user.id

    if @album.save
      render '/api/albums/show'
    else
      render json: @album.errors.full_messages, status: 404
    end
  end

  def show
    @album = Album.includes(:tracks, :artist).find(params[:id])
    render '/api/albums/show'
  end


  def index
    @albums = Album.includes(:tracks).find_by(artist_id: params[:user_id])
    @user = User.find(params[:user_id])
    render '/api/users/show'
  end

  def destroy
    @album = Album.find(params[:id])
    if @album
      @album.destroy!
    end
    @user = User.find(@album.artist_id)
    render '/api/users/show'
  end

  private

  def album_params
    params.require(:album).permit(:title, :album_artwork)
  end

end
