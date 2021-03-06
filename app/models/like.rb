# == Schema Information
#
# Table name: likes
#
#  id         :bigint(8)        not null, primary key
#  user_id    :integer          not null
#  track_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Like < ApplicationRecord

  belongs_to :track,
  foreign_key: :track_id,
  class_name: :Track

  belongs_to :user,
  foreign_key: :user_id,
  class_name: :User


end
