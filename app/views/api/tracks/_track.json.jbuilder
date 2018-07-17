json.extract! track, :id, :title, :artist_id, :description, :album_id
json.fileUrl url_for(track.file)
json.artworkUrl url_for(track.artwork)
