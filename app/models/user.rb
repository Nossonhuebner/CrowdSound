# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  before_validation :ensure_session_token
  before_save :ensure_profile_pic

  validates :username, :password_digest, :session_token, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: true
  attr_reader :password

  include PgSearch
  multisearchable :against => :username


  has_one_attached :profile_pic

  has_many :follows,
  foreign_key: :followee_id,
  class_name: :Follow

  has_many :followers,
  through: :follows,
  source: :follower

  has_many :followings,
  foreign_key: :follower_id,
  class_name: :Follow

  has_many :followees,
  through: :followings,
  source: :followee


  has_many :tracks,
  foreign_key: :artist_id,
  class_name: :Track

  has_many :albums,
  foreign_key: :artist_id,
  class_name: :Album

  has_many :likes
  has_many :reposts
  has_many :comments

  def self.find_by_credentials(username, password)
    user = self.find_by_username(username)

    if user
      return user if user.is_password?(password)
    end
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end

  def ensure_profile_pic
    unless self.profile_pic.attached?
      self.profile_pic.attach(io: EzDownload.open('https://s3.us-east-2.amazonaws.com/crowdsound-prod/albums/default.png'),
      filename: 'default.png')
    end
  end
end
