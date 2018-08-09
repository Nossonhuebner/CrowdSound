json.tracks do
  @tracks.each do |track|
    json.set! track.id do
      json.extract! track, :id, :title, :artist_id
      json.artworkUrl url_for(track.artwork)
      json.artistName track.artist.username
    end
  end
end

json.users do
  @users.each do |user|
    json.set! user.id do
      json.extract! user, :id, :username
      json.profilePicUrl url_for(user.profile_pic)
    end
  end
end
