json.track do
  json.extract! track, :id, :title, :artist_id, :description, :album_id
  json.fileUrl url_for(track.file)
  json.artworkUrl url_for(track.artwork)
end

json.user do
  json.set! track.artists.id do
    json.extract! track.artist, :id, :username
  end
end

json.comments do
  json.extract! track.comments, :id, :user_id, :body, :track_id
end
