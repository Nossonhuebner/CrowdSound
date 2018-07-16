json.extract! track, :id, :title, :artist_id, :description
json.fileUrl url_for(track.file)
if track.artwork.attachment.present?
  json.artworkUrl url_for(track.artwork)
end
