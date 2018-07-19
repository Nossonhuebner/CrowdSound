json.track do
  json.extract! track, :id, :title, :artist_id, :description, :album_id
  json.fileUrl url_for(track.file)
  json.artworkUrl url_for(track.artwork)
  json.commentIds track.comment_ids
end

json.user do
    json.extract! track.artist, :id, :username
    json.trackIds track.artist.track_ids
    json.profilePicUrl url_for(track.artist.profile_pic)
end

json.comments do
  track.comments.each do |comment|
    json.set! comment.id do
      json.id comment.id
      json.trackId track.id
      json.body comment.body
      json.userId comment.user_id
    end
  end
end
