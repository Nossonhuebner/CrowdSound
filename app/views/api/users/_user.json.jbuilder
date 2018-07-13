json.tracks do
  user.tracks.each do |track|
    json.set! track.id do
      json.extract! track, :id, :title, :album_id, :artist_id
      json.fileUrl url_for(track.file)
    end
  end
end

json.user do
  json.extract! user, :id, :username
  json.trackIds user.track_ids
end
