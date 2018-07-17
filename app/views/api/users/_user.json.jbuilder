json.user do
  json.extract! user, :id, :username
  json.trackIds user.track_ids
  json.albumIds user.album_ids
  json.profilePicUrl url_for(user.profile_pic)
end

json.tracks do
  user.tracks.each do |track|
    json.set! track.id do
      json.extract! track, :id, :title, :album_id, :artist_id
      json.fileUrl url_for(track.file)
      json.artworkUrl url_for(track.artwork)
    end
  end
end

# json.albums do
#   user.albums.each do |album|
#     json.set! album.id do
#       json.artistName user.username
#       json.extract! album, :id, :title
#       json.albumArtworkUrl url_for(album.album_artwork)
#       json.trackIds album.track_ids
#     end
#   end
# end
