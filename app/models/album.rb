# == Schema Information
#
# Table name: albums
#
#  id           :bigint(8)        not null, primary key
#  title        :string           not null
#  artist_id    :integer          not null
#  release_date :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Album < ApplicationRecord

  after_initialize :ensure_album_artwork
  validates :title, :artist_id, presence: true

  belongs_to :artist,
  foreign_key: :artist_id,
  class_name: :User

  has_one_attached :album_artwork

  has_many :tracks

  private

  def ensure_album_artwork
    unless self.album_artwork.attached?
      self.album_artwork.attach(io: File.open('app/assets/images/default.jpeg'),
       filename: 'default.jpeg')
    end
  end

end
