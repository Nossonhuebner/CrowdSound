json.extract! track, :id, :title, :artist_id, :description
json.fileUrl url_for(track.file)
