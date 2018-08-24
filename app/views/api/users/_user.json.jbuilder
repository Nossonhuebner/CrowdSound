json.user do
  json.extract! user, :id, :username
  json.trackIds user.track_ids
  json.albumIds user.album_ids
  json.profilePicUrl url_for(user.profile_pic)
  json.followerIds user.follower_ids
  json.followeeIds user.followee_ids
end

json.followees do
  user.followees.each do |followee|
    json.set! followee.id do
      json.extract! followee, :id, :username
      json.profilePicUrl url_for(followee.profile_pic)
      json.trackIds followee.track_ids
      json.followerIds followee.follower_ids
    end
  end
end

json.followers do
  user.followers.each do |follower|
    json.set! follower.id do
      json.profilePicUrl url_for(follower.profile_pic)
    end
  end
end

json.tracks do
  user.tracks.each do |track|
    json.set! track.id do
      json.extract! track, :id, :title, :album_id, :artist_id, :plays, :created_at
      json.fileUrl url_for(track.file)
      json.artworkUrl url_for(track.artwork)
      json.commentIds track.comment_ids
      json.likerIds track.likers.ids
      json.reposterIds track.reposter_ids
    end
  end
  user.liked_tracks.each do |track|
    json.set! track.id do
      json.extract! track, :id, :title, :album_id, :artist_id, :plays, :created_at
      json.artworkUrl url_for(track.artwork)
      json.likerIds track.likers.ids
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
