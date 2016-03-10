class Tag < ActiveRecord::Base
  has_and_belongs_to_many :tasks
  scope :search, lambda{|query|
    where(["name LIKE ?", "%#{query}%"])
  }
end
