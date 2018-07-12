class CreateTracks < ActiveRecord::Migration[5.2]
  def change
    create_table :tracks do |t|
      t.string :title, null: false
      t.integer :artist_id, null: false
      t.integer :album_id
      t.integer :genre_id
      t.string :description
      t.integer :plays, default: 0


      t.timestamps
    end
  end
end
