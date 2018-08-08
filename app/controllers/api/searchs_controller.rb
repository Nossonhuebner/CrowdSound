class Api::SearchsController < ApplicationController

  def index
    results = PgSearch.multisearch(params[:query])
  end
end
