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
  after_initialize :ensure_session_token

  validates :username, :password_digest, :session_token, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: true

  has_one_attached :profile_pic

  has_many :followers,
  foreign_key: :follower_id,
  class_name: :Follows

  has_many :followees,
  foreign_key: :followee_id,
  class_name: :Follows

  has_many :likes
  has_many :reposts

  has_many :tracks,
  foreign_key: :artist_id,
  class_name: :Track

  attr_reader :password

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

end
