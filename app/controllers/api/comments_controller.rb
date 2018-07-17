class CommentsController < ApplicationController

  def created
    @comment = Comment.new(comment_params)
    @comment.user = current_user
    @comment.track = params[:track_id]
    if @comment.save
      render json: {}
    else
      render json: @comment.errors.full_messages
    end
  end

  def update
    @comment = Comment.find(params[:id])
    if @comment.update(comment_params)
      render json: {}
    else
      render json: {}
    end
  end

  def destroy
    @comment = Comment.find(params[:id])

    if @comment
      @comment.destroy!
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end

end
