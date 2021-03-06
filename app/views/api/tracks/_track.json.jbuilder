json.track do
    json.extract! track, :id, :title, :artist_id, :description, :album_id, :plays, :created_at
    json.fileUrl url_for(track.file)
    json.artworkUrl url_for(track.artwork)
    json.commentIds track.comment_ids
    json.artistName track.artist.username
    json.likerIds track.liker_ids
    json.reposterIds track.reposter_ids
end

json.user do
  json.extract! track.artist, :id, :username
  json.trackIds track.artist.track_ids
  json.profilePicUrl url_for(track.artist.profile_pic)
  json.followerIds track.artist.follower_ids
  json.followeeIds track.artist.followee_ids
  json.likedTrackIds track.artist.liked_track_ids
end

json.commentUsers do
  track.comments.each do |comment|
    json.set! comment.user.id do
      json.extract! comment.user, :id, :username
      json.trackIds comment.user.track_ids
      json.profilePicUrl url_for(comment.user.profile_pic)
    end
  end
end

json.likerUsers do
  track.likers.each do |liker|
    json.set! liker.id do
      json.extract! liker, :id, :username
      json.followerIds liker.follower_ids
      json.trackIds liker.track_ids
      json.profilePicUrl url_for(liker.profile_pic)
    end
  end
end

json.reposterUsers do
  track.reposters.each do |reposter|
    json.set! reposter.id do
      json.extract! reposter, :id, :username
      json.followerIds reposter.follower_ids
      json.trackIds reposter.track_ids
      json.profilePicUrl url_for(reposter.profile_pic)
    end
  end
end

json.comments do
  track.comments.each do |comment|
    json.set! comment.id do
      json.created_at comment.created_at
      json.id comment.id
      json.trackId track.id
      json.body comment.body
      json.userId comment.user_id
    end
  end
end
