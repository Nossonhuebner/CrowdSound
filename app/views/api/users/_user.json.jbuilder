json.tracks do
  user.tracks.each do |track|
    json.set! track.id do
      json.extract! track, :id, :title, :album_id, :artist_id
      json.fileUrl url_for(track.file)
      if track.artwork.attachment.present?
        json.artworkUrl url_for(track.artwork)
      end
    end
  end
end

json.user do
  json.extract! user, :id, :username
  json.trackIds user.track_ids
  if user.profile_pic.attachment.present?
    debugger
    json.profilePicUrl url_for(user.profile_pic)
  end
end
