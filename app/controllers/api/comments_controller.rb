class Api::CommentsController < ApplicationController

  def create
    @comment = Comment.new(comment_params)
    @comment.user = current_user
    @comment.track_id = params[:track_id].to_i
    if @comment.save
      render '/api/comments/show'
    else
      render json: @comment.errors.full_messages
    end
  end

  def update
    @comment = Comment.find(params[:id])
    if @comment.update(comment_params)
      render '/api/comments/show'
    else
      render json: {}
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    if @comment
      @comment.destroy!
      render json: {};
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end

end
