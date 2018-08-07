class FollowsController < ApplicationController

  def create
    @followee = User.find(params[:id])
    follow = Follow.new(followee_id: followee.id, follower_id: current_user.id)
    if follow.save

    else
      render json: follow.errors.full_messages
    end
  end

  def destroy
    follow = Follow.where(followee_id: params[:id], follower_id: current_user.id)

  end

end
