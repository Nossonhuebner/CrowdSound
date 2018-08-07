# == Schema Information
#
# Table name: tracks
#
#  id          :bigint(8)        not null, primary key
#  title       :string           not null
#  artist_id   :integer          not null
#  album_id    :integer
#  genre_id    :integer
#  description :string
#  plays       :integer          default(0)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Track < ApplicationRecord
  before_save :ensure_artwork

  # scope :with_eager_loaded_file, -> { eager_load(file_attachment: :blob) }
  # scope :with_eager_loaded_artwork, -> { eager_load(artwork_attachment: :blob) }

  belongs_to :artist,
  foreign_key: :artist_id,
  class_name: :User

  belongs_to :genre,
  foreign_key: :genre_id,
  class_name: :Genre,
  optional: true

  belongs_to :album,
  optional: true

  has_many :likes

  has_many :likers,
  through: :likes,
  source: :user

  has_many :reposts
  has_many :comments

  has_one_attached :file
  has_one_attached :artwork

  private

  def ensure_artwork
    unless self.artwork.attached?
      self.artwork.attach(io: EzDownload.open('https://s3.us-east-2.amazonaws.com/crowdsound-prod/albums/default.png'),
      filename: 'default.png')
    end
  end

end
