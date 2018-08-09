class Api::SearchsController < ApplicationController

  def index
    @tracks = Track.with_attached_artwork.includes(:artist).where(title: params[:query])
    @users = User.with_attached_profile_pic.where(username: params[:query])
    if @tracks || @users
      render 'api/searchs/index'
    else
      render json: "No results", status: 404
    end
  end
end
