json.extract! album, :id, :title, :artist_id, :album_artwork
json.albumArtworkUrl url_for(album.album_artwork)
json.artistName album.artist.username
json.trackIds album.track_ids
