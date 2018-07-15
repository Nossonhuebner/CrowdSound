json.extract! track, :id, :title, :artist_id, :description
json.fileUrl url_for(track.file)
json.artworkUrl url_for(track.artwork)
json.artistName track.artist.username
