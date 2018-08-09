class Api::SearchsController < ApplicationController

  def index
    # results  = PgSearch.multisearch(params[:query]).includes(:searchable)
    # @tracks = results.where(searchable_type: 'Track').map(&:searchable)
    # @users = results.where(searchable_type: 'User').map(&:searchable)

    @tracks = Track.with_attached_artwork.includes(:artist).where(title: params[:query])
    @users = User.with_attached_profile_pic.where(username: params[:query])
    if @tracks[0] || @users[0]
      render 'api/searchs/index'
    else
      render json: ["No results"], status: 404
    end
  end
end
