json.tracks do
  @tracks.each do |track|
    json.set! track.id do
      json.id track.id
      json.title track.title
      json.artist_id track.artist_id
      json.description track.description
      json.album_id track.album_id
      json.plays track.plays
      json.created_at track.created_at
      json.fileUrl url_for(track.file)
      json.artworkUrl url_for(track.artwork)
      json.commentIds track.comment_ids
      json.artistName track.artist.username
      json.likerIds track.liker_ids
    end
  end
end

json.users do
  @tracks.each do |track|
      json.set! track.artist.id do
        json.id track.artist.id
        json.username track.artist.username
        json.trackIds track.artist.track_ids
        json.profilePicUrl url_for(track.artist.profile_pic)
        json.followerIds track.artist.follower_ids
    end
  end
end
