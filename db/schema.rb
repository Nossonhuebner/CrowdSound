# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_08_08_000025) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "albums", force: :cascade do |t|
    t.string "title", null: false
    t.integer "artist_id", null: false
    t.datetime "release_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["artist_id"], name: "index_albums_on_artist_id"
  end

  create_table "comments", force: :cascade do |t|
    t.string "body", null: false
    t.integer "user_id", null: false
    t.integer "track_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["track_id"], name: "index_comments_on_track_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "follows", force: :cascade do |t|
    t.integer "follower_id", null: false
    t.integer "followee_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["followee_id"], name: "index_follows_on_followee_id"
    t.index ["follower_id", "followee_id"], name: "index_follows_on_follower_id_and_followee_id", unique: true
    t.index ["follower_id"], name: "index_follows_on_follower_id"
  end

  create_table "genres", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_genres_on_name"
  end

  create_table "likes", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "track_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "track_id"], name: "index_likes_on_user_id_and_track_id", unique: true
  end

  create_table "pg_search_documents", force: :cascade do |t|
    t.text "content"
    t.string "searchable_type"
    t.bigint "searchable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["searchable_type", "searchable_id"], name: "index_pg_search_documents_on_searchable_type_and_searchable_id"
  end

  create_table "reposts", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "track_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "track_id"], name: "index_reposts_on_user_id_and_track_id", unique: true
  end

  create_table "tracks", force: :cascade do |t|
    t.string "title", null: false
    t.integer "artist_id", null: false
    t.integer "album_id"
    t.integer "genre_id"
    t.string "description"
    t.integer "plays", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
