class Task < ActiveRecord::Base
  has_and_belongs_to_many:tags
  scope :visible, lambda{where(:status=>true)}
  scope :invisible, lambda{where(:status=>false)}

  scope :search, lambda{|query|
    where(["name LIKE ?", "%#{query}%"])
  }

end
